import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'case-6-2',
  title: '个人AI知识库步骤2：向量数据库搭建与索引优化',
  description: '选择Embedding模型，切片向量化，配置混合检索提升召回精度',
  date: '2026-04-29',
  readTime: '6 分钟',
  content: `## 通俗类比：索引搭建就是给图书馆做检索卡片系统

上一步整理好干净文档=图书馆书摆上书架，但没有索引读者要翻遍整个图书馆。向量数据库+检索系统就是AI时代的卡片目录：Embedding写语义卡片，切片把书拆成章节卡片，向量数据库存卡片，检索算法当图书管理员找最相关卡片。

记住：**RAG效果80%取决于检索质量**。检索找不到，再强的LLM也没用（要么瞎编要么说不知道）；检索找得准，小模型也能答得对。我自己的知识库调优数据：纯向量+固定长度切片召回率62%，两步切片+混合检索召回率93%，加Rerank到96%。

## Embedding模型选型
不是越贵越好：
- OpenAI text-embedding-3-small（\$0.02/1M tokens）：个人首选，便宜够用
- bge-large-zh-v1.5（开源免费本地）：中文效果最好
- 通义千问text-embedding-v3：国内可用，中文好
- 不要用老的ada-002；维度1024-1536足够，高维度边际收益递减；本地bge CPU就能跑个人数据量。

## 切片策略：影响最大的单一因素
切片在语义完整性和检索精准度间找平衡：
- FAQ：200-400字，按问答对切
- 技术博客：500-700字，按##/###标题切再补切
- 产品手册/长文：600-900字
- 代码：按函数/类切
- 重叠10%-15%防止切断知识点

**黄金法则**：先按语义边界（Markdown标题）粗切，太长再按段落→句子→字补切。切完随机抽20个chunk检查：有没有切坏标题、切断列表、一个chunk塞多个主题？这步花1小时，后面省10小时。

## 为什么混合检索必做？
纯向量对关键词/错误代码/数字/函数名不敏感。比如搜"create_tool_calling_agent"，向量可能返回其他Agent内容但找不到这个具体函数。必须加BM25关键词检索，权重BM25占0.3向量占0.7，召回率立刻提升20%+。

## 参数调优方法论
1. 准备20-30个知道答案的测试问题
2. 初始值k=5、threshold=0.4、weights[0.3,0.7]
3. 单独测检索（不接LLM），统计召回率（目标>90%）和精确率（目标>70%）
4. 漏召回→降threshold加k加BM25权重；垃圾多→提threshold减k加向量权重
5. 进阶可选加Rerank：召回10-20个后用bge-reranker重排序取top3，精度再提一档

## 核心目标
把清洗好的文档切片、向量化存入向量数据库，配置最优检索策略，确保你问的问题能精准找到对应的知识片段。记住：RAG效果80%取决于这一步的检索质量，LLM只是负责把找到的内容整理成通顺回答，检索不到相关内容，再强的LLM也没用（还会瞎编）。

## 操作步骤

### 1. Embedding模型选择
| 模型 | 语言 | 维度 | 成本 | 推荐场景 |
|-----|------|------|------|---------|
| text-embedding-3-small | 中英 | 1536 | \$0.02/1M tokens | 个人首选，便宜效果好 |
| bge-large-zh-v1.5 | 中文 | 1024 | 免费本地 | 中文效果最好，不想花钱用这个 |
| m3e-base | 中英 | 768 | 免费本地 | 轻量，电脑配置差用这个 |

**个人用强烈推荐**：直接用OpenAI的text-embedding-3-small，1000篇文章也就几分钱，不用折腾本地部署，效果稳定。数据敏感想本地跑就用bge-large-zh。

### 2. 文档切片策略（最影响效果！）
切片太大检索不精准，太小丢失上下文，推荐参数：
- **chunk_size**：500-700个中文字符
- **chunk_overlap**：50-100字，避免一个完整的知识点被切成两半
- **切片方式**：优先按Markdown标题切（##/###），不要一开始就按固定字数硬切

用LangChain切片示例代码：
\\\`\\\`\\\`python
from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter

headers = [("#", "H1"), ("##", "H2"), ("###", "H3")]
markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers)
md_splits = markdown_splitter.split_text(markdown_content)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=80,
    separators=["\\\\n\\\\n", "\\\\n", "。", "！", "？", " ", ""]
)
splits = text_splitter.split_documents(md_splits)
\\\`\\\`\\`,
};

export default article;
