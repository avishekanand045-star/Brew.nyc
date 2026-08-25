import React, { useState } from 'react';
import { HOUSE_RULES } from '../data/mockData';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  ShieldCheck, 
  Calendar, 
  Send,
  CheckCircle2,
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LocationAndHours: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [eventInquirySent, setEventInquirySent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [eventGroupSize, setEventGroupSize] = useState('20-40');
  const [eventDate, setEventDate] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    setEventInquirySent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setEventInquirySent(false);
      setContactName('');
      setContactEmail('');
      setEventDate('');
    }, 4000);
  };

  return (
    <section id="location" className="py-20 bg-[#080c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f2b3b] gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom uppercase tracking-widest mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              SoHo Flagship Playroom
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Location & House Etiquette
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Nestled on cobblestone Mercer Street in SoHo. Accessible via major subway lines with valet service available on weekends.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Book Table Ahead</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Location & Hours Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0e141c] rounded-2xl border border-[#232f3e] p-6 shadow-xl space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom font-bold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                Address & Transit
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                brew.nyc SoHo
              </h3>
              <p className="text-xs text-slate-300 font-mono-custom leading-relaxed">
                148 Mercer Street, Ground & Speakeasy Floor<br />
                New York, NY 10012 (between Prince & Houston)
              </p>

              {/* Transit lines */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#1c2735] text-xs">
                <span className="text-slate-400 font-mono-custom text-[11px]">Subways:</span>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-[10px] flex items-center justify-center">N</span>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-[10px] flex items-center justify-center">R</span>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-[10px] flex items-center justify-center">W</span>
                <span className="text-slate-400 text-[11px]">(Prince St) •</span>
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold text-[10px] flex items-center justify-center">B</span>
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold text-[10px] flex items-center justify-center">D</span>
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold text-[10px] flex items-center justify-center">F</span>
                <span className="text-slate-400 text-[11px]">(B'way-Lafayette)</span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="pt-4 border-t border-[#1c2735]">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom font-bold uppercase tracking-wider mb-3">
                <Clock className="w-4 h-4" />
                Playroom & Taproom Hours
              </div>

              <div className="space-y-2 text-xs font-mono-custom">
                <div className="flex justify-between items-center py-1 border-b border-[#182330]">
                  <span className="text-slate-400">Monday – Thursday:</span>
                  <span className="text-white font-semibold">2:00 PM – 2:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#182330] bg-amber-500/5 px-2 rounded">
                  <span className="text-amber-300 font-bold">Friday & Saturday:</span>
                  <span className="text-amber-400 font-bold">12:00 PM – 4:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Sunday:</span>
                  <span className="text-white font-semibold">12:00 PM – 12:00 AM</span>
                </div>
              </div>

              <div className="mt-3 text-[11px] font-mono-custom text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Happy Hour: Mon–Fri 2:00 PM – 6:00 PM ($3 Off All NYC Drafts)
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-[#1c2735] flex items-center justify-between text-xs font-mono-custom">
              <a href="tel:2125552739" className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                (212) 555-BREW
              </a>
              <a href="mailto:host@brew.nyc" className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                host@brew.nyc
              </a>
            </div>

          </div>

          {/* House Rules & Billiards Etiquette (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0e141c] rounded-2xl border border-[#232f3e] p-6 shadow-xl">
            
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              House Rules & Player Etiquette
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Maintaining Championship Standards
            </h3>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {HOUSE_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-[#121922] p-4 rounded-xl border border-[#222e3e] flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {rule.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {rule.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Private Events & Venue Buyouts Form */}
            <div className="mt-6 pt-6 border-t border-[#1c2735]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Private Room & Full Venue Buyouts
                  </h4>
                  <p className="text-xs text-slate-400">
                    Host corporate team tournaments, birthdays, or private tasting parties.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-mono-custom font-bold rounded">
                  Up to 150 Guests
                </span>
              </div>

              {eventInquirySent ? (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-semibold text-center">
                  ✓ Thank you! Our SoHo events concierge will reach out within 2 hours.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="grid sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name *"
                    className="px-3 py-2 bg-[#121922] border border-[#232f3e] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    required
                  />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Work / Personal Email *"
                    className="px-3 py-2 bg-[#121922] border border-[#232f3e] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1a2533] hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/30 text-xs font-bold font-mono-custom rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire Buyout</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
