// EXPORTS: ITutorialCategory, IStatItem, ILearningPath, ILearningStep, ICaseItem, ICaseStep, IArticle, INavItem

export interface IArticle {
  id: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  content?: string;
  related?: string[];
}

export interface ITutorialCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
  articles?: IArticle[];
}

export interface IStatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface ILearningStep {
  step: number;
  title: string;
  description: string;
}

export interface ILearningPath {
  id: string;
  title: string;
  target: string;
  description: string;
  steps: ILearningStep[];
  articles?: IArticle[];
}

export interface ICaseStep {
  step: number;
  title: string;
  description: string;
}

export interface ICaseItem {
  id: string;
  title: string;
  tools: string[];
  description: string;
  tag: string;
  steps: ICaseStep[];
}

export interface INavItem {
  id: string;
  label: string;
  anchor: string;
}
