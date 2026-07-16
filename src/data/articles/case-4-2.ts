import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'case-4-2',
  title: 'AI Agent 实战（二）：知识库构建与向量化',
  description: '手把手教你收集清洗文档、切片策略、Embedding模型选择，用LangChain+Chroma实现文档导入向量化，附完整Python代码。',
  date: '2026-05-07',
  readTime: '15-20 分钟',
  related: ['case-4-1', 'case-4-3', 'deploy-4', 'agent-4'],
  content: `## 知识库构建与向量化：从一堆文档到可智能检索的 RAG 系统

很多人搭建 RAG 知识库时以为"把文档往向量库一扔"就完事了，结果一测试发现 AI 回答驴唇不对马嘴：用户问的是"7天无理由退款的具体条件是什么"，AI 却在回答发货流程；问具体的技术参数，AI 开始一本正经地胡说八道（幻觉）；问A问题，回答的是B文档的内容。这不是大模型不够聪明，而是你的知识库构建环节出了问题。

知识库和向量化是整个 RAG 系统最核心的基础，文档怎么解析、怎么清洗噪音、怎么切块（Chunking）、用什么 Embedding 模型、怎么存储和检索，每一个环节的决策都直接影响最终回答质量。这篇文章把知识库构建的每一步拆开讲透，包括工具选择、参数调优、代码实现、常见坑点和效果验证方法。

## 一、知识库构建总览：七个关键步骤

一个高质量的知识库绝对不是简单的"文档→向量→存储"三步，而是包含以下七个环环相扣的环节：

'''
文档采集 → 格式解析 → 内容清洗 → 智能分块 → 元数据标注 → 向量化 → 存储与索引
'''

每一步都有讲究，任何一步做不好都会导致最终检索质量大幅下降。根据我们的项目经验，大多数人在"智能分块"和"向量化"这两步踩坑最多，这两步也是对最终效果影响最大的环节。

## 二、格式解析：不同文档类型的正确处理方式

你收集的文档有各种格式：Markdown笔记、PDF产品手册、Word需求文档、Excel数据表、HTML网页、PPT演示文稿。不同格式需要不同的解析策略，用错工具或者不做特殊处理会导致解析出来的文本乱序、缺失、充满噪音。

| 格式 | 推荐工具 | 注意事项 | 常见坑 |
|------|---------|---------|--------|
| Markdown/TXT | Python 直接读取 | 最简单，注意保留标题层级结构 | 编码问题（UTF-8 with BOM） |
| PDF | PyMuPDF(fitz)、pdfplumber、Unstructured | 表格、双栏布局、扫描件、水印 | 双栏文字混排、扫描件无文字层、表格错位 |
| Word(docx) | python-docx、docx2txt | 图片无法提取，注意样式标签 | 嵌套表格解析乱、嵌入对象丢失 |
| Excel/CSV | pandas + openpyxl | 结构化数据建议单独处理 | 合并单元格导致空值、跨表关联 |
| 网页HTML | BeautifulSoup、trafilatura、readability-lxml | 必须剥离导航、广告、评论、页脚 | 正文抽取不准、动态渲染内容拿不到 |
| PPTX | python-pptx | 提取每页文本和备注 | 文本框顺序混乱、图表文字无法提取 |

### PDF 解析是重灾区

PDF 是企业里最常见的文档格式，但也是最难处理好的格式，因为 PDF 本质上是"打印格式"而不是"编辑格式"，它不关心文字的语义结构，只关心每个字在页面上的坐标位置。

'''python
import fitz  # PyMuPDF，速度快、控制精细

def extract_pdf_text(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        blocks = page.get_text("blocks")
        text_blocks = []
        for b in blocks:
            if b[6] == 0:  # 0=文本块, 1=图片块
                text = b[4].strip()
                if text and len(text) > 5:
                    # b格式: (x0, y0, x1, y1, text, block_no, block_type)
                    text_blocks.append({
                        "text": text, "y": b[1], "x": b[0],
                        "bbox": (b[0], b[1], b[2], b[3])
                    })
        # 按y坐标分组，同一行按x坐标排序（解决双栏布局问题）
        text_blocks.sort(key=lambda t: (round(t["y"]/15)*15, t["x"]))
        pages.append({
            "page": page_num + 1,
            "text": "\\\\n".join([t["text"] for t in text_blocks])
        })
    doc.close()
    return pages
'''

**PDF 解析常见坑点与解决方案**：
- **扫描件 PDF**：没有文字层，必须用 OCR。中文推荐 PaddleOCR（效果最好，开源免费），英文可以用 Tesseract
- **双栏论文/手册**：直接提取文字会左右栏混在一起读不通，需要按坐标分栏处理，上面的代码用 y 坐标粗粒度分桶再按 x 排序就是简单的解决方案
- **表格**：PDF 表格提取是老大难问题，推荐用 camelot 或 tabula-py 专门提取表格，不要指望普通文本提取能处理好表格
- **页眉页脚水印**：这些内容会出现在每一页，污染正文。按位置过滤（y坐标在页面顶部和底部 5% 区域），或者用正则匹配常见模式（页码、版权声明、保密标识）

## 三、内容清洗：垃圾进垃圾出

原始文档解析出来后有大量噪音，如果不清洗直接分块入库，检索时会匹配到很多毫无意义的碎片。

'''python
import re

def clean_text(text):
    text = text.replace('\\\\r\\\\n', '\\\\n').replace('\\\\r', '\\\\n')
    text = re.sub(r'第\\\\s*\\\\d+\\\\s*页\\\\s*/\\\\s*共\\\\s*\\\\d+\\\\s*页', '', text)
    text = re.sub(r'^\\\\s*\\\\d+\\\\s*\$', '', text, flags=re.MULTILINE)
    text = re.sub(r'(?i)confidential|保密|内部资料|copyright.*?\\\\d{4}|all rights reserved', '', text)
    text = re.sub(r'\\\\n{3,}', '\\\\n\\\\n', text)
    text = re.sub(r'[ \\\\t]+', ' ', text)
    text = re.sub(r'^[ \\\\t]+', '', text, flags=re.MULTILINE)
    text = re.sub(r'[\\\\u200b\\\\ufeff\\\\xa0\\\\u2003\\\\u2002\\\\u2009]', ' ', text)
    text = re.sub(r'#{1,6}\\\\s*', '', text)
    return text.strip()
'''

**需要清洗的常见噪音**：
- 页眉（公司Logo、文档名称、章节名重复出现在每一页）
- 页脚（页码、版权声明、保密标识、打印日期）
- 水印文字（"内部资料""机密""草稿"）
- 多余空白（3个以上连续空行、行首缩进空格、零宽空格）
- Markdown残留符号（# 标题符号在纯文本中没有意义）
- 目录页和索引页（大量短行+页码，没有实质内容）

## 四、智能分块：对 RAG 质量影响最大的环节

分块（Chunking）是整个知识库构建中最重要的环节，也是最多人做错的环节。块太大，检索时一个块里包含太多不相关的内容，噪音大；块太小，语义被切断，AI 看不到完整的上下文。没有万能的"最佳块大小"，需要根据你的文档类型、Embedding模型、语言特性进行调整。

### 五种分块策略对比

| 分块策略 | 实现方式 | 优点 | 缺点 | 推荐场景 |
|---------|---------|------|------|---------|
| 固定字符分块 | 按字符数硬切，加50-100字重叠 | 最简单、稳定、可预测 | 经常切断句子和语义 | 不推荐作为主要策略 |
| 按段落分块 | 按 \\\\n\\\\n（双换行）切分 | 自然语义边界，实现简单 | 段落长度差异大，有的段落太长 | Markdown文档、文章 |
| 按标题分块 | 按 Markdown 标题层级（# ## ###）切分 | 语义最完整，每块有主题 | 需要文档有良好结构 | 结构化文档、技术文档 |
| 递归分块 | LangChain的RecursiveCharacterTextSplitter | 兼顾结构和大小，智能选择切分点 | 比固定分块稍复杂 | **生产环境默认推荐** |
| 语义分块 | 先做句子嵌入，在语义变化处分块 | 语义最连贯 | 计算量大、速度慢 | 高质量要求的小规模知识库 |

### 生产环境推荐：递归字符分块

这是经过大量项目验证最稳妥的默认策略，LangChain 已经提供了成熟实现：

'''python
from langchain.text_splitter import RecursiveCharacterTextSplitter

def create_chunks(text, metadata, chunk_size=500, chunk_overlap=50):
    splitter = RecursiveCharacterTextSplitter(
        separators=["\\\\n\\\\n", "\\\\n", "。", "！", "？", "；", "，", " ", ""],
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
    )
    chunks = splitter.create_documents([text], metadatas=[metadata])
    return [{"content": c.page_content, "metadata": c.metadata} for c in chunks]
'''

**关键参数调优指南**：
- **chunk_size（块大小）**：中文场景强烈建议 300-500 字（大约对应 200-400 tokens），比英文场景小 30-40%，因为中文信息密度更高，一个字携带的信息量比英文一个单词多。OpenAI 的 text-embedding-3-small 虽然支持 8191 tokens，但最佳检索质量通常在 200-500 tokens 的块大小区间，太大反而引入噪音。
- **chunk_overlap（块重叠）**：通常设为 chunk_size 的 10-20%（50-100字），目的是防止一个完整的语义单元（比如一个步骤、一个论点）刚好被切分边界切断，重叠区域保证上下文连贯性。
- **separators（分隔符列表）**：顺序非常重要，优先在最大的语义边界（双换行=段落）切分，段落太长就降级到单换行（标题、列表项），再降级到句号（完整句子），最后才在字符边界硬切。

### Markdown 专用：按标题层级分块

对于结构良好的 Markdown 技术文档，按标题分块效果最好，因为每个章节天然就是一个语义完整的单元：

'''python
from langchain.text_splitter import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter

def chunk_markdown(md_text, metadata):
    headers = [("#", "h1"), ("##", "h2"), ("###", "h3")]
    md_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers)
    splits = md_splitter.split_text(md_text)
    recursive = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    all_chunks = []
    for split in splits:
        if len(split.page_content) > 800:
            sub_chunks = recursive.create_documents(
                [split.page_content], metadatas=[{**metadata, **split.metadata}])
            all_chunks.extend(sub_chunks)
        else:
            split.metadata = {**metadata, **split.metadata}
            all_chunks.append(split)
    return [{"content": c.page_content, "metadata": c.metadata} for c in all_chunks]
'''

### 分块质量检查清单（必做）

分完块之后，随机抽取 20 个 chunks 人工检查，确认以下几点：
- [ ] 每个块读起来是完整的语义，不是读了上句没下句的半截话
- [ ] 一个完整的步骤、论点、代码示例没有被切断
- [ ] 列表项（有序/无序）保持完整，不会一半在这个块一半在下个块
- [ ] 代码块完整保留（一段代码不应该被切成两半）
- [ ] 没有大量只有标题没有内容的空块
- [ ] 块长度分布合理，不要出现 50字的碎片和 1000字的超长块

## 五、元数据标注：让检索准确率再上一个台阶

光有文本向量不够，丰富的元数据能让检索准确率提升 30% 以上，是投入产出比极高的优化手段。每个 chunk 应该附带这些信息：

'''python
def build_metadata(source_path, title, category, tags, created_at, **extra):
    return {
        "source": source_path,
        "title": title,
        "category": category,
        "tags": ",".join(tags),
        "created_at": created_at,
        "chunk_type": "text",
        "importance": 1,
        **extra
    }
'''

**元数据的四个核心价值**：
1. **预过滤检索**：用户问退款问题，先按 category="售后政策" 过滤，再做向量检索，避免检索到无关的产品介绍或合同条款，准确率大幅提升
2. **溯源引用**：AI 回答时标注来源（"根据《2026年售后政策手册》第3页..."），大幅提升用户信任感，也方便用户验证
3. **时效性加权**：根据 created_at 判断信息是否过期，越新的文档在排序时适当加权
4. **按重要性排序**：核心产品文档 importance=2，会议纪要 importance=1，草稿 importance=0.5

## 六、向量化：Embedding 模型选择与批量处理

把文本块转换成向量（Embedding）是连接"文字"和"语义检索"的桥梁，模型选择直接影响检索质量。

### 主流 Embedding 模型对比（2026年）

| 模型 | 维度 | 中文效果 | 速度 | 成本 | 适用场景 |
|------|------|---------|------|------|---------|
| text-embedding-3-small | 1536 | 良好 | 极快 | \$0.02/1M tokens | **默认推荐**，性价比最高 |
| text-embedding-3-large | 3072 | 优秀 | 中 | \$0.13/1M tokens | 高质量要求、预算充足 |
| bge-large-zh-v1.5 (BAAI) | 1024 | 很好 | 快(本地) | 免费 | 中文为主、可本地部署 |
| m3e-base | 768 | 好 | 快(本地) | 免费 | 轻量本地部署、资源受限 |
| Cohere embed-multilingual-v3 | 1024 | 好 | 中 | \$0.10/1M | 多语言场景 |

**选择建议**：
- 英文为主选 OpenAI text-embedding-3-small，中文为主且可以本地部署选 bge-large-zh-v1.5
- **重要警告**：不同 Embedding 模型的向量空间完全不兼容！千万不要在同一个向量库里混用不同模型生成的向量，否则检索结果会完全混乱。
- 维度不是越高越好，3-large 维度是 small 的两倍，存储和计算成本也翻倍，但效果提升可能只有 5-10%，需要权衡

### 批量向量化代码（带重试和速率限制）

'''python
from openai import OpenAI
import time
from tqdm import tqdm

client = OpenAI()

def embed_texts(texts, model="text-embedding-3-small", batch_size=100):
    all_embeddings = []
    for i in tqdm(range(0, len(texts), batch_size), desc="向量化"):
        batch = texts[i:i+batch_size]
        for attempt in range(3):
            try:
                response = client.embeddings.create(
                    model=model, input=batch, encoding_format="float"
                )
                batch_emb = [e.embedding for e in response.data]
                all_embeddings.extend(batch_emb)
                break
            except Exception as e:
                if attempt == 2:
                    raise RuntimeError(f"批次 {i} 3次重试后仍然失败: {e}")
                wait = 2 ** attempt
                print(f"错误: {e}, {wait}秒后重试...")
                time.sleep(wait)
    return all_embeddings
'''

## 七、向量存储与检索优化

### 向量数据库选择

| 方案 | 类型 | 规模上限 | 优点 | 适用场景 |
|------|------|---------|------|---------|
| Chroma | 本地/嵌入式 | 百万级chunks | 最简单、零配置 | 原型开发、小型项目 |
| FAISS | 本地库 | 千万级 | Meta开源、速度极快 | 本地高性能检索 |
| Qdrant | 本地/云 | 亿级 | Rust写的、开源、过滤强 | **开源生产推荐** |
| Pinecone | 云服务 | 亿级+ | 全托管、免运维 | 企业级、不想运维 |
| Milvus | 本地/云 | 亿级+ | 国产开源、功能全 | 大规模企业部署 |
| pgvector | PG扩展 | 百万级 | 用现有PostgreSQL | 已经在用PG的团队 |

### 混合检索：比单纯换模型更重要

单纯的向量相似度检索是最基础的方案，生产环境一定要用混合检索——向量检索擅长语义匹配（"怎样让电脑跑快点"能匹配到"系统性能优化"），BM25关键词检索擅长精确匹配专有名词、代码、错误码、产品型号，两者结合效果远超单一检索方式：

'''python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

def create_hybrid_retriever(vector_store, all_chunks):
    vector_retriever = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 8, "fetch_k": 20, "lambda_mult": 0.7}
    )
    bm25_retriever = BM25Retriever.from_texts(
        texts=[c["content"] for c in all_chunks],
        metadatas=[c["metadata"] for c in all_chunks],
        k=5
    )
    return EnsembleRetriever(
        retrievers=[vector_retriever, bm25_retriever],
        weights=[0.7, 0.3]
    )
'''

**五个立竿见影的检索优化技巧**：
1. **用 MMR 而非纯相似度**：Maximal Marginal Relevance 算法在选结果时兼顾相关性和多样性，避免返回一堆内容几乎相同的冗余块
2. **混合检索加权融合**：向量检索权重0.7，BM25关键词权重0.3，是一个比较稳健的起始点
3. **元数据预过滤**：检索前先按 category、tags、时间范围过滤，减少无关文档干扰
4. **Rerank 重排序**：先检索出 20 个候选块，再用 Cross-Encoder 模型（如 bge-reranker-v2-m3）精排取 top 5，准确率通常能提升 15-25%
5. **查询改写扩展**：用户的原始问题可能太简短或表述不清，先用 LLM 把问题改写/扩展成 2-3 个不同角度的查询，分别检索后合并结果

## 八、知识库质量验证：上线前必须做的测试

知识库搭建完、向量入库了，不要急着接 LLM。准备 50-100 个测试问题（覆盖常见问题、边界问题、长尾问题），每个问题人工标注"应该检索到哪些文档"，然后运行检索计算指标：

- **Recall@5（召回率）**：正确文档出现在前5个检索结果中的比例，目标 > 90%
- **MRR（Mean Reciprocal Rank）**：正确文档出现位置的平均倒数，目标 > 0.7
- **nDCG@5**：考虑排序位置的综合指标，目标 > 0.8

如果这些指标不达标，不要急着调 Prompt 或换 LLM，回到分块和Embedding环节找问题。**知识库的质量决定了整个RAG系统的上限**，在知识库没做好之前，优化Prompt、换模型、加Agent框架都是事倍功半。花一周时间把知识库质量打磨到位，比花一个月调其他环节效果都好。`,
};

export default article;
