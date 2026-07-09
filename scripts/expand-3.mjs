import fs from 'fs';
const articlesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/articles.ts';
let content = fs.readFileSync(articlesPath, 'utf-8');

// 扩写case-6-1
content = content.replace(
  `content: \`## 核心目标
把散落各处的知识整合去重清洗，形成干净数据源——垃圾进垃圾出，这步是基础。

## 操作步骤
1. 盘点所有数据源：Notion/Obsidian、浏览器书签、微信读书、PDF、本地Markdown
2. 全部统一导出为Markdown格式
3. Python脚本批量清洗：去空行、去广告、去重复标题
4. 去重、按主题分类、重要文件加标签/评分元数据
5. 抽查20篇确保质量：无乱码、格式正确、图片链接有效

## 避坑
- ❌ 不要追求完美整理完再开始，先出一版慢慢优化
- ❌ 不要什么都存，过时低质量直接删掉，知识库不是垃圾桶

## 预期效果
所有知识统一为干净Markdown，按主题分类，为向量化做好准备\`,`,
  `content: \`## 核心目标
把散落在Notion、Obsidian、浏览器书签、微信收藏、Kindle标注、本地文件里的所有知识全部整合起来，去重、清洗、格式化，形成干净可用的数据源——记住：垃圾进垃圾出，这一步是整个知识库的基础，基础打不好后面什么都白搭。

## 操作步骤

### 1. 数据源全面盘点（1天）
先列全你所有知识存放的地方，一个都不要漏：
- **笔记软件**：Notion、Obsidian、语雀、印象笔记、飞书文档、OneNote
- **浏览器**：Chrome/Edge书签（重点是收藏夹里吃灰的那些）、Pocket/Instapaper稍后读
- **阅读类**：微信读书划线和笔记、Kindle标注、得到笔记
- **文章收藏**：知乎收藏、公众号收藏、CSDN/掘金收藏
- **本地文件**：电脑里的PDF、课程笔记、Markdown文件、下载的电子书
- **其他**：邮件里的干货、聊天记录里收藏的重要信息、工作文档
列完你会惊讶原来自己存了这么多东西，但90%都没看过第二遍。

### 2. 统一导出为Markdown格式
所有内容统一转成Markdown，这是对RAG最友好的格式：
- Notion：右上角→导出→Markdown&CSV，会打包下载
- Obsidian：本身就是Markdown，直接用文件夹就行
- 微信读书：用"微信读书助手"浏览器插件导出划线和笔记
- PDF：推荐用Marker（开源AI工具）转，不要用纯文本提取，会丢格式和表格
- 网页：用简悦/SingleFile剪藏插件，保存为干净的Markdown
- 印象笔记/语雀：都有导出Markdown功能

### 3. Python批量清洗脚本
不要手动一篇篇改，写个Python脚本批量处理：
\`\`\`python
import os, re
from pathlib import Path

def clean_markdown(content):
    content = re.sub(r'\n{3,}', '\n\n', content)  # 去除多余空行
    content = re.sub(r'扫码关注.*?公众号.*?\n', '', content)  # 去公众号广告
    content = re.sub(r'本文由.*?授权发布.*?\n', '', content)  # 去版权声明
    content = re.sub(r'!\[.*?\]\(data:.*?\)', '', content)  # 去base64图片
    lines = content.split('\n')
    seen_titles = set()
    clean_lines = []
    for line in lines:
        if line.startswith('# ') and line in seen_titles:
            continue
        if line.startswith('# '):
            seen_titles.add(line)
        clean_lines.append(line)
    return '\n'.join(clean_lines)

input_dir = Path('raw_notes')
output_dir = Path('clean_notes')
output_dir.mkdir(exist_ok=True)
for file in input_dir.glob('**/*.md'):
    cleaned = clean_markdown(file.read_text(encoding='utf-8'))
    (output_dir / file.name).write_text(cleaned, encoding='utf-8')
\`\`\`

### 4. 去重分类与元数据
- **去重**：用Obsidian的"重复文件"插件，或者用Python算文件hash去掉完全重复的
- **分类**：按主题建文件夹，不要分太细，8-10个大类就行：技术/职场/理财/生活/AI/读书等
- **加元数据**：重要文件在开头加frontmatter：
  \`\`\`yaml
  ---
  tags: [AI, RAG, 教程]
  date: 2026-04-30
  source: 公众号/知乎/原创
  rating: 4  # 1-5星，5星最有价值
  ---
  \`\`\`

### 5. 质量检查清单
清洗完抽查20篇，确保：
✅ 没有乱码和奇怪符号
✅ 标题、列表、代码块格式基本正确
✅ 没有太短的无意义片段（<100字的直接删掉）
✅ 没有大量广告和无关内容
✅ 图片如果是本地路径确保存在，网络路径确保能访问

## 避坑指南
- ❌ 不要追求完美，不要试图"整理完再开始建知识库"，先出一版能用的，后面慢慢优化，你永远整理不完
- ❌ 不要什么都存，过时的、质量差的、你确定不会再看的直接删掉，知识库不是垃圾桶，存垃圾不如不存
- ❌ 不要分类太细，分100个文件夹等于没分类
- ✅ 这步花1-2天一次性做完，以后养成"随存随洗"的习惯，新内容进来当天就处理好

## 预期效果
所有知识统一为干净的Markdown文件，按主题分类，没有重复和垃圾内容，为后续向量化和RAG打好基础。\`,`
);

