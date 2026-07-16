import type { IArticle } from '@/types/tutorial';
import { ALL_ARTICLES_META } from '@/data/articles-meta';

const articleImportMap = import.meta.glob<{ default: IArticle }>('./*.ts');

export async function loadArticle(id: string): Promise<IArticle | null> {
  const meta = ALL_ARTICLES_META[id];
  if (!meta) return null;
  const loader = articleImportMap[`./${id}.ts`];
  if (!loader) return null;
  try {
    const mod = await loader();
    const article = mod?.default;
    if (!article) return { ...meta, content: '' };
    const content = article.content ?? '';
    return { ...meta, content };
  } catch {
    return null;
  }
}
