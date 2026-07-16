import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STRINGS = [
  { name: 'E', number: 6, freq: 82.41 },
  { name: 'A', number: 5, freq: 110.00 },
  { name: 'D', number: 4, freq: 146.83 },
  { name: 'G', number: 3, freq: 196.00 },
  { name: 'B', number: 2, freq: 246.94 },
  { name: 'E', number: 1, freq: 329.63 },
];

function centsOff(detected: number, target: number): number {
  return 1200 * Math.log2(detected / target);
}

function autoCorrelate(buf: Float32Array, sampleRate: number): number {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) {
    rms += buf[i] * buf[i];
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  }

  const trimmed = buf.slice(r1, r2);
  const c = new Array(trimmed.length).fill(0);
  for (let i = 0; i < trimmed.length; i++) {
    for (let j = 0; j < trimmed.length - i; j++) {
      c[i] += trimmed[j] * trimmed[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < trimmed.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 -= b / (2 * a);

  return sampleRate / T0;
}

function findClosestString(freq: number): (typeof STRINGS)[number] | null {
  if (freq <= 0) return null;
  let best = STRINGS[0];
  let bestDiff = Math.abs(centsOff(freq, best.freq));
  for (let i = 1; i < STRINGS.length; i++) {
    const diff = Math.abs(centsOff(freq, STRINGS[i].freq));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = STRINGS[i];
    }
  }
  if (bestDiff > 60) return null;
  return best;
}

export default function GuitarTunerPage() {
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [selectedString, setSelectedString] = useState(0);
  const [detectedFreq, setDetectedFreq] = useState(0);
  const [detectedNote, setDetectedNote] = useState('');
  const [cents, setCents] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isInTune, setIsInTune] = useState(false);
  const [micError, setMicError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);

  const stopListening = useCallback(async () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      await audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setIsListening(false);
    setDetectedFreq(0);
    setDetectedNote('');
    setCents(0);
    setIsInTune(false);
  }, []);

  const startListening = useCallback(async (currentMode: 'auto' | 'manual') => {
    setMicError('');
    setIsRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 2048;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      setIsListening(true);
      setHasStarted(true);
      setIsRequesting(false);

      const buffer = new Float32Array(analyser.fftSize);
      const sampleRate = audioCtx.sampleRate;

      const detect = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(buffer);
        const freq = autoCorrelate(buffer, sampleRate);
        if (freq > 0) {
          setDetectedFreq(freq);
          const closest = findClosestString(freq);
          if (closest) {
            setDetectedNote(closest.name);
            if (currentMode === 'auto') {
              setSelectedString(STRINGS.indexOf(closest));
            }
          }
          const target = currentMode === 'auto' && closest
            ? closest.freq
            : STRINGS[selectedString].freq;
          const offset = centsOff(freq, target);
          setCents(Math.max(-50, Math.min(50, offset)));
          setIsInTune(Math.abs(offset) < 5);
        }
        animFrameRef.current = requestAnimationFrame(detect);
      };
      detect();
    } catch {
      setIsRequesting(false);
      setMicError('无法访问麦克风，请检查浏览器权限设置后重试。');
    }
  }, [selectedString]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleMode = useCallback((newMode: 'auto' | 'manual') => {
    setMode(newMode);
    if (isListening) {
      stopListening();
      setTimeout(() => {
        startListening(newMode);
      }, 150);
    }
  }, [isListening, stopListening, startListening]);

  const handleSelectString = useCallback((idx: number) => {
    setSelectedString(idx);
    setMode('manual');
    if (!hasStarted && !isListening && !isRequesting) {
      startListening('manual');
    }
  }, [hasStarted, isListening, isRequesting, startListening]);

  const handleStart = useCallback(() => {
    startListening(mode);
  }, [mode, startListening]);

  const pointerAngle = (cents / 50) * 45;

  const getGaugeColor = () => {
    if (isInTune) return '#169c7b';
    const abs = Math.abs(cents);
    if (abs < 10) return '#169c7b';
    if (abs < 25) return '#8BA4B0';
    return '#D25025';
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="在线吉他调音器" description="免费在线吉他调音器，支持标准调弦及特殊调弦，使用设备麦克风精准调音，无需下载安装。" />
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

        {/* 调音器内容 */}
        <div className="flex flex-col items-center">
          {/* 标题 */}
          <h1 className="text-lg md:text-2xl tracking-[0.1em] md:tracking-[0.15em] uppercase text-foreground/60 font-semibold mb-6 md:mb-10 text-center">
            Guitar Tuner · 吉他调音器
          </h1>

      {/* 音分表盘 */}
      <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] h-[180px] md:h-[220px] mb-6 md:mb-8">
        <svg viewBox="0 0 280 160" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2554D2" />
              <stop offset="50%" stopColor="#169c7b" />
              <stop offset="100%" stopColor="#D25025" />
            </linearGradient>
          </defs>

          <path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.25"
          />

          {isListening && detectedFreq > 0 && (
            <path
              d="M 20 150 A 120 120 0 0 1 260 150"
              fill="none"
              stroke={getGaugeColor()}
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
              strokeDasharray={`${140 + (cents / 50) * 140} 400`}
              style={{ transition: 'stroke-dasharray 0.1s ease-out' }}
            />
          )}

          {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((mark) => {
            const angle = (mark / 50) * 45 - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = 140 + 115 * Math.cos(rad);
            const cy = 150 + 115 * Math.sin(rad);
            const isMajor = mark % 10 === 0;
            return (
              <g key={mark}>
                <line
                  x1={140 + (isMajor ? 105 : 110) * Math.cos(rad)}
                  y1={150 + (isMajor ? 105 : 110) * Math.sin(rad)}
                  x2={cx}
                  y2={cy}
                  stroke={mark === 0 ? '#169c7b' : 'hsl(var(--muted-foreground) / 0.5)'}
                  strokeWidth={isMajor ? 2 : 0.8}
                />
                {isMajor && (
                  <text
                    x={140 + 92 * Math.cos(rad)}
                    y={150 + 92 * Math.sin(rad)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="currentColor"
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="monospace"
                    className="text-muted-foreground"
                  >
                    {mark === 0 ? '0' : mark > 0 ? `+${mark}` : mark}
                  </text>
                )}
              </g>
            );
          })}

          <line
            x1={140}
            y1={150}
            x2={140 + 110 * Math.cos(((pointerAngle - 90) * Math.PI) / 180)}
            y2={150 + 110 * Math.sin(((pointerAngle - 90) * Math.PI) / 180)}
            stroke={getGaugeColor()}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: 'all 0.1s ease-out' }}
          />

          <circle
            cx={140}
            cy={150}
            r="5"
            fill={getGaugeColor()}
            style={{ transition: 'fill 0.1s ease-out' }}
          />

          <text
            x={140}
            y={132}
            textAnchor="middle"
            fill={isInTune ? '#169c7b' : isListening ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
            fontSize="36"
            fontWeight="700"
            fontFamily="monospace"
            style={{ transition: 'fill 0.15s ease-out' }}
          >
            {isListening && detectedNote ? detectedNote : STRINGS[selectedString].name}
          </text>
        </svg>

        <span className="absolute bottom-1 left-4 text-sm text-muted-foreground font-medium">♭</span>
        <span className="absolute bottom-1 right-4 text-sm text-muted-foreground font-medium">♯</span>
      </div>

      {/* 模式切换 */}
      <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
        <button
          type="button"
          onClick={() => toggleMode('auto')}
          className={`px-4 md:px-5 py-2 min-h-[44px] rounded-full text-xs md:text-sm font-semibold transition-all ${
            mode === 'auto'
              ? 'text-primary border-2 border-primary bg-primary/10'
              : 'text-muted-foreground border-2 border-border bg-transparent hover:border-primary/30'
          }`}
        >
          自动识别弦
        </button>
        <button
          type="button"
          onClick={() => toggleMode('manual')}
          className={`px-4 md:px-5 py-2 min-h-[44px] rounded-full text-xs md:text-sm font-semibold transition-all ${
            mode === 'manual'
              ? 'text-primary border-2 border-primary bg-primary/10'
              : 'text-muted-foreground border-2 border-border bg-transparent hover:border-primary/30'
          }`}
        >
          手动选弦
        </button>
      </div>

      <div className="w-10 h-px bg-border mb-4 md:mb-6" />

      {/* 提示文字 */}
      <p className="text-sm md:text-base text-muted-foreground mb-2 font-medium text-center px-4">
        {isListening ? '弹奏任意一根弦' : '点击琴弦按钮，开启麦克风调音'}
      </p>

      {/* 向下箭头 */}
      {!hasStarted && !isListening && !isRequesting && (
        <motion.div
          className="mb-4"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/50" />
          </svg>
        </motion.div>
      )}

      {/* 弦选择按钮 — 入场动画 + 呼吸动画 */}
      <div className="flex gap-1.5 sm:gap-2 md:gap-3 mb-4 md:mb-6 w-full justify-center px-2">
        {STRINGS.map((s, idx) => (
          <motion.button
            key={s.name + s.number}
            type="button"
            onClick={() => handleSelectString(idx)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.05, boxShadow: '0 8px 24px rgba(22,156,123,0.12)' }}
            whileTap={{ scale: 0.92 }}
            className={`w-10 h-14 sm:w-14 sm:h-[72px] md:w-16 md:h-20 rounded-lg md:rounded-xl flex flex-col items-center justify-center transition-colors flex-shrink-0 ${
              selectedString === idx
                ? 'border-2 border-primary bg-primary/10 shadow-[0_0_16px_rgba(22_156_123_0.15)]'
                : `border-2 border-border bg-card hover:border-primary/30 ${!hasStarted && !isListening ? 'animate-pulse' : ''}`
            }`}
          >
            <span className={`text-lg sm:text-xl md:text-2xl font-bold font-mono ${
              selectedString === idx ? 'text-primary' : 'text-foreground/70'
            }`}>
              {s.name}
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">{s.number}</span>
          </motion.button>
        ))}
      </div>

      {/* 标准调弦提示 */}
      <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8 tracking-widest font-medium text-center">
        标准调弦 E · A · D · G · B · E
      </p>

      {/* 请求权限中 */}
      {isRequesting && (
        <div className="flex items-center gap-3 text-primary mb-4">
          <Loader2 className="size-5 animate-spin" />
          <span className="text-base font-medium">正在请求麦克风权限...</span>
        </div>
      )}

      {/* 初始状态：大按钮提示授权 — 脉动动画 */}
      <AnimatePresence>
        {!hasStarted && !isListening && !isRequesting && (
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Button
                onClick={handleStart}
                size="lg"
                className="h-14 px-10 rounded-full text-lg font-bold gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Mic className="size-6" />
                开始调音
              </Button>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              点击按钮后将请求麦克风权限
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 已开始但暂停状态 */}
      {hasStarted && !isListening && !isRequesting && (
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Button
            onClick={() => startListening(mode)}
            size="lg"
            className="h-14 px-10 rounded-full text-lg font-bold gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Mic className="size-6" />
            开始调音
          </Button>
        </motion.div>
      )}

      {/* 正在监听状态 */}
      {isListening && (
        <Button
          onClick={stopListening}
          variant="outline"
          size="lg"
          className="no-default-hover-elevate h-14 px-10 rounded-full text-lg font-semibold gap-3 border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300"
        >
          <MicOff className="size-6" />
          停止调音
        </Button>
      )}

      {micError && (
        <p className="mt-4 text-sm text-destructive font-medium max-w-xs text-center px-4">{micError}</p>
      )}

      <p className="mt-6 md:mt-10 text-xs text-muted-foreground max-w-xs text-center leading-relaxed px-4">
        请允许浏览器使用麦克风权限，将设备靠近吉他音孔，弹奏琴弦进行调音。
      </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
