// EXPORTS: ALL_ARTICLES_META - Article metadata without full content (for list pages)

import type { IArticle } from '@/types/tutorial';

export const ALL_ARTICLES_META: Record<string, Omit<IArticle, "content">> = {
  // ==================== Prompt 工程 (6 篇) ====================
  'prompt-1': {
    id: 'prompt-1',
    title: 'Prompt 工程入门：三步写出高质量提示词',
    description: '从零掌握提示词设计核心框架，学会角色设定、任务描述和格式约束三大要素，让 AI 输出更精准。',
    date: '2026-06-20',
    readTime: '15 分钟',
  },
  'prompt-2': {
    id: 'prompt-2',
    title: 'Chain-of-Thought 思维链提示实战指南',
    description: '深入理解 CoT 原理，通过分步推理引导 AI 解决复杂逻辑问题，附数学、编程、分析场景示例。',
    date: '2026-06-18',
    readTime: '18 分钟',
  },

  'prompt-3': {
    id: 'prompt-3',
    title: 'Few-shot 与 Zero-shot：少样本提示技巧全解',
    description: '对比两种提示策略的适用场景，学会用 2-3 个示例让 AI 快速理解任务模式。',
    date: '2026-06-15',
    readTime: '16 分钟',
  },

  'prompt-4': {
    id: 'prompt-4',
    title: '结构化输出：让 AI 返回 JSON、表格和 Markdown',
    description: '掌握格式约束技巧，让 ChatGPT 和 Claude 稳定输出结构化数据，直接对接程序和工作流。',
    date: '2026-06-12',
    readTime: '16 分钟',
  },
  'prompt-5': {
    id: 'prompt-5',
    title: '角色扮演提示词设计：打造专属 AI 助手',
    description: '从客服到技术顾问，学会用角色设定 Prompt 让 AI 扮演特定身份，提升对话质量和专业度。',
    date: '2026-06-10',
    readTime: '16 分钟',
  },

  'prompt-6': {
    id: 'prompt-6',
    title: 'Prompt 优化迭代方法论：从 60 分到 95 分',
    description: '系统化 Prompt 调试流程：A/B 测试、评分标准、常见陷阱与修正策略。',
    date: '2026-06-08',
    readTime: '18 分钟',
  },
  // ==================== AI 绘画 (6 篇) ====================

  'painting-1': {
    id: 'painting-1',
    title: 'AI 绘画基础：Stable Diffusion 安装配置全攻略',
    description: '从环境搭建到模型下载，手把手教你本地部署 SD，附 WebUI 和 ComfyUI 双方案对比。',
    date: '2026-05-25',
    readTime: '25 分钟',
  },

  'painting-2': {
    id: 'painting-2',
    title: 'Midjourney 从入门到精通：参数与风格词完全指南',
    description: '详解 --ar、--stylize、--chaos 等核心参数，附 50+ 高质量风格词库。',
    date: '2026-05-22',
    readTime: '25 分钟',
  },

  'painting-3': {
    id: 'painting-3',
    title: 'ComfyUI 节点式工作流实战：搭建你的第一条 AI 绘画流水线',
    description: '用可视化节点串联模型加载、提示词编码、采样和放大，实现可复用的图像生成流程。',
    date: '2026-05-20',
    readTime: '25 分钟',
  },
  'painting-4': {
    id: 'painting-4',
    title: 'ControlNet 精准控图：姿势、线稿、深度图全解析',
    description: '告别随机抽卡，用 ControlNet 精确控制人物姿态、画面构图和风格迁移。',
    date: '2026-05-18',
    readTime: '25 分钟',
  },

  'painting-5': {
    id: 'painting-5',
    title: 'LoRA 模型训练实战：打造你的专属风格模型',
    description: '用 Kohya SS 训练 LoRA，10-20 张图即可定制人物、画风或产品风格。',
    date: '2026-05-15',
    readTime: '25 分钟',
  },

  'painting-6': {
    id: 'painting-6',
    title: 'AI 绘画商用实战：电商主图、海报与 IP 设计',
    description: '从需求分析到交付，完整走通 AI 绘画在商业场景中的应用流程，附真实变现案例。',
    date: '2026-05-12',
    readTime: '30 分钟',
  },
  // ==================== AI 视频 (5 篇) ====================

  'video-1': {
    id: 'video-1',
    title: 'Sora 完全指南：OpenAI 视频生成模型深度解析',
    description: '从技术原理到实际使用，全面了解 Sora 的能力边界、提示词技巧和创意应用场景。',
    date: '2026-05-10',
    readTime: '25 分钟',
  },

  'video-2': {
    id: 'video-2',
    title: 'Runway Gen-3 实战：文字生成视频从入门到精通',
    description: '掌握 Runway 最新模型的提示词写法、运动笔刷和导演模式，产出专业级短视频。',
    date: '2026-05-08',
    readTime: '25 分钟',
  },

  'video-3': {
    id: 'video-3',
    title: 'Pika Labs 创意视频制作：特效、转场与风格化',
    description: '用 Pika 实现 lip sync、画面扩展和风格转换，打造吸睛的社交媒体短视频。',
    date: '2026-05-05',
    readTime: '25 分钟',
  },
  'video-4': {
    id: 'video-4',
    title: 'AI 视频工作流搭建：从脚本到成片的自动化管线',
    description: '串联 ChatGPT 写脚本 + AI 绘画生成素材 + AI 视频工具合成，实现半自动视频生产。',
    date: '2026-05-03',
    readTime: '28 分钟',
  },

  'video-5': {
    id: 'video-5',
    title: 'AI 视频编辑工具对比：CapCut、Descript 与剪映 AI 功能横评',
    description: '实测主流 AI 视频编辑工具的智能剪辑、自动字幕、背景移除等功能，帮你选对工具。',
    date: '2026-05-01',
    readTime: '25 分钟',
  },

  // ==================== AI 编程 (6 篇) ====================

  'coding-1': {
    id: 'coding-1',
    title: 'Cursor 完全指南：AI 原生 IDE 如何让编程效率翻倍',
    description: '从零掌握 Cursor AI IDE，包含 Tab 补全、Cmd+K 内联编辑、Composer 多文件重构、Agent 模式的完整实战教程和避坑指南。',
    date: '2026-05-25',
    readTime: '18 分钟',
  },

  'coding-2': {
    id: 'coding-2',
    title: 'GitHub Copilot 实战：10 个高级用法让你写代码快到飞起',
    description: '掌握 Copilot 行内补全、Chat 问答、PR Review 等核心功能，学会 10 个高级提示技巧，让 AI 成为你的结对编程伙伴。',
    date: '2026-05-24',
    readTime: '15 分钟',
  },

  'coding-3': {
    id: 'coding-3',
    title: 'Claude Code 深度教程：终端里的 AI 程序员 Agent',
    description: '学会用 Claude Code 自主完成编程任务，从项目初始化到功能开发到bug修复，让 AI Agent 帮你写代码跑命令做重构。',
    date: '2026-05-23',
    readTime: '16 分钟',
  },

  'coding-4': {
    id: 'coding-4',
    title: 'Windsurf 与 Bolt.new：AI 编程新势力对比评测',
    description: '深度体验 Windsurf 和 Bolt.new，对比 Cursor/Copilot 找到最适合你的AI编程工具组合。',
    date: '2026-05-22',
    readTime: '14 分钟',
  },

  'coding-5': {
    id: 'coding-5',
    title: 'AI 代码审查实战：用 GPT-5.5/Claude 做 Code Review 提升代码质量',
    description: '搭建 AI 辅助 Code Review 工作流，自动发现 bug、安全漏洞、性能问题，让团队代码质量提升30%以上。',
    date: '2026-05-21',
    readTime: '16 分钟',
  },

  'coding-6': {
    id: 'coding-6',
    title: 'v0.dev 与 Lovable：AI 生成前端页面的正确打开方式',
    description: '掌握 v0.dev 和 Lovable 两大 AI 前端生成工具，从设计稿到生产级页面，学会 AI 生成后手动调优的实用技巧。',
    date: '2026-05-20',
    readTime: '20 分钟',
  },

  // ==================== AI 办公 (6 篇) ====================
  'office-1': {
    id: 'office-1',
    title: 'ChatGPT 办公实战：用 AI 10倍速写邮件、报告和会议纪要',
    description: '覆盖邮件撰写、各类报告生成、会议纪要整理等职场高频场景，提供实用Prompt模板与避坑指南，助你10倍提升办公效率。',
    date: '2026-06-17',
    readTime: '10 分钟',
  },
  'office-2': {
    id: 'office-2',
    title: 'Notion AI 完全指南：智能文档、数据库与项目管理',
    description: '详解Notion AI写作辅助、自动总结、翻译、数据库AI公式生成、项目管理及团队协作场景，带你从入门到精通。',
    date: '2026-06-12',
    readTime: '12 分钟',
  },
  'office-3': {
    id: 'office-3',
    title: 'Gamma 一键生成 PPT：AI 演示文稿制作全流程',
    description: '从Gamma注册使用、大纲生成、幻灯片编辑美化到导出分享，手把手教你用AI快速制作专业PPT，包含避坑指南与演示技巧。',
    date: '2026-06-07',
    readTime: '8 分钟',
  },
  'office-4': {
    id: 'office-4',
    title: 'AI Excel 数据处理：用 ChatGPT 写公式、做透视表和图表',
    description: '掌握用ChatGPT辅助Excel数据处理的核心技巧，包括公式生成、数据清洗、透视表分析、图表制作和VBA宏自动化，附实战Prompt模板。',
    date: '2026-06-02',
    readTime: '11 分钟',
  },
  'office-5': {
    id: 'office-5',
    title: 'AI 会议助手横评：Fireflies、Otter 与飞书妙记',
    description: '深度对比三款主流AI会议助手的转写准确率、功能、价格、国内可用性，帮你选出最适合的会议记录工具。',
    date: '2026-05-28',
    readTime: '9 分钟',
  },
  'office-6': {
    id: 'office-6',
    title: '搭建个人 AI 办公工作流：Make + ChatGPT 自动化实践',
    description: '从0到1学习用Make连接ChatGPT，打造邮件自动处理、报表自动生成等工作流，告别重复劳动。',
    date: '2026-05-23',
    readTime: '13 分钟',
  },

  // ==================== AI Agent (6 篇) ====================
  'agent-1': {
    id: 'agent-1',
    title: 'AI Agent 入门：理解智能体的核心架构与工作原理',
    description: '理解AI Agent四大核心组件、ReAct框架与Agent循环，掌握与ChatGPT的本质区别',
    date: '2026-06-18',
    readTime: '18 分钟',
  },
  'agent-2': {
    id: 'agent-2',
    title: 'Coze 实战：零代码搭建你的第一个 AI 智能体',
    description: '用字节Coze零代码做AI Bot，人设配置、插件、知识库、工作流、多平台发布全流程',
    date: '2026-06-13',
    readTime: '20 分钟',
  },
  'agent-3': {
    id: 'agent-3',
    title: 'Dify 企业级 AI 应用开发：从 RAG 到 Agent 全流程',
    description: '企业级AI应用首选Dify，详解部署选型、知识库RAG、工作流、Agent配置、私有化部署',
    date: '2026-06-08',
    readTime: '20 分钟',
  },
  'agent-4': {
    id: 'agent-4',
    title: 'LangChain 深度指南：构建生产级 LLM 应用',
    description: '从核心概念到生产部署，系统掌握 LangChain 的 Chain/Agent/Memory/Retrieval 四大组件，LCEL 表达式语言实战，RAG 完整实现，以及调试技巧与 LlamaIndex 对比。',
    date: '2026-06-02',
    readTime: '25 分钟',
  },
  'agent-5': {
    id: 'agent-5',
    title: '多 Agent 协作实战：AutoGen 与 CrewAI 框架对比',
    description: '理解多 Agent 协作的角色分工理念，通过代码示例入门 AutoGen（对话式）和 CrewAI（任务式），对比选型差异，掌握代码开发、研究分析等实战场景。',
    date: '2026-05-26',
    readTime: '20 分钟',
  },
  'agent-6': {
    id: 'agent-6',
    title: 'AI Agent 落地实践：客服、数据分析与代码审查场景',
    description: '深度解析客服机器人、数据分析 Agent、代码审查 Agent 三个真实业务场景的架构设计、实现步骤、效果评估与 ROI 分析。',
    date: '2026-05-19',
    readTime: '18 分钟',
  },

  // ==================== 模型部署 (6 篇) ====================
  'deploy-1': {
    id: 'deploy-1',
    title: 'Ollama 入门：5 分钟在本地运行 Llama 3 和 Qwen',
    description: '从零开始掌握 Ollama，跨平台安装、拉取运行模型、API 调用、WebUI 集成，本地大模型快速上手。',
    date: '2026-06-16',
    readTime: '8 分钟',
  },
  'deploy-2': {
    id: 'deploy-2',
    title: 'vLLM 高性能推理部署：吞吐量优化完全指南',
    description: '深入理解 vLLM 的 PagedAttention 和连续批处理，从安装配置到生产环境调优，实现大模型推理吞吐量翻倍。',
    date: '2026-06-10',
    readTime: '14 分钟',
  },
  'deploy-3': {
    id: 'deploy-3',
    title: 'Docker 部署开源大模型：从镜像到编排的完整方案',
    description: '使用 Docker 和 Docker Compose 一键部署 Ollama、vLLM、Open WebUI，实现 GPU 直通、数据持久化、反向代理，生产级容器化部署指南。',
    date: '2026-06-04',
    readTime: '12 分钟',
  },
  'deploy-4': {
    id: 'deploy-4',
    title: 'LoRA 微调实战：用 LLaMA-Factory 定制领域模型',
    description: '从零掌握 LoRA 微调原理和实操，用 LLaMA-Factory 准备数据集、配置参数、训练监控、合并部署，打造专属领域模型。',
    date: '2026-05-28',
    readTime: '16 分钟',
  },
  'deploy-5': {
    id: 'deploy-5',
    title: '模型量化技术详解：GGUF、GPTQ 与 AWQ 选型指南',
    description: '深入理解模型量化原理，对比 GGUF/GPTQ/AWQ/FP8 主流量化格式的精度、速度、显存差异，掌握量化工具和硬件选型策略。',
    date: '2026-05-20',
    readTime: '11 分钟',
  },
  'deploy-6': {
    id: 'deploy-6',
    title: '云端 GPU 部署方案对比：AutoDL、揽睿星舟与 AWS SageMaker',
    description: '全面对比国内 AutoDL、揽睿星舟、恒源云与海外 AWS、Colab、Lambda Labs 云 GPU 平台的价格、性能、适用场景，附省钱技巧。',
    date: '2026-05-12',
    readTime: '10 分钟',
  },
  // ==================== AI安全 (5 篇) ====================
  'security-1': {
    id: 'security-1',
    title: 'Prompt 注入与 AI 诈骗防范：普通人也能看懂的安全指南',
    description: '用生活案例讲透 Prompt 注入原理，识别 AI 换脸/声音诈骗等常见套路，提供普通人自查清单、开发者防护方案和企业合规指南。',
    date: '2026-07-04',
    readTime: '25 分钟',
  },
  'security-2': {
    id: 'security-2',
    title: 'AI 时代的数据隐私保护：你的聊天记录真的私密吗？',
    description: '从普通人关心的"我跟AI说的话谁能看到"讲起，详解GDPR/个保法合规要求，提供普通人隐私保护自查清单、职场人数据安全红线、企业合规方案与技术落地。',
    date: '2026-07-04',
    readTime: '22 分钟',
  },
  'security-3': {
    id: 'security-3',
    title: 'AI 内容安全：怎么防止 AI 乱说、造谣、教人做坏事？',
    description: '用"给AI请审核员"的通俗比喻讲透内容安全，教普通人识别AI谣言和有害内容，给职场人AI内容审核指南，给开发者提供多层护栏架构和Llama Guard/NeMo Guardrails实战代码。',
    date: '2026-07-04',
    readTime: '23 分钟',
  },
  'security-4': {
    id: 'security-4',
    title: 'AI 安全体检：怎么在坏人之前找到你家 AI 的漏洞？',
    description: '用"消防演习/防盗测试"的通俗比喻讲透红队测试，教普通人怎么判断一个AI产品安不安全，给开发者提供Garak自动化测试实战和企业级安全评估Checklist。',
    date: '2026-07-04',
    readTime: '24 分钟'
  },
  'security-5': {
    id: 'security-5',
    title: '企业 AI 安全架构：怎么给你的 AI 系统建一座安全城堡？',
    description: '用"建城堡"的通俗比喻讲透企业级AI安全架构，从网络隔离到权限控制到审计日志，给企业管理者讲合规代价，给开发者提供完整架构设计和分阶段落地路线图。',
    date: '2026-07-04',
    readTime: '25 分钟'
  },
  // ==================== 学习路径-入门新手 (10 篇) ====================
  'path-beginner-1': {
    id: 'path-beginner-1',
    title: '认识主流 AI 工具：选对第一个 AI 助手',
    description: '全面对比 ChatGPT、Claude、Gemini、豆包等主流 AI 工具的区别、适用场景、注册方式和免费额度，帮你快速选择适合自己的第一个工具。',
    date: '2026-06-20',
    readTime: '6-8 分钟',
  },
  'path-beginner-2': {
    id: 'path-beginner-2',
    title: 'Prompt 基础：让 AI 听懂你的话',
    description: '从零学习提示词基本结构，掌握角色设定、任务描述、格式约束三大核心，学会好 Prompt 的五要素，写出你的第一个高质量提示词。',
    date: '2026-06-19',
    readTime: '6-8 分钟',
  },
  'path-beginner-3': {
    id: 'path-beginner-3',
    title: 'AI 办公实战：效率翻倍的日常场景',
    description: '掌握用 AI 写邮件、做 PPT、整理会议纪要的实战技巧，附常用 Prompt 模板，覆盖 80% 日常办公场景。',
    date: '2026-06-18',
    readTime: '12-18 分钟',
  },
  'path-beginner-4': {
    id: 'path-beginner-4',
    title: 'AI 绘画入门：用 Midjourney / DALL·E 生成精美图片',
    description: '从零开始学习AI绘画：工具选择、Prompt写作技巧、常用参数、风格词库，新手10分钟出第一张图。',
    date: '2026-06-18',
    readTime: '8-10 分钟',
    related: ['painting-1', 'painting-2', 'path-beginner-5'],
  },

  'path-beginner-5': {
    id: 'path-beginner-5',
    title: 'AI 搜索与信息整理：高效获取和消化知识',
    description: '学会用 Perplexity、秘塔搜索等 AI 搜索引擎，掌握长文总结、资料整理的方法，让 AI 成为你的学习助手。',
    date: '2026-06-16',
    readTime: '6-8 分钟',
  },
  'path-beginner-6': {
    id: 'path-beginner-6',
    title: 'AI 视频初探：文生视频与 AI 剪辑入门',
    description: '了解 Sora、Runway、Pika 等 AI 视频工具的基本概念和能力边界，学会用简单的 AI 剪辑工具提升视频制作效率。',
    date: '2026-06-15',
    readTime: '6-8 分钟',
  },
  'path-beginner-7': {
    id: 'path-beginner-7',
    title: 'AI 编程助手入门：非程序员也能用的效率神器',
    description: '学会安装和使用 Cursor、GitHub Copilot，即使不会编程也能用 AI 写简单脚本、处理文件、解决日常电脑问题。',
    date: '2026-06-14',
    readTime: '6-8 分钟',
  },
  'path-beginner-8': {
    id: 'path-beginner-8',
    title: 'AI 工具安全意识：保护好你的隐私和数据',
    description: '学习 AI 使用中的隐私保护原则，知道什么数据绝对不能输入给 AI，了解账号安全和常见 AI 骗局，安全使用 AI 工具。',
    date: '2026-06-13',
    readTime: '6-8 分钟',
  },
  'path-beginner-9': {
    id: 'path-beginner-9',
    title: 'AI 社区与持续学习：跟上 AI 时代的步伐',
    description: '推荐高质量的 AI 学习社区、公众号和博主，教你如何筛选信息、建立个人学习系统，在快速变化的 AI 时代持续成长。',
    date: '2026-06-12',
    readTime: '6-8 分钟',
  },
  'path-beginner-10': {
    id: 'path-beginner-10',
    title: '综合实战项目：用 AI 做一份完整旅行攻略',
    description: '综合运用前面所学的所有 AI 技能，从信息收集到内容整理再到配图，一步步完成一份完整的旅行攻略，体验 AI 全流程工作流。',
    date: '2026-06-11',
    readTime: '6-8 分钟',
  },
  // ==================== 学习路径-进阶用户 (10 篇) ====================
  'path-intermediate-1': {
    id: 'path-intermediate-1',
    title: 'Prompt工程进阶：思维链、少样本与结构化输出深度应用',
    description: '掌握CoT思维链、Few-shot示例优化、结构化输出控制、角色扮演深度应用、Self-Consistency和Prompt Chaining等进阶Prompt技术。',
    date: '2026-06-10',
    readTime: '8-12 分钟',
  },
  'path-intermediate-2': {
    id: 'path-intermediate-2',
    title: 'AI编程实战：Cursor深度使用与AI辅助开发工作流',
    description: '深入掌握Cursor Composer多文件编辑、AI Debug方法论、代码重构、测试用例生成，以及与Git工作流的深度结合。',
    date: '2026-06-09',
    readTime: '8-12 分钟',
  },
  'path-intermediate-3': {
    id: 'path-intermediate-3',
    title: '工作流自动化：n8n/Make进阶与多工具串联实战',
    description: '掌握n8n高级用法、Webhook触发、错误处理、条件分支、循环批量处理，构建真实业务自动化流程。',
    date: '2026-06-08',
    readTime: '8-12 分钟',
  },
  'path-intermediate-4': {
    id: 'path-intermediate-4',
    title: '模型微调与部署：LoRA原理、数据准备与API服务化',
    description: '深入理解LoRA微调技术，掌握何时该微调、数据准备方法、用LLaMA-Factory/Unsloth实操微调，以及评估部署全流程。',
    date: '2026-06-07',
    readTime: '8-12 分钟',
  },
  'path-intermediate-5': {
    id: 'path-intermediate-5',
    title: 'AI绘画进阶：ComfyUI工作流与ControlNet精准控图',
    description: '掌握ComfyUI节点式工作流、ControlNet(OpenPose/Canny/Depth)精准控制构图、IP-Adapter风格迁移、Inpaint局部重绘高级技巧。',
    date: '2026-06-06',
    readTime: '8-12 分钟',
  },
  'path-intermediate-6': {
    id: 'path-intermediate-6',
    title: 'RAG入门：检索增强生成原理与代码实现',
    description: '理解RAG核心原理，掌握文档加载与切片、Embedding模型选择、向量数据库使用、检索策略优化，并实现完整RAG代码。',
    date: '2026-06-05',
    readTime: '8-12 分钟',
  },
  'path-intermediate-7': {
    id: 'path-intermediate-7',
    title: 'AI数据分析：CSV/Excel处理、可视化与洞察报告生成',
    description: '掌握ChatGPT Advanced Data Analysis、pandas代码生成、数据清洗、可视化、异常检测，用AI自动化数据分析全流程。',
    date: '2026-06-04',
    readTime: '8-12 分钟',
  },
  'path-intermediate-8': {
    id: 'path-intermediate-8',
    title: 'AI视频进阶：数字人、语音克隆与多模态内容流水线',
    description: '掌握Runway Gen-3高级用法、HeyGen/D-ID数字人制作、ElevenLabs语音克隆、Descript AI剪辑，构建多模态内容生产流程。',
    date: '2026-06-03',
    readTime: '8-12 分钟',
  },
  'path-intermediate-9': {
    id: 'path-intermediate-9',
    title: '本地模型部署：Ollama进阶、模型选择与局域网服务',
    description: '掌握Ollama高级用法、开源大模型选型(Qwen3/Llama3/GLM4)、量化选择、Open WebUI配置，搭建局域网共享本地AI服务。',
    date: '2026-06-02',
    readTime: '8-12 分钟',
  },
  'path-intermediate-10': {
    id: 'path-intermediate-10',
    title: 'AI产品设计思维：从工具思维到产品思维',
    description: '理解AI产品与传统产品的核心差异，学会识别AI能力边界、Human-in-the-loop设计，通过失败案例分析建立AI产品思考框架。',
    date: '2026-06-01',
    readTime: '8-12 分钟',
  },

  'path-professional-1': {
    id: 'path-professional-1',
    title: 'AI Agent 架构设计：从原理到生产级实现',
    description: '深入理解Agent核心范式：规划、工具调用、记忆、多Agent协作，ReAct/Plan-and-Execute/Reflexion架构对比，记忆系统设计，生产级避坑指南。',
    date: '2026-05-15',
    readTime: '15 分钟',
    related: ['agent-1', 'agent-4', 'agent-5', 'path-professional-2', 'path-professional-3']
  },

  'path-professional-2': {
    id: 'path-professional-2',
    title: 'RAG 检索增强生成：从入门到生产落地',
    description: 'RAG完整原理、文档解析切片、Embedding模型选择、向量数据库选型、检索策略优化、评估方法，带完整代码示例。',
    date: '2026-05-18',
    readTime: '12-15 分钟',
    related: ['agent-3', 'agent-4', 'deploy-1', 'path-professional-1', 'path-professional-3']
  },

  // ==================== 学习路径-专业开发者 (8 篇) ====================
  'path-professional-3': {
    id: 'path-professional-3',
    title: 'LangChain/LlamaIndex 深度对比与生产实践',
    description: '两个框架定位差异、核心抽象对比、选型建议、生产环境注意事项、可观测性、回调与追踪。',
    date: '2026-05-31',
    readTime: '15-20 分钟',
  },

  'path-professional-4': {
    id: 'path-professional-4',
    title: 'AI 安全与合规：从 Prompt 注入到 GDPR 合规实战',
    description: 'Prompt注入防护多层方案、数据脱敏、PII识别、GDPR/个保法合规要求、审计日志实现、红蓝对抗实践。',
    date: '2026-05-30',
    readTime: '12-18 分钟',
  },
  'path-professional-5': {
    id: 'path-professional-5',
    title: '企业级落地实践：CI/CD、版本管理、A/B 测试与 SLO',
    description: 'AI应用生产环境必备工程能力：四维版本管理、CI/CD流水线集成LLM评估、A/B测试体系、SLO可观测性与降级策略。',
    date: '2026-05-22',
    readTime: '15-20 分钟',
    related: ['deploy-2', 'agent-4', 'path-professional-4', 'path-professional-6'],
  },

  'path-professional-6': {
    id: 'path-professional-6',
    title: '多 Agent 协作系统：AutoGen、CrewAI 与编排模式',
    description: 'AutoGen/CrewAI框架深度对比、Agent通信模式、任务分解与编排、冲突解决、状态共享、容错机制。',
    date: '2026-05-28',
    readTime: '12-18 分钟',
  },

  'path-professional-7': {
    id: 'path-professional-7',
    title: '大模型微调实战：QLoRA、数据工程与模型部署',
    description: 'QLoRA vs Full Fine-tuning、数据工程(清洗/配比/质量)、训练监控、评估指标(Perplexity/BLEU/人工评估)、模型合并与部署。',
    date: '2026-05-27',
    readTime: '12-18 分钟',
  },

  'path-professional-8': {
    id: 'path-professional-8',
    title: 'LLM 推理优化：vLLM、TensorRT-LLM 与高性能部署',
    description: 'vLLM/TensorRT-LLM/text-generation-inference对比、批处理策略、KV缓存优化、量化选择、连续批处理、张量并行、推理性能测试方法。',
    date: '2026-05-26',
    readTime: '12-18 分钟',
  },

  'path-professional-9': {
    id: 'path-professional-9',
    title: 'AI 应用可观测性：LangSmith、LangFuse 与质量迭代闭环',
    description: 'LangSmith/LangFuse/Phoenix对比、Trace链路追踪、Token成本监控、准确率评估框架、Bad Case收集与迭代、用户反馈闭环。',
    date: '2026-05-25',
    readTime: '12-18 分钟',
  },

  'path-professional-10': {
    id: 'path-professional-10',
    title: '开源贡献与技术影响力：从参与者到社区建设者',
    description: '如何给LangChain/LlamaIndex等项目贡献代码、技术博客写作方法论、演讲分享、个人品牌建设、AI社区参与方式。',
    date: '2026-05-24',
    readTime: '12-18 分钟',
  },

  // ==================== 实战案例详解 (14 篇) ====================
  'case-1-1': {
    id: 'case-1-1',
    title: 'AI编程助手实战步骤1：环境准备与AI编程工具配置',
    description: '安装Cursor IDE，配置Copilot和Claude Code插件，搭建Node.js+React+PostgreSQL开发环境，掌握让AI读取项目上下文的技巧。',
    date: '2026-05-23',
    readTime: '12-15 分钟',
  },

  'case-1-2': {
    id: 'case-1-2',
    title: 'AI编程助手实战步骤2：用AI生成需求文档与数据库设计',
    description: '用Claude Code分析需求生成PRD和ER图，AI辅助设计users/posts/comments三张核心表结构。',
    date: '2026-05-22',
    readTime: '12-15 分钟',
  },

  'case-1-3': {
    id: 'case-1-3',
    title: 'AI编程助手实战步骤3：AI驱动的前后端代码生成',
    description: '在Cursor中用自然语言描述生成RESTful路由、Prisma模型、Tailwind CSS组件，快速搭建博客系统骨架。',
    date: '2026-05-21',
    readTime: '15-20 分钟',
  },

  'case-1-4': {
    id: 'case-1-4',
    title: 'AI编程助手实战步骤4：AI辅助调试与测试用例编写',
    description: '粘贴错误信息给AI快速定位根因，批量生成Jest单元测试和Playwright E2E测试，保证代码质量。',
    date: '2026-05-20',
    readTime: '12-15 分钟',
  },

  'case-1-5': {
    id: 'case-1-5',
    title: 'AI编程助手实战步骤5：一键部署与CI/CD配置',
    description: 'AI生成Dockerfile和GitHub Actions配置，Vercel自动部署，实现git push自动发布上线。',
    date: '2026-05-19',
    readTime: '12-15 分钟',
  },

  'case-2-1': {
    id: 'case-2-1',
    title: 'AI绘画工作流步骤1：搭建AI绘画工具链',
    description: '注册Midjourney+Discord，本地部署SD WebUI和ComfyUI，了解各工具优劣势，规划工作目录结构。',
    date: '2026-05-18',
    readTime: '5-7 分钟',
  },

  'case-2-2': {
    id: 'case-2-2',
    title: 'AI绘画工作流步骤2：灵感收集与Mood Board制作',
    description: 'AI批量生成风格参考，Pinterest竞品收集，用Midjourney describe命令反向解析prompt，建立项目情绪板。',
    date: '2026-05-17',
    readTime: '15-20 分钟',
  },

  'case-2-3': {
    id: 'case-2-3',
    title: 'AI绘画工作流步骤3：品牌主视觉与Logo设计',
    description: '用Midjourney blend/remix融合品牌元素，生成20+Logo方案，img2img精修，选出3套主视觉方向。',
    date: '2026-05-16',
    readTime: '12-18 分钟',
  },

  'case-2-4': {
    id: 'case-2-4',
    title: 'AI绘画工作流步骤4：电商场景商品图与Banner批量生成',
    description: '用ComfyUI搭建产品图工作流，ControlNet固定产品位置，换背景光影，批量生成多尺寸Banner。',
    date: '2026-05-15',
    readTime: '5-7 分钟',
  },

  'case-2-5': {
    id: 'case-2-5',
    title: 'AI绘画工作流步骤5：交付与迭代：从初稿到终稿',
    description: '输出VI规范文档，用seed控制和局部重绘做精准修改，建立客户反馈迭代闭环，完成最终交付。',
    date: '2026-05-14',
    readTime: '8-10 分钟',
  },

  'case-3-1': {
    id: 'case-3-1',
    title: 'AI办公自动化步骤1：会议纪要自动生成系统',
    description: 'Zoom/腾讯会议音频导入Whisper转文字，ChatGPT按模板提炼决策/待办/责任人，自动同步到Notion数据库。',
    date: '2026-05-13',
    readTime: '5-7 分钟',
  },

  'case-3-2': {
    id: 'case-3-2',
    title: 'AI办公自动化步骤2：邮件智能分类与自动回复',
    description: '用Make搭建Gmail流水线：新邮件触发→ChatGPT分类→按类别自动执行动作（回复/创建任务/归档）。',
    date: '2026-05-12',
    readTime: '5-7 分钟',
  },

  'case-3-3': {
    id: 'case-3-3',
    title: 'AI办公自动化步骤3：数据报表一键生成',
    description: '连接Google Sheets数据源，ChatGPT Code Interpreter分析趋势，自动生成带图表的周报PPT，定时发送到企业微信。',
    date: '2026-05-11',
    readTime: '5-7 分钟',
  },

  'case-3-4': {
    id: 'case-3-4',
    title: 'AI办公自动化步骤4：AI知识库搭建与维护',
    description: '用Notion AI整理团队文档、打标签和FAQ，新成员入职时AI自动生成个性化学习计划。',
    date: '2026-05-10',
    readTime: '5-7 分钟',
  },

  'case-3-5': {
    id: 'case-3-5',
    title: 'AI办公自动化步骤5：效果评估与持续优化',
    description: '建立自动化效率度量体系，追踪AI工作流节省工时和产出质量，每月复盘优化Prompt模板和流程节点。',
    date: '2026-05-09',
    readTime: '5-7 分钟',
  },

  'case-4-1': {
    id: 'case-4-1',
    title: 'AI Agent 实战（一）：Agent 架构设计与技术选型',
    description: '分析客服场景需求，设计"路由Agent + 专业子Agent"多智能体架构，对比Coze、Dify、LangChain选型，附决策树和成本估算。',
    date: '2026-05-07',
    readTime: '5-7 分钟',
    related: ['case-4-2', 'case-4-3', 'agent-2', 'agent-3']
  },

  'case-4-2': {
    id: 'case-4-2',
    title: 'AI Agent 实战（二）：知识库构建与向量化',
    description: '手把手教你收集清洗文档、切片策略、Embedding模型选择，用LangChain+Chroma实现文档导入向量化，附完整Python代码。',
    date: '2026-05-07',
    readTime: '15-20 分钟',
    related: ['case-4-1', 'case-4-3', 'deploy-4', 'agent-4']
  },

  'case-4-3': {
    id: 'case-4-3',
    title: 'AI Agent 实战（三）：RAG检索增强生成链路搭建',
    description: '从零实现用户问题→向量检索→拼接上下文→LLM生成完整链路，LangChain/LlamaIndex代码示例与参数调优。',
    date: '2026-05-08',
    readTime: '5-7 分钟',
  },

  'case-4-4': {
    id: 'case-4-4',
    title: 'AI Agent 实战（四）：工具调用与多Agent协作',
    description: '给Agent配订单查询、工单创建、人工转接工具，路由Agent分发到专业子Agent，Function Calling配置示例。',
    date: '2026-05-07',
    readTime: '5-7 分钟',
  },

  'case-4-5': {
    id: 'case-4-5',
    title: 'AI Agent 实战（五）：测试上线与持续优化',
    description: '构建测试用例集评估回答质量，接入网页/企业微信真实渠道，收集用户反馈迭代Prompt和知识库，配置监控告警。',
    date: '2026-05-06',
    readTime: '15-20 分钟',
  },
  // ==================== 案例5：小红书爆款文案生成器 (5 篇) ====================
  'case-5-1': {
    id: 'case-5-1',
    title: '小红书文案生成器步骤1：爆款选题挖掘与趋势分析',
    description: '用AI分析热门话题和竞品，搭建高转化率选题库',
    date: '2026-05-05',
    readTime: '12-15 分钟',
  },
  'case-5-2': {
    id: 'case-5-2',
    title: '小红书文案生成器步骤2：Prompt模板工程化',
    description: '针对不同类型文案设计专用Prompt，建立可复用模板库',
    date: '2026-05-04',
    readTime: '12-15 分钟',
  },
  'case-5-3': {
    id: 'case-5-3',
    title: '小红书文案生成器步骤3：批量生成与人工精修流程',
    description: 'AI批量生成+人工精修SOP，人机协作高效产出，单篇30分钟搞定',
    date: '2026-05-03',
    readTime: '15-18 分钟',
  },
  'case-5-4': {
    id: 'case-5-4',
    title: '小红书文案生成器步骤4：封面图与配图AI生成',
    description: 'Midjourney/DALL·E生成统一风格配图，10分钟一套图，点击率提升30%',
    date: '2026-05-02',
    readTime: '12-15 分钟',
  },
  'case-5-5': {
    id: 'case-5-5',
    title: '小红书文案生成器步骤5：数据复盘与策略迭代',
    description: '每周30分钟AI复盘，数据驱动优化，3个月形成自己的爆款方法论',
    date: '2026-05-01',
    readTime: '12-15 分钟',
  },

  // ==================== 案例6：个人AI知识库 (5 篇) ====================
  'case-6-1': {
    id: 'case-6-1',
    title: '个人AI知识库步骤1：数据源整合与清洗',
    description: '统一清洗分散在各处的笔记、书签、文档，建立干净知识源',
    date: '2026-04-30',
    readTime: '6 分钟',
  },
  'case-6-2': {
    id: 'case-6-2',
    title: '个人AI知识库步骤2：向量数据库搭建与索引优化',
    description: '选择Embedding模型，切片向量化，配置混合检索提升召回精度',
    date: '2026-04-29',
    readTime: '6 分钟',
  },
  'case-6-3': {
    id: 'case-6-3',
    title: '个人AI知识库步骤3：Dify应用搭建与对话界面',
    description: 'Dify可视化配置RAG和Prompt，快速搭建好用的对话界面',
    date: '2026-04-28',
    readTime: '18-25 分钟',
  },
  'case-6-4': {
    id: 'case-6-4',
    title: '个人AI知识库步骤4：自动化同步与持续更新',
    description: '自动同步Notion/剪藏/浏览器新增内容，知识库持续生长',
    date: '2026-04-27',
    readTime: '12-18 分钟',
  },
  'case-6-5': {
    id: 'case-6-5',
    title: '个人AI知识库步骤5：知识图谱与智能推荐',
    description: '构建知识点关联，实现主动推荐，从被动查询升级为主动思考',
    date: '2026-04-26',
    readTime: '20-25 分钟',
  },


};

export const ARTICLE_IDS_WITH_FULL_CONTENT = new Set(Object.keys(ALL_ARTICLES_META));
