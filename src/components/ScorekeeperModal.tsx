import React, { useState, useEffect, useRef } from 'react';
import { 
  BilliardGameType, 
  ScorekeeperData 
} from '../types';
import { 
  playTimerBeep, 
  playPocketSound, 
  playChalkSound 
} from '../utils/audio';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  CircleDot, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScorekeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export const ScorekeeperModal: React.FC<ScorekeeperModalProps> = ({
  isOpen,
  onClose,
  soundEnabled
}) => {
  const [gameType, setGameType] = useState<BilliardGameType>('9-ball');
  const [p1Name, setP1Name] = useState('Player 1 (Home)');
  const [p2Name, setP2Name] = useState('Player 2 (Away)');
  const [targetScore, setTargetScore] = useState(5); // Race to 5
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [p1Fouls, setP1Fouls] = useState(0);
  const [p2Fouls, setP2Fouls] = useState(0);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [currentRack, setCurrentRack] = useState(1);
  const [sunkBalls, setSunkBalls] = useState<number[]>([]);
  const [matchLog, setMatchLog] = useState<string[]>(['Match started. Good luck and clean cues!']);

  // Shot clock state (WPA 35s standard)
  const [shotClock, setShotClock] = useState(35);
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [isMatchWon, setIsMatchWon] = useState(false);
  const [winnerName, setWinnerName] = useState('');

  // Timer interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClockRunning && shotClock > 0) {
      timer = setInterval(() => {
        setShotClock(prev => {
          if (prev === 6 || prev === 3 || prev === 1) {
            if (soundEnabled) playTimerBeep(true);
          }
          if (prev <= 1) {
            setIsClockRunning(false);
            if (soundEnabled) playTimerBeep(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isClockRunning, shotClock, soundEnabled]);

  if (!isOpen) return null;

  const resetShotClock = (seconds = 35) => {
    setShotClock(seconds);
    setIsClockRunning(true);
  };

  const handleToggleBall = (num: number) => {
    if (soundEnabled) playPocketSound();
    if (sunkBalls.includes(num)) {
      setSunkBalls(prev => prev.filter(b => b !== num));
      setMatchLog(prev => [`Ball #${num} returned to table.`, ...prev.slice(0, 8)]);
    } else {
      setSunkBalls(prev => [...prev, num]);
      setMatchLog(prev => [`${activePlayer === 1 ? p1Name : p2Name} pocketed Ball #${num}`, ...prev.slice(0, 8)]);

      // Check 9-ball or 8-ball win condition
      if ((gameType === '9-ball' && num === 9) || (gameType === '8-ball' && num === 8)) {
        handleRackWon(activePlayer);
      }
    }
  };

  const handleRackWon = (player: 1 | 2) => {
    if (player === 1) {
      const newScore = p1Score + 1;
      setP1Score(newScore);
      setMatchLog(prev => [`🏆 ${p1Name} won Rack #${currentRack}!`, ...prev.slice(0, 8)]);
      if (newScore >= targetScore) {
        setIsMatchWon(true);
        setWinnerName(p1Name);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      const newScore = p2Score + 1;
      setP2Score(newScore);
      setMatchLog(prev => [`🏆 ${p2Name} won Rack #${currentRack}!`, ...prev.slice(0, 8)]);
      if (newScore >= targetScore) {
        setIsMatchWon(true);
        setWinnerName(p2Name);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    }

    // Prepare next rack
    setSunkBalls([]);
    setCurrentRack(prev => prev + 1);
    setShotClock(35);
    setIsClockRunning(false);
  };

  const handleFoul = (player: 1 | 2) => {
    if (player === 1) {
      setP1Fouls(prev => prev + 1);
      setMatchLog(prev => [`⚠️ Foul committed by ${p1Name}. Ball-in-hand for ${p2Name}.`, ...prev.slice(0, 8)]);
      setActivePlayer(2);
    } else {
      setP2Fouls(prev => prev + 1);
      setMatchLog(prev => [`⚠️ Foul committed by ${p2Name}. Ball-in-hand for ${p1Name}.`, ...prev.slice(0, 8)]);
      setActivePlayer(1);
    }
    resetShotClock(35);
  };

  const handleNewMatch = () => {
    setP1Score(0);
    setP2Score(0);
    setP1Fouls(0);
    setP2Fouls(0);
    setCurrentRack(1);
    setSunkBalls([]);
    setIsMatchWon(false);
    setWinnerName('');
    setShotClock(35);
    setIsClockRunning(false);
    setMatchLog(['New match initiated.']);
  };

  const ballsForGame = gameType === '9-ball' 
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9] 
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const getBallStyle = (num: number) => {
    const isSunk = sunkBalls.includes(num);
    const isStripe = num > 8;

    let baseBg = '#ffffff';
    if (num === 1 || num === 9) baseBg = '#facc15';
    if (num === 2 || num === 10) baseBg = '#2563eb';
    if (num === 3 || num === 11) baseBg = '#dc2626';
    if (num === 4 || num === 12) baseBg = '#9333ea';
    if (num === 5 || num === 13) baseBg = '#ea580c';
    if (num === 6 || num === 14) baseBg = '#16a34a';
    if (num === 7 || num === 15) baseBg = '#991b1b';
    if (num === 8) baseBg = '#0f172a';

    return {
      background: isStripe ? `linear-gradient(to bottom, #ffffff 20%, ${baseBg} 20%, ${baseBg} 80%, #ffffff 80%)` : baseBg,
      color: num === 8 || (num > 0 && num < 8 && num !== 1) ? '#ffffff' : '#000000',
      opacity: isSunk ? 0.25 : 1,
      transform: isSunk ? 'scale(0.85)' : 'scale(1)',
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-4 bg-[#0c1219] border border-[#232f3e] rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#101822] border-b border-[#1f2c3c]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
              <CircleDot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  brew.nyc Match Companion & Scorekeeper
                </h3>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono-custom font-bold">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono-custom">
                WPA Shot Clock • Ball Pocketing Matrix • Rack & Foul Counter
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-[#16202c] hover:bg-[#202c3c] border border-[#232f3e] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Match Winner Banner */}
        {isMatchWon && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black p-4 text-center flex items-center justify-center gap-3 font-bold text-sm sm:text-base">
            <Trophy className="w-6 h-6 fill-black" />
            <span>🎉 MATCH VICTORY! {winnerName} wins the Race to {targetScore} ({p1Score} - {p2Score})!</span>
            <button
              onClick={handleNewMatch}
              className="ml-3 px-3 py-1 bg-black text-white text-xs rounded-lg uppercase tracking-wider font-mono-custom"
            >
              Start Rematch
            </button>
          </div>
        )}

        {/* Scorekeeper Controls Top Bar */}
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Game Selection & Race Length */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1c2735]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-custom text-slate-400">Game:</span>
              <button
                onClick={() => { setGameType('9-ball'); setSunkBalls([]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  gameType === '9-ball' ? 'bg-amber-500 text-black' : 'bg-[#141d27] text-slate-300'
                }`}
              >
                9-Ball
              </button>
              <button
                onClick={() => { setGameType('8-ball'); setSunkBalls([]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  gameType === '8-ball' ? 'bg-amber-500 text-black' : 'bg-[#141d27] text-slate-300'
                }`}
              >
                8-Ball
              </button>
              <button
                onClick={() => { setGameType('straight'); setSunkBalls([]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  gameType === 'straight' ? 'bg-amber-500 text-black' : 'bg-[#141d27] text-slate-300'
                }`}
              >
                14.1 Continuous
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-custom">
              <span className="text-slate-400">Race Target:</span>
              <select
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="px-2.5 py-1 bg-[#141d27] border border-[#232f3e] rounded-lg text-white font-bold focus:outline-none"
              >
                {[3, 4, 5, 7, 9, 11, 13].map(n => (
                  <option key={n} value={n}>Race to {n}</option>
                ))}
              </select>

              <button
                onClick={handleNewMatch}
                className="flex items-center gap-1 px-3 py-1 bg-[#182330] hover:bg-[#202d3d] text-slate-300 rounded-lg text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Match
              </button>
            </div>
          </div>

          {/* Main Scoreboard: Player 1 vs Player 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Player 1 Card */}
            <div
              onClick={() => setActivePlayer(1)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activePlayer === 1
                  ? 'bg-gradient-to-br from-[#182535] to-[#121c27] border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                  : 'bg-[#101721] border-[#222e3e] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  className="bg-transparent font-display text-base font-bold text-white focus:outline-none border-b border-transparent focus:border-amber-400 max-w-[180px]"
                />
                {activePlayer === 1 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px] font-mono-custom font-black rounded uppercase">
                    Shooting Now
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between my-2">
                <div className="text-5xl font-black font-mono-custom text-white">
                  {p1Score}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setP1Score(Math.max(0, p1Score - 1)); }}
                    className="p-2 bg-[#182433] hover:bg-[#233245] rounded-xl text-slate-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRackWon(1); }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow"
                  >
                    + Rack Win
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1e2a38] text-xs font-mono-custom">
                <span className="text-slate-400">Fouls: <strong className="text-red-400">{p1Fouls}</strong></span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleFoul(1); }}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  + Record Foul
                </button>
              </div>
            </div>

            {/* Player 2 Card */}
            <div
              onClick={() => setActivePlayer(2)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activePlayer === 2
                  ? 'bg-gradient-to-br from-[#182535] to-[#121c27] border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                  : 'bg-[#101721] border-[#222e3e] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  className="bg-transparent font-display text-base font-bold text-white focus:outline-none border-b border-transparent focus:border-amber-400 max-w-[180px]"
                />
                {activePlayer === 2 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px] font-mono-custom font-black rounded uppercase">
                    Shooting Now
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between my-2">
                <div className="text-5xl font-black font-mono-custom text-white">
                  {p2Score}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setP2Score(Math.max(0, p2Score - 1)); }}
                    className="p-2 bg-[#182433] hover:bg-[#233245] rounded-xl text-slate-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRackWon(2); }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow"
                  >
                    + Rack Win
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1e2a38] text-xs font-mono-custom">
                <span className="text-slate-400">Fouls: <strong className="text-red-400">{p2Fouls}</strong></span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleFoul(2); }}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  + Record Foul
                </button>
              </div>
            </div>

          </div>

          {/* WPA Shot Clock & Rack Matrix */}
          <div className="grid md:grid-cols-12 gap-4 items-center bg-[#101721] p-4 rounded-2xl border border-[#222e3e]">
            
            {/* Shot Clock (4 Cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-[#0a0f16] rounded-xl border border-[#1b2533]">
              <div className="text-[10px] uppercase font-mono-custom text-slate-400 mb-1">
                WPA Shot Clock
              </div>
              <div className={`text-4xl font-black font-mono-custom tracking-wider mb-2 ${
                shotClock <= 5 ? 'text-red-500 animate-pulse' : shotClock <= 10 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {shotClock < 10 ? `0${shotClock}` : shotClock}s
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsClockRunning(!isClockRunning)}
                  className={`p-2 rounded-lg font-bold text-xs flex items-center gap-1 ${
                    isClockRunning ? 'bg-amber-500 text-black' : 'bg-[#182330] text-emerald-400'
                  }`}
                >
                  {isClockRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isClockRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => resetShotClock(35)}
                  className="px-2.5 py-2 bg-[#182330] hover:bg-[#202d3d] rounded-lg text-xs font-mono-custom text-slate-300"
                >
                  35s
                </button>
                <button
                  onClick={() => resetShotClock(60)}
                  className="px-2.5 py-2 bg-[#182330] hover:bg-[#202d3d] rounded-lg text-xs font-mono-custom text-slate-300"
                >
                  60s Ext
                </button>
              </div>
            </div>

            {/* Ball Pocketing Matrix (8 Cols) */}
            <div className="md:col-span-8">
              <div className="text-xs font-mono-custom text-slate-300 uppercase mb-2 flex items-center justify-between font-semibold">
                <span>Rack #{currentRack} Balls (Tap to Pocket)</span>
                <span className="text-[11px] text-amber-400">{sunkBalls.length} Pocketed</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3 bg-[#0a0f16] rounded-xl border border-[#1b2533]">
                {ballsForGame.map((num) => {
                  const isSunk = sunkBalls.includes(num);
                  return (
                    <button
                      key={num}
                      onClick={() => handleToggleBall(num)}
                      style={getBallStyle(num)}
                      className="w-9 h-9 rounded-full font-black text-xs flex items-center justify-center shadow-md border border-slate-900 transition-all active:scale-90"
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Match Log Stream */}
          <div className="p-3 bg-[#0a0f16] rounded-xl border border-[#1b2533]">
            <div className="text-[11px] font-mono-custom uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
              Live Match Audit Log
            </div>
            <div className="space-y-1 text-xs font-mono-custom text-slate-300 max-h-20 overflow-y-auto">
              {matchLog.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
