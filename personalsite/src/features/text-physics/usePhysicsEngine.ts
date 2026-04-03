import { useRef, useCallback, useEffect } from "react";
import type { PhysicsBody, Vec2 } from "./textPhysics.types";

const GRAVITY = 800;
const RESTITUTION = 0.55;
const FRICTION = 0.98;
const FLOOR_FRICTION = 0.92;
const MAX_DT = 0.033;

export function usePhysicsEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const grabbedIdRef = useRef<string | null>(null);
  const grabOffsetRef = useRef<Vec2>({ x: 0, y: 0 });
  const mouseHistoryRef = useRef<{ x: number; y: number; t: number }[]>([]);

  const addBody = useCallback((body: PhysicsBody) => {
    bodiesRef.current.push(body);
  }, []);

  const hitTest = useCallback((px: number, py: number): PhysicsBody | null => {
    const bodies = bodiesRef.current;
    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i];
      const dx = px - (b.x + b.width / 2);
      const dy = py - (b.y + b.height / 2);
      const cos = Math.cos(-b.rotation);
      const sin = Math.sin(-b.rotation);
      const lx = dx * cos - dy * sin;
      const ly = dx * sin + dy * cos;
      if (Math.abs(lx) <= b.width / 2 + 4 && Math.abs(ly) <= b.height / 2 + 4) {
        return b;
      }
    }
    return null;
  }, []);

  const grabBody = useCallback((px: number, py: number): boolean => {
    const body = hitTest(px, py);
    if (!body) return false;
    body.grabbed = true;
    body.vx = 0;
    body.vy = 0;
    body.angularVel = 0;
    grabbedIdRef.current = body.id;
    grabOffsetRef.current = { x: px - body.x, y: py - body.y };
    mouseHistoryRef.current = [{ x: px, y: py, t: performance.now() }];
    return true;
  }, [hitTest]);

  const moveGrabbed = useCallback((px: number, py: number) => {
    const id = grabbedIdRef.current;
    if (!id) return;
    const body = bodiesRef.current.find((b) => b.id === id);
    if (!body) return;
    body.x = px - grabOffsetRef.current.x;
    body.y = py - grabOffsetRef.current.y;
    const now = performance.now();
    mouseHistoryRef.current.push({ x: px, y: py, t: now });
    if (mouseHistoryRef.current.length > 6) mouseHistoryRef.current.shift();
  }, []);

  const releaseGrabbed = useCallback(() => {
    const id = grabbedIdRef.current;
    if (!id) return;
    const body = bodiesRef.current.find((b) => b.id === id);
    if (body) {
      body.grabbed = false;
      const hist = mouseHistoryRef.current;
      if (hist.length >= 2) {
        const recent = hist[hist.length - 1];
        const old = hist[0];
        const dt = (recent.t - old.t) / 1000;
        if (dt > 0.001) {
          body.vx = ((recent.x - old.x) / dt) * 0.8;
          body.vy = ((recent.y - old.y) / dt) * 0.8;
          body.angularVel = body.vx * 0.003;
        }
      }
    }
    grabbedIdRef.current = null;
    mouseHistoryRef.current = [];
  }, []);

  const tick = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const dt = lastTimeRef.current
      ? Math.min((time - lastTimeRef.current) / 1000, MAX_DT)
      : 0.016;
    lastTimeRef.current = time;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const bodies = bodiesRef.current;
    for (const b of bodies) {
      if (b.grabbed) continue;

      b.vy += GRAVITY * dt;
      b.vx *= FRICTION;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.rotation += b.angularVel * dt;
      b.angularVel *= 0.995;

      // Bounce off walls
      if (b.x < 0) {
        b.x = 0;
        b.vx = Math.abs(b.vx) * RESTITUTION;
        b.angularVel *= -0.5;
      } else if (b.x + b.width > w) {
        b.x = w - b.width;
        b.vx = -Math.abs(b.vx) * RESTITUTION;
        b.angularVel *= -0.5;
      }

      if (b.y < 0) {
        b.y = 0;
        b.vy = Math.abs(b.vy) * RESTITUTION;
      } else if (b.y + b.height > h) {
        b.y = h - b.height;
        b.vy = -Math.abs(b.vy) * RESTITUTION;
        b.vx *= FLOOR_FRICTION;
        if (Math.abs(b.vy) < 15) {
          b.vy = 0;
          b.angularVel *= 0.9;
        }
      }
    }

    // Draw
    for (const b of bodies) {
      const cx = b.x + b.width / 2;
      const cy = b.y + b.height / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(b.rotation);
      ctx.font = b.font;
      ctx.fillStyle = b.color;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      // Subtle shadow for depth
      ctx.shadowColor = "rgba(0,0,0,0.12)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fillText(b.text, 0, 0);
      ctx.restore();
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [canvasRef]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return { bodiesRef, addBody, hitTest, grabBody, moveGrabbed, releaseGrabbed };
}
