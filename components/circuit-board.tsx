"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

type Node = {
  x: number;
  y: number;
  size: number;
  isActive: boolean;
  activationLevel: number;
};

type Path = {
  from: number;
  to: number;
  isActive: boolean;
  activationLevel: number;
};

type MousePosition = {
  x: number;
  y: number;
};

type Dimensions = {
  width: number;
  height: number;
};

type CircuitBoardProps = {
  children?: ReactNode;
};

const CircuitBoard: React.FC<CircuitBoardProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const circuitNodesRef = useRef<Node[]>([]);
  const circuitPathsRef = useRef<Path[]>([]);
  const animationRef = useRef<number | null>(null);

  // Use fixed muted gray color
  const mutedColor = "rgb(115, 115, 115)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const { innerWidth, innerHeight, devicePixelRatio = 1 } = window;

      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);

      setDimensions({ width: innerWidth, height: innerHeight });
      generateCircuit(innerWidth, innerHeight);
    };

    const generateCircuit = (width: number, height: number) => {
      const nodeCount = width < 768 ? 30 : 50;
      const nodes: Node[] = [];
      const gridSize = Math.sqrt(nodeCount);
      const cellWidth = width / gridSize;
      const cellHeight = height / gridSize;

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x =
            i * cellWidth + Math.random() * (cellWidth * 0.6) + cellWidth * 0.2;
          const y =
            j * cellHeight +
            Math.random() * (cellHeight * 0.6) +
            cellHeight * 0.2;
          nodes.push({
            x,
            y,
            size: Math.random() * 3 + 2,
            isActive: false,
            activationLevel: 0,
          });
        }
      }

      const paths: Path[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const connections = findClosestNodes(
          node,
          nodes,
          2 + Math.floor(Math.random() * 3)
        );
        for (const target of connections) {
          const exists = paths.some(
            (p) =>
              (p.from === i && p.to === target) ||
              (p.from === target && p.to === i)
          );
          if (!exists && i !== target) {
            paths.push({
              from: i,
              to: target,
              isActive: false,
              activationLevel: 0,
            });
          }
        }
      }

      circuitNodesRef.current = nodes;
      circuitPathsRef.current = paths;
    };

    const findClosestNodes = (node: Node, nodes: Node[], count: number) => {
      const distances = nodes.map((n, index) => {
        const dx = node.x - n.x;
        const dy = node.y - n.y;
        return { index, distance: Math.sqrt(dx * dx + dy * dy) };
      });

      return distances
        .filter((d) => d.distance > 0)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, count)
        .map((d) => d.index);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!dimensions.width) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const nodes = circuitNodesRef.current;
      const paths = circuitPathsRef.current;

      // Update node activation
      for (const node of nodes) {
        const dx = node.x - mousePosition.x;
        const dy = node.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          node.isActive = true;
          node.activationLevel = Math.min(1, node.activationLevel + 0.05);
        } else {
          node.activationLevel = Math.max(0, node.activationLevel - 0.02);
          if (node.activationLevel <= 0) node.isActive = false;
        }
      }

      // Update path activation
      for (const path of paths) {
        const fromNode = nodes[path.from];
        const toNode = nodes[path.to];

        if (fromNode.isActive || toNode.isActive) {
          path.isActive = true;
          path.activationLevel = Math.min(1, path.activationLevel + 0.03);
        } else {
          path.activationLevel = Math.max(0, path.activationLevel - 0.01);
          if (path.activationLevel <= 0) path.isActive = false;
        }
      }

      // Draw inactive paths
      ctx.strokeStyle = `rgba(150,150,150,0.3)`; // lighter gray
      ctx.lineWidth = 1;
      for (const path of paths) {
        if (!path.isActive) {
          const fromNode = nodes[path.from];
          const toNode = nodes[path.to];
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
      }

      // Draw active paths using muted gray
      for (const path of paths) {
        if (path.isActive && path.activationLevel > 0) {
          const fromNode = nodes[path.from];
          const toNode = nodes[path.to];

          ctx.strokeStyle = `rgba(115, 115, 115, 0.2)`; // 20% opacity
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();

          ctx.strokeStyle = `rgb(115, 115, 115)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        if (!node.isActive) {
          ctx.fillStyle = "rgba(150,150,150,0.5)"; // inactive gray
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.size * 3
          );
          gradient.addColorStop(0, "rgba(115, 115, 115, 1)");
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgb(115, 115, 115)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw mouse gradient
      const gradient = ctx.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        150
      );
      gradient.addColorStop(0, "rgba(115, 115, 115, 0.1)"); // 10% opacity
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, mousePosition]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center flex-col overflow-hidden rounded-high">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {children}
    </div>
  );
};

export default CircuitBoard;
