// EXPORTS: MOCK_LEARNING_PATHS

import type { ILearningPath } from '@/types/tutorial';

export const MOCK_LEARNING_PATHS: ILearningPath[] = [
  {
    id: 'beginner',
    title: '入门新手',
    target: '零基础 / AI 工具小白',
    description: '从最常用的 AI 工具入手，快速建立认知，掌握日常使用技巧。',
    steps: [
      { step: 1, title: '认识主流 AI 工具', description: '了解 ChatGPT、Claude、Gemini 等工具的区别与适用场景' },
      { step: 2, title: 'Prompt 基础', description: '学习提示词基本结构，掌握角色设定、格式约束等核心技巧' },
      { step: 3, title: 'AI 办公实战', description: '用 AI 辅助写邮件、做 PPT、整理会议纪要，提升日常效率' },
      { step: 4, title: 'AI 绘画入门', description: '使用 Midjourney / DALL·E 生成图片，理解风格词与参数控制' },
      { step: 5, title: 'AI 搜索与信息整理', description: '用 Perplexity、秘塔搜索等工具高效获取和整理信息' },
      { step: 6, title: 'AI 视频初探', description: '了解 Sora、Runway 等 AI 视频工具的基本用法与创作流程' },
      { step: 7, title: 'AI 编程助手入门', description: '安装 Cursor / GitHub Copilot，体验 AI 辅助写代码的基本操作' },
      { step: 8, title: 'AI 工具安全意识', description: '了解使用 AI 工具时的隐私保护与数据安全基本常识' },
      { step: 9, title: 'AI 社区与持续学习', description: '加入 AI 工具社区，关注前沿动态，建立持续学习的习惯和信息获取渠道' },
      { step: 10, title: '综合实战项目', description: '综合运用所学 AI 工具完成一个完整项目，从需求分析到成果交付全流程实践' },
    ],
  },
  {
    id: 'intermediate',
    title: '进阶用户',
    target: '有基础 / 想深入应用',
    description: '系统化学习 AI 工具链，掌握工作流搭建与自动化能力。',
    steps: [
      { step: 1, title: 'Prompt 工程进阶', description: 'Chain-of-Thought、Few-shot、结构化输出等高级提示技巧' },
      { step: 2, title: 'AI 编程实战', description: '使用 Cursor / Copilot 辅助开发，掌握 AI 驱动的高效编码流程' },
      { step: 3, title: '工作流自动化', description: '用 Make / n8n 搭建 AI 自动化流程，串联多工具协同工作' },
      { step: 4, title: '模型微调与部署', description: '了解 LoRA 微调、API 部署，定制专属 AI 模型' },
      { step: 5, title: 'AI 绘画进阶', description: 'ComfyUI 工作流搭建、ControlNet 精准控图、风格迁移实战' },
      { step: 6, title: 'RAG 入门', description: '理解检索增强生成原理，用 LangChain 搭建第一个文档问答系统' },
      { step: 7, title: 'AI 数据分析', description: '用 ChatGPT Advanced Data Analysis 或 Claude 处理表格与可视化' },
      { step: 8, title: 'AI 视频进阶', description: 'AI 视频剪辑、数字人制作、语音克隆与多模态内容生产' },
      { step: 9, title: '本地模型部署', description: '用 Ollama / LM Studio 在本地运行开源大模型，掌握量化与加速' },
      { step: 10, title: 'AI 产品设计思维', description: '理解 AI 产品的能力边界，学习如何设计 AI-Native 的用户体验' },
    ],
  },
  {
    id: 'professional',
    title: '专业开发者',
    target: '开发者 / 技术从业者',
    description: '深入 AI Agent 架构、RAG 系统与企业级 AI 应用落地。',
    steps: [
      { step: 1, title: 'AI Agent 架构设计', description: '理解 Agent 核心范式：规划、工具调用、记忆、多 Agent 协作' },
      { step: 2, title: 'RAG 检索增强生成', description: '搭建向量数据库 + 知识库，实现企业文档智能问答系统' },
      { step: 3, title: 'LangChain / LlamaIndex', description: '掌握主流 AI 应用框架，构建生产级 LLM 应用' },
      { step: 4, title: 'AI 安全与合规', description: 'Prompt 注入防护、数据隐私、模型安全评估与审计' },
      { step: 5, title: '企业级落地实践', description: 'CI/CD 集成、监控告警、成本优化，全链路 AI 应用交付' },
      { step: 6, title: '多 Agent 协作系统', description: 'AutoGen / CrewAI 多智能体框架实战，构建协作式 AI 系统' },
      { step: 7, title: '大模型微调实战', description: 'QLoRA / Full Fine-tuning 完整流程，从数据准备到模型评估' },
      { step: 8, title: 'LLM 推理优化', description: 'vLLM / TensorRT-LLM 部署优化，提升推理吞吐与降低延迟' },
      { step: 9, title: 'AI 应用可观测性', description: '搭建 LLM 应用的监控体系，追踪 token 消耗、延迟、准确率等核心指标，实现全链路可观测' },
      { step: 10, title: '开源贡献与技术影响力', description: '参与 LangChain、LlamaIndex 等开源项目贡献，撰写技术博客，建立行业影响力' },
    ],
  },
];
