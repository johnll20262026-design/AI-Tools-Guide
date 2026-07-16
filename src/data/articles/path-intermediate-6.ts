import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-intermediate-6',
  title: 'RAG入门：检索增强生成原理与代码实现',
  description: '理解RAG核心原理，掌握文档加载与切片、Embedding模型选择、向量数据库使用、检索策略优化，并实现完整RAG代码。',
  date: '2026-06-05',
  readTime: '8-12 分钟',
  content: `## RAG的价值：给AI装上"外接大脑"

大模型有两个硬伤：第一，知识有截止日期（比如GPT-5.5训练数据截止到2024年中，不知道之后发生的事）；第二，它不知道你的私有信息——公司内部文档、产品手册、你的笔记、聊天记录。你不能把这些私有数据拿去微调模型（成本高、更新麻烦），也不能每次问问题都把所有文档贴进Prompt（太长塞不下）。

RAG（Retrieval-Augmented Generation，检索增强生成）就是解决这个问题的黄金方案。简单说：你提问的时候，系统先从你的文档库里"检索"出最相关的几段内容，然后把这些内容和你的问题一起丢给大模型，让它基于这些检索到的信息回答。这就像给AI装了一个可以随时查阅的"外接大脑"——你给它什么资料，它就能用什么资料回答，信息实时更新，不用重新训练模型。

RAG是目前企业级AI应用最主流的技术方案，也是AI开发者必须掌握的核心技能。这篇文章我们从原理到代码，彻底搞懂RAG并动手实现一个可用版本。

## 核心技术原理

一个完整的RAG系统分为两个阶段：索引阶段（离线处理文档）和查询阶段（在线回答问题）。

### 索引阶段
1. **文档加载**：读取各种格式的文档（PDF、Word、Markdown、网页、数据库等）
2. **文档切片（Chunking）**：把长文档切成小段（chunk），因为Embedding模型和大模型都有长度限制
3. **Embedding向量化**：把每个文本chunk转成一个向量（一串数字），向量的距离代表语义相似度
4. **存入向量数据库**：把这些向量和对应的原文存起来，建立索引以便快速检索

### 查询阶段
1. **问题向量化**：把用户的问题也转成向量
2. **相似度检索**：在向量数据库里找和问题向量最相似的top-k个文本chunk
3. **构建Prompt**：把检索到的相关文本和问题拼在一起，告诉大模型"基于这些信息回答"
4. **LLM生成回答**：大模型基于给定的上下文生成答案，还可以附上引用来源

### Embedding是什么？
Embedding就是把文本转换成一串浮点数（向量），语义相近的文本在向量空间里距离也近。比如"苹果手机"和"iPhone"的向量距离很近，但和"香蕉"的距离就远。常用的中文Embedding模型：
- 开源：bge-large-zh-v1.5（中文效果好）、m3e-base、Qwen3-14B-Instruct也可以做Embedding
- 商用：OpenAI text-embedding-3-small/large（便宜稳定）、Cohere Embedding

选Embedding模型的原则：(1) 语言匹配（中文场景选专门优化过中文的）；(2) 维度合适，不是越高越好；(3) 检索和生成用的Embedding模型要一致。

### 向量数据库
向量数据库专门用来存向量和快速做相似度搜索。轻量级用Chroma（嵌入式，适合小项目）、FAISS（Facebook开源的向量检索库），生产级用Pinecone、Weaviate、Milvus、Qdrant（支持分布式、高性能、可扩展）。入门学习用Chroma最方便，pip install就能用。

## 实战操作：用Python实现一个简单RAG
我们用LangChain（或者LlamaIndex，但LangChain更灵活）+ Chroma + OpenAI来写一个可以跑的RAG系统。

### 第一步：安装依赖
\\\`\\\`\\\`bash
pip install langchain langchain-openai langchain-community chromadb pypdf python-dotenv
\\\`\\\`\\`,
};

export default article;
