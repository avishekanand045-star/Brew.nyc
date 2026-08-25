import React, { useState, useEffect } from 'react';
import { 
  Beer, 
  CircleDot, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Clock, 
  Trophy, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (tableId?: string) => void;
  onOpenScorekeeper: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenScorekeeper,
  soundEnabled,
  onToggleSound
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nycTime, setNycTime] = useState('');

  // Update NYC time clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setNycTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Floor Plan', href: '#floor-plan' },
    { label: 'Craft Taplist & Bites', href: '#taplist' },
    { label: 'Interactive Table', href: '#interactive-table' },
    { label: 'Leagues & Tourneys', href: '#tournaments' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Location & Hours', href: '#location' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080c10]/95 backdrop-blur-md border-b border-[#232f3e] py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-[#080c10]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              {/* Cue Ball / Brew icon */}
              <div className="w-5 h-5 rounded-full border-2 border-black/80 flex items-center justify-center bg-white font-black text-[10px] text-black">
                8
              </div>
              <Beer className="w-3.5 h-3.5 absolute -bottom-1 -right-1 text-black bg-amber-400 rounded-full p-0.5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-bold tracking-wider text-white">
                  brew<span className="text-amber-400">.nyc</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono-custom bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded uppercase tracking-wider">
                  Open
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono-custom">
                Billiards • Craft Taproom • SoHo
              </span>
            </div>
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wider text-slate-300 hover:text-amber-400 transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls & CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live NYC Time & Table Status */}
            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 bg-[#121820] border border-[#232f3e] rounded-lg text-[11px] font-mono-custom text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>NYC: {nycTime || '08:00 PM'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-semibold">5/8 Tables Free</span>
            </div>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              className="p-2 text-slate-400 hover:text-amber-400 bg-[#121820] hover:bg-[#1a232e] border border-[#232f3e] rounded-lg transition-colors"
              title={soundEnabled ? 'Disable Game Audio FX' : 'Enable Game Audio FX'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Scorekeeper Button */}
            <button
              id="open-scorekeeper-btn"
              onClick={onOpenScorekeeper}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#16202c] hover:bg-[#202c3c] text-amber-300 border border-amber-500/30 rounded-lg transition-all shadow-sm hover:border-amber-400"
            >
              <CircleDot className="w-3.5 h-3.5 text-amber-400" />
              Scorekeeper
            </button>

            {/* Book a Table Primary CTA */}
            <button
              id="navbar-book-btn"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              Book Table
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-bold bg-amber-500 text-black rounded-md"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-[#121820] border border-[#232f3e] rounded-lg"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#0e141c] border border-[#232f3e] rounded-xl shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between py-2 border-b border-[#232f3e] text-xs font-mono-custom text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> NYC: {nycTime}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                5 Tables Open
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-amber-400 py-1.5 border-b border-[#1b2533]"
              >
                {link.label}
              </a>
            ))}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScorekeeper();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-[#16202c] text-amber-300 rounded-lg text-xs font-semibold border border-amber-500/20"
              >
                <CircleDot className="w-4 h-4 text-amber-400" />
                Scorekeeper
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-amber-500 text-black font-bold rounded-lg text-xs"
              >
                <Calendar className="w-4 h-4" />
                Reserve
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
