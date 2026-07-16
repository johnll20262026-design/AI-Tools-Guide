import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'src', 'data', 'articles.ts');
const outDir = path.join(rootDir, 'src', 'data', 'articles');
const indexPath = path.join(outDir, 'index.ts');
const metaPath = path.join(rootDir, 'src', 'data', 'articles-meta.ts');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const source = fs.readFileSync(sourcePath, 'utf-8');

// 提取所有文章对象：以两个空格开头的 'id': { ... }，支持嵌套大括号
const articleRegex = /^  '([a-z][a-z0-9-]*)':\s*\{([\s\S]*?)\n  \},?/gm;
const articles = [];
let match;
while ((match = articleRegex.exec(source)) !== null) {
  const id = match[1];
  const body = match[2];

  // 提取 title / description / date / readTime / related
  const title = body.match(/title:\s*'([^']+)'/)?.[1] ?? '';
  const description = body.match(/description:\s*'([^']+)'/)?.[1] ?? '';
  const date = body.match(/date:\s*'([^']+)'/)?.[1] ?? '';
  const readTime = body.match(/readTime:\s*'([^']+)'/)?.[1] ?? '';
  const relatedMatch = body.match(/related:\s*\[([^\]]+)\]/);
  const related = relatedMatch
    ? relatedMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean)
    : [];

  // 提取 content: `...` 或 content: "..."
  let content = '';
  const backtickMatch = body.match(/content:\s*`([\s\S]*?)`\s*,?\s*\n/);
  if (backtickMatch) {
    content = backtickMatch[1];
  } else {
    const quoteMatch = body.match(/content:\s*"([\s\S]*?)"\s*,?\s*\n/);
    if (quoteMatch) content = quoteMatch[1];
  }

  articles.push({ id, title, description, date, readTime, related, content });
}

console.log(`Found ${articles.length} articles`);

// 生成每篇文章的独立文件
for (const a of articles) {
  const escapedContent = a.content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const relatedLine = a.related.length > 0
    ? `  related: [${a.related.map(r => `'${r}'`).join(', ')}],\n`
    : '';

  const fileContent = `import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: '${a.id}',
  title: '${a.title.replace(/'/g, "\\'")}',
  description: '${a.description.replace(/'/g, "\\'")}',
  date: '${a.date}',
  readTime: '${a.readTime}',
${relatedLine}  content: \`${escapedContent}\`,
};

export default article;
`;
  fs.writeFileSync(path.join(outDir, `${a.id}.ts`), fileContent, 'utf-8');
}

// 生成聚合 index.ts（保留 ALL_ARTICLES 兼容旧代码，但建议逐步替换）
const imports = articles.map(a => `import ${a.id.replace(/-/g, '_')} from './${a.id}';`).join('\n');
const exports = articles.map(a => `  '${a.id}': ${a.id.replace(/-/g, '_')},`).join('\n');

const indexContent = `${imports}
import type { IArticle } from '@/types/tutorial';

export const ALL_ARTICLES: Record<string, IArticle> = {
${exports}
};

export const ARTICLE_IDS_WITH_FULL_CONTENT = new Set(Object.keys(ALL_ARTICLES));

export async function loadArticle(id: string): Promise<IArticle | null> {
  try {
    const mod = await import(/* @vite-ignore */ \`./\${id}.ts\`);
    return mod.default || null;
  } catch {
    return null;
  }
}
`;

fs.writeFileSync(indexPath, indexContent, 'utf-8');

// 同步更新 articles-meta.ts：去掉 content 字段，只保留元数据
const metaLines = [];
metaLines.push(`// EXPORTS: ALL_ARTICLES_META - Article metadata only (no full content)`);
metaLines.push(`import type { IArticle } from '@/types/tutorial';`);
metaLines.push(`export const ALL_ARTICLES_META: Record<string, Omit<IArticle, 'content'>> = {`);

for (const a of articles) {
  const relatedLine = a.related.length > 0
    ? `    related: [${a.related.map(r => `'${r}'`).join(', ')}],\n`
    : '';
  metaLines.push(`  '${a.id}': {`);
  metaLines.push(`    id: '${a.id}',`);
  metaLines.push(`    title: '${a.title.replace(/'/g, "\\'")}',`);
  metaLines.push(`    description: '${a.description.replace(/'/g, "\\'")}',`);
  metaLines.push(`    date: '${a.date}',`);
  metaLines.push(`    readTime: '${a.readTime}',`);
  if (relatedLine) metaLines.push(relatedLine.trimEnd());
  metaLines.push(`  },`);
}

metaLines.push(`};
`);
metaLines.push(`export const ARTICLE_IDS_WITH_FULL_CONTENT = new Set(Object.keys(ALL_ARTICLES_META));`);

fs.writeFileSync(metaPath, metaLines.join('\n') + '\n', 'utf-8');

console.log(`✅ Generated ${articles.length} article files in src/data/articles/`);
console.log(`✅ Updated src/data/articles/index.ts`);
console.log(`✅ Updated src/data/articles-meta.ts (metadata only)`);
