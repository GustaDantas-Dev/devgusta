import { useRef, useEffect, useCallback } from "react";

interface CircuitNode {
  x: number;
  y: number;
  connections: number[];
}

interface LinePulse {
  segments: { fromIdx: number; toIdx: number }[];
  currentSeg: number;
  progress: number;
  speed: number;
  opacity: number;
  trail: { x: number; y: number; opacity: number }[];
}

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const pulsesRef = useRef<LinePulse[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const lShapeRef = useRef<Map<string, boolean>>(new Map());

  const initNodes = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const gridSize = isMobile ? 140 : 100;
    const nodes: CircuitNode[] = [];

    for (let x = gridSize / 2; x < width; x += gridSize) {
      for (let y = gridSize / 2; y < height; y += gridSize) {
        const offsetX = (Math.random() - 0.5) * gridSize * 0.4;
        const offsetY = (Math.random() - 0.5) * gridSize * 0.4;
        nodes.push({ x: x + offsetX, y: y + offsetY, connections: [] });
      }
    }

    const maxDist = gridSize * 1.6;
    for (let i = 0; i < nodes.length; i++) {
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) distances.push({ idx: j, dist });
      }
      distances.sort((a, b) => a.dist - b.dist);
      const count = Math.min(2 + Math.floor(Math.random() * 2), distances.length);
      for (let k = 0; k < count; k++) {
        if (!nodes[i].connections.includes(distances[k].idx)) {
          nodes[i].connections.push(distances[k].idx);
        }
      }
    }

    // Pre-compute L-shape decisions
    const lMap = new Map<string, boolean>();
    for (let i = 0; i < nodes.length; i++) {
      for (const j of nodes[i].connections) {
        if (j > i) {
          lMap.set(`${i}-${j}`, Math.random() > 0.5);
        }
      }
    }

    nodesRef.current = nodes;
    lShapeRef.current = lMap;
    pulsesRef.current = [];
  }, []);

  const spawnPulse = useCallback((startNode: number) => {
    const nodes = nodesRef.current;
    const node = nodes[startNode];
    if (!node || node.connections.length === 0) return;

    // Build a path of 3-6 segments
    const path: { fromIdx: number; toIdx: number }[] = [];
    let current = startNode;
    const visited = new Set<number>([startNode]);
    const pathLen = 3 + Math.floor(Math.random() * 4);

    for (let i = 0; i < pathLen; i++) {
      const n = nodes[current];
      const available = n.connections.filter((c) => !visited.has(c));
      if (available.length === 0) break;
      const next = available[Math.floor(Math.random() * available.length)];
      path.push({ fromIdx: current, toIdx: next });
      visited.add(next);
      current = next;
    }

    if (path.length > 0) {
      pulsesRef.current.push({
        segments: path,
        currentSeg: 0,
        progress: 0,
        speed: 0.015 + Math.random() * 0.01,
        opacity: 0.6 + Math.random() * 0.3,
        trail: [],
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let lastSpawn = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (now - lastSpawn > 300) {
        lastSpawn = now;
        const nodes = nodesRef.current;
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - e.clientX;
          const dy = nodes[i].y - e.clientY;
          if (Math.sqrt(dx * dx + dy * dy) < 120 && Math.random() > 0.7 && pulsesRef.current.length < 8) {
            spawnPulse(i);
            break;
          }
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = { x: t.clientX, y: t.clientY };
        const now = Date.now();
        if (now - lastSpawn > 400) {
          lastSpawn = now;
          const nodes = nodesRef.current;
          for (let i = 0; i < nodes.length; i++) {
            const dx = nodes[i].x - t.clientX;
            const dy = nodes[i].y - t.clientY;
            if (Math.sqrt(dx * dx + dy * dy) < 150 && Math.random() > 0.6 && pulsesRef.current.length < 6) {
              spawnPulse(i);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Ambient pulses (subtle)
    const ambientInterval = setInterval(() => {
      if (nodesRef.current.length > 0 && pulsesRef.current.length < 4) {
        spawnPulse(Math.floor(Math.random() * nodesRef.current.length));
      }
    }, 2000);

    const getLinePoints = (from: CircuitNode, to: CircuitNode, fromIdx: number, toIdx: number): [number, number][] => {
      const key = fromIdx < toIdx ? `${fromIdx}-${toIdx}` : `${toIdx}-${fromIdx}`;
      const useL = lShapeRef.current.get(key) ?? false;
      const dx = Math.abs(to.x - from.x);
      const dy = Math.abs(to.y - from.y);

      if (dx > 20 && dy > 20) {
        if (useL) {
          return [[from.x, from.y], [to.x, from.y], [to.x, to.y]];
        } else {
          return [[from.x, from.y], [from.x, to.y], [to.x, to.y]];
        }
      }
      return [[from.x, from.y], [to.x, to.y]];
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Draw circuit lines (very subtle)
      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          if (j <= i) continue;
          const from = nodes[i];
          const to = nodes[j];
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const dxM = midX - mouse.x;
          const dyM = midY - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          const proximity = Math.max(0, 1 - distM / 350);
          const opacity = 0.025 + proximity * 0.06;

          const pts = getLinePoints(from, to, i, j);
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let p = 1; p < pts.length; p++) {
            ctx.lineTo(pts[p][0], pts[p][1]);
          }
          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw and update pulses as LINES traveling through circuit
      const active: LinePulse[] = [];
      for (const pulse of pulsesRef.current) {
        const seg = pulse.segments[pulse.currentSeg];
        if (!seg) continue;

        const from = nodes[seg.fromIdx];
        const to = nodes[seg.toIdx];
        if (!from || !to) continue;

        pulse.progress += pulse.speed;

        // Add trail point
        const pts = getLinePoints(from, to, seg.fromIdx, seg.toIdx);
        // Calculate position along the polyline
        let totalLen = 0;
        const segLens: number[] = [];
        for (let p = 1; p < pts.length; p++) {
          const dx = pts[p][0] - pts[p - 1][0];
          const dy = pts[p][1] - pts[p - 1][1];
          const len = Math.sqrt(dx * dx + dy * dy);
          segLens.push(len);
          totalLen += len;
        }

        const targetDist = pulse.progress * totalLen;
        let accumulated = 0;
        let px = pts[0][0], py = pts[0][1];
        for (let p = 0; p < segLens.length; p++) {
          if (accumulated + segLens[p] >= targetDist) {
            const t = (targetDist - accumulated) / segLens[p];
            px = pts[p][0] + (pts[p + 1][0] - pts[p][0]) * t;
            py = pts[p][1] + (pts[p + 1][1] - pts[p][1]) * t;
            break;
          }
          accumulated += segLens[p];
          px = pts[p + 1][0];
          py = pts[p + 1][1];
        }

        pulse.trail.push({ x: px, y: py, opacity: pulse.opacity });

        // Fade trail
        for (const t of pulse.trail) {
          t.opacity *= 0.96;
        }
        pulse.trail = pulse.trail.filter((t) => t.opacity > 0.02);

        // Draw trail as a connected line
        if (pulse.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(pulse.trail[0].x, pulse.trail[0].y);
          for (let t = 1; t < pulse.trail.length; t++) {
            ctx.lineTo(pulse.trail[t].x, pulse.trail[t].y);
          }
          ctx.strokeStyle = `rgba(0, 255, 0, ${pulse.opacity * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Bright head
          const head = pulse.trail[pulse.trail.length - 1];
          ctx.beginPath();
          ctx.arc(head.x, head.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 0, ${pulse.opacity * 0.8})`;
          ctx.fill();
        }

        if (pulse.progress >= 1) {
          pulse.currentSeg++;
          pulse.progress = 0;
          pulse.opacity *= 0.85;
          if (pulse.currentSeg >= pulse.segments.length || pulse.opacity < 0.1) {
            continue;
          }
        }

        active.push(pulse);
      }
      pulsesRef.current = active;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      clearInterval(ambientInterval);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initNodes, spawnPulse]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-auto"
      style={{ touchAction: "auto" }}
    />
  );
};
