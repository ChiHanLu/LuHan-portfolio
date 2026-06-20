"use client";

import { useEffect, useRef } from "react";

/**
 * 橙色粒子星空（2D canvas）：緩慢漂移的橘色星點 + 偶發流星，與全站玻璃橘主題一致。
 * - 離開視窗 / 分頁隱藏 → 暫停
 * - prefers-reduced-motion → 靜態星點、無流星
 * - devicePixelRatio 縮放、resize 自適應、完整清理
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0,
      h = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2),
      t = 0;
    type Star = { x: number; y: number; r: number; tw: number; ph: number };
    type Shoot = { x: number; y: number; vx: number; vy: number; life: number };
    let stars: Star[] = [];
    let shoots: Shoot[] = [];

    const build = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.round((w * h) / 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * 0.04 + 0.01, // 閃爍速度
        ph: Math.random() * Math.PI * 2, // 相位
      }));
    };
    build();

    const spawnShoot = () => {
      const fromLeft = Math.random() < 0.5;
      shoots.push({
        x: fromLeft ? -40 : w + 40,
        y: Math.random() * h * 0.6,
        vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 3),
        vy: 1.5 + Math.random() * 1.5,
        life: 1,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // 星點（閃爍）
      for (const s of stars) {
        const a = reduce ? 0.6 : 0.35 + Math.abs(Math.sin(t * s.tw + s.ph)) * 0.55;
        ctx.fillStyle = `rgba(251,146,60,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // 流星
      for (const sh of shoots) {
        const tailX = sh.x - sh.vx * 6;
        const tailY = sh.y - sh.vy * 6;
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(253,186,116,${sh.life})`);
        grad.addColorStop(1, "rgba(253,186,116,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    };

    const step = () => {
      t += 1;
      if (!reduce) {
        // 偶發流星
        if (shoots.length < 2 && Math.random() < 0.004) spawnShoot();
        shoots.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          s.life -= 0.012;
        });
        shoots = shoots.filter((s) => s.life > 0 && s.x > -60 && s.x < w + 60);
      }
      draw();
    };

    let rafId = 0;
    let running = false;
    const loop = () => {
      step();
      rafId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const ro = new ResizeObserver(build);
    ro.observe(canvas.parentElement!);

    if (reduce) {
      draw();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0.01,
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
