import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-professional-6',
  title: '多 Agent 协作系统：AutoGen、CrewAI 与编排模式',
  description: 'AutoGen/CrewAI框架深度对比、Agent通信模式、任务分解与编排、冲突解决、状态共享、容错机制。',
  date: '2026-05-28',
  readTime: '12-18 分钟',
  content: `## 技术背景与原理

单 Agent 架构在处理复杂任务时很快会遇到能力瓶颈——一个 Agent 既要做规划、又要写代码、又要查资料、又要做审核，Prompt 会变得极其复杂，角色冲突严重，输出质量难以保证。2024-2026 年，多 Agent 协作（Multi-Agent Collaboration）成为解决复杂任务的主流范式：将一个大任务拆分为多个子任务，每个 Agent 专注于自己擅长的领域，通过消息通信和协调机制共同完成目标。这种"多个专家协作"的模式比"一个通才全干"更接近真实人类团队的工作方式。

多 Agent 系统的核心思想来源于分布式系统和组织管理学：
- **关注点分离**：每个 Agent 有明确的角色、职责、工具集和专业边界。
- **通信协议**：Agent 之间通过结构化消息传递信息，而不是共享内存。
- **编排模式**：谁负责分配任务、谁来协调冲突、谁做最终决策，需要明确的流程控制。
- **状态管理**：协作过程中的中间结果、任务状态、共享知识需要统一管理。

目前工业界主流的多 Agent 框架有两个：微软的 AutoGen 和开源社区的 CrewAI。两者设计哲学差异明显：AutoGen 更偏向灵活的对话驱动模式，Agent 之间可以自由对话、嵌套、人工介入；CrewAI 更偏向结构化的团队协作模式，定义了明确的角色、任务、流程（Sequential/Hierarchical），上手更简单。LangGraph 虽然是单 Agent 编排引擎，但也支持构建多 Agent 系统，适合需要精细控制流程的场景。

## 核心概念

### Agent 通信模式

1. **直接对话模式（Conversational）**：Agent 之间通过自然语言对话协商，AutoGen 的核心模式。灵活但不确定，适合探索性任务。
2. **中心化调度模式（Orchestrator-Worker）**：一个调度 Agent（Orchestrator）负责任务分解、分配、结果聚合，Worker Agent 执行具体子任务。CrewAI 的 Hierarchical 流程属于此类。
3. **流水线模式（Sequential/Pipeline）**：Agent 按固定顺序传递任务结果，A 的输出是 B 的输入。CrewAI 的 Sequential 流程。
4. **发布-订阅模式（Pub-Sub）**：Agent 订阅感兴趣的事件/消息类型，消息通过消息总线广播。适合复杂的实时协作场景。
5. **黑板模式（Blackboard）**：所有 Agent 共享一个公共知识库（黑板），Agent 观察黑板状态决定自己的行动。适合知识密集型协作。

### 任务分解策略

- **静态分解**：预先定义好任务结构和分配方式，适合流程固定的场景。
- **动态分解**：由 Planner Agent 根据任务复杂度动态拆解和分配，适合不确定性高的探索性任务。
- **协商式分解**：Agent 之间通过"投标"机制，谁适合谁主动认领任务。

## 生产级代码示例

### CrewAI 结构化团队实现

\\\`\\\`\\\`python
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool, ScrapeWebsiteTool
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-5.5", temperature=0.2)
search_tool = SerperDevTool()
scrape_tool = ScrapeWebsiteTool()

researcher = Agent(
    role="高级市场研究员",
    goal="针对指定主题进行全面深入的市场调研，收集最新、最准确的信息",
    backstory="""你是一位拥有10年经验的市场研究员，擅长科技行业分析。
    你做研究时非常严谨，所有数据都要标注来源和时间。
    你不会满足于表面信息，会从多个角度交叉验证信息的准确性。
    你做调研的风格是先广度搜索，再深度挖掘关键问题。""",
    tools=[search_tool, scrape_tool],
    llm=llm,
    verbose=True,
    allow_delegation=False
)

analyst = Agent(
    role="数据分析师",
    goal="基于调研数据进行深度分析，提炼洞察，形成结构化结论",
    backstory="""你是一位资深数据分析师，擅长从繁杂信息中提炼有价值的洞察。
    你的分析逻辑严谨，结论都有数据支撑。
    你擅长用对比、分类、归因等分析方法。
    你会主动指出数据中的矛盾和不确定性。""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

writer = Agent(
    role="技术报告撰稿人",
    goal="将分析结果撰写为结构清晰、专业可读的研究报告",
    backstory="""你是一位资深科技撰稿人，曾在多家顶级科技媒体任职。
    你的写作风格专业但不晦涩，逻辑清晰，重点突出。
    你擅长将复杂的技术概念用通俗易懂的语言解释。
    你写的报告结构严谨，有执行摘要、核心发现、详细分析、风险提示、结论建议。""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

reviewer = Agent(
    role="质量审核专家",
    goal="审核报告的准确性、完整性、逻辑性，指出问题并提出改进建议",
    backstory="""你是一位严谨的质量审核专家，眼光毒辣。
    你会检查：1)事实错误 2)逻辑漏洞 3)数据不一致 4)表述歧义 5)缺失的重要视角。
    你的审核意见具体、可操作，不会只说"写得不好"。""",
    llm=ChatOpenAI(model="gpt-5.5", temperature=0.0),
    verbose=True,
    allow_delegation=True
)

research_task = Task(
    description="""针对{topic}进行全面的市场调研，重点收集：
    1. 市场规模和增长趋势（2024-2026年数据）
    2. 主要玩家和竞争格局（至少5家代表性公司）
    3. 核心技术路线和最新进展
    4. 典型应用场景和商业化案例
    5. 政策环境和监管动态
    所有信息标注来源，信息截止到2026年5月。""",
    agent=researcher,
    expected_output="一份详细的调研笔记，包含事实、数据、来源链接，3000字以上"
)

analysis_task = Task(
    description="基于研究员提供的调研笔记，进行深度分析：
{research_output}

重点分析：1)市场机会与风险 2)竞争格局关键变量 3)技术发展趋势判断 4)进入壁垒和关键成功因素",
    agent=analyst,
    expected_output="结构化的分析框架和核心洞察，1500字以上",
    context=[research_task]
)

writing_task = Task(
    description="基于调研和分析，撰写完整研究报告。结构：执行摘要→市场概述→竞争格局→技术分析→应用场景→风险与挑战→结论建议",
    agent=writer,
    expected_output="一份完整的专业研究报告，5000字左右，Markdown格式",
    context=[research_task, analysis_task]
)

review_task = Task(
    description="审核这份研究报告，指出所有问题并给出具体修改建议：
{draft_report}",
    agent=reviewer,
    expected_output="审核意见清单，按严重程度排序，每条意见包含位置、问题描述、修改建议",
    context=[writing_task]
)

crew = Crew(
    agents=[researcher, analyst, writer, reviewer],
    tasks=[research_task, analysis_task, writing_task, review_task],
    process=Process.sequential,
    verbose=True,
    memory=True,
    max_rpm=30
)

result = crew.kickoff(inputs={"topic": "2026年AI Agent开发框架市场"})
\\\`\\\`\\`,
};

export default article;
