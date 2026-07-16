import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'case-1-5',
  title: 'AI编程助手实战步骤5：一键部署与CI/CD配置',
  description: 'AI生成Dockerfile和GitHub Actions配置，Vercel自动部署，实现git push自动发布上线。',
  date: '2026-05-19',
  readTime: '12-15 分钟',
  content: `## 开篇：最后一步！让全世界看到你的网站

**时间投入预期**：这一步大概需要40分钟-1小时。第一次部署可能会遇到点小问题，但解决一次以后就顺了。部署完你就可以把链接发给朋友炫耀了！

**做完你能得到什么**：一个真正上线的、任何人都能通过公网访问的网站！你会掌握自动化部署流程——以后改完代码只要git push，网站自动更新，不用手动传文件。

**真实成果展示**：我第一次用Vercel部署网站的时候，从注册到上线只用了8分钟——真的，Vercel对Next.js的支持好到离谱，点几下就好。那个AI壁纸站部署完我分享到群里，当天就有50多个人访问，第二个月广告赚了2000多，那种自己的作品被人用的感觉，真的很爽。

**⚠️ 避坑提醒**：很多人走到最后一步了卡在环境变量或者数据库连接，功亏一篑。别急，一步一步来，遇到错误把信息复制给AI，部署问题都不难解决。记住：**本地能build成功，线上90%能跑起来**。

---

## 不同人群适配建议

### 👶 零基础朋友
- 直接用Vercel部署！不要折腾服务器、Docker、Nginx这些，Vercel是最简单的，零配置，你跟着点按钮就行
- 数据库直接用Vercel Postgres或者Neon免费版，不用自己装数据库
- 环境变量一个一个对着.env.example加，别漏了，漏一个就报错
- 不用配CI/CD，Vercel默认就有自动部署，你push代码自动上线，够你用了

### 🎓 学生做毕设
- Vercel免费版足够用，部署完可以买个便宜域名（几块钱一年的学生域名），访问地址好看点
- 答辩的时候直接打开线上网站演示，比在本地跑有说服力多了，老师一看就知道你真做出来了
- 可以在论文里写"本项目采用Vercel云平台部署，配合CI/CD实现自动化发布"，显得专业
- 把部署步骤和CI/CD配置截图放到论文里，凑字数还显得工作量足

### 👨‍💻 独立开发者做产品
- Vercel Pro版或者自己买服务器部署都可以，初期Vercel免费版完全够用，等用户多了再迁移
- 数据库用Neon/Supabase，免费额度够你用到几千用户
- 一定要配CI，跑lint和测试，不要把没测试过的代码部署上去
- 配置好自定义域名、HTTPS（Vercel自动配）、监控和错误上报
- 加个分析脚本（Umami/Plausible，简单免费），看用户访问数据

### 👥 小团队快速开发
- 配置完整CI/CD：PR跑测试、preview部署，合并main自动部署生产
- 数据库用云服务（RDS/Neon），有自动备份
- 配置staging环境和production环境，测试完再发生产
- 团队每个人的PR都有preview链接，方便产品经理测试
- 部署通知发到群里，谁部署了什么都知道

---

## 工具准备
- GitHub账号（代码托管，没有就注册一个，免费）
- Vercel账号（用GitHub登录就行，免费）
- 项目代码已经commit并push到GitHub仓库（不会？问AI"怎么把本地代码push到GitHub"，它一步一步教你）
- 本地build能通过：\\\`pnpm build\\\` 没有错误（这个很重要！本地build不过线上肯定过不了）

---

## 操作步骤（超详细版）

### 步骤0：先把代码推到GitHub（5分钟）

还没推代码的先推，不然Vercel拿不到你的代码：

1. **在GitHub创建一个新仓库**
   - 访问github.com，登录后点右上角"+"→New repository
   - 仓库名填ai-blog，选Public（公开）或者Private（私有）都行，免费版可以建私有仓库
   - 不要勾README、.gitignore、license（因为你本地已经有了），点Create repository
   - 创建完GitHub会给你推送命令，复制"…or push an existing repository from the command line"下面那几行命令

2. **本地推代码**
   - 在项目根目录打开终端，依次执行GitHub给你的命令，大概是这样：
     \\\`\\\`\\\`bash
     git remote add origin https://github.com/你的用户名/ai-blog.git
     git branch -M main
     git push -u origin main
     \\\`\\\`\\`,
};

export default article;
