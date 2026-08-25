import React, { useState } from 'react';
import { MEMBERSHIP_TIERS } from '../data/mockData';
import { 
  Check, 
  Crown, 
  Sparkles, 
  Key, 
  ShieldCheck, 
  ArrowRight,
  Beer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MembershipsSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="memberships" className="py-20 bg-[#0c1219] border-b border-[#1b2533] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono-custom uppercase tracking-widest mb-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
            <Crown className="w-3.5 h-3.5" />
            The brew.nyc Society
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Club Memberships & Lockers
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Elevate your billiards experience with dedicated climate-controlled cue lockers, complimentary table hours, priority tournament seeding, and taproom privileges.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-3 mt-6 p-1 bg-[#121922] border border-[#232f3e] rounded-xl text-xs font-mono-custom">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] rounded font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map((tier) => {
            const price = billingCycle === 'annual' ? Math.round(tier.annualPrice / 12) : tier.monthlyPrice;
            const isSelected = selectedTier === tier.name;

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all border ${
                  tier.isPopular
                    ? 'bg-gradient-to-b from-[#162333] via-[#111a26] to-[#0d141f] border-amber-400 shadow-2xl shadow-amber-500/10 scale-[1.02]'
                    : 'bg-[#0e141c] border-[#222e3e] hover:border-[#334458]'
                }`}
              >
                {/* Popular Pill */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-mono-custom text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 min-h-[32px]">
                    {tier.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-[#1c2735]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black font-mono-custom text-amber-400">
                        ${price}
                      </span>
                      <span className="text-xs font-mono-custom text-slate-400">
                        / month {billingCycle === 'annual' && '(billed annually)'}
                      </span>
                    </div>
                  </div>

                  {/* Perks Checklist */}
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  id={`select-membership-${tier.id}`}
                  onClick={() => handleSelectTier(tier.name)}
                  className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/25'
                      : 'bg-[#182330] hover:bg-[#202e40] text-slate-200 border border-[#2b3a4d]'
                  }`}
                >
                  {isSelected ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      ✓ Membership Requested
                    </span>
                  ) : (
                    <>
                      <span>Apply For {tier.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
