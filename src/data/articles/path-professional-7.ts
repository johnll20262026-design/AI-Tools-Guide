import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-professional-7',
  title: '大模型微调实战：QLoRA、数据工程与模型部署',
  description: 'QLoRA vs Full Fine-tuning、数据工程(清洗/配比/质量)、训练监控、评估指标(Perplexity/BLEU/人工评估)、模型合并与部署。',
  date: '2026-05-27',
  readTime: '12-18 分钟',
  content: `## 技术背景与原理

大语言模型微调（Fine-tuning）是让通用大模型适配特定垂直领域、特定任务风格或特定输出格式的核心技术手段。2023 年 QLoRA 的提出彻底改变了微调的经济成本——在消费级 GPU（如 RTX 3090/4090 24GB）上即可微调 7B/13B/70B 参数级别的模型，微调成本从数万美元降低到数十美元，使得中小团队甚至个人开发者都能进行定制化模型训练。2026 年，微调技术已经形成了完整的工具链：LLaMA-Factory、Unsloth、Axolotl 等框架大幅降低了微调门槛，但"能跑微调"和"调出好模型"之间仍有巨大差距，核心在于数据工程、训练策略和评估方法。

微调的本质是在预训练模型的基础上，用特定领域或任务的数据继续训练，调整模型参数以更好地适配目标分布。根据调整的参数范围，微调方法可以分为三类：
- **Full Fine-tuning（全参数微调）**：更新模型的所有参数，效果最好但显存需求极高（7B 模型需要 ~100GB+ 显存），适合有充足算力的场景。
- **PEFT（参数高效微调）**：只更新极少量参数（通常 < 1%），包括 LoRA、QLoRA、Prefix Tuning、P-Tuning、Adapter 等，显存需求大幅降低，效果接近全参数微调。
- **RLHF/DPO**：基于人类反馈的对齐训练，用于让模型学习人类偏好（更有用、更安全、更符合指令），属于训练后期的对齐阶段。

QLoRA（Quantized LoRA）是目前工业界最主流的微调方案，它结合了 4-bit 量化和 LoRA 技术：将预训练模型量化为 4-bit 精度加载（节省 75% 显存），冻结量化后的基础模型权重，只在其上训练 LoRA 适配器（低秩矩阵），最终训练产物是几十到几百 MB 的 LoRA 权重文件，而非完整的模型副本。这既解决了显存问题，又让模型分发和部署变得轻量化——不同任务的 LoRA 权重可以像插件一样动态加载和切换。

## 核心概念

### LoRA 原理

LoRA 的核心假设：大模型在适配下游任务时，权重更新矩阵具有低秩特性——即模型的"知识变化"可以用低维子空间来表示。具体做法是在 Transformer 的注意力层的 Q、V 投影矩阵旁添加两个小矩阵 A 和 B（A 是随机初始化的低秩矩阵，B 初始化为零矩阵），训练时只更新 A 和 B 的参数，原始权重冻结。推理时将 BA 的乘积加到原始权重上，不会引入额外推理延迟。

关键超参数：
- **Rank (r)**：低秩矩阵的维度，通常 8-64。r 越大表达能力越强，但显存占用和过拟合风险也增加。
- **Alpha**：缩放因子，通常设为 r 的 2 倍或 r 本身，控制 LoRA 更新的幅度。
- **Target Modules**：应用 LoRA 的目标层，通常是 q_proj、v_proj，进阶可加入 k_proj、o_proj、mlp 层。

### 数据工程三要素

数据质量 > 数据数量 > 数据多样性，这是微调的黄金法则。

1. **数据清洗**：去重、去脏、过滤低质量样本（过短、乱码、重复、模板化）。
2. **数据配比**：不同类型数据按比例混合，避免灾难性遗忘（通用数据 : 领域数据 = 1:3 到 1:5）。
3. **数据格式**：严格遵循 Chat Template（对话模板），不同模型有不同的格式要求（如 Llama 3 的 <|begin_of_text|>、<|start_header_id|> 等特殊 token），格式错误会严重影响训练效果。

## 生产级代码示例

### 使用 LLaMA-Factory 进行 QLoRA 微调

\\\`\\\`\\\`yaml
# qlora_config.yaml
model_name_or_path: meta-llama/Meta-Llama-3-8B-Instruct

stage: sft
do_train: true
finetuning_type: lora
lora_rank: 32
lora_alpha: 64
lora_target: q_proj,v_proj,k_proj,o_proj,gate_proj,up_proj,down_proj
lora_dropout: 0.05

quantization_bit: 4
quantization_method: bitsandbytes

dataset:
  - custom_domain_qa
  - alpaca_gpt4_zh
  - sharegpt_zh
dataset_dir: ./data
template: llama3
cutoff_len: 2048
overwrite_cache: true
preprocessing_num_workers: 8

output_dir: ./output/llama3-8b-domain-lora
logging_steps: 10
save_steps: 200
plot_loss: true
overwrite_output_dir: true

per_device_train_batch_size: 2
gradient_accumulation_steps: 8
learning_rate: 2.0e-4
num_train_epochs: 3
lr_scheduler_type: cosine
warmup_ratio: 0.1
bf16: true
tf32: true

val_size: 0.05
per_device_eval_batch_size: 2
eval_strategy: steps
eval_steps: 200

report_to: wandb
run_name: llama3-8b-qlora-domain-v1
\\\`\\\`\\`,
};

export default article;
