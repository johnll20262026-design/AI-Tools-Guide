// EXPORTS: MOCK_CATEGORIES, MOCK_ARTICLES_BY_CATEGORY

import type { ITutorialCategory, IArticle } from '@/types/tutorial';
import { ALL_ARTICLES } from './articles';

export const MOCK_CATEGORIES: ITutorialCategory[] = [
  {
    id: 'prompt',
    title: 'Prompt 工程',
    description: '掌握提示词设计技巧，让 AI 精准理解你的需求，输出高质量结果。',
    icon: 'MessageSquare',
    count: 6,
  },
  {
    id: 'painting',
    title: 'AI 绘画',
    description: '从 Midjourney 到 Stable Diffusion，零基础学会 AI 图像创作。',
    icon: 'Palette',
    count: 6,
  },
  {
    id: 'video',
    title: 'AI 视频',
    description: 'Sora、Runway 等工具实战，用文字驱动视频内容生产。',
    icon: 'Video',
    count: 5,
  },
  {
    id: 'coding',
    title: 'AI 编程',
    description: 'Cursor、Copilot、Codex 等 AI 编程助手深度使用指南。',
    icon: 'Code2',
    count: 6,
  },
  {
    id: 'office',
    title: 'AI 办公',
    description: 'Notion AI、Gamma 等工具提升文档、PPT、表格处理效率。',
    icon: 'FileText',
    count: 6,
  },
  {
    id: 'agent',
    title: 'AI Agent',
    description: '构建自主智能体，让 AI 帮你完成复杂多步骤任务。',
    icon: 'Bot',
    count: 6,
  },
  {
    id: 'deploy',
    title: '模型部署',
    description: '本地部署开源大模型，私有化运行 LLM 的完整方案。',
    icon: 'Server',
    count: 6,
  },
  {
    id: 'security',
    title: 'AI 安全',
    description: 'Prompt 注入防护、数据隐私与 AI 应用安全最佳实践。',
    icon: 'Shield',
    count: 5,
  },
];

const CATEGORY_ARTICLE_IDS: Record<string, string[]> = {
  prompt: ['prompt-1', 'prompt-2', 'prompt-3', 'prompt-4', 'prompt-5', 'prompt-6'],
  painting: ['painting-1', 'painting-2', 'painting-3', 'painting-4', 'painting-5', 'painting-6'],
  video: ['video-1', 'video-2', 'video-3', 'video-4', 'video-5'],
  coding: ['coding-1', 'coding-2', 'coding-3', 'coding-4', 'coding-5', 'coding-6'],
  office: ['office-1', 'office-2', 'office-3', 'office-4', 'office-5', 'office-6'],
  agent: ['agent-1', 'agent-2', 'agent-3', 'agent-4', 'agent-5', 'agent-6'],
  deploy: ['deploy-1', 'deploy-2', 'deploy-3', 'deploy-4', 'deploy-5', 'deploy-6'],
  security: ['security-1', 'security-2', 'security-3', 'security-4', 'security-5'],
};

function pickArticleMeta(id: string): IArticle {
  const src = ALL_ARTICLES[id];
  return {
    id: src.id,
    title: src.title,
    description: src.description,
    date: src.date,
    readTime: src.readTime,
  };
}

export const MOCK_ARTICLES_BY_CATEGORY: Record<string, IArticle[]> = Object.fromEntries(
  Object.entries(CATEGORY_ARTICLE_IDS).map(([catId, ids]) => [
    catId,
    ids.map(pickArticleMeta),
  ])
);
