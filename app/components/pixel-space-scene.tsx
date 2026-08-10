"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas space scene: Saturn + small rocket on a clear elliptical orbit.
 */
export function PixelSpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      stars = Array.from({ length: Math.floor((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() < 0.85 ? 1 : 2,
        a: 0.4 + Math.random() * 0.6,
      }));
    };

    const fillPx = (x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x), Math.round(y), size, size);
    };

    const drawPixelShip = (x: number, y: number, scale: number, blink: boolean) => {
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

    /** Small rocket — nose points along velocity (orbit tangent). */
    const drawRocket = (x: number, y: number, ang: number, blink: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      // tangent of ellipse (a cos, b sin) → facing direction of travel
      ctx.rotate(ang + Math.PI / 2);

      const p = 2.5;
      ctx.shadowColor = "#ffb84d";
      ctx.shadowBlur = 10;

      // nose
      ctx.fillStyle = "#ffb84d";
      ctx.fillRect(-p, -6 * p, 2 * p, p);
      ctx.fillStyle = "#ffe0a0";
      ctx.fillRect(-0.5 * p, -7 * p, p, p);

      // body
      ctx.fillStyle = "#f2fff8";
      ctx.fillRect(-1.5 * p, -5 * p, 3 * p, 6 * p);
      ctx.fillStyle = "#3dff7a";
      ctx.fillRect(-p, -3.5 * p, 2 * p, 3.5 * p);
      ctx.fillStyle = "#5ce1ff";
      ctx.fillRect(-0.5 * p, -2 * p, p, p);

      // fins
      ctx.fillStyle = "#1f9a48";
      ctx.fillRect(-3.2 * p, -0.2 * p, 1.7 * p, 2.2 * p);
      ctx.fillRect(1.5 * p, -0.2 * p, 1.7 * p, 2.2 * p);

      // exhaust flame
      ctx.shadowBlur = 14;
      ctx.fillStyle = blink ? "#5ce1ff" : "#ffb84d";
      ctx.fillRect(-p, 1.2 * p, 2 * p, 2 * p);
      ctx.fillStyle = "#ffb84d";
      ctx.fillRect(-0.5 * p, 3.2 * p, p, blink ? 2.5 * p : 1.5 * p);
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawRings = (
      cx: number,
      cy: number,
      radius: number,
      start: number,
      end: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.36);
      ctx.strokeStyle = "rgba(255,230,180,0.9)";
      ctx.lineWidth = radius * 0.28;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.85, start, end);
      ctx.stroke();
      ctx.strokeStyle = "rgba(150,120,70,0.7)";
      ctx.lineWidth = radius * 0.1;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 2.05, start, end);
      ctx.stroke();
      ctx.strokeStyle = "rgba(240,220,170,0.75)";
      ctx.lineWidth = radius * 0.1;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.58, start, end);
      ctx.stroke();
      ctx.restore();
    };

    const drawPlanet = (cx: number, cy: number, radius: number, time: number) => {
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 2);
      glow.addColorStop(0, "rgba(255,210,140,0.32)");
      glow.addColorStop(1, "rgba(255,210,140,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      const body = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.25,
        radius * 0.1,
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
      const shift = (time * 12) % 20;
      const bands = ["#f0d49a", "#d4b06a", "#e8c882", "#c9a056", "#f2dba8"];
      for (let i = -6; i < 8; i++) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = bands[(i + 20) % bands.length];
        ctx.fillRect(
          cx - radius,
          cy - radius + i * (radius / 4) + shift,
          radius * 2,
          radius / 5
        );
      }
      ctx.globalAlpha = 1;
      const shade = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      shade.addColorStop(0, "rgba(0,0,0,0)");
      shade.addColorStop(0.55, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();
    };

    const frame = (now: number) => {
      const time = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const tw =
          star.a * (0.55 + 0.45 * Math.sin(time * 3 + star.x * 0.02));
        ctx.fillStyle = `rgba(200,245,216,${tw})`;
        ctx.fillRect(star.x, star.y, star.s, star.s);
      }

      // Saturn placement (right side of hero)
      const cx = w * (w < 768 ? 0.72 : 0.78);
      const cy = Math.min(h * 0.32, 260);
      const radius = Math.min(130, Math.max(70, Math.min(w, h) * 0.16));

      // Clear elliptical orbit (same plane as rings)
      const orbitRx = radius * 2.15;
      const orbitRy = radius * 0.62;
      // radians per second — clearly visible motion
      const ang = time * 1.35;

      const rocketX = cx + Math.cos(ang) * orbitRx;
      const rocketY = cy + Math.sin(ang) * orbitRy;
      // upper half of ellipse (negative sin in math = wait: canvas y grows down,
      // sin>0 is below center = front of rings; sin<0 is above = behind planet)
      const behind = Math.sin(ang) < 0;
      const blink = Math.floor(time * 14) % 2 === 0;

      // orbit guide
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbitRx, orbitRy, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(92,225,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // back rings + rocket if behind
      drawRings(cx, cy, radius, Math.PI, Math.PI * 2);
      if (behind) drawRocket(rocketX, rocketY, ang, blink);

      drawPlanet(cx, cy, radius, time);

      // front rings + rocket if in front
      drawRings(cx, cy, radius, 0, Math.PI);
      if (!behind) drawRocket(rocketX, rocketY, ang, blink);

      // flying scouts
      const shipX = ((time * 75) % (w + 160)) - 80;
      const shipY = Math.min(h * 0.64, cy + radius * 3) + Math.sin(time * 1.4) * 14;
      drawPixelShip(shipX, shipY, 1.5, Math.floor(time * 10) % 2 === 0);

      const ship2X = ((time * 35 + 200) % (w + 120)) - 60;
      const ship2Y = cy + Math.sin(time * 0.9) * 10;
      ctx.globalAlpha = 0.65;
      drawPixelShip(ship2X, ship2Y, 0.95, Math.floor(time * 7) % 2 === 0);
      ctx.globalAlpha = 1;

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
