import React, { useState } from 'react';
import { Beer, CircleDot, Send, Heart, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC<{
  onOpenBooking: () => void;
  onOpenScorekeeper: () => void;
}> = ({ onOpenBooking, onOpenScorekeeper }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="bg-[#06090d] border-t border-[#18222e] text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#18222e]">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-black flex items-center justify-center font-bold text-xs shadow-lg">
                8
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-wider">
                brew<span className="text-amber-400">.nyc</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              New York City’s speakeasy billiards playroom and craft beer club. Powered by Diamond 9ft tournament tables, Simonis 860 cloth, 24 rotating microbrew taps, and curated vinyl soundscapes.
            </p>

            <div className="text-xs font-mono-custom text-slate-400 space-y-1">
              <div>148 Mercer Street, SoHo, New York, NY 10012</div>
              <div>(212) 555-BREW • host@brew.nyc</div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#floor-plan" className="hover:text-amber-400 transition-colors">
                  Interactive Floor Plan
                </a>
              </li>
              <li>
                <a href="#taplist" className="hover:text-amber-400 transition-colors">
                  Craft Taplist & Bites
                </a>
              </li>
              <li>
                <a href="#interactive-table" className="hover:text-amber-400 transition-colors">
                  Virtual Billiards Simulator
                </a>
              </li>
              <li>
                <a href="#tournaments" className="hover:text-amber-400 transition-colors">
                  Tournaments & Leagues
                </a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-amber-400 transition-colors">
                  Cue Lockers & Society
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Tools & Actions */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-4">
              Player Tools
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Reserve A Table
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenScorekeeper}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Digital Match Scorekeeper
                </button>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Subway Transit & Hours
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  House Rules & Etiquette
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-4">
              Tap & Bracket Drops
            </h4>
            <p className="text-slate-400 text-xs mb-3">
              Get weekly tournament seedings and rare keg release notifications.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs">
                ✓ You're on the brew.nyc cue list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3 py-2 bg-[#101721] border border-[#232f3e] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono-custom"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-wider text-[11px] rounded-lg hover:from-amber-400 hover:to-amber-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Join The Society</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-custom text-slate-400">
          <div>
            © {new Date().getFullYear()} brew.nyc. All Rights Reserved. SoHo, New York City.
          </div>
          <div className="flex items-center gap-4">
            <span>Diamond Pro-Am 9ft Standards</span>
            <span>•</span>
            <span>Simonis 860 Felt</span>
            <span>•</span>
            <span>Craft NYC Taps</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
