import React from 'react';
import { 
  Calendar, 
  Sparkles, 
  MapPin, 
  Award, 
  Beer, 
  ArrowRight, 
  Play,
  ShieldCheck
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreFloor: () => void;
  onTryInteractiveGame: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreFloor,
  onTryInteractiveGame
}) => {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#080c10] via-[#0c1219] to-[#080c10]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Location & Status Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16202c] border border-amber-500/30 text-amber-300 text-xs font-mono-custom mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>148 Mercer St, SoHo, NYC • Walk-Ins & Reservations Welcome</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Where Masterful <span className="gold-gradient-text">Cues</span> Meet World-Class <span className="text-emerald-400">Brews</span>.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              New York City’s premier billiards club and speakeasy playroom. Featuring 
              championship <span className="text-white font-medium">Diamond 9-foot tournament tables</span> covered 
              in high-speed Simonis cloth, 24 rotating <span className="text-amber-400 font-medium">NYC craft microbrew taps</span>, 
              artisan cocktails, and weekly cash brackets.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-reserve-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold uppercase tracking-wider text-sm rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <Calendar className="w-4 h-4 text-black" />
                Reserve A Table
              </button>

              <button
                id="hero-explore-floor-btn"
                onClick={onExploreFloor}
                className="w-full sm:w-auto px-6 py-4 bg-[#141b24] hover:bg-[#1c2633] text-slate-200 hover:text-white border border-[#273546] hover:border-amber-500/40 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Live Floor Plan</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                id="hero-interactive-game-btn"
                onClick={onTryInteractiveGame}
                className="w-full sm:w-auto px-5 py-4 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 font-mono-custom text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                Play Billiards Simulator
              </button>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1e293b] w-full">
              <div>
                <div className="text-2xl font-black text-white font-mono-custom">9ft & 8ft</div>
                <div className="text-xs text-slate-400">Diamond & Brunswick</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-400 font-mono-custom">24 Taps</div>
                <div className="text-xs text-slate-400">Rotating NY Microbrews</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400 font-mono-custom">Simonis</div>
                <div className="text-xs text-slate-400">860 Tournament Felt</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-200 font-mono-custom">4 AM</div>
                <div className="text-xs text-slate-400">Late Weekend Night Owls</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-emerald-500/30 shadow-2xl">
              
              {/* Card Container */}
              <div className="rounded-[14px] bg-[#0d131a] border border-[#232f3e] p-6 overflow-hidden relative">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1c2735]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="text-xs font-mono-custom font-bold text-white block">
                        THE MAIN ARENA
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono-custom">
                        Simonis 860 Blue • Shadowless 5000K
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono-custom rounded-md font-semibold">
                    Live Arena
                  </span>
                </div>

                {/* Billiards Scene Simulation Graphic */}
                <div className="relative rounded-xl h-56 felt-blue wood-border flex items-center justify-center overflow-hidden mb-5">
                  {/* Pocket Holes */}
                  <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-black border border-slate-700 shadow-inner" />
                  <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black border border-slate-700 shadow-inner" />
                  <div className="absolute bottom-1.5 left-1.5 w-6 h-6 rounded-full bg-black border border-slate-700 shadow-inner" />
                  <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black border border-slate-700 shadow-inner" />
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-5 rounded-b-md bg-black border border-slate-700 shadow-inner" />
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-5 rounded-t-md bg-black border border-slate-700 shadow-inner" />

                  {/* Sight dots on rails */}
                  <div className="absolute top-0.5 left-1/4 w-1 h-1 bg-amber-200/80 rounded-full" />
                  <div className="absolute top-0.5 left-3/4 w-1 h-1 bg-amber-200/80 rounded-full" />
                  <div className="absolute bottom-0.5 left-1/4 w-1 h-1 bg-amber-200/80 rounded-full" />
                  <div className="absolute bottom-0.5 left-3/4 w-1 h-1 bg-amber-200/80 rounded-full" />

                  {/* Pool Balls on Felt */}
                  {/* Cue Ball */}
                  <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-lg border border-slate-300 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600/70" />
                  </div>

                  {/* Aim Line */}
                  <div className="absolute left-[28%] top-1/2 w-24 h-[1px] border-t border-dashed border-white/60 pointer-events-none" />

                  {/* 8 Ball */}
                  <div className="absolute left-[58%] top-[48%] -translate-y-1/2 w-7 h-7 rounded-full bg-black shadow-lg border border-slate-800 flex items-center justify-center text-white text-[9px] font-black">
                    <span className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center font-bold">8</span>
                  </div>

                  {/* 9 Ball (Stripe Yellow) */}
                  <div className="absolute left-[64%] top-[38%] -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-lg border border-slate-300 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-y-0 w-3 bg-amber-400 flex items-center justify-center" />
                    <span className="relative z-10 text-[9px] font-bold text-black bg-white rounded-full w-3.5 h-3.5 flex items-center justify-center">9</span>
                  </div>

                  {/* 1 Ball (Solid Yellow) */}
                  <div className="absolute left-[64%] top-[62%] -translate-y-1/2 w-7 h-7 rounded-full bg-amber-400 shadow-lg border border-amber-600 flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center">1</span>
                  </div>

                  {/* Cue Stick Graphic */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-28 h-2 bg-gradient-to-r from-amber-800 via-amber-600 to-slate-200 rounded-l shadow-md border-t border-b border-amber-950/80 -rotate-3" />
                </div>

                {/* Feature Pills */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141d27] border border-[#232f3e]">
                    <div className="flex items-center gap-2.5">
                      <Beer className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-200">On Tap Tonight</span>
                    </div>
                    <span className="text-xs text-amber-400 font-mono-custom font-bold">Other Half DDH IPA</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141d27] border border-[#232f3e]">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-slate-200">Next Cash Bracket</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono-custom font-bold">Tuesday 9-Ball ($1.5k)</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141d27] border border-[#232f3e]">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-semibold text-slate-200">Gear Standard</span>
                    </div>
                    <span className="text-xs text-slate-300 font-mono-custom">Aramith Pro TV Balls</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
