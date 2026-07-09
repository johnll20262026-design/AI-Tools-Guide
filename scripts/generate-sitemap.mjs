import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function generateSitemap() {
  const baseUrl = process.env.SITE_URL || 'https://aitoolsguide.cn';

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/membership', changefreq: 'weekly', priority: '0.8' },
    { url: '/resources', changefreq: 'weekly', priority: '0.7' },
    { url: '/tuner', changefreq: 'monthly', priority: '0.6' },
    { url: '/lottery', changefreq: 'weekly', priority: '0.5' },
    { url: '/about', changefreq: 'monthly', priority: '0.5' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
  ];

  const articlesPath = path.join(rootDir, 'src', 'data', 'articles.ts');
  const articlesContent = fs.readFileSync(articlesPath, 'utf-8');

  const articleIdRegex = /^\s{2}'([a-z][a-z0-9-]+)':\s*\{/gm;
  const articleIds = [];
  let match;
  while ((match = articleIdRegex.exec(articlesContent)) !== null) {
    articleIds.push(match[1]);
  }

  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of staticPages) {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  for (const id of articleIds) {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/article/${id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`✓ Sitemap generated with ${staticPages.length + articleIds.length} URLs`);
}

generateSitemap().catch(console.error);