// 扩写case-6-2
content = content.replace(
  `content: \`## 核心目标
文档向量化存入数据库，配置检索策略，确保问的问题能找到对应内容。RAG效果80%取决于这步。

## 关键选择
- Embedding：个人用OpenAI text-embedding-3-small（便宜好用），中文优先bge-large-zh
- 切片：chunk 500-700字，overlap 50-100字，优先按Markdown标题切
- 数据库：个人用Chroma/Qdrant本地文件就行
- 检索：BM25关键词(0.3)+向量(0.7)混合检索，远好于纯向量

## 必做：检索测试
问问题看Top5结果是否相关，不好就调参数。90% RAG效果差是因为跳过了这步。

## 避坑
- ❌ chunk不要太大（>1000字不精准）
- ❌ 不要直接接LLM不做测试

## 预期效果
知识库中的问题80%概率召回相关内容\`,`,
  `content: \`## 核心目标
把清洗好的文档切片、向量化存入向量数据库，配置最优检索策略，确保你问的问题能精准找到对应的知识片段。记住：RAG效果80%取决于这一步的检索质量，LLM只是负责把找到的内容整理成通顺回答，检索不到相关内容，再强的LLM也没用（还会瞎编）。

## 操作步骤

### 1. Embedding模型选择
| 模型 | 语言 | 维度 | 成本 | 推荐场景 |
|-----|------|------|------|---------|
| text-embedding-3-small | 中英 | 1536 | $0.02/1M tokens | 个人首选，便宜效果好 |
| bge-large-zh-v1.5 | 中文 | 1024 | 免费本地 | 中文效果最好，不想花钱用这个 |
| m3e-base | 中英 | 768 | 免费本地 | 轻量，电脑配置差用这个 |

**个人用强烈推荐**：直接用OpenAI的text-embedding-3-small，1000篇文章也就几分钱，不用折腾本地部署，效果稳定。数据敏感想本地跑就用bge-large-zh。

### 2. 文档切片策略（最影响效果！）
切片太大检索不精准，太小丢失上下文，推荐参数：
- **chunk_size**：500-700个中文字符
- **chunk_overlap**：50-100字，避免一个完整的知识点被切成两半
- **切片方式**：优先按Markdown标题切（##/###），不要一开始就按固定字数硬切

用LangChain切片示例代码：
\`\`\`python
from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter

headers = [("#", "H1"), ("##", "H2"), ("###", "H3")]
markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers)
md_splits = markdown_splitter.split_text(markdown_content)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=80,
    separators=["\n\n", "\n", "。", "！", "？", " ", ""]
)
splits = text_splitter.split_documents(md_splits)
\`\`\`

### 3. 向量数据库选择
个人用最轻量方案，不要上来就搞分布式数据库：
- **Chroma**：最适合个人，本地文件存储，pip install就能用，零配置
- **Qdrant**：性能更好，也能本地跑，支持过滤
个人用Chroma完全够用，代码：
\`\`\`python
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=embeddings,
    persist_directory="./my_knowledge_db",
    collection_name="personal_notes"
)
\`\`\`

### 4. 配置混合检索（必做！）
纯向量检索有时候搜不到精确关键词（比如特定术语、代码命令），一定要加关键词检索（BM25）做混合检索，效果提升巨大：
\`\`\`python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

bm25_retriever = BM25Retriever.from_documents(splits)
bm25_retriever.k = 3
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.3, 0.7]  # 向量检索为主，关键词检索为辅
)
\`\`\`

### 5. 检索测试！这步不做等于白搭
不要直接把检索结果扔给LLM就完事，先单独测试检索效果：
\`\`\`python
query = "RAG怎么优化检索效果？"
results = ensemble_retriever.invoke(query)
for i, doc in enumerate(results):
    print(f"--- Result {i+1} from: {doc.metadata.get('source', '')}")
    print(doc.page_content[:300], "\n")
\`\`\`
问20-30个你知道答案的问题，看Top5结果里有没有相关内容。如果找不到，调整：chunk大小、k值、两个检索的权重、重新切片。90% RAG效果差都是因为跳过了这一步。

## 避坑指南
- ❌ chunk不要太大（>1000字会检索不精准，一个chunk里太多主题）
- ❌ chunk也不要太小（<200字上下文不全，LLM看不懂）
- ❌ 不要只用语义检索，一定要加BM25关键词检索
- ❌ 不要跳过检索测试直接接LLM，你都不知道找的内容对不对
- ✅ 切片的时候保留来源元数据（文件名、标题），后面回答时能溯源

## 预期效果
对于知识库中有的问题，Top5检索结果80%以上概率包含相关内容，为后续准确问答打好基础。\`,`
);

console.log('Replaced case-6-1, 6-2');
fs.writeFileSync(articlesPath, content, 'utf-8');
console.log('Saved...');
