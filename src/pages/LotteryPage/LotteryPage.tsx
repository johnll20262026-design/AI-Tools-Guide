import { useState, useRef, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, Sparkles, ChevronRight, Play, Copy, Camera, Check, Home, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QrCodeImage from '@/components/QrCodeImage';

interface IPrize {
  id: number;
  name: string;
  wheelName: string;
  value: string;
  probability: number;
  color: string;
  description: string;
  claimMethod: string;
  isFree: boolean;
  originalPrice: number;
  winPrice: number; // 抽中后的价格，免费奖品为0
}

const PRIZES: IPrize[] = [
  {
    id: 1,
    name: 'AI提示词万能宝典',
    wheelName: 'AI提示词\n万能宝典',
    value: '价值399元',
    probability: 0.10,
    color: '#ff3388',
    description: '【2026最新版】多行业精准提示词合集，涵盖写作、编程、设计、营销、数据分析、短视频创作等10+热门领域，500+高质量即用型提示词模板，大模型通用，附高阶使用教程资料大全。',
    claimMethod: '关注公众号 → 发送中奖截图+中奖码，免费领取',
    isFree: true,
    originalPrice: 399,
    winPrice: 0,
  },
  {
    id: 2,
    name: 'AI视频制作实战教程',
    wheelName: 'AI视频制作\n实战教程',
    value: '价值699元',
    probability: 0.10,
    color: '#994dff',
    description: '【2026课程】AI视频制作全攻略（豆包+即梦+剪映），从文案生成、AI绘画、视频剪辑到自动化发布全流程，从入门到精通系统实战课程，配套8.7GB+资料素材大全。',
    claimMethod: '关注公众号 → 发送中奖截图+中奖码，免费领取',
    isFree: true,
    originalPrice: 699,
    winPrice: 0,
  },
  {
    id: 3,
    name: 'AI Agent安装服务',
    wheelName: 'AI Agent\n安装服务',
    value: '原价4999元',
    probability: 0.50,
    color: '#3377ff',
    description: '四款主流AI Agent工具全装全配：AutoGPT、MetaGPT、CrewAI、LangChain Agent，含环境配置与基础调优。',
    claimMethod: '关注公众号 → 发送中奖截图+中奖码，专属优惠价XXX元上门/远程安装',
    isFree: false,
    originalPrice: 4999,
    winPrice: 0, // TODO: 确定优惠价后修改，占位用0
  },
  {
    id: 4,
    name: 'AI定制音乐',
    wheelName: 'AI定制音乐',
    value: '原价999元',
    probability: 0.30,
    color: '#00bcd4',
    description: '专业AI音乐制作人为你定制一首专属音乐，可用于视频配乐、品牌主题曲、个人纪念等场景。',
    claimMethod: '关注公众号 → 发送中奖截图+中奖码，抽中专享价299元定制',
    isFree: false,
    originalPrice: 999,
    winPrice: 299,
  },
  {
    id: 5,
    name: '网站定制',
    wheelName: '网站定制',
    value: '原价1999元',
    probability: 0,
    color: '#88dd22',
    description: '专业团队为你量身定制个人品牌网站或商家官网，含响应式设计、SEO优化、域名配置一站式服务。',
    claimMethod: '关注公众号 → 发送中奖截图+中奖码，专属优惠价XXX元定制',
    isFree: false,
    originalPrice: 1999,
    winPrice: 0,
  },
  {
    id: 6,
    name: '专家1对1咨询',
    wheelName: '专家1对1\n咨询',
    value: '原价3999元',
    probability: 0,
    color: '#ffbb00',
    description: '资深AI技术专家一对一深度咨询，涵盖AI工具选型、高效工作流搭建、AI自动化剪辑/内容生产、AI Agent落地部署、自动化流程定制等前沿场景，帮你快速打通AI落地全链路。',
    claimMethod: '关注公众号 → 发送中奖截图+中奖码，专属优惠价XXX元咨询',
    isFree: false,
    originalPrice: 3999,
    winPrice: 0,
  },
];

const SEGMENT_COUNT = PRIZES.length;
const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENT_COUNT;

// ========== 音效 ==========
let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.15) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch { /* 静默 */ }
}

