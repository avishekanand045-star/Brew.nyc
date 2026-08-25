import React, { useState } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../data/mockData';
import { 
  Beer, 
  Wine, 
  Utensils, 
  Coffee, 
  Sparkles, 
  Search, 
  Flame, 
  Heart, 
  CircleDot,
  Check
} from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPairingGame, setSelectedPairingGame] = useState<'casual-8ball' | 'intense-9ball' | 'vip-evening'>('intense-9ball');

  const filteredItems = MENU_ITEMS.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBrewery = item.breweryOrOrigin?.toLowerCase().includes(q);
      const matchTag = item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchBrewery && !matchTag) return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Items', icon: Sparkles },
    { id: 'craft-beers', label: 'Craft Drafts & Cans', icon: Beer },
    { id: 'cocktails', label: 'Speakeasy Cocktails', icon: Wine },
    { id: 'bites', label: 'Gastropub Bites', icon: Utensils },
    { id: 'non-alcoholic', label: 'Zero-Proof & Nitro', icon: Coffee },
  ];

  return (
    <section id="taplist" className="py-20 bg-[#0c1219] border-t border-b border-[#1b2533] relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1f2b3b] gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom uppercase tracking-widest mb-1.5">
              <Beer className="w-3.5 h-3.5" />
              Artisanal Taplist & Kitchen
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Craft Brews & Cocktails
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Curated NYC microbrews on 24 precision-chilled draft lines, speakeasy cocktails crafted by master mixologists, and elevated pub fare.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brews, cocktails, hops..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono-custom"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as MenuCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold scale-[1.02]'
                    : 'bg-[#141c26] text-slate-300 hover:text-white border border-[#232f3e] hover:bg-[#1a2533]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Billiards & Brew Pairing Box */}
        <div className="mb-12 bg-gradient-to-r from-[#141f2d] via-[#162333] to-[#121b26] border border-amber-500/25 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-[#223144]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
                <CircleDot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Curated Match & Sip Pairings
                </h4>
                <p className="text-xs text-slate-400">
                  Select your match atmosphere for the bartender's recommended flight.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPairingGame('intense-9ball')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom font-semibold transition-all ${
                  selectedPairingGame === 'intense-9ball'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-[#0f1620] text-slate-300 border border-[#222f3e]'
                }`}
              >
                Intense 9-Ball Duel
              </button>
              <button
                onClick={() => setSelectedPairingGame('casual-8ball')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom font-semibold transition-all ${
                  selectedPairingGame === 'casual-8ball'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-[#0f1620] text-slate-300 border border-[#222f3e]'
                }`}
              >
                Casual Friday 8-Ball
              </button>
              <button
                onClick={() => setSelectedPairingGame('vip-evening')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom font-semibold transition-all ${
                  selectedPairingGame === 'vip-evening'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-[#0f1620] text-slate-300 border border-[#222f3e]'
                }`}
              >
                VIP Lounge Night
              </button>
            </div>
          </div>

          <div className="pt-4 grid sm:grid-cols-3 gap-4 text-xs">
            {selectedPairingGame === 'intense-9ball' && (
              <>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Brew</span>
                  <div className="text-sm font-bold text-white mt-1">Other Half Green City DDH IPA</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">High aromatics, crisp citrus finish keeps mental focus sharp.</div>
                </div>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Cocktail</span>
                  <div className="text-sm font-bold text-white mt-1">The English Spin Mezcalita</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Smoked black salt & yuzu adds bold confidence on bank shots.</div>
                </div>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Plate</span>
                  <div className="text-sm font-bold text-white mt-1">Dry-Aged Wagyu Sliders</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Truffle aioli & brioche — perfect between rack innings.</div>
                </div>
              </>
            )}

            {selectedPairingGame === 'casual-8ball' && (
              <>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Brew</span>
                  <div className="text-sm font-bold text-white mt-1">Rothaus Tannenzäpfle Pilsner</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Crisp, refreshing German stein for long social games.</div>
                </div>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Cocktail</span>
                  <div className="text-sm font-bold text-white mt-1">SoHo Highball • Toki & Yuzu</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Effervescent Japanese whisky highball with hand-cut spear ice.</div>
                </div>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Plate</span>
                  <div className="text-sm font-bold text-white mt-1">Warm Pretzel & IPA Cheese Dip</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Giant shareable Bavarian pretzel with sharp cheddar fondue.</div>
                </div>
              </>
            )}

            {selectedPairingGame === 'vip-evening' && (
              <>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Brew</span>
                  <div className="text-sm font-bold text-white mt-1">Brooklyn Black Chocolate Vintage Stout</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">10.0% ABV barrel-aged richness served in crystal snifters.</div>
                </div>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Cocktail</span>
                  <div className="text-sm font-bold text-white mt-1">Chalk & Barrel Smoked Old Fashioned</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Woodford Reserve bourbon presented under cedarwood smoke.</div>
                </div>
                <div className="bg-[#0e141c] p-3 rounded-xl border border-[#232f3e]">
                  <span className="text-[10px] text-amber-400 uppercase font-mono-custom font-bold">Recommended Plate</span>
                  <div className="text-sm font-bold text-white mt-1">Burrata Di Stefano & Prosciutto</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Fresh 250g burrata with 24-mo prosciutto and mission figs.</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#101721] rounded-2xl border border-[#222e3e] hover:border-amber-500/40 p-5 transition-all hover:bg-[#141c28] flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Card Top: Tags & Price */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.isHouseFavorite && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-mono-custom font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" /> House Pick
                      </span>
                    )}
                    {item.isNew && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-mono-custom font-bold">
                        New On Tap
                      </span>
                    )}
                    {item.subCategory && (
                      <span className="text-[11px] text-slate-400 font-mono-custom">
                        {item.subCategory}
                      </span>
                    )}
                  </div>
                  <span className="font-display font-bold text-lg text-amber-400">
                    ${item.price}
                  </span>
                </div>

                {/* Item Name */}
                <h3 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                  {item.name}
                </h3>

                {/* Brewery / Origin info */}
                {item.breweryOrOrigin && (
                  <div className="text-xs font-mono-custom text-emerald-400/90 mb-2">
                    {item.breweryOrOrigin}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Specs & Pairing */}
              <div className="pt-3 border-t border-[#1a2533] space-y-2">
                {/* ABV / IBU Specs */}
                {(item.abv || item.ibu) && (
                  <div className="flex items-center gap-3 text-[11px] font-mono-custom text-slate-400">
                    {item.abv && <span>ABV: <strong className="text-white">{item.abv}</strong></span>}
                    {item.ibu && <span>IBU: <strong className="text-white">{item.ibu}</strong></span>}
                  </div>
                )}

                {/* Pairing Note */}
                {item.pairingNote && (
                  <div className="text-[11px] text-slate-400 italic flex items-start gap-1.5 bg-[#0a0f16] p-2 rounded-lg border border-[#1b2533]">
                    <span className="text-amber-400 not-italic font-bold">Cueist Note:</span>
                    <span>{item.pairingNote}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#17212e] text-slate-400 text-[10px] rounded font-mono-custom"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
