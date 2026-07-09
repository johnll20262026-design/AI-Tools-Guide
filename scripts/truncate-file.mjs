import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const articlesPath = path.join(rootDir, 'src', 'data', 'articles.ts');
const content = fs.readFileSync(articlesPath, 'utf-8');
const lines = content.split('\n');

// 保留前2009行（case-4-2结束的位置）
const keepLines = lines.slice(0, 2009);
const newContent = keepLines.join('\n') + `
};

export const ARTICLE_IDS_WITH_FULL_CONTENT = new Set(Object.keys(ALL_ARTICLES));
`;

fs.writeFileSync(articlesPath, newContent, 'utf-8');
console.log(`File truncated. Current article count: ${(newContent.match(/^\s{2}'[a-z0-9-]+':\s*\{/gm) || []).length}`);
