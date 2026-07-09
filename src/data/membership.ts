export interface IMembershipPlan {
  id: 'basic' | 'premium';
  name: string;
  icon: string;
  badge?: string;
  earlyBirdPrice: number;
  originalPrice: number;
  savings: number;
  features: {
    title: string;
    icon: string;
    items: string[];
  }[];
  cta: string;
}

export const MEMBERSHIP_PLANS: IMembershipPlan[] = [
  {
    id: 'basic',
    name: '基础版',
    icon: '🥉',
    earlyBirdPrice: 69,
    originalPrice: 299,
    savings: 230,
    features: [
      {
        title: '每日 AI 行业资讯精选',
        icon: '📰',
        items: [
          '当日 AI 圈最重要新闻动态，国内海外双覆盖',
          '大厂最新动态、行业政策、融资消息、技术突破一手掌握',
          '免费 API、免费大模型、免费工具、免费资源第一时间汇总',
          'AI + 投资相关动态同步更新，AI 概念股、AI + 金融、AI 量化投资最新进展',
          '每天 5 分钟快速了解 AI 圈子最新动态，信息差直接拉满',
        ],
      },
      {
        title: '每日 AI 赚钱案例汇总',
        icon: '💰',
        items: [
          '精选最新 AI 赚钱真实案例，国内（人民币）+ 海外（美金）双视角',
          '覆盖全赛道：AI 内容创作、AI 视频、AI 绘画设计、AI Agent 自动化',
          'AI 工具变现、AI 代运营、AI 小程序/APP、AI 电商、AI 教育、AI 音乐',
          '每个案例包含：平台、玩法、收益、详细拆解、可复制程度',
          '每天都能看到新机会，找到适合自己的搞钱方向',
        ],
      },
      {
        title: '每日 AI 工具评测推荐',
        icon: '🛠️',
        items: [
          '每天精选 1-2 个最好用的 AI 工具，优中选优，不浪费时间试错',
          '功能特点、使用技巧、适用场景、优缺点分析、价格对比',
          '实战案例：别人用这个工具做出了什么成果，赚了多少钱',
          'Codex、Claude Code 等热门工具深度实测',
          'AI 剪视频、AI 自动发视频、AI 音乐生成等工具横评',
        ],
      },
    ],
    cta: '立即订阅基础版',
  },
  {
    id: 'premium',
    name: '定制版',
    icon: '🥇',
    badge: '🌟 最划算',
    earlyBirdPrice: 199,
    originalPrice: 699,
    savings: 500,
    features: [
      {
        title: '包含基础版全部内容',
        icon: '✅',
        items: [
          '每日 AI 行业资讯精选',
          '每日 AI 赚钱案例汇总',
          '每日 AI 工具评测推荐',
        ],
      },
      {
        title: '行业定制资讯',
        icon: '🎯',
        items: [
          '根据你的行业、所在城市、具体需求，每天额外推送定制化内容',
          '不只是泛泛的 AI 资讯，而是直接跟你的生意/工作相关的干货',
          '商家/程序员/音乐人/教育等各行业专属内容定制',
          '本地行业动态、同行玩法、热点分析一手掌握',
        ],
      },
      {
        title: '个性化工具推荐',
        icon: '🔧',
        items: [
          '针对你的工作/业务场景，推荐最合适的 AI 工具和使用方法',
          '不是泛泛推荐，而是直接告诉你工具在你的场景下怎么用',
          '不定期分享独家使用技巧、高阶玩法、避坑指南',
        ],
      },
      {
        title: '免费赠送 AI 定制专属音乐 1 首',
        icon: '🎁',
        items: [
          '生日祝福、表白情歌、店铺主题曲、手机铃声、视频 BGM 都可以',
          '可指定风格、主题、歌词方向，生成 2-3 版供选择',
          '价值 299 元，相当于会员白嫖还倒赚 100 元',
        ],
      },
    ],
    cta: '立即订阅定制版',
  },
];

export const MEMBERSHIP_EARLY_BIRD_LIMIT = 10;
