import React, { useState } from 'react';
import { Tournament } from '../types';
import { TOURNAMENTS } from '../data/mockData';
import { 
  Trophy, 
  Calendar, 
  Users, 
  DollarSign, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Flame,
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LeaguesAndEvents: React.FC = () => {
  const [selectedTourney, setSelectedTourney] = useState<Tournament>(TOURNAMENTS[0]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regFargo, setRegFargo] = useState('520');
  const [regPhone, setRegPhone] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName) return;

    setRegisteredSuccess(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setIsRegistering(false);
      setRegisteredSuccess(false);
      setRegName('');
      setRegPhone('');
    }, 2500);
  };

  return (
    <section id="tournaments" className="py-20 bg-[#080c10] border-b border-[#1b2533] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f2b3b] gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom uppercase tracking-widest mb-1.5">
              <Trophy className="w-3.5 h-3.5" />
              Sanctioned Leagues & Weekly Brackets
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              NYC Tournaments & Cash Cups
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Sanctioned APA and BCA weekly shootouts on 9ft Diamond tables. Live-streamed matches with commentary and cash payouts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-custom bg-[#121922] p-3 rounded-xl border border-[#232f3e]">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-bold text-white">FargoRate Handicapped</div>
              <div className="text-[10px] text-slate-400">Fair play across all amateur skill levels</div>
            </div>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Tournament Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {TOURNAMENTS.map((t) => {
              const isSelected = selectedTourney.id === t.id;
              const slotsLeft = t.maxPlayers - t.registeredPlayers;

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTourney(t)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#15212f] border-amber-400 shadow-xl ring-1 ring-amber-400/30'
                      : 'bg-[#0e141c] border-[#222e3e] hover:border-[#334255] hover:bg-[#121923]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1c2735]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded text-[10px] font-mono-custom font-bold">
                          {t.gameType}
                        </span>
                        <span className="text-xs font-mono-custom text-slate-400">
                          {t.dayOfWeek} • {t.time}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {t.title}
                      </h3>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-[10px] font-mono-custom text-slate-400 uppercase">Guaranteed Pool</div>
                      <div className="font-mono-custom font-bold text-lg text-emerald-400">
                        ${t.guaranteedPrize.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-custom">
                    <div className="flex items-center gap-4 text-slate-400">
                      <span>Entry: <strong className="text-white">${t.entryFee}</strong></span>
                      <span>Format: <strong className="text-slate-200">{t.format.split('•')[0]}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        slotsLeft <= 6 ? 'bg-red-950 text-red-400 border border-red-500/30' : 'bg-[#182433] text-slate-300'
                      }`}>
                        {slotsLeft} Spots Open
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tournament Details & Bracket / Registration Box (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0e141c] rounded-2xl border border-[#232f3e] p-6 shadow-2xl sticky top-28">
            
            <div className="pb-4 mb-4 border-b border-[#1c2735]">
              <span className="text-[11px] font-mono-custom text-amber-400 uppercase tracking-widest">
                Tournament Registry
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                {selectedTourney.title}
              </h3>
              <div className="text-xs text-slate-400 font-mono-custom mt-0.5">
                {selectedTourney.nextDate} • 148 Mercer St, SoHo
              </div>
            </div>

            {/* Quick Bracket Mini Preview */}
            <div className="mb-6 bg-[#0a0f16] p-4 rounded-xl border border-[#1b2533]">
              <div className="text-[11px] font-mono-custom uppercase text-slate-400 mb-3 flex items-center justify-between">
                <span>Championship Bracket Preview</span>
                <span className="text-emerald-400 font-bold">${selectedTourney.guaranteedPrize} Purse</span>
              </div>

              {/* Bracket Tree Visual */}
              <div className="space-y-2 text-[11px] font-mono-custom">
                <div className="flex items-center justify-between p-2 bg-[#121922] rounded border border-[#202c3c]">
                  <span className="text-white">Quarterfinals</span>
                  <span className="text-slate-400">8 Players • Race to 5</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#15202d] rounded border border-amber-500/20">
                  <span className="text-amber-300 font-semibold">Semifinals</span>
                  <span className="text-amber-400/80">4 Players • Race to 6</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded border border-amber-500/40">
                  <span className="text-white font-bold flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" /> Grand Finals
                  </span>
                  <span className="text-emerald-400 font-bold">$1,000 1st Place</span>
                </div>
              </div>
            </div>

            {/* Register Action or Form */}
            {isRegistering ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {registeredSuccess ? (
                  <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center text-emerald-300 text-xs font-semibold">
                    ✓ Registered for {selectedTourney.title}! Confirmation sent.
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-mono-custom uppercase text-slate-300 mb-1">
                        Cueist Full Name *
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Jason 'The Rocket' Cole"
                        className="w-full px-3 py-2 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-mono-custom uppercase text-slate-300 mb-1">
                          FargoRate / Skill
                        </label>
                        <input
                          type="text"
                          value={regFargo}
                          onChange={(e) => setRegFargo(e.target.value)}
                          placeholder="e.g. 540 or Unrated"
                          className="w-full px-3 py-2 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono-custom"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono-custom uppercase text-slate-300 mb-1">
                          Phone (SMS updates)
                        </label>
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="(212) 555-0199"
                          className="w-full px-3 py-2 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono-custom"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className="flex-1 py-2.5 bg-[#16202c] text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow"
                      >
                        Confirm Entry (${selectedTourney.entryFee})
                      </button>
                    </div>
                  </>
                )}
              </form>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs py-1.5 border-b border-[#182330]">
                  <span className="text-slate-400">Entry Fee:</span>
                  <span className="font-bold text-amber-400 font-mono-custom">${selectedTourney.entryFee} (Due at Check-In)</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1.5 border-b border-[#182330]">
                  <span className="text-slate-400">Slots Remaining:</span>
                  <span className="font-bold text-emerald-400 font-mono-custom">{selectedTourney.maxPlayers - selectedTourney.registeredPlayers} of {selectedTourney.maxPlayers}</span>
                </div>

                <button
                  id={`register-tourney-btn-${selectedTourney.id}`}
                  onClick={() => setIsRegistering(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Trophy className="w-4 h-4 text-black" />
                  <span>Register For Tournament</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
