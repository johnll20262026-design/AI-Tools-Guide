import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'video-3',
  title: 'Pika Labs 创意视频制作：特效、转场与风格化',
  description: '用 Pika 实现 lip sync、画面扩展和风格转换，打造吸睛的社交媒体短视频。',
  date: '2026-05-05',
  readTime: '25 分钟',
  content: `## 通俗类比：Pika是AI视频界的特效魔术师

如果说Runway是瑞士军刀什么都能干，Sora是顶级摄影机画质无敌，那Pika就是一个年轻、新潮、鬼点子特别多的特效魔术师——它不跟你比谁的视频更真实更长，它专门玩"花活"：真人一秒转动漫、照片里的人开口说话、爆炸融化变形特效、丝滑无缝转场……这些在以前要After Effects做好几天的特效，Pika输入一句话10秒钟就给你搞定。

Pika是AI视频赛道的"鬼才"——这家公司三个创始人都是华人，2023年才成立，短短一年时间就靠"风格化"和"特效"这两手绝活杀出一条血路，跟Runway、Sora形成了三足鼎立的局面。为什么自媒体人、短视频创作者最爱Pika？因为它做出来的东西"自带流量"——你用Pika做一个"真人转动漫"的视频，或者"老照片开口说话"的视频，发抖音小红书天然就有爆款相，大家看了都想"这是怎么做的？"

Pika最开始在Discord上起家，很多人因为Pika才第一次下载Discord——那种在聊天框里输入指令、几秒钟后机器人给你回一个炫酷视频的体验，用过就回不去了。现在Pika也有了官网pika.art，功能更全，但Discord那种"快速迭代、跟网友一起玩"的社区氛围依然是Pika的灵魂。

## Pika核心特色功能：玩特效，Pika说第二没人说第一

### 1. Lip Sync（对口型）——让任何人开口说话
这是Pika的招牌功能，也是目前所有AI视频工具里对口型效果最好的，没有之一。
- 用法很简单：上传一段人物视频（正面最好），再上传一段音频（可以是你自己录的、AI配音的、甚至是别人说的话），Pika就能让视频里的人完美对上音频的口型
- 效果有多好？做得好的话，很多人根本看不出来是AI对的口型——嘴唇动作、牙齿、甚至舌头的位置都对
- 支持语言：中文、英文效果都很好，其他语言也支持
- 创意玩法：
  - 让老照片里的爷爷奶奶开口说话（配合图生视频+Lip Sync）
  - 让动漫人物说中文
  - 让蒙娜丽莎唱流行歌
  - 给你家猫和狗配音，让它们"说话"
  - 做数字人口播视频

### 2. 风格转换——一键切换任意视觉风格
这是Pika最受欢迎的功能，也是最容易出爆款的功能。上传一段视频或者一张图片，告诉Pika你要什么风格，它就能给你转过去。
- 常见风格：
  - 动漫风格：Studio Ghibli（吉卜力）、anime style、Makoto Shinkai（新海诚）、Disney style（迪士尼）
  - 3D/动画：Pixar style（皮克斯）、claymation（黏土动画）、stop motion（定格动画）、LEGO animation（乐高）
  - 艺术风格：oil painting（油画）、watercolor（水彩）、Van Gogh style（梵高）、pencil sketch（铅笔素描）
  - 复古风格：80s retro、90s VHS、vintage film、silent movie（默片）
  - 特殊风格：cyberpunk、steampunk、pixel art（像素）、low poly（低多边形）
- 技巧：风格词越强烈、越具体，效果越好。不要只写"anime style"，要写"Studio Ghibli anime style, vibrant colors, Hayao Miyazaki"

### 3. 特效（Effects）——文字一键加视觉特效
Pika内置了很多电影级特效，只要在Prompt里写关键词就能触发：
- 爆炸特效：explosion、blast、boom
- 变形特效：morphing、transforming、melting
- 元素特效：fire、ice、water、lightning、smoke、particles
- 时间特效：slow motion、fast motion、time freeze
- 视觉特效：glitch effect、neon glow、lens flare、bokeh
- 最厉害的是"场景转换特效"：比如"morphing from a city street to a forest"——一个镜头里直接从城市街道 morph 成森林，丝滑无缝，这种转场以前要专业特效师做好几天，Pika一句话搞定。

### 4. Inpainting（局部修改）
跟Runway类似，但Pika的Inpainting更"大胆"——你可以涂掉视频里的任何东西，告诉它换成什么：
- 涂掉路人，换成一只猫
- 涂掉人物的衣服，换成盔甲
- 涂掉天空，换成外星飞船
- 还可以加东西：在桌上加一杯咖啡，在天上加一条龙
Pika的Inpainting创意空间更大，适合做各种脑洞大开的特效。

### 5. Expand（画面扩展）
跟Runway类似，把画面往外扩，特别适合改比例：
- 把横屏视频扩成竖屏9:16发抖音
- 把特写扩成中景/全景
- 给视频加更多上下左右的内容

### 6. 文生视频/图生视频
Pika的基础功能，虽然单论"真实感"不如Sora和Runway，但Pika的文生视频有两个特点：
1. 风格化效果特别好，做动漫、3D、艺术风格比Runway还强
2. 生成速度极快，在Discord里几秒钟就出片，适合快速试错迭代
3. 支持的时长：目前最长7秒（可以延长到20秒左右），适合做短平快的社交媒体内容

## 使用方式详解：Discord vs 官网

Pika有两种使用方式，各有优势：

### 方式一：Discord（最有氛围感，适合玩创意）
1. 先注册Discord账号
2. 加入Pika官方服务器：discord.gg/pika
3. 在任意"generate"频道里，输入 \\\`/create\\\` 指令
4. 可以直接输入Prompt，也可以上传图片/视频作为起始
5. 几秒钟后Pika机器人就会给你回生成的视频
6. 还能看到其他人生成的视频，看到好的Prompt可以直接抄作业——这就是Discord社区最大的好处

### 方式二：Pika官网（pika.art）（适合正经干活）
1. 打开pika.art注册登录
2. 界面更友好，功能更全，不用记Discord指令
3. 有更好的编辑界面：Motion Brush、Inpainting、Lip Sync都在这里
4. 可以管理你的作品，方便整理下载
5. 专业创作者还是建议用官网，效率更高

### Pika常用参数（必记）
跟Midjourney一样，Pika也有参数控制，在Prompt最后加就行：
- \\\`-ar 16:9\\\` 宽高比（16:9横屏、9:16竖屏、1:1正方形、4:3、3:2等）
- \\\`-motion 0-4\\\` 运动强度（0几乎不动，4动得最厉害，默认2）
- \\\`-fps 24\\\` 帧率（8-30可选，默认24）
- \\\`-seed 12345\\\` 种子值（同一个Seed+同一个Prompt出相似结果）
- \\\`-neg xxx, xxx\\\` 反向提示词（不想看到什么）
- \\\`-gs 8-20\\\` 引导尺度（数值越高越听Prompt的话，默认12）
- \\\`-camera\\\` 后面加镜头运动：\\\`zoom in\\\`、\\\`zoom out\\\`、\\\`pan left\\\`、\\\`pan right\\\`、\\\`tilt up\\\`、\\\`tilt down\\\`、\\\`rotate\\`,
};

export default article;
