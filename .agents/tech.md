# Vite React Stack

## 技术栈

- 构建：Vite 8 + TypeScript
- UI：React 19 + shadcn-ui + Radix Primitives + Tailwind CSS v4
- 路由：react-router-dom v7
- 表单：react-hook-form + zod
- 图表：echarts-for-react / recharts
- 动画：framer-motion / gsap

## 目录结构

```
my-app/
├── src/
│   ├── assets/         # 代码 import 的静态资源（图标、组件用图）
│   ├── components/     # 业务组件
│   │   └── ui/         # shadcn-ui 基础组件（不要直接改）
│   ├── pages/          # 路由页面
│   ├── hooks/          # 自定义 hooks
│   └── lib/            # 工具函数
├── public/             # 固定 URL 的公开静态资源（favicon 等）
├── index.html
├── vite.config.ts
└── package.json
```

路径别名：

- `@/*` → `./src/*`

## 静态资源放哪——判定规则

1. **代码里要 `import` 它吗？**（组件用的图标、被引用的图片、CSS 里的小图）
   → `src/assets/`，用 `import url from '@/assets/foo.png'`。
   Vite 会 hash + 优化，进 CDN。**绝大多数情况选这条。**

2. **必须是固定 URL 文件名吗？**（favicon、被外部系统按 URL 抓取、第三方 SDK 写死路径）
   → `public/`。
   - HTML 里：`<link rel="icon" href="/favicon.svg" />`（Vite 自动重写到 BASE_URL）
   - JSX/CSS 里使用 `${import.meta.env.BASE_URL}foo.png`。

## 核心约定

1. **shadcn-ui 组件不直接改源码**——需要变化时通过 `className` / `variant` props 控制。
2. **样式优先用 Tailwind utility**，避免写 CSS module。
3. **表单始终用 react-hook-form + zod**——不要直接操作 input value。
4. **图表 ECharts 优先 echarts-for-react**——React 19 严格模式下注意 echarts instance 的初始化时机。
