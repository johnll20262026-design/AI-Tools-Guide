import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-professional-3',
  title: 'LangChain/LlamaIndex 深度对比与生产实践',
  description: '两个框架定位差异、核心抽象对比、选型建议、生产环境注意事项、可观测性、回调与追踪。',
  date: '2026-05-31',
  readTime: '15-20 分钟',
  content: `## 框架选型：为什么这是LLM应用开发最重要的第一个决定？

你要开始做一个LLM应用，第一个问题不是"用GPT-5.5还是Claude Sonnet 5"，而是"用LangChain还是LlamaIndex，还是直接裸写API？"。这个决定对你未来3-6个月的开发效率、维护成本、可扩展性影响极大——选对了框架，事半功倍；选错了，半年后你会发现自己在跟框架搏斗，写了一堆hack绕过框架限制，最后恨不得推倒重来。

根据2026年LLM应用开发生态调查报告，目前主流LLM应用框架的市场份额大概是：**LangChain（含LangGraph）约45%、LlamaIndex约25%、裸写API/自研框架约20%、其他框架（AutoGen/CrewAI/Llama.cpp等）约10%**。两个框架都有庞大的用户群、活跃的社区、丰富的生态，但它们的设计哲学、核心抽象、擅长场景差异非常大——没有绝对的好坏，只有适不适合你的场景。

很多新手上来就问"LangChain和LlamaIndex哪个好？"，这是个错误的问题。正确的问题是："我的应用场景是什么？哪个框架的抽象更匹配我的需求？" 就像你不会问"锤子和螺丝刀哪个好"——取决于你要钉钉子还是拧螺丝。

这篇文章我会从设计哲学、核心抽象、RAG实现、Agent能力、生产体验、性能开销等多个维度做深度对比，给你明确的选型建议，并且讲清楚生产环境中这两个框架的"坑"和最佳实践——这些是官方文档不会告诉你的实战经验。

## 设计哲学差异：根上的不同决定了一切

理解两个框架的差异，首先要理解它们为什么被创造出来——它们的诞生目的完全不同，设计哲学从第一天就不一样。

### LangChain：从"Chain"到"Agent"，通用编排框架
LangChain诞生于2022年底，最初的定位是"把LLM和其他组件串联起来的胶水框架"——Chain（链）就是它的名字来源：Prompt模板→LLM调用→输出解析，这就是一个最简单的链。后来随着Agent概念的兴起，LangChain逐渐进化成一个通用的LLM应用编排框架，它的目标是：**不管你做什么类型的LLM应用——RAG、Agent、工作流、摘要、翻译——都能用LangChain搭出来**。

LangChain的设计哲学是"乐高积木"：提供大量标准化的组件（Model I/O、Retrieval、Agents、Tools、Memory、Callbacks），你可以像搭积木一样把这些组件组合起来搭出任意复杂的应用。它的抽象层次比较高，通用性极强，什么都能做，但代价是——抽象泄漏比较严重，简单的事情可能被它搞得很复杂，调试起来不透明。

LangChain生态非常完整：
- **LangChain Core**：核心抽象和接口（LCEL表达式语言、Runnable协议）
- **LangChain Community**：第三方集成（几百个模型、向量库、工具的集成）
- **LangGraph**：2024年推出的新一代图编排引擎，支持循环、分支、状态管理，现在是Agent和复杂工作流的首选
- **LangSmith**：官方可观测性平台，调试、追踪、评估一站式解决
- **LangServe**：一键把Chain部署成REST API

### LlamaIndex：专注于"数据连接"，RAG之王
LlamaIndex（最初叫GPT Index）诞生比LangChain稍早一点，它从第一天起目标就非常明确：**解决"你的私有数据怎么跟LLM连接"这个问题**——也就是RAG（检索增强生成）。它的名字里的Index就是核心：帮你把各种数据源（PDF、Word、数据库、Notion、Slack）建立索引，然后让LLM能查询这些数据。

LlamaIndex的设计哲学是"开箱即用的RAG专家"：它把RAG的每一个环节（数据加载、分块、索引、检索、重排、查询）都做了深度优化，提供大量高级RAG特性（分层索引、混合检索、递归检索、路由查询、查询转换），如果你主要做RAG应用，用LlamaIndex很多时候几行代码就能实现LangChain要写很多代码才能实现的高级功能。

LlamaIndex的生态也在扩展，但始终围绕数据：
- **LlamaIndex Core**：核心索引和查询抽象
- **LlamaHub**：数百个数据加载器（Data Connectors）
- **LlamaParse**：专门做复杂文档解析（PDF、表格、图片）的商业服务
- **LlamaIndex Workflows**：2025年新推出的事件驱动工作流编排
- **LlamaCloud**：托管的RAG云服务

简单总结：
- 如果你做的是**通用Agent、多工具调用、复杂工作流、需要跟很多外部系统交互**，优先考虑LangChain/LangGraph
- 如果你做的是**RAG为主的应用、知识库问答、文档处理、主要跟私有数据打交道**，优先考虑LlamaIndex
- 如果你做的东西很简单、对性能要求极高、不想被框架抽象束缚，直接裸写OpenAI/Anthropic SDK可能是更好的选择

## 核心抽象对比——理解这些就理解了两个框架

框架的本质就是抽象。理解了核心抽象，你就理解了整个框架怎么运作，遇到问题知道往哪找。

### LangChain的核心抽象：Runnable + LCEL
LangChain现在（0.2+版本）的核心抽象是**Runnable协议**和**LCEL（LangChain Expression Language）**，这是它最核心的设计，所有组件都实现了Runnable接口，可以用统一的方式组合和调用。

一个Runnable就是"任何可以被调用的东西"——Prompt模板是Runnable、LLM是Runnable、输出解析器是Runnable、整个Chain也是Runnable。它们都有统一的接口：
- \\\`.invoke(input)\\\`：同步调用一次
- \\\`.stream(input)\\\`：流式输出
- \\\`.batch(inputs)\\\`：批量处理
- \\\`.ainvoke/.astream/.abatch\\\`：异步版本

你可以用管道符\\\`|\\\`把Runnable串起来，就像Linux管道或者Unix命令一样，这就是LCEL：
\\\`\\\`\\\`python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_template("给我讲一个关于{topic}的笑话")
model = ChatOpenAI(model="gpt-5.5")
parser = StrOutputParser()

# 用LCEL把三个组件串成一条链，像搭乐高
chain = prompt | model | parser

# 直接调用
result = chain.invoke({"topic": "程序员"})
print(result)
\\\`\\\`\\`,
};

export default article;
