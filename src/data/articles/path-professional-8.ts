import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-professional-8',
  title: 'LLM 推理优化：vLLM、TensorRT-LLM 与高性能部署',
  description: 'vLLM/TensorRT-LLM/text-generation-inference对比、批处理策略、KV缓存优化、量化选择、连续批处理、张量并行、推理性能测试方法。',
  date: '2026-05-26',
  readTime: '12-18 分钟',
  content: `## 技术背景与原理

大模型推理（Inference）是 AI 应用落地中成本最高、延迟最敏感的环节。与训练相比，推理有几个本质特点：(1) 计算模式是 Memory-bound（访存密集）而非 Compute-bound——生成每个 Token 都需要加载整个模型权重，GPU 计算单元大部分时间在等待内存传输；(2) 请求到达是随机的，负载波动大；(3) 输出长度不确定，短的几个词，长的几千 Token。这些特点使得推理优化成为一门复杂的系统工程。

2026 年，大模型推理引擎已经形成三足鼎立的格局：vLLM 凭借 PagedAttention 开创了高吞吐服务范式，是开源社区最主流的选择；TensorRT-LLM 是 NVIDIA 官方推出的高性能推理引擎，在 NVIDIA GPU 上极致优化；Text Generation Inference（TGI）是 Hugging Face 推出的推理服务框架，集成度高、部署便捷。此外 llama.cpp 统治了 CPU/边缘端推理，SGLang 在结构化输出和复杂路由场景表现优秀。

推理优化的核心技术包括：连续批处理（Continuous Batching）、PagedAttention（分页注意力）、KV 缓存优化、量化（INT8/INT4/FP8）、张量并行（Tensor Parallelism）、流式输出、Speculative Decoding（推测解码）等。理解这些技术原理是做出正确部署决策的基础。

## 核心概念

### KV 缓存与 PagedAttention

Transformer 生成过程中，每个 Token 的 Key 和 Value 张量会被缓存（KV Cache），避免重复计算。传统实现中，KV Cache 被预分配为连续的大块内存，存在严重的内部碎片（不同请求的缓存长度不同，预留空间浪费可达 50-80%）。vLLM 提出的 PagedAttention 借鉴操作系统虚拟内存的思想：将 KV Cache 分割成固定大小的 Block（页），通过页表逻辑寻址，Block 可以动态分配、共享（如 Beam Search、并行采样场景），内存利用率从 20-40% 提升到 80-95%，吞吐量提升 2-4 倍。

### 连续批处理（Continuous Batching）

传统静态批处理（Static Batching）需要等待一批请求全部生成结束才能处理下一批，先完成的请求会被"拖后腿"。连续批处理的核心是：**批的组成是动态的**——当一个请求生成结束（遇到 EOS），立即从批中移除，并在同一迭代步加入新的等待请求。这使得 GPU 利用率大幅提升，不需要等整批完成。TGI、vLLM、TensorRT-LLM 都支持连续批处理。

### 量化技术对比

| 量化方案 | 精度损失 | 速度提升 | 显存节省 | 适用场景 |
|---------|---------|---------|---------|---------|
| FP16/BF16 | 无 | 1x | 0% | 训练、最高质量推理 |
| FP8 | 极小 | 1.2-1.5x | 50% | H100/H200 GPU 生产部署首选 |
| INT8 (W8A8) | 很小 | 1.5-2x | 50% | A100/L40 等支持 INT8 Tensor Core |
| INT4 (GPTQ/AWQ) | 较小-中等 | 2-3x | 75% | 消费级显卡、高吞吐场景 |
| GGUF Q4_K_M | 较小 | 2x (CPU/GPU) | 75% | llama.cpp 边缘部署 |
| GGUF Q2_K | 明显 | 3-4x | 87.5% | 极端资源受限场景，不推荐生产 |

### 张量并行（Tensor Parallelism）

当模型太大单卡装不下时，将模型的不同层/权重切分到多个 GPU 上，通过 All-Reduce 通信同步结果。张量并行是低延迟场景的首选（与 Pipeline Parallelism 相比延迟更低），但要求 GPU 之间有高速互联（NVLink）。70B 模型 FP16 需要 8x A100 (80GB) 或 4x H100 (80GB) 做张量并行。

## 生产级代码示例

### vLLM 生产部署配置

\\\`\\\`\\\`python
# vllm_server.py
from vllm import LLM, SamplingParams
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
import time
from typing import Optional

app = FastAPI(title="LLM Inference Service")

llm = LLM(
    model="meta-llama/Meta-Llama-3-8B-Instruct",
    tensor_parallel_size=1,
    gpu_memory_utilization=0.90,
    max_model_len=8192,
    quantization="awq",
    dtype="auto",
    trust_remote_code=True,
    enforce_eager=False,
    max_num_seqs=256,
    max_num_batched_tokens=32768,
    enable_prefix_caching=True,
)

class ChatRequest(BaseModel):
    messages: list[dict]
    temperature: float = 0.7
    max_tokens: int = 2048
    top_p: float = 0.95
    stream: bool = False

class ChatResponse(BaseModel):
    text: str
    usage: dict
    latency_ms: float

@app.post("/v1/chat/completions")
async def chat(request: ChatRequest):
    sampling_params = SamplingParams(
        temperature=request.temperature,
        max_tokens=request.max_tokens,
        top_p=request.top_p,
    )
    prompt = llm.get_tokenizer().apply_chat_template(
        request.messages, tokenize=False, add_generation_prompt=True
    )
    start = time.time()
    outputs = llm.generate([prompt], sampling_params)
    latency = (time.time() - start) * 1000
    output = outputs[0]
    return ChatResponse(
        text=output.outputs[0].text,
        usage={
            "prompt_tokens": len(output.prompt_token_ids),
            "completion_tokens": len(output.outputs[0].token_ids),
            "total_tokens": len(output.prompt_token_ids) + len(output.outputs[0].token_ids)
        },
        latency_ms=latency
    )
\\\`\\\`\\`,
};

export default article;