function playStartSound() {
  playTone(880, 0.12, 'sine', 0.2);
  setTimeout(() => playTone(1100, 0.15, 'sine', 0.18), 100);
}

function playTickSound() {
  playTone(600, 0.04, 'square', 0.06);
}

function playWinSound() {
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.18), i * 120));
}

// ========== 中奖码生成 ==========
// 奖品缩写映射
const PRIZE_CODE_MAP: Record<number, string> = {
  1: 'PRO', // AI提示词万能宝典 Prompt
  2: 'VID', // AI视频制作
  3: 'AGT', // AI Agent安装
  4: 'MUS', // AI定制音乐
  5: 'WEB', // 网站定制
  6: 'VIP', // 专家1对1咨询
};

function generateWinCode(prizeId: number): string {
  const prefix = PRIZE_CODE_MAP[prizeId] || 'WIN';
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${mm}${dd}-${rand}`;
}

// ========== 烟花 ==========
interface IFireworkParticle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string; size: number;
}

const FW_COLORS = ['#fbbf24','#f59e0b','#ef4444','#ec4899','#8b5cf6','#10b981','#3b82f6','#f97316'];

function FireworksCanvas({ active, cx, cy }: { active: boolean; cx: number; cy: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<IFireworkParticle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) { particlesRef.current = []; return; }

    const spawn = (bx: number, by: number) => {
      const n = 40 + Math.floor(Math.random() * 30);
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.3;
        const s = 2 + Math.random() * 5;
        particlesRef.current.push({ x: bx, y: by, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, maxLife: 40 + Math.random() * 40, color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)], size: 2 + Math.random() * 3 });
      }
    };

    spawn(cx, cy);
    setTimeout(() => spawn(cx - 60, cy - 40), 200);
    setTimeout(() => spawn(cx + 70, cy - 30), 350);
    setTimeout(() => spawn(cx - 40, cy + 50), 500);
    setTimeout(() => spawn(cx + 50, cy + 40), 650);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life++;
        if (p.life >= p.maxLife) { ps.splice(i, 1); continue; }
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.99;
        const alpha = 1 - p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (ps.length > 0) animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [active, cx, cy]);

  if (!active) return null;
  return <canvas ref={canvasRef} width={cx * 2} height={cy * 2} className="absolute top-0 left-0 z-40 pointer-events-none" />;
}

// ========== 转盘绘制 ==========
function drawWheel(ctx: CanvasRenderingContext2D, size: number, rotation: number, _dpr: number = 1) {
  const cx = size / 2;
  const cy = size / 2;
  const ringW = 14;
  const outerR = size / 2 - 2;
  const innerR = outerR - ringW;
  const radius = innerR - 2;

  ctx.clearRect(0, 0, size, size);

  // 白色外圈
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // 扇区间白色分隔线（从中心点出发）
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const angle = rotation + i * SEGMENT_ANGLE;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // 扇区
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const startAngle = rotation + i * SEGMENT_ANGLE;
    const endAngle = startAngle + SEGMENT_ANGLE;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = PRIZES[i].color;
    ctx.fill();

    // 文字
    const midAngle = startAngle + SEGMENT_ANGLE / 2;
    const textR = radius * 0.68;
    const tx = cx + Math.cos(midAngle) * textR;
    const ty = cy + Math.sin(midAngle) * textR;

    ctx.save();
    ctx.translate(tx, ty);

    const drawAngle = midAngle - Math.PI / 2 + Math.PI;
    ctx.rotate(drawAngle);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const wheelName = PRIZES[i].wheelName;
    const lines = wheelName.split('\n');
    const fontSize = Math.max(13, size / 25);

    ctx.font = `900 ${fontSize}px "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif`;

    // 非常轻微的暗色描边让文字边缘更锐利清晰
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1.2;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    // 纯白色填充
    ctx.fillStyle = '#ffffff';

    if (lines.length === 1) {
      ctx.strokeText(lines[0], 0, 0);
      ctx.fillText(lines[0], 0, 0);
    } else {
      ctx.strokeText(lines[0], 0, -fontSize * 0.65);
      ctx.fillText(lines[0], 0, -fontSize * 0.65);
      ctx.strokeText(lines[1], 0, fontSize * 0.65);
      ctx.fillText(lines[1], 0, fontSize * 0.65);
    }

    ctx.restore();
  }
}

