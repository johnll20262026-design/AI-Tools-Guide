import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist', 'client');
const indexPath = path.join(distDir, 'index.html');

let html = readFileSync(indexPath, 'utf-8');

const appName = 'AI工具指南 - 面向中文用户的AI工具实战教程与落地指南';
const appDescription = '面向中文用户的AI工具实战教程与落地指南，提供系统化的AI工具学习路径，涵盖Prompt工程、AI绘画、AI视频、AI编程、AI办公、AI Agent、模型部署、AI安全等核心领域，配套免费在线工具。';
const favicon = '/favicon.svg';

html = html.replace(/window\.appId = "\{\{appId\}\}";[\s\S]*?document\.head\.appendChild\(teaScript\);<\/script>/g, '');

html = html.replace(/<title>\{\{appName\}\}<\/title>/g, `<title>${appName}</title>`);
html = html.replace(/content="\{\{appDescription\}\}"/g, `content="${appDescription}"`);
html = html.replace(/content="\{\{appName\}\}"/g, `content="${appName}"`);
html = html.replace(/href="\{\{appAvatar\}\}"/g, `href="${favicon}"`);
html = html.replace(/content="\{\{appAvatar\}\}"/g, `content="${favicon}"`);

writeFileSync(indexPath, html, 'utf-8');
console.log('✅ Post-build: Fixed index.html template placeholders and removed Miaoda scripts');
