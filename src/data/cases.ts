// EXPORTS: MOCK_CASES

import type { ICaseItem } from '@/types/tutorial';

export const MOCK_CASES: ICaseItem[] = [
  {
    id: '1',
    title: 'AI 编程助手实战：从零搭建全栈博客系统',
    tools: ['Cursor', 'GitHub Copilot', 'Claude Code'],
    description:
      '从零搭建一个全栈博客系统，全程使用 AI 编程助手完成需求分析、代码生成、调试与部署，效率提升 5 倍。',
    tag: 'AI编程',
    steps: [
      {
        step: 1,
        title: '环境准备与 AI 编程工具配置',
        description: '安装 Cursor IDE，配置 GitHub Copilot 和 Claude Code 插件，搭建 Node.js + React + PostgreSQL 开发环境，确保 AI 助手能正确读取项目上下文。',
      },
      {
        step: 2,
        title: '用 AI 生成需求文档与数据库设计',
        description: '使用 Claude Code 分析博客系统的功能需求，自动生成 PRD 文档和 ER 图，AI 辅助设计 users、posts、comments 三张核心表结构。',
      },
      {
        step: 3,
        title: 'AI 驱动的前后端代码生成',
        description: '在 Cursor 中用自然语言描述 API 接口和 React 组件，AI 自动生成 RESTful 路由、Prisma ORM 模型、以及带 Tailwind 样式的页面组件。',
      },
      {
        step: 4,
        title: 'AI 辅助调试与测试用例编写',
        description: '遇到 bug 时直接将错误信息粘贴给 Copilot，AI 定位根因并给出修复方案；同时用 AI 批量生成 Jest 单元测试和 Playwright E2E 测试。',
      },
      {
        step: 5,
        title: '一键部署与 CI/CD 配置',
        description: '用 AI 生成 Dockerfile 和 GitHub Actions 工作流，配置 Vercel 自动部署，实现 git push 后自动构建发布，全程零手动运维。',
      },
    ],
  },
  {
    id: '2',
    title: 'AI 绘画创意工作流：品牌视觉设计全流程',
    tools: ['Midjourney', 'Stable Diffusion', 'ComfyUI'],
    description:
      '用 AI 绘画工具完成品牌视觉设计全流程：从灵感收集、风格探索到最终交付稿，覆盖电商、海报、IP 形象等场景。',
    tag: 'AI绘画',
    steps: [
      {
        step: 1,
        title: '搭建 AI 绘画工具链',
        description: '注册 Midjourney 并加入 Discord，本地部署 Stable Diffusion WebUI 和 ComfyUI，了解各工具的优劣势与适用场景，建立统一的工作目录结构。',
      },
      {
        step: 2,
        title: '灵感收集与 Mood Board 制作',
        description: '用 AI 工具批量生成风格参考图，结合 Pinterest 收集竞品视觉，整理成 Mood Board；学习如何用 describe 命令反向解析参考图的 prompt。',
      },
      {
        step: 3,
        title: '品牌主视觉与 Logo 设计',
        description: '通过 Midjourney 的 blend 和 remix 功能融合品牌元素，生成 20+ 个 Logo 方案；用 Stable Diffusion 的 img2img 精修细节，最终选出 3 套主视觉方案。',
      },
      {
        step: 4,
        title: '电商场景：商品图与 Banner 批量生成',
        description: '在 ComfyUI 中搭建产品图工作流，用 ControlNet 固定产品位置，批量更换背景和光影；一键生成不同尺寸的电商 Banner 和详情页配图。',
      },
      {
        step: 5,
        title: '交付与迭代：从初稿到终稿',
        description: '整理最终视觉方案，输出品牌 VI 规范文档；收集客户反馈后快速迭代，利用 AI 的 seed 控制和局部重绘功能精准修改细节，实现高效交付闭环。',
      },
    ],
  },
  {
    id: '3',
    title: 'AI 办公自动化：搭建智能工作流',
    tools: ['ChatGPT', 'Notion AI', 'Make'],
    description:
      '用 AI 工具搭建自动化工作流：会议纪要自动生成、邮件智能分类回复、数据报表一键输出，每天节省 2 小时。',
    tag: 'AI办公',
    steps: [
      {
        step: 1,
        title: '会议纪要自动生成系统',
        description: '将 Zoom/腾讯会议录制音频导入 Whisper 转文字，再用 ChatGPT 按模板提炼关键决策、待办事项和责任人，自动同步到 Notion 数据库。',
      },
      {
        step: 2,
        title: '邮件智能分类与自动回复',
        description: '在 Make 中搭建邮件处理流水线：Gmail 新邮件触发 → ChatGPT 分类（咨询/合作/垃圾）→ 按类别执行不同动作（自动回复模板 / 创建任务 / 归档）。',
      },
      {
        step: 3,
        title: '数据报表一键生成',
        description: '连接数据库或 Google Sheets 数据源，用 ChatGPT 的 Code Interpreter 分析数据趋势，自动生成带图表的周报 PPT 和 Markdown 摘要，定时发送到企业微信群。',
      },
      {
        step: 4,
        title: 'AI 知识库搭建与维护',
        description: '用 Notion AI 自动整理团队文档，建立标签体系和内部 FAQ；新成员入职时 AI 自动生成个性化学习计划，根据岗位匹配相关文档。',
      },
      {
        step: 5,
        title: '效果评估与持续优化',
        description: '建立自动化效率度量体系，追踪 AI 工作流节省的工时和产出质量；每月复盘优化 Prompt 模板和流程节点，持续提升自动化覆盖率。',
      },
    ],
  },
  {
    id: '4',
    title: 'AI Agent 智能体开发：企业客服知识库系统',
    tools: ['Coze', 'Dify', 'LangChain'],
    description:
      '从 Prompt 工程到多 Agent 协作，构建能自主规划、调用工具、记忆上下文的智能体，落地客服与知识库场景。',
    tag: 'AI Agent',
    steps: [
      {
        step: 1,
        title: 'Agent 架构设计与技术选型',
        description: '分析客服场景需求，设计"路由 Agent + 专业子 Agent"的多智能体架构；对比 Coze、Dify、LangChain 的优劣势，确定技术栈和部署方案。',
      },
      {
        step: 2,
        title: '知识库构建与向量化',
        description: '收集产品手册、FAQ、历史工单等文档，用 LangChain 的 Document Loader 统一解析；选择 Embedding 模型将文档切片向量化存入 Chroma 向量数据库。',
      },
      {
        step: 3,
        title: 'RAG 检索增强生成链路搭建',
        description: '实现用户问题 → 向量检索召回相关文档片段 → 拼接 Prompt 上下文 → LLM 生成回答的完整链路；调优检索参数（top_k、相似度阈值）提升回答准确率。',
      },
      {
        step: 4,
        title: '工具调用与多 Agent 协作',
        description: '给 Agent 配备订单查询、工单创建、人工转接等工具；实现路由 Agent 根据用户意图自动分发到对应的专业子 Agent，子 Agent 间通过共享记忆协同。',
      },
      {
        step: 5,
        title: '测试上线与持续优化',
        description: '构建测试用例集评估回答质量（准确率、幻觉率、响应时间）；接入真实客服渠道（网页/企业微信），收集用户反馈持续迭代 Prompt 和知识库。',
      },
    ],
  },
  {
    id: '5',
    title: '用 AI 做一个小红书爆款文案生成器',
    tools: ['ChatGPT', 'Claude', 'Make'],
    description:
      '从选题分析到文案生成，搭建一套自动化小红书内容生产流水线，批量产出高质量种草笔记。',
    tag: 'AI写作',
    steps: [
      {
        step: 1,
        title: '爆款选题挖掘与趋势分析',
        description: '用 AI 分析小红书热门话题和竞品账号，提取高频关键词和爆款标题模式；搭建选题库，按"教程/测评/Vlog/合集"四大类型分类管理。',
      },
      {
        step: 2,
        title: 'Prompt 模板工程化',
        description: '针对不同文案类型设计专用 Prompt 模板：种草文案模板（产品卖点 + 使用场景 + 情感共鸣）、教程文案模板（步骤拆解 + 效果对比 + 互动引导）。',
      },
      {
        step: 3,
        title: '批量生成与人工精修流程',
        description: '在 Make 中搭建流水线：输入选题关键词 → ChatGPT 生成 5 版文案 → Claude 评分排序 → 人工挑选最优版本微调 → 自动添加 emoji 和话题标签。',
      },
      {
        step: 4,
        title: '封面图与配图 AI 生成',
        description: '用 Midjourney 或 DALL·E 为每篇笔记生成风格统一的封面图和内页配图；建立品牌视觉模板，确保所有内容视觉调性一致。',
      },
      {
        step: 5,
        title: '数据复盘与策略迭代',
        description: '分析笔记发布后的阅读量、互动率和转化数据，用 AI 总结高绩效内容的共性特征；根据数据反馈迭代选题策略和 Prompt 模板，持续提升爆款率。',
      },
    ],
  },
  {
    id: '6',
    title: '从零搭建个人 AI 知识库',
    tools: ['Dify', 'Notion', 'OpenAI API'],
    description:
      '将散落在各处的个人笔记、文章、书签整合成一个可对话的 AI 知识库，实现"第二大脑"。',
    tag: 'AI知识库',
    steps: [
      {
        step: 1,
        title: '数据源整合与清洗',
        description: '导出 Notion 笔记、浏览器书签、本地 Markdown 文件和 Kindle 标注；用 Python 脚本统一清洗格式，去除重复内容，按主题分类打标签。',
      },
      {
        step: 2,
        title: '向量数据库搭建与索引优化',
        description: '选择合适的 Embedding 模型（text-embedding-3-small），将清洗后的文档切片并向量化存入 Qdrant；配置混合检索（关键词 + 语义）提升召回精度。',
      },
      {
        step: 3,
        title: 'Dify 应用搭建与对话界面',
        description: '在 Dify 中创建知识库应用，配置 RAG 流水线和 System Prompt；设计对话界面，支持"搜索模式"和"聊天模式"两种交互方式，适配不同使用场景。',
      },
      {
        step: 4,
        title: '自动化同步与持续更新',
        description: '搭建定时任务自动同步 Notion 新增内容到知识库；实现"剪藏"功能，浏览器一键保存网页到知识库；定期评估检索质量并调优参数。',
      },
      {
        step: 5,
        title: '知识图谱与智能推荐',
        description: '基于知识库内容构建个人知识图谱，自动发现知识点之间的关联；实现"你可能还想了解"的智能推荐，让知识库从被动查询升级为主动推送。',
      },
    ],
  },
];
