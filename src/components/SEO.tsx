import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = 'AI工具指南';
const DEFAULT_DESCRIPTION = '面向中文用户的AI工具实战教程与落地指南，提供系统化的AI工具学习路径，涵盖Prompt工程、AI绘画、AI视频、AI编程、AI办公、AI Agent等核心领域，配套免费在线工具。';
const DEFAULT_KEYWORDS = 'AI工具教程,Prompt工程,AI绘画,AI视频,AI编程,AI办公,AI Agent,模型部署,AI安全,人工智能学习,中文AI教程,AI实战指南,Cursor,Midjourney,Stable Diffusion,LangChain,口袋调音器';

export default function SEO({ title, description, keywords, ogImage }: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const kw = keywords || DEFAULT_KEYWORDS;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('keywords', kw);
    setMeta('author', 'AI Tools Guide');

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', desc, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', DEFAULT_TITLE, true);
    if (ogImage) {
      setMeta('og:image', ogImage, true);
    }

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    if (ogImage) {
      setMeta('twitter:image', ogImage);
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, keywords, ogImage]);

  return null;
}
