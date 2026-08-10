"use client";

import { useEffect, useRef } from "react";

/**
 * Retro pixel space scene via Canvas — Saturn, orbiting satellite, scout ships.
 */
export function PixelSpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const t0 = performance.now();

    type Star = { x: number; y: number; s: number; a: number };
    let stars: Star[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = Math.max(parent.clientHeight, window.innerHeight * 0.9);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / 8500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() < 0.85 ? 1 : 2,
        a: 0.35 + Math.random() * 0.65,
      }));
    };

    const fillPx = (x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x), Math.round(y), size, size);
    };

    const drawPixelShip = (
      x: number,
      y: number,
      scale: number,
      blink: boolean
    ) => {
      const p = Math.max(2, Math.round(2 * scale));
      const ox = Math.round(x);
      const oy = Math.round(y);
      if (blink) {
        fillPx(ox - p * 2, oy, p, "#5ce1ff");
        fillPx(ox - p, oy, p, "#ffb84d");
      } else {
        fillPx(ox - p, oy, p, "#ffb84d");
      }
      for (let i = 0; i < 5; i++) fillPx(ox + i * p, oy, p, "#3dff7a");
      fillPx(ox + p, oy - p, p, "#7affab");
      fillPx(ox + p, oy + p, p, "#1f9a48");
      fillPx(ox + 2 * p, oy, p, "#0a120c");
      fillPx(ox + 5 * p, oy, p, "#ffb84d");
      fillPx(ox + 6 * p, oy, p, "#5ce1ff");
    };

    const drawOrbitRocket = (
      x: number,
      y: number,
      angle: number,
      blink: boolean
    ) => {
      // Small classic rocket, nose pointing along orbit tangent
      ctx.save();
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(angle + Math.PI / 2);

      const p = 2;
      ctx.shadowColor = "#ffb84d";
      ctx.shadowBlur = 8;

      // nose cone
      ctx.fillStyle = "#ffb84d";
      ctx.fillRect(-p, -5 * p, 2 * p, p);
      ctx.fillStyle = "#ffd27a";
      ctx.fillRect(-0.5 * p, -6 * p, p, p);

      // body
      ctx.fillStyle = "#e8fff0";
      ctx.fillRect(-1.5 * p, -4 * p, 3 * p, 5 * p);
      ctx.fillStyle = "#3dff7a";
      ctx.fillRect(-p, -3 * p, 2 * p, 3 * p);
      ctx.fillStyle = "#5ce1ff";
      ctx.fillRect(-0.5 * p, -2 * p, p, p);

      // fins
      ctx.fillStyle = "#1f9a48";
      ctx.fillRect(-3 * p, 0, 1.5 * p, 2 * p);
      ctx.fillRect(1.5 * p, 0, 1.5 * p, 2 * p);

      // exhaust
      ctx.shadowBlur = 12;
      if (blink) {
        ctx.fillStyle = "#5ce1ff";
        ctx.fillRect(-p, 2 * p, 2 * p, 2 * p);
        ctx.fillStyle = "#ffb84d";
        ctx.fillRect(-0.5 * p, 4 * p, p, 2 * p);
      } else {
        ctx.fillStyle = "#ffb84d";
        ctx.fillRect(-0.5 * p, 2 * p, p, 2 * p);
      }
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawRingArc = (
      cx: number,
      cy: number,
      radius: number,
      start: number,
      end: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.34);
      ctx.rotate(-0.3);
      ctx.strokeStyle = "rgba(255,230,180,0.85)";
      ctx.lineWidth = radius * 0.26;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.8, start, end);
      ctx.stroke();
      ctx.strokeStyle = "rgba(150,120,70,0.65)";
      ctx.lineWidth = radius * 0.09;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 2.0, start, end);
      ctx.stroke();
      ctx.strokeStyle = "rgba(240,220,170,0.7)";
      ctx.lineWidth = radius * 0.1;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.55, start, end);
      ctx.stroke();
      ctx.restore();
    };

    const drawPlanetBody = (cx: number, cy: number, radius: number, time: number) => {
      const glow = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.2,
        cx,
        cy,
        radius * 2.1
      );
      glow.addColorStop(0, "rgba(255,210,140,0.3)");
      glow.addColorStop(1, "rgba(255,210,140,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.1, 0, Math.PI * 2);
      ctx.fill();

      const body = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.25,
        radius * 0.12,
        cx,
        cy,
        radius
      );
      body.addColorStop(0, "#f3dfb0");
      body.addColorStop(0.55, "#e6c98a");
      body.addColorStop(1, "#a87838");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      const bandShift = (time * 10) % 18;
      const bands = ["#f0d49a", "#d4b06a", "#e8c882", "#c9a056", "#f2dba8"];
      for (let i = -6; i < 8; i++) {
        ctx.globalAlpha = 0.32;
        ctx.fillStyle = bands[(i + 20) % bands.length];
        ctx.fillRect(
          cx - radius,
          cy - radius + i * (radius / 4) + bandShift,
          radius * 2,
          radius / 5
        );
      }
      ctx.globalAlpha = 1;
      const shade = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      shade.addColorStop(0, "rgba(0,0,0,0)");
      shade.addColorStop(0.5, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();
    };

    const orbitPoint = (
      cx: number,
      cy: number,
      a: number,
      b: number,
      tilt: number,
      ang: number
    ) => ({
      x:
        cx +
        Math.cos(ang) * a * Math.cos(tilt) -
        Math.sin(ang) * b * Math.sin(tilt),
      y:
        cy +
        Math.cos(ang) * a * Math.sin(tilt) +
        Math.sin(ang) * b * Math.cos(tilt),
    });

    const frame = (now: number) => {
      const time = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const twinkle = reducedMotion
          ? star.a
          : star.a * (0.55 + 0.45 * Math.sin(time * 3 + star.x * 0.02));
        ctx.fillStyle = `rgba(200,245,216,${twinkle})`;
        ctx.fillRect(star.x, star.y, star.s, star.s);
      }

      const cx = w * (w < 768 ? 0.76 : 0.8);
      const cy = Math.min(h * 0.28, 220);
      const radius = Math.min(110, Math.min(w, h) * (w < 768 ? 0.15 : 0.17));
      const orbitA = radius * 2.25;
      const orbitB = radius * 0.78;
      const tilt = -0.38;
      const ang = reducedMotion ? 0.9 : time * 1.05;
      const rocket = orbitPoint(cx, cy, orbitA, orbitB, tilt, ang);
      const rocketBehind = Math.sin(ang) < 0;
      const exhaustBlink = Math.floor(time * 12) % 2 === 0;

      // faint orbit guide
      ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        const p = orbitPoint(cx, cy, orbitA, orbitB, tilt, a);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(92,225,255,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // back rings
      drawRingArc(cx, cy, radius, Math.PI, Math.PI * 2);

      if (rocketBehind) {
        drawOrbitRocket(rocket.x, rocket.y, ang, exhaustBlink);
      }

      drawPlanetBody(cx, cy, radius, reducedMotion ? 0 : time);

      // front rings
      drawRingArc(cx, cy, radius, 0, Math.PI);

      if (!rocketBehind) {
        drawOrbitRocket(rocket.x, rocket.y, ang, exhaustBlink);
      }

      // scout ships
      if (!reducedMotion) {
        const shipX = ((time * 70) % (w + 140)) - 70;
        const shipY =
          Math.min(h * 0.62, cy + radius * 3.2) + Math.sin(time * 1.5) * 16;
        drawPixelShip(shipX, shipY, 1.6, Math.floor(time * 10) % 2 === 0);

        const ship2X = ((time * 32 + 180) % (w + 120)) - 60;
        const ship2Y = cy + radius * 0.2 + Math.sin(time * 0.8) * 12;
        ctx.globalAlpha = 0.7;
        drawPixelShip(ship2X, ship2Y, 1, Math.floor(time * 7) % 2 === 0);
        ctx.globalAlpha = 1;
      } else {
        drawPixelShip(w * 0.18, h * 0.58, 1.5, true);
        drawOrbitRocket(cx + orbitA * 0.65, cy + 10, 1, true);
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full min-h-[70vh] w-full"
      aria-hidden
    />
  );
}
