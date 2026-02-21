import { useRef, useEffect, useCallback } from "react";

interface Point {
  x: number;
  y: number;
}

interface CircuitNode {
  x: number;
  y: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

interface EnergyPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  life: number;
}

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const pulsesRef = useRef<EnergyPulse[]>([]);
  const mouseRef = useRef<Point>({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const lastTouchRef = useRef<number>(0);

  const initNodes = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const gridSize = isMobile ? 120 : 80;
    const nodes: CircuitNode[] = [];

    for (let x = gridSize / 2; x < width; x += gridSize) {
      for (let y = gridSize / 2; y < height; y += gridSize) {
        // Add some randomness to grid positions
        const offsetX = (Math.random() - 0.5) * gridSize * 0.6;
        const offsetY = (Math.random() - 0.5) * gridSize * 0.6;
        nodes.push({
          x: x + offsetX,
          y: y + offsetY,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
        });
      }
    }

    // Create connections (nearest neighbors, circuit-like: prefer horizontal/vertical)
    const maxDist = gridSize * 1.8;
    for (let i = 0; i < nodes.length; i++) {
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          distances.push({ idx: j, dist });
        }
      }
      distances.sort((a, b) => a.dist - b.dist);
      // Connect to 2-4 nearest
      const connectCount = Math.min(2 + Math.floor(Math.random() * 2), distances.length);
      for (let k = 0; k < connectCount; k++) {
        if (!nodes[i].connections.includes(distances[k].idx)) {
          nodes[i].connections.push(distances[k].idx);
        }
      }
    }

    nodesRef.current = nodes;
    pulsesRef.current = [];
  }, []);

  const spawnPulse = useCallback((fromNode: number) => {
    const node = nodesRef.current[fromNode];
    if (!node || node.connections.length === 0) return;
    
    const toNode = node.connections[Math.floor(Math.random() * node.connections.length)];
    pulsesRef.current.push({
      fromNode,
      toNode,
      progress: 0,
      speed: 0.02 + Math.random() * 0.03,
      life: 1,
    });
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Spawn pulses near mouse
      const now = Date.now();
      if (now - lastTouchRef.current > 50) {
        lastTouchRef.current = now;
        for (let i = 0; i < nodesRef.current.length; i++) {
          const node = nodesRef.current[i];
          const dx = node.x - e.clientX;
          const dy = node.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && Math.random() > 0.6) {
            spawnPulse(i);
          }
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        
        const now = Date.now();
        if (now - lastTouchRef.current > 80) {
          lastTouchRef.current = now;
          for (let i = 0; i < nodesRef.current.length; i++) {
            const node = nodesRef.current[i];
            const dx = node.x - touch.clientX;
            const dy = node.y - touch.clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 && Math.random() > 0.5) {
              spawnPulse(i);
            }
          }
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < nodesRef.current.length; i++) {
        const node = nodesRef.current[i];
        const dx = node.x - e.clientX;
        const dy = node.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          spawnPulse(i);
          // Chain reaction
          for (const conn of node.connections) {
            if (Math.random() > 0.3) {
              setTimeout(() => spawnPulse(conn), 100 + Math.random() * 200);
            }
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick);

    // Random ambient pulses
    const ambientInterval = setInterval(() => {
      if (nodesRef.current.length > 0 && pulsesRef.current.length < 15) {
        const idx = Math.floor(Math.random() * nodesRef.current.length);
        spawnPulse(idx);
      }
    }, 800);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Draw connections (circuit lines)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulse += node.pulseSpeed;

        for (const connIdx of node.connections) {
          const target = nodes[connIdx];
          if (!target || connIdx <= i) continue; // avoid drawing twice

          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          
          const proximity = Math.max(0, 1 - distToMouse / 300);
          const baseOpacity = 0.04 + proximity * 0.12;

          ctx.beginPath();
          
          // Draw circuit-style lines (L-shaped or straight)
          const midX = (node.x + target.x) / 2;
          const midY = (node.y + target.y) / 2;
          const angleDiff = Math.abs(Math.atan2(target.y - node.y, target.x - node.x));
          
          if (angleDiff > 0.3 && angleDiff < 2.8) {
            // L-shaped connection
            if (Math.random() > 0.5) {
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, node.y);
              ctx.lineTo(target.x, target.y);
            } else {
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(node.x, target.y);
              ctx.lineTo(target.x, target.y);
            }
          } else {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
          }

          ctx.strokeStyle = `rgba(0, 255, 0, ${baseOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw nodes
        const dxM = node.x - mouse.x;
        const dyM = node.y - mouse.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        const proximityM = Math.max(0, 1 - distM / 250);
        const nodeSize = 1.5 + proximityM * 2;
        const nodeOpacity = 0.15 + proximityM * 0.6 + Math.sin(node.pulse) * 0.05;

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${nodeOpacity})`;
        ctx.fill();

        // Glow on proximity
        if (proximityM > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 0, ${proximityM * 0.15})`;
          ctx.fill();
        }
      }

      // Update and draw energy pulses
      const activePulses: EnergyPulse[] = [];
      for (const pulse of pulsesRef.current) {
        pulse.progress += pulse.speed;
        pulse.life -= 0.008;

        if (pulse.progress >= 1 || pulse.life <= 0) {
          // Chain to next node
          if (pulse.life > 0.2 && Math.random() > 0.4) {
            const nextNode = nodes[pulse.toNode];
            if (nextNode && nextNode.connections.length > 0) {
              const next = nextNode.connections[Math.floor(Math.random() * nextNode.connections.length)];
              if (next !== pulse.fromNode) {
                activePulses.push({
                  fromNode: pulse.toNode,
                  toNode: next,
                  progress: 0,
                  speed: pulse.speed,
                  life: pulse.life * 0.85,
                });
              }
            }
          }
          continue;
        }

        activePulses.push(pulse);

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        if (!from || !to) continue;

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        // Draw pulse glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 12);
        gradient.addColorStop(0, `rgba(0, 255, 0, ${pulse.life * 0.8})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 0, ${pulse.life * 0.3})`);
        gradient.addColorStop(1, "rgba(0, 255, 0, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${pulse.life})`;
        ctx.fill();
      }
      pulsesRef.current = activePulses;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
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
