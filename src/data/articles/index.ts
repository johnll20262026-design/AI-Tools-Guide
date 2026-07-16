import type { IArticle } from '@/types/tutorial';
import { ALL_ARTICLES_META } from '@/data/articles-meta';

const articleImportMap = import.meta.glob<IArticle>('./*.ts');

export async function loadArticle(id: string): Promise<IArticle | null> {
  const meta = ALL_ARTICLES_META[id];
  if (!meta) return null;
  const loader = articleImportMap[`./${id}.ts`];
  if (!loader) return null;
  try {
    const mod = await loader();
    const content = mod && typeof mod === 'object' && 'content' in mod
      ? (mod as IArticle).content ?? ''
      : '';
    return { ...meta, content };
  } catch {
    return null;
  }
}