// ========== 主组件 ==========
function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getInitialLotteryState(): { remaining: number; extraClaimed: boolean } {
  if (typeof window === 'undefined') return { remaining: 1, extraClaimed: false };
  const today = getTodayString();
  const savedDate = localStorage.getItem('lottery_date');
  const savedCount = localStorage.getItem('lottery_remaining');
  const savedExtraDate = localStorage.getItem('lottery_extra_date');
  if (savedDate === today && savedCount !== null) {
    return {
      remaining: parseInt(savedCount, 10),
      extraClaimed: savedExtraDate === today,
    };
  }
  localStorage.setItem('lottery_date', today);
  localStorage.setItem('lottery_remaining', '1');
  localStorage.removeItem('lottery_extra_date');
  return { remaining: 1, extraClaimed: false };
}

export default function LotteryPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const [spinning, setSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<IPrize | null>(null);
  const [winCode, setWinCode] = useState('');
  const [winTime, setWinTime] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const initialState = getInitialLotteryState();
  const [remainingDraws, setRemainingDraws] = useState(initialState.remaining);
  const [extraClaimed, setExtraClaimed] = useState(initialState.extraClaimed);
  const [showFireworks, setShowFireworks] = useState(false);
  const animFrameRef = useRef<number>(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleFrameRef = useRef<number>(0);
  const idleLastTimeRef = useRef<number>(0);

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const canvasSize = typeof window !== 'undefined' ? Math.min(460, window.innerWidth - 32) : 460;
  const canvasPxSize = canvasSize * dpr;
  const cx = canvasSize / 2;
  const cy = canvasSize / 2;

  useEffect(() => {
    const today = getTodayString();
    localStorage.setItem('lottery_date', today);
    localStorage.setItem('lottery_remaining', String(remainingDraws));
  }, [remainingDraws]);

  useEffect(() => {
    if (extraClaimed) {
      localStorage.setItem('lottery_extra_date', getTodayString());
    }
  }, [extraClaimed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasPxSize;
    canvas.height = canvasPxSize;
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawWheel(ctx, canvasSize, 0, dpr);

    // idle慢转：匀速缓慢旋转（约43秒一圈，非常柔和）
    const IDLE_SPEED = 0.000145; // 弧度/ms，一圈约43秒
    const idleAnimate = (now: number) => {
      if (idleLastTimeRef.current === 0) idleLastTimeRef.current = now;
      const dt = now - idleLastTimeRef.current;
      idleLastTimeRef.current = now;
      rotationRef.current += IDLE_SPEED * dt;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawWheel(ctx, canvasSize, rotationRef.current, dpr);
      ctx.restore();
      idleFrameRef.current = requestAnimationFrame(idleAnimate);
    };
    idleLastTimeRef.current = 0;
    idleFrameRef.current = requestAnimationFrame(idleAnimate);

    return () => {
      if (idleFrameRef.current) cancelAnimationFrame(idleFrameRef.current);
    };
  }, [canvasSize, canvasPxSize, dpr]);

  const claimExtra = useCallback(() => {
    if (extraClaimed) return;
    const today = getTodayString();
    localStorage.setItem('lottery_extra_date', today);
    setExtraClaimed(true);
    setRemainingDraws(prev => {
      const newCount = prev + 1;
      localStorage.setItem('lottery_remaining', String(newCount));
      return newCount;
    });
  }, [extraClaimed]);

  const spin = useCallback(() => {
    if (spinning || remainingDraws <= 0) return;

    // 停止idle动画
    if (idleFrameRef.current) {
      cancelAnimationFrame(idleFrameRef.current);
      idleFrameRef.current = 0;
    }

    setSpinning(true);
    setRemainingDraws(prev => prev - 1);
    setShowFireworks(false);
    playStartSound();

    tickRef.current = setInterval(() => playTickSound(), 120);

    const rand = Math.random();
    let cumulative = 0;
    let targetIndex = 0;
    for (let i = 0; i < PRIZES.length; i++) {
      cumulative += PRIZES[i].probability;
      if (rand <= cumulative) { targetIndex = i; break; }
    }

    // 指针在顶部 (-π/2)，目标扇区中心对准顶部
    const targetEff = ((3 * Math.PI / 2) - targetIndex * SEGMENT_ANGLE - SEGMENT_ANGLE / 2 + 2 * Math.PI) % (2 * Math.PI);
    const startRot = rotationRef.current;
    const curEff = ((startRot % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let delta = targetEff - curEff;
    if (delta < 0) delta += 2 * Math.PI;

    const fullSpins = 6 + Math.floor(Math.random() * 3);
    const totalRot = fullSpins * 2 * Math.PI + delta;
    const duration = 6000; // 总时长6秒
    const startTime = performance.now();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // tick音效间隔：开始慢→中间快→结束慢
    const tickAdj = () => {
      if (!tickRef.current) return;
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      let interval: number;
      if (progress < 0.15) {
        // 加速阶段：间隔从200ms降到50ms
        interval = 200 - (200 - 50) * (progress / 0.15);
      } else if (progress < 0.55) {
        // 匀速高速阶段：50ms
        interval = 50;
      } else {
        // 减速阶段：间隔从50ms缓慢升到400ms（更慢）
        interval = 50 + (400 - 50) * ((progress - 0.55) / 0.45);
      }
      clearInterval(tickRef.current);
      tickRef.current = setInterval(() => playTickSound(), interval);
    };
    const tickAdjIv = setInterval(tickAdj, 100);

    // 三段式缓动：加速(0-15%) → 匀速高速(15-55%) → 长减速(55-100%)
    const easeSpin = (t: number): number => {
      if (t < 0.15) {
        // 加速：easeInQuad
        const p = t / 0.15;
        return 0.06 * p * p;
      } else if (t < 0.55) {
        // 匀速高速：线性
        return 0.06 + 1.4 * (t - 0.15);
      } else {
        // 减速：easeOutQuart（更缓的减速）
        const p = (t - 0.55) / 0.45;
        return 0.62 + 0.38 * (1 - Math.pow(1 - p, 4));
      }
    };

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeSpin(progress);
      const curRot = startRot + totalRot * eased;
      rotationRef.current = curRot;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawWheel(ctx, canvasSize, curRot, dpr);
      ctx.restore();

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        clearInterval(tickAdjIv);
        if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
        playWinSound();
        setShowFireworks(true);

        const prize = PRIZES[targetIndex];
        const code = generateWinCode(prize.id);
        const now = new Date();
        const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

        setWonPrize(prize);
        setWinCode(code);
        setWinTime(timeStr);

        // 保存中奖记录到localStorage
        try {
          const record = { prizeName: prize.name, code, time: timeStr, value: prize.value };
          const history = JSON.parse(localStorage.getItem('lottery_history') || '[]');
          history.unshift(record);
          localStorage.setItem('lottery_history', JSON.stringify(history.slice(0, 20)));
          localStorage.setItem('lottery_last_win', JSON.stringify(record));
        } catch { /* ignore */ }

        setTimeout(() => setShowDialog(true), 800);
        setSpinning(false);

        // 中奖后停留2秒，再恢复idle慢转
        setTimeout(() => {
          idleLastTimeRef.current = 0;
          const IDLE_SPEED_RESUME = 0.000145;
          const resumeIdle = (rn: number) => {
            if (idleLastTimeRef.current === 0) idleLastTimeRef.current = rn;
            const dt = rn - idleLastTimeRef.current;
            idleLastTimeRef.current = rn;
            rotationRef.current += IDLE_SPEED_RESUME * dt;
            ctx.save();
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            drawWheel(ctx, canvasSize, rotationRef.current, dpr);
            ctx.restore();
            idleFrameRef.current = requestAnimationFrame(resumeIdle);
          };
          idleFrameRef.current = requestAnimationFrame(resumeIdle);
        }, 2000);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [spinning, remainingDraws, canvasSize, dpr, canvasPxSize]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleFrameRef.current) cancelAnimationFrame(idleFrameRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="幸运抽奖" description="AI Tools Guide会员专属幸运抽奖活动，赢取会员时长、1对1咨询等奖品。" />
      <Header />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* 返回导航 */}
        <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap">
          <Button variant="ghost" size="sm" asChild className="h-9 px-3 text-xs md:text-sm">
            <NavLink to="/resources" className="gap-1.5">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">返回免费工具 & 资源中心</span>
              <span className="sm:hidden">返回</span>
            </NavLink>
          </Button>
          <Button variant="ghost" size="sm" asChild className="h-9 px-3 text-xs md:text-sm">
            <NavLink to="/" className="gap-1.5">
              <Home className="size-4" />
              <span className="hidden sm:inline">返回首页</span>
              <span className="sm:hidden">首页</span>
            </NavLink>
          </Button>
        </div>

        {/* 页面标题 */}
        <header className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="size-5 text-primary" />
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Lucky Draw</span>
            <Sparkles className="size-5 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight px-2">
            幸运大转盘 · 100%中奖
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground px-4 leading-relaxed">
            每天抽1次，使用微信扫码进口袋调音器小程序额外获得1次抽奖机会（完全免费·无任何费用）
          </p>
        </header>

        {/* 转盘区域 */}
        <div className="flex flex-col items-center">
          <div className="relative inline-block">
            {/* 投影 */}
            <div
              className="absolute rounded-full"
              style={{
                width: canvasSize + 16, height: canvasSize + 16,
                left: -8, top: 10,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.03) 40%, transparent 70%)',
                filter: 'blur(6px)',
              }}
            />

            <canvas
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
              className="block relative z-10"
            />

            <FireworksCanvas active={showFireworks} cx={cx} cy={cy} />

            {/* 中心水滴按钮 — GO */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.button
                type="button"
                onClick={spin}
                disabled={spinning || remainingDraws <= 0}
                animate={spinning || remainingDraws <= 0 ? {} : { scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative size-[80px] md:size-[90px] cursor-pointer border-0 bg-transparent p-0"
                style={{ cursor: spinning || remainingDraws <= 0 ? 'not-allowed' : 'pointer' }}
              >
                <svg width="100" height="110" viewBox="0 0 100 110" className="block" style={{ width: '100%', height: 'auto' }}>
                  <defs>
                    <linearGradient id="goGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="45%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <radialGradient id="goHl" cx="38%" cy="28%" r="55%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.32)" />
                      <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                    <filter id="goShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#047857" floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* 水滴主体：单一 path 同时 fill 渐变 + stroke 浅绿环，无缝 */}
                  <path
                    d="M50,2 C28,18 8,32 8,58 A42,42 0 1,0 92,58 C92,32 72,18 50,2 Z"
                    fill="url(#goGrad)"
                    stroke="#36d399"
                    strokeWidth="3"
                  />

                  {/* 高光 */}
                  <path
                    d="M50,5 C30,20 12,34 12,58 A38,38 0 1,0 88,58 C88,34 70,20 50,5 Z"
                    fill="url(#goHl)"
                  />

                  {/* 内圈装饰环 */}
                  <circle
                    cx="50"
                    cy="58"
                    r="29"
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1.5"
                  />

                  {/* GO 文字 + 投影 */}
                  <text
                    x="50"
                    y="61"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="22"
                    fontWeight="900"
                    fontFamily='-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'
                    letterSpacing="2"
                    filter="url(#goShadow)"
                  >
                    GO
                  </text>
                </svg>
              </motion.button>
            </div>
          </div>

          {/* 底部开始抽奖按钮 — 绿色圆角+闪烁动画 */}
          <motion.button
            type="button"
            onClick={spin}
            disabled={spinning || remainingDraws <= 0}
            animate={spinning || remainingDraws <= 0 ? {} : { scale: [1, 1.06, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={spinning || remainingDraws <= 0 ? {} : { scale: 1.08 }}
            whileTap={spinning || remainingDraws <= 0 ? {} : { scale: 0.95 }}
            className="mt-8 flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-xl font-bold text-base text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              background: spinning || remainingDraws <= 0 ? '#9ca3af' : 'linear-gradient(180deg, #34d399 0%, #10b981 45%, #059669 100%)',
              boxShadow: spinning || remainingDraws <= 0 ? 'none' : '0 4px 14px rgba(16, 185, 129, 0.4)',
            }}
          >
            <Play className="size-4 fill-white" />
            {spinning ? '抽奖中...' : '开始抽奖'}
          </motion.button>

          <p className="mt-5 text-sm text-muted-foreground">
            今日剩余抽奖次数：
            <span className={`font-bold ${remainingDraws > 0 ? 'text-primary' : 'text-destructive'}`}>
              {remainingDraws}次
            </span>
          </p>

          {/* 额外抽奖机会区域 - 始终显示 */}
          <div
            className="mt-6 w-full max-w-sm bg-gradient-to-br from-primary/10 to-card border border-primary/20 rounded-xl p-5 text-center relative group"
          >
            <p className="text-base font-semibold text-foreground mb-1">🎸 免费口袋调音器小程序</p>
            <p className="text-sm text-muted-foreground mb-1">微信扫码即可使用，额外获得1次抽奖机会</p>
            <p className="text-base font-bold text-primary mb-4">✅ 完全免费 · 无任何费用 ✅</p>
            
            {/* 小程序二维码 */}
            <div className="flex justify-center mb-4 relative">
              <div className="transition-transform group-hover:scale-105">
                <QrCodeImage size="md" label="小程序二维码" src="/miniprogram.png" />
              </div>
              {/* hover提示框 */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                🎸 口袋调音器小程序 - 免费扫码使用
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-3">扫码进入小程序后，点击下方按钮领取额外抽奖机会</p>
            <Button
              onClick={claimExtra}
              disabled={extraClaimed}
              className={`w-full font-semibold ${extraClaimed ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-white'}`}
            >
              {extraClaimed ? '✅ 今日额外机会已领取' : '✅ 领取额外1次抽奖机会'}
            </Button>
          </div>
        </div>

        {/* 抽奖规则 */}
        <Card className="mt-12 border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="size-5 text-primary" />
              抽奖规则
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><ChevronRight className="size-4 mt-0.5 shrink-0 text-primary" />每天可免费抽奖1次，使用微信扫码进入口袋调音器小程序（完全免费·无任何费用）可额外获得1次</li>
              <li className="flex items-start gap-2"><ChevronRight className="size-4 mt-0.5 shrink-0 text-primary" />100%有奖，含免费资料和专属特惠</li>
              <li className="flex items-start gap-2"><ChevronRight className="size-4 mt-0.5 shrink-0 text-primary" />中奖后关注公众号凭截图领取奖品</li>
              <li className="flex items-start gap-2"><ChevronRight className="size-4 mt-0.5 shrink-0 text-primary" />奖品不可兑换现金，特惠奖品需支付中奖价</li>
              <li className="flex items-start gap-2"><ChevronRight className="size-4 mt-0.5 shrink-0 text-primary" />本活动最终解释权归本站所有</li>
            </ul>
          </CardContent>
        </Card>

        {/* 奖品说明 */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">奖品说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRIZES.map((prize) => (
              <Card key={prize.id} className="border-border/60 hover:border-primary/30 transition-colors duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${prize.color}18` }}>
                      <Gift className="size-5" style={{ color: prize.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{prize.name}</CardTitle>
                        {prize.isFree ? (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-green-500/15 text-green-600 dark:text-green-400 shrink-0">免费</span>
                        ) : (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-orange-500/15 text-orange-600 dark:text-orange-400 shrink-0">特惠</span>
                        )}
                      </div>
                      <div className="text-sm font-semibold" style={{ color: prize.color }}>
                        {prize.isFree ? (
                          <span>免费领取（原价{prize.originalPrice}元）</span>
                        ) : prize.winPrice > 0 ? (
                          <span>
                            <span className="line-through text-muted-foreground/70 text-xs mr-1">原价{prize.originalPrice}元</span>
                            抽中价 <span className="text-base">{prize.winPrice}元</span>
                          </span>
                        ) : (
                          <span>原价{prize.originalPrice}元，抽中专属优惠价</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{prize.description}</p>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">领取方式：</span>{prize.claimMethod}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 中奖弹窗 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-2 size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="size-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">恭喜你中奖了！</DialogTitle>
            <DialogDescription className="text-sm">请截图保存本页面，凭中奖码领取奖品</DialogDescription>
          </DialogHeader>
          {wonPrize && (
            <div className="text-center space-y-3 py-2">
              {/* 奖品名称 */}
              <div className="inline-block px-3 py-1.5 rounded-lg text-white font-bold text-base" style={{ backgroundColor: wonPrize.color }}>
                {wonPrize.name}
              </div>
              <div className="text-sm font-semibold" style={{ color: wonPrize.color }}>
                {wonPrize.isFree ? (
                  <span>🎉 免费领取（原价{wonPrize.originalPrice}元）</span>
                ) : wonPrize.winPrice > 0 ? (
                  <span>
                    <span className="line-through text-muted-foreground/60 text-xs mr-2">原价{wonPrize.originalPrice}元</span>
                    抽中专享价 <span className="text-base">{wonPrize.winPrice}元</span>
                  </span>
                ) : (
                  <span>🎊 专属优惠XXX元（原价{wonPrize.originalPrice}元）</span>
                )}
              </div>

              {/* 中奖码 */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Camera className="size-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">请先截图保存此页面</span>
                </div>
                <div className="bg-background rounded-lg border-2 border-dashed border-primary/40 p-3">
                  <p className="text-xs text-muted-foreground mb-1">你的中奖码</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-base font-mono font-bold tracking-widest text-primary select-all">{winCode}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(winCode);
                      }}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="复制中奖码"
                    >
                      <Copy className="size-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">中奖时间：{winTime}</p>
                </div>
              </div>

              {/* 领取步骤 */}
              <div className="bg-muted/50 rounded-lg p-3 text-left space-y-1.5">
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="size-4 text-primary" /> 领取方式
                </p>
                <ol className="text-xs text-muted-foreground leading-relaxed space-y-1 list-decimal list-inside">
                  <li>截图保存本页面（含中奖码和中奖时间）</li>
                  <li>使用微信扫描下方二维码关注公众号</li>
                  <li>在公众号发送：<span className="font-semibold text-foreground">{wonPrize?.name || 'AI视频制作实战教程'}</span></li>
                  <li>客服核实后24小时内联系你发放奖品</li>
                </ol>
              </div>

              <div className="flex flex-col items-center gap-1">
                <QrCodeImage size="sm" label="公众号二维码" className="!w-28 !h-28" />
                <p className="text-xs text-muted-foreground">请使用微信长按识别二维码关注公众号</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-col gap-2 mt-2">
            <Button className="w-full" onClick={() => setShowDialog(false)}>我已截图，去关注</Button>
            <Button variant="outline" className="w-full" onClick={() => setShowDialog(false)}>稍后领取</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
