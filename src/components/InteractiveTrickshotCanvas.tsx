import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  playBallHitSound, 
  playPocketSound, 
  playChalkSound 
} from '../utils/audio';
import { 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  Target, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isStripe: boolean;
  number: number;
  isCueBall?: boolean;
  isSunk?: boolean;
}

interface Pocket {
  x: number;
  y: number;
  radius: number;
}

export const InteractiveTrickshotCanvas: React.FC<{ soundEnabled: boolean }> = ({ soundEnabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [shotsTaken, setShotsTaken] = useState(0);
  const [sunkCount, setSunkCount] = useState(0);
  const [gameMode, setGameMode] = useState<'8-ball-rack' | '9-ball-diamond' | 'trickshot-bank'>('8-ball-rack');
  const [isAiming, setIsAiming] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [feltColor, setFeltColor] = useState<'blue' | 'green' | 'charcoal'>('blue');
  const [statusMessage, setStatusMessage] = useState('Drag back on the cue ball to aim & shoot!');

  // Mutable game state in ref to avoid re-render lag during 60FPS loop
  const ballsRef = useRef<Ball[]>([]);
  const pocketsRef = useRef<Pocket[]>([]);
  const animFrameIdRef = useRef<number>(0);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 800, height: 420 });

  // Ball initial positioning
  const initBalls = useCallback((mode: string, width: number, height: number) => {
    const ballRadius = Math.max(9, Math.min(13, width / 65));
    const newBalls: Ball[] = [];

    // Cue ball
    const cueBall: Ball = {
      id: 0,
      x: width * 0.25,
      y: height * 0.5,
      vx: 0,
      vy: 0,
      radius: ballRadius,
      color: '#ffffff',
      isStripe: false,
      number: 0,
      isCueBall: true,
      isSunk: false,
    };
    newBalls.push(cueBall);

    const rackApexX = width * 0.68;
    const rackApexY = height * 0.5;
    const spacing = ballRadius * 2.05;

    if (mode === '8-ball-rack') {
      // 8-Ball Triangle rack (rows of 1, 2, 3, 4)
      const colors = [
        { num: 1, color: '#facc15', stripe: false },
        { num: 2, color: '#2563eb', stripe: false },
        { num: 3, color: '#dc2626', stripe: false },
        { num: 4, color: '#9333ea', stripe: false },
        { num: 8, color: '#111827', stripe: false }, // 8 ball in center
        { num: 5, color: '#ea580c', stripe: false },
        { num: 9, color: '#facc15', stripe: true },
        { num: 10, color: '#2563eb', stripe: true },
        { num: 11, color: '#dc2626', stripe: true },
        { num: 12, color: '#9333ea', stripe: true },
      ];

      let ballIndex = 0;
      for (let col = 0; col < 4; col++) {
        for (let row = 0; row <= col; row++) {
          if (ballIndex >= colors.length) break;
          const ballData = colors[ballIndex];
          const x = rackApexX + col * (spacing * 0.866);
          const y = rackApexY - (col * spacing * 0.5) + (row * spacing);

          newBalls.push({
            id: ballData.num,
            x,
            y,
            vx: 0,
            vy: 0,
            radius: ballRadius,
            color: ballData.color,
            isStripe: ballData.stripe,
            number: ballData.num,
            isSunk: false,
          });
          ballIndex++;
        }
      }
    } else if (mode === '9-ball-diamond') {
      // 9-Ball Diamond Rack
      const pattern = [
        { col: 0, row: 0, num: 1, color: '#facc15', stripe: false },
        { col: 1, row: -0.5, num: 2, color: '#2563eb', stripe: false },
        { col: 1, row: 0.5, num: 3, color: '#dc2626', stripe: false },
        { col: 2, row: -1, num: 4, color: '#9333ea', stripe: false },
        { col: 2, row: 0, num: 9, color: '#facc15', stripe: true }, // 9 ball in center
        { col: 2, row: 1, num: 5, color: '#ea580c', stripe: false },
        { col: 3, row: -0.5, num: 6, color: '#16a34a', stripe: false },
        { col: 3, row: 0.5, num: 7, color: '#991b1b', stripe: false },
        { col: 4, row: 0, num: 8, color: '#111827', stripe: false },
      ];

      pattern.forEach(p => {
        const x = rackApexX + p.col * (spacing * 0.866);
        const y = rackApexY + p.row * spacing;
        newBalls.push({
          id: p.num,
          x,
          y,
          vx: 0,
          vy: 0,
          radius: ballRadius,
          color: p.color,
          isStripe: p.stripe,
          number: p.num,
          isSunk: false,
        });
      });
    } else {
      // Trickshot Challenge: Bank Shot Setup
      newBalls.push({
        id: 8,
        x: width * 0.55,
        y: height * 0.25,
        vx: 0,
        vy: 0,
        radius: ballRadius,
        color: '#111827',
        isStripe: false,
        number: 8,
        isSunk: false,
      });
      newBalls.push({
        id: 9,
        x: width * 0.7,
        y: height * 0.75,
        vx: 0,
        vy: 0,
        radius: ballRadius,
        color: '#facc15',
        isStripe: true,
        number: 9,
        isSunk: false,
      });
    }

    ballsRef.current = newBalls;
    setSunkCount(0);
  }, []);

  // Update canvas size and pockets
  const updateDimensions = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(Math.min(460, Math.max(300, width * 0.52)));

    dimensionsRef.current = { width, height };
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const pocketRadius = Math.max(16, width / 38);
    const margin = pocketRadius * 0.8;

    pocketsRef.current = [
      { x: margin, y: margin, radius: pocketRadius },
      { x: width * 0.5, y: margin * 0.7, radius: pocketRadius * 0.9 },
      { x: width - margin, y: margin, radius: pocketRadius },
      { x: margin, y: height - margin, radius: pocketRadius },
      { x: width * 0.5, y: height - margin * 0.7, radius: pocketRadius * 0.9 },
      { x: width - margin, y: height - margin, radius: pocketRadius },
    ];

    initBalls(gameMode, width, height);
  }, [gameMode, initBalls]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Main physics & render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const friction = 0.985;
    const cushionRestitution = 0.88;
    const ballRestitution = 0.92;

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      const cushionMargin = Math.max(14, width / 45);

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Table Wood Rails
      ctx.fillStyle = '#2c180e';
      ctx.fillRect(0, 0, width, height);

      // Wood Rail Inset Border
      ctx.strokeStyle = '#4a2b19';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, width - 4, height - 4);

      // Diamond sights on rails
      ctx.fillStyle = '#fce7b0';
      const sightsX = [0.25, 0.5, 0.75];
      sightsX.forEach(ratio => {
        // Top and bottom rail sights
        ctx.beginPath();
        ctx.arc(width * ratio, cushionMargin * 0.45, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width * ratio, height - cushionMargin * 0.45, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Felt Bed
      let feltBg = '#143c61';
      if (feltColor === 'green') feltBg = '#0b4a2e';
      if (feltColor === 'charcoal') feltBg = '#222933';

      ctx.fillStyle = feltBg;
      ctx.fillRect(cushionMargin, cushionMargin, width - cushionMargin * 2, height - cushionMargin * 2);

      // Subtle felt lighting gradient
      const feltGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 50,
        width * 0.5, height * 0.5, width * 0.6
      );
      feltGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      feltGrad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = feltGrad;
      ctx.fillRect(cushionMargin, cushionMargin, width - cushionMargin * 2, height - cushionMargin * 2);

      // Headstring / Kitchen line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width * 0.25, cushionMargin);
      ctx.lineTo(width * 0.25, height - cushionMargin);
      ctx.stroke();
      ctx.setLineDash([]);

      // Headspot & Footspot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(width * 0.25, height * 0.5, 2, 0, Math.PI * 2);
      ctx.arc(width * 0.68, height * 0.5, 2, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Pockets
      pocketsRef.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#080c10';
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // 4. Update Ball Physics
      const balls = ballsRef.current;
      const pockets = pocketsRef.current;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        if (b.isSunk) continue;

        // Position update
        b.x += b.vx;
        b.y += b.vy;

        // Friction
        b.vx *= friction;
        b.vy *= friction;
        if (Math.abs(b.vx) < 0.02) b.vx = 0;
        if (Math.abs(b.vy) < 0.02) b.vy = 0;

        // Pocket sinking detection
        for (let p of pockets) {
          const dx = b.x - p.x;
          const dy = b.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius + b.radius * 0.4) {
            b.isSunk = true;
            b.vx = 0;
            b.vy = 0;

            if (soundEnabled) playPocketSound();

            if (b.isCueBall) {
              setStatusMessage('Scratch! Cue ball sunk. Repositioning on headstring...');
              setTimeout(() => {
                b.isSunk = false;
                b.x = width * 0.25;
                b.y = height * 0.5;
                b.vx = 0;
                b.vy = 0;
              }, 800);
            } else {
              setScore(prev => prev + (b.number === 9 ? 100 : b.number === 8 ? 50 : 20));
              setSunkCount(prev => prev + 1);
              setStatusMessage(`Sunk Ball #${b.number}! Clean shot.`);

              if (b.number === 8 || b.number === 9) {
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.6 }
                });
              }
            }
          }
        }

        // Cushion Bounces
        const minX = cushionMargin + b.radius;
        const maxX = width - cushionMargin - b.radius;
        const minY = cushionMargin + b.radius;
        const maxY = height - cushionMargin - b.radius;

        if (b.x < minX) {
          b.x = minX;
          b.vx = -b.vx * cushionRestitution;
          if (soundEnabled && Math.abs(b.vx) > 0.4) playBallHitSound(0.3);
        } else if (b.x > maxX) {
          b.x = maxX;
          b.vx = -b.vx * cushionRestitution;
          if (soundEnabled && Math.abs(b.vx) > 0.4) playBallHitSound(0.3);
        }

        if (b.y < minY) {
          b.y = minY;
          b.vy = -b.vy * cushionRestitution;
          if (soundEnabled && Math.abs(b.vy) > 0.4) playBallHitSound(0.3);
        } else if (b.y > maxY) {
          b.y = maxY;
          b.vy = -b.vy * cushionRestitution;
          if (soundEnabled && Math.abs(b.vy) > 0.4) playBallHitSound(0.3);
        }
      }

      // Ball-to-ball collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const b1 = balls[i];
          const b2 = balls[j];
          if (b1.isSunk || b2.isSunk) continue;

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < b1.radius + b2.radius) {
            // Normal and tangent vector
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);

            // Separate overlapping balls
            const overlap = (b1.radius + b2.radius) - dist;
            b1.x -= nx * overlap * 0.5;
            b1.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            // Velocity projection
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            b1.vx -= p * nx * ballRestitution;
            b1.vy -= p * ny * ballRestitution;
            b2.vx += p * nx * ballRestitution;
            b2.vy += p * ny * ballRestitution;

            const impactSpeed = Math.sqrt(kx * kx + ky * ky);
            if (soundEnabled && impactSpeed > 0.5) {
              playBallHitSound(Math.min(impactSpeed / 10, 0.9));
            }
          }
        }
      }

      // 5. Draw Aiming Guideline and Cue Stick
      const cueBall = balls[0];
      if (isAiming && dragStart && dragCurrent && cueBall && !cueBall.isSunk) {
        const pullDx = dragStart.x - dragCurrent.x;
        const pullDy = dragStart.y - dragCurrent.y;
        const pullDist = Math.sqrt(pullDx * pullDy + pullDy * pullDy);
        const power = Math.min(pullDist, 180);

        if (pullDist > 4) {
          const aimAngle = Math.atan2(pullDy, pullDx);

          // Projected path of cue ball
          ctx.beginPath();
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.moveTo(cueBall.x, cueBall.y);
          ctx.lineTo(
            cueBall.x + Math.cos(aimAngle) * (power * 2.5),
            cueBall.y + Math.sin(aimAngle) * (power * 2.5)
          );
          ctx.stroke();
          ctx.setLineDash([]);

          // Cue Stick
          const stickLength = Math.max(140, width * 0.28);
          const stickOffset = cueBall.radius + 6 + (power * 0.35);

          const stickStartX = cueBall.x - Math.cos(aimAngle) * stickOffset;
          const stickStartY = cueBall.y - Math.sin(aimAngle) * stickOffset;
          const stickEndX = cueBall.x - Math.cos(aimAngle) * (stickOffset + stickLength);
          const stickEndY = cueBall.y - Math.sin(aimAngle) * (stickOffset + stickLength);

          const stickGrad = ctx.createLinearGradient(stickStartX, stickStartY, stickEndX, stickEndY);
          stickGrad.addColorStop(0, '#f8fafc'); // White tip
          stickGrad.addColorStop(0.1, '#d97706'); // Maple shaft
          stickGrad.addColorStop(0.6, '#78350f'); // Wood butt
          stickGrad.addColorStop(1, '#1e293b'); // Rubber bumper

          ctx.beginPath();
          ctx.lineWidth = 5;
          ctx.strokeStyle = stickGrad;
          ctx.lineCap = 'round';
          ctx.moveTo(stickStartX, stickStartY);
          ctx.lineTo(stickEndX, stickEndY);
          ctx.stroke();

          // Power Meter Pill near cue ball
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1;
          const meterW = 60;
          const meterH = 14;
          const meterX = cueBall.x - meterW / 2;
          const meterY = cueBall.y - cueBall.radius - 22;
          ctx.fillRect(meterX, meterY, meterW, meterH);
          ctx.strokeRect(meterX, meterY, meterW, meterH);

          const fillRatio = power / 180;
          ctx.fillStyle = fillRatio > 0.75 ? '#ef4444' : fillRatio > 0.4 ? '#f59e0b' : '#10b981';
          ctx.fillRect(meterX + 2, meterY + 2, (meterW - 4) * fillRatio, meterH - 4);
        }
      }

      // 6. Draw Balls
      balls.forEach(b => {
        if (b.isSunk) return;

        // Ball drop shadow
        ctx.beginPath();
        ctx.arc(b.x + 2, b.y + 2, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fill();

        // Ball Body
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

        if (b.isCueBall) {
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Red Measle dot for English / spin visualization
          ctx.beginPath();
          ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#dc2626';
          ctx.fill();
        } else if (b.isStripe) {
          // White base with colored stripe
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Colored central stripe
          ctx.save();
          ctx.clip();
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x - b.radius, b.y - b.radius * 0.45, b.radius * 2, b.radius * 0.9);
          ctx.restore();
        } else {
          // Solid ball
          ctx.fillStyle = b.color;
          ctx.fill();
        }

        // White circle number badge for non-cue balls
        if (!b.isCueBall) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.48, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.fillStyle = '#000000';
          ctx.font = `bold ${Math.floor(b.radius * 0.65)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${b.number}`, b.x, b.y);
        }

        // Specular highlight for 3D shine
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      });

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameIdRef.current);
  }, [feltColor, isAiming, dragStart, dragCurrent, soundEnabled]);

  // Pointer event handlers for shooting
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cueBall = ballsRef.current[0];
    if (!cueBall || cueBall.isSunk) return;

    // Check if cue ball is still moving fast
    if (Math.abs(cueBall.vx) > 0.2 || Math.abs(cueBall.vy) > 0.2) return;

    setIsAiming(true);
    setDragStart({ x: cueBall.x, y: cueBall.y });
    setDragCurrent({ x, y });

    if (soundEnabled) playChalkSound();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isAiming) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDragCurrent({ x, y });
  };

  const handlePointerUp = () => {
    if (!isAiming || !dragStart || !dragCurrent) {
      setIsAiming(false);
      return;
    }

    const cueBall = ballsRef.current[0];
    if (cueBall && !cueBall.isSunk) {
      const pullDx = dragStart.x - dragCurrent.x;
      const pullDy = dragStart.y - dragCurrent.y;
      const pullDist = Math.sqrt(pullDx * pullDx + pullDy * pullDy);

      if (pullDist > 6) {
        const power = Math.min(pullDist, 180) / 10;
        const angle = Math.atan2(pullDy, pullDx);

        cueBall.vx = Math.cos(angle) * power;
        cueBall.vy = Math.sin(angle) * power;

        setShotsTaken(prev => prev + 1);
        if (soundEnabled) playBallHitSound(Math.min(power / 10, 1));
        setStatusMessage('Shot away! Watch the runout...');
      }
    }

    setIsAiming(false);
    setDragStart(null);
    setDragCurrent(null);
  };

  return (
    <section id="interactive-table" className="py-20 bg-[#080c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1f2937] gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-custom uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              In-Browser Physics Playroom
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Virtual Billiards Simulator
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Test bank angles, practice trickshots, and experience realistic Simonis cloth physics directly in your browser.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-[#131b26] border border-[#222f3e] rounded-xl text-center">
              <div className="text-[10px] uppercase font-mono-custom text-slate-400">Score</div>
              <div className="text-xl font-bold text-amber-400 font-mono-custom">{score}</div>
            </div>
            <div className="px-3.5 py-2 bg-[#131b26] border border-[#222f3e] rounded-xl text-center">
              <div className="text-[10px] uppercase font-mono-custom text-slate-400">Shots</div>
              <div className="text-xl font-bold text-white font-mono-custom">{shotsTaken}</div>
            </div>
            <div className="px-3.5 py-2 bg-[#131b26] border border-[#222f3e] rounded-xl text-center">
              <div className="text-[10px] uppercase font-mono-custom text-slate-400">Sunk</div>
              <div className="text-xl font-bold text-emerald-400 font-mono-custom">{sunkCount}</div>
            </div>
          </div>
        </div>

        {/* Game Canvas Box */}
        <div className="bg-[#0e141c] rounded-2xl border border-[#232f3e] p-4 sm:p-6 shadow-2xl">
          
          {/* Controls Bar Above Canvas */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1a2330]">
            
            {/* Mode Selectors */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono-custom">Rack:</span>
              <button
                onClick={() => {
                  setGameMode('8-ball-rack');
                  initBalls('8-ball-rack', dimensionsRef.current.width, dimensionsRef.current.height);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  gameMode === '8-ball-rack'
                    ? 'bg-amber-500 text-black font-bold shadow'
                    : 'bg-[#16202c] text-slate-300 hover:text-white'
                }`}
              >
                8-Ball Triangle
              </button>
              <button
                onClick={() => {
                  setGameMode('9-ball-diamond');
                  initBalls('9-ball-diamond', dimensionsRef.current.width, dimensionsRef.current.height);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  gameMode === '9-ball-diamond'
                    ? 'bg-amber-500 text-black font-bold shadow'
                    : 'bg-[#16202c] text-slate-300 hover:text-white'
                }`}
              >
                9-Ball Diamond
              </button>
              <button
                onClick={() => {
                  setGameMode('trickshot-bank');
                  initBalls('trickshot-bank', dimensionsRef.current.width, dimensionsRef.current.height);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  gameMode === 'trickshot-bank'
                    ? 'bg-amber-500 text-black font-bold shadow'
                    : 'bg-[#16202c] text-slate-300 hover:text-white'
                }`}
              >
                Bank Shot Challenge
              </button>
            </div>

            {/* Cloth Color & Reset */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#121922] p-1 rounded-lg border border-[#232f3e]">
                <span className="text-[11px] text-slate-400 px-2 font-mono-custom">Felt:</span>
                <button
                  onClick={() => setFeltColor('blue')}
                  className={`w-5 h-5 rounded-full bg-sky-700 border ${feltColor === 'blue' ? 'border-white scale-110' : 'border-transparent'}`}
                  title="Simonis Tournament Blue"
                />
                <button
                  onClick={() => setFeltColor('green')}
                  className={`w-5 h-5 rounded-full bg-emerald-800 border ${feltColor === 'green' ? 'border-white scale-110' : 'border-transparent'}`}
                  title="Classic Forest Green"
                />
                <button
                  onClick={() => setFeltColor('charcoal')}
                  className={`w-5 h-5 rounded-full bg-slate-700 border ${feltColor === 'charcoal' ? 'border-white scale-110' : 'border-transparent'}`}
                  title="Speakeasy Charcoal"
                />
              </div>

              <button
                id="reset-canvas-rack-btn"
                onClick={() => initBalls(gameMode, dimensionsRef.current.width, dimensionsRef.current.height)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2533] hover:bg-[#233245] text-slate-200 text-xs font-semibold rounded-lg border border-[#2b3d52] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                Rerack Balls
              </button>
            </div>

          </div>

          {/* Status Prompt */}
          <div className="flex items-center justify-between text-xs font-mono-custom text-slate-300 mb-3 px-2">
            <span className="flex items-center gap-2 text-amber-300">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              {statusMessage}
            </span>
            <span className="hidden sm:inline text-slate-400">
              Tip: Pull further back for high break speed
            </span>
          </div>

          {/* Interactive Canvas */}
          <div 
            ref={containerRef} 
            className="w-full relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#331c10] cursor-crosshair touch-none"
          >
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="block w-full"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
