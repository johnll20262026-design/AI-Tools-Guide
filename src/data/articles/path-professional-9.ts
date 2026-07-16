import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-professional-9',
  title: 'AI 应用可观测性：LangSmith、LangFuse 与质量迭代闭环',
  description: 'LangSmith/LangFuse/Phoenix对比、Trace链路追踪、Token成本监控、准确率评估框架、Bad Case收集与迭代、用户反馈闭环。',
  date: '2026-05-25',
  readTime: '12-18 分钟',
  content: `## 技术背景与原理

传统软件的可观测性（Observability）围绕 Logs、Metrics、Traces 三大支柱构建，核心回答三个问题：哪里出错了（Logs）、系统是否健康（Metrics）、请求经过了哪些路径（Traces）。LLM 应用的可观测性在此基础上增加了一个新的核心维度：**质量（Quality）**——回答"这个回答好不好"、"有没有幻觉"、"用户满不满意"。这是因为 LLM 输出是概率性的、非确定性的，同样的输入可能产生不同质量的输出，传统的"跑通了就没问题"思维不再适用。

没有可观测性的 LLM 应用就像在黑夜里开车没有车灯——你可能偶尔到达目的地，但迟早会翻车。2026 年，LLM 可观测性已经成为生产级 AI 应用的标配设施：LangSmith 是 LangChain 官方推出的全链路追踪和评估平台，与 LangChain 生态深度集成；LangFuse 是开源的 LLM 可观测性平台，支持自托管、适合注重数据隐私的企业；Phoenix（Arize）是开源的 AI 可观测性和评估工具，在 RAG 和嵌入分析方面有独特优势。

LLM 应用可观测性的核心目标是形成闭环：**收集 Trace→ 分析 Bad Case → 定位根因 → 优化 Prompt/RAG/模型 → A/B 测试验证效果 → 上线监控**。这个闭环是 AI 应用持续迭代改进的基础，没有这个闭环，你的应用上线后只会越来越差（模型漂移、数据分布变化、用户反馈无法传导），而不是越来越好。

## 核心概念

### Trace 链路追踪

LLM 应用的一次用户请求可能涉及：用户输入→输入检测→RAG 检索→重排序→LLM 调用→工具调用→LLM 再次调用→输出生成→输出过滤，每个环节都有输入输出、耗时、Token 消耗。Trace 就是把这一整条链路记录下来，形成可回溯的调用树。关键要素：
- **Span**：链路中的一个原子操作（如一次 LLM 调用、一次检索、一次工具调用）。
- **Trace**：一次完整请求的所有 Span 组成的树状结构。
- **Metadata**：每个 Span 附带的元数据（模型名称、Token 用量、延迟、检索的文档片段、工具参数等）。

### Token 成本监控

LLM 调用成本直接与 Token 数量成正比，生产环境必须精细监控：
- **Prompt Tokens vs Completion Tokens**：分别计费，单价不同。
- **成本归因**：按用户、按功能模块、按模型版本、按时间维度统计成本。
- **异常检测**：单次请求 Token 数突增、某用户消耗量异常、成本环比突增等。

### 评估框架

离线评估和在线评估结合：
- **离线评估**：发布前在测试集上跑自动化评估，包括 LLM-as-Judge（用 GPT-5.5 打分）、RAGAS 指标（忠实度、相关性、上下文召回率）、嵌入相似度、规则检查。
- **在线评估**：上线后收集用户反馈（点赞/点踩、显式评分、隐式信号如是否复制回答、是否追问、会话时长）。
- **Bad Case 挖掘**：通过低评分、长会话、重复追问、用户投诉等信号自动筛选问题案例。

## 生产级代码示例

### LangFuse 集成（Python）

\\\`\\\`\\\`python
from langfuse import Langfuse
from langfuse.callback import CallbackHandler
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from datetime import datetime
import os

langfuse = Langfuse(
    public_key=os.getenv("LANGFUSE_PUBLIC_KEY"),
    secret_key=os.getenv("LANGFUSE_SECRET_KEY"),
    host=os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")
)

langfuse_handler = CallbackHandler(
    public_key=os.getenv("LANGFUSE_PUBLIC_KEY"),
    secret_key=os.getenv("LANGFUSE_SECRET_KEY"),
    host=os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com"),
    session_id=None,
    user_id=None,
    metadata={"environment": "production", "version": "v2.3.1"}
)

llm = ChatOpenAI(model="gpt-5.5", temperature=0.1)
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个专业客服，基于以下上下文回答问题：\\\\n{context}"),
    ("human", "{question}")
])
chain = prompt | llm | StrOutputParser()

def answer_question(question: str, context: str, user_id: str, session_id: str) -> str:
    langfuse_handler.user_id = user_id
    langfuse_handler.session_id = session_id
    langfuse_handler.metadata["request_timestamp"] = datetime.utcnow().isoformat()
    result = chain.invoke(
        {"context": context, "question": question},
        config={"callbacks": [langfuse_handler]}
    )
    return result

def record_user_feedback(trace_id: str, score: float, comment: str = ""):
    langfuse.score(
        trace_id=trace_id,
        name="user_satisfaction",
        value=score,
        comment=comment
    )

def get_daily_cost_report(days: int = 7):
    total_cost = 0
    model_costs = {}
    for day_offset in range(days):
        traces = langfuse.fetch_traces(
            from_timestamp=datetime.now() - timedelta(days=day_offset+1),
            to_timestamp=datetime.now() - timedelta(days=day_offset),
            limit=10000
        )
        for trace in traces.data:
            total_cost += trace.total_cost or 0
            model = trace.metadata.get("model", "unknown")
            model_costs[model] = model_costs.get(model, 0) + (trace.total_cost or 0)
    return {"total_cost": total_cost, "model_breakdown": model_costs}
\\\`\\\`\\`,
};

export default article;
