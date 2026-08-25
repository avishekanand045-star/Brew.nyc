import React, { useState } from 'react';
import { PoolTable, TableType, TableStatus } from '../types';
import { POOL_TABLES } from '../data/mockData';
import { 
  Users, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  CircleDot, 
  ShieldCheck, 
  Wine, 
  Beer, 
  Eye, 
  Filter,
  Flame
} from 'lucide-react';

interface LiveFloorPlanProps {
  onSelectTableForBooking: (tableId: string) => void;
}

export const LiveFloorPlan: React.FC<LiveFloorPlanProps> = ({
  onSelectTableForBooking
}) => {
  const [selectedTable, setSelectedTable] = useState<PoolTable>(POOL_TABLES[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTables = POOL_TABLES.filter(table => {
    if (filterType !== 'all' && table.type !== filterType) return false;
    if (filterStatus !== 'all' && table.status !== filterStatus) return false;
    return true;
  });

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-custom bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Available Now
          </span>
        );
      case 'in-game':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-custom bg-amber-950/80 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            In Match
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-custom bg-sky-950/80 text-sky-400 border border-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Reserved
          </span>
        );
      default:
        return null;
    }
  };

  const getClothClass = (color: string) => {
    switch (color) {
      case 'blue': return 'felt-blue';
      case 'green': return 'felt-green';
      case 'charcoal': return 'felt-charcoal';
      case 'burgundy': return 'bg-[#5c0d1c]';
      default: return 'felt-blue';
    }
  };

  return (
    <section id="floor-plan" className="py-20 bg-[#0a0e14] border-t border-b border-[#1b2533] relative">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1e2a38] gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom uppercase tracking-widest mb-2">
              <CircleDot className="w-3.5 h-3.5" />
              Live Playroom Status & Floor Map
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Interactive Table Layout
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Inspect real-time table occupancy, tournament cloth specs, and reserve your preferred table in advance.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#121922] p-1 rounded-lg border border-[#232f3e] text-xs">
              <span className="px-2 text-slate-400 font-mono-custom">Type:</span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  filterType === 'all' ? 'bg-amber-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('9ft-diamond')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  filterType === '9ft-diamond' ? 'bg-amber-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                9ft Diamond
              </button>
              <button
                onClick={() => setFilterType('8ft-brunswick')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  filterType === '8ft-brunswick' ? 'bg-amber-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                8ft Brunswick
              </button>
              <button
                onClick={() => setFilterType('vip-suite')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  filterType === 'vip-suite' ? 'bg-amber-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                VIP Suite
              </button>
            </div>
          </div>
        </div>

        {/* Floor Map & Table Details Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Floor Map Canvas Container (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0e141c] rounded-2xl border border-[#232f3e] p-6 shadow-2xl relative overflow-hidden">
            
            {/* Floor Map Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1a2432]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-custom text-slate-300 uppercase tracking-wider font-semibold">
                  148 Mercer St • Ground & Speakeasy Floor
                </span>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-mono-custom">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Available
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> In Match
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Reserved
                </span>
              </div>
            </div>

            {/* Taproom Bar & Facilities Visual Top Bar */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#151f2b] border border-amber-500/20 rounded-lg p-3 flex items-center gap-3">
                <Beer className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">Craft Taproom Bar</div>
                  <div className="text-[10px] text-slate-400 font-mono-custom">24 Rotating Craft Taps</div>
                </div>
              </div>
              <div className="bg-[#151f2b] border border-[#232f3e] rounded-lg p-3 flex items-center gap-3">
                <Wine className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Cocktail Lounge</div>
                  <div className="text-[10px] text-slate-400 font-mono-custom">Leather Booths & Vinyl DJ</div>
                </div>
              </div>
              <div className="bg-[#151f2b] border border-[#232f3e] rounded-lg p-3 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <div>
                  <div className="text-xs font-bold text-white">Pro Cue Station</div>
                  <div className="text-[10px] text-slate-400 font-mono-custom">Predator Revo & Taom V10</div>
                </div>
              </div>
            </div>

            {/* Visual Floor Grid of Billiard Tables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTables.map((table) => {
                const isSelected = selectedTable.id === table.id;
                return (
                  <div
                    key={table.id}
                    id={`table-card-${table.id}`}
                    onClick={() => setSelectedTable(table)}
                    className={`relative rounded-xl p-3.5 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#182330] border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02]'
                        : 'bg-[#121922] border-[#222e3e] hover:border-[#3b4d63] hover:bg-[#151e2a]'
                    }`}
                  >
                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-black rounded-full p-1 shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Table Mini Felt Simulation */}
                    <div className={`relative h-24 rounded-lg wood-border ${getClothClass(table.clothColor)} flex items-center justify-center mb-3 shadow-inner overflow-hidden`}>
                      {/* Pockets */}
                      <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-black" />
                      <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-black" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 rounded-full bg-black" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-black" />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-2 rounded-b bg-black" />
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 rounded-t bg-black" />

                      {/* Number Overlay */}
                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <span className="w-7 h-7 rounded-full bg-black/80 border border-white/40 text-white font-mono-custom font-black text-xs flex items-center justify-center shadow-lg">
                          #{table.number}
                        </span>
                      </div>

                      {/* Live In-Game Tag */}
                      {table.status === 'in-game' && (
                        <div className="absolute bottom-1 inset-x-1 text-center bg-black/80 backdrop-blur-sm rounded py-0.5 text-[9px] font-mono-custom text-amber-300">
                          Match in Progress
                        </div>
                      )}
                    </div>

                    {/* Table Info */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-white truncate max-w-[110px]">
                        Table #{table.number}
                      </span>
                      <span className="text-xs font-mono-custom font-bold text-amber-400">
                        ${table.hourlyRate}<span className="text-[10px] text-slate-400 font-normal">/hr</span>
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 truncate mb-2">
                      {table.typeName}
                    </div>

                    <div className="flex items-center justify-between">
                      {getStatusBadge(table.status)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Zone Legend */}
            <div className="mt-6 pt-4 border-t border-[#1c2735] flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono-custom">
              <span>Main Pit: Tables 1-4 (9ft Diamond)</span>
              <span>Mezzanine: Tables 5-6 (8ft Brunswick)</span>
              <span>VIP Salon: Table 7</span>
              <span>Carom: Table 8</span>
            </div>

          </div>

          {/* Table Details & Quick Reservation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0e141c] rounded-2xl border border-[#232f3e] p-6 shadow-2xl sticky top-28">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1c2735]">
              <div>
                <span className="text-[11px] font-mono-custom text-amber-400 uppercase tracking-widest">
                  {selectedTable.zone}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {selectedTable.name}
                </h3>
              </div>
              {getStatusBadge(selectedTable.status)}
            </div>

            {/* Table Specs List */}
            <div className="space-y-3.5 mb-6 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-[#182330]">
                <span className="text-slate-400">Table Model:</span>
                <span className="font-semibold text-white font-mono-custom">{selectedTable.typeName}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#182330]">
                <span className="text-slate-400">Tournament Cloth:</span>
                <span className="font-semibold text-emerald-400 font-mono-custom">{selectedTable.cloth}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#182330]">
                <span className="text-slate-400">Ball Standard:</span>
                <span className="font-semibold text-white font-mono-custom">{selectedTable.balls}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#182330]">
                <span className="text-slate-400">House Cues:</span>
                <span className="font-semibold text-slate-200">{selectedTable.cues}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#182330]">
                <span className="text-slate-400">Standard Rate:</span>
                <span className="font-bold text-amber-400 font-mono-custom text-sm">
                  ${selectedTable.hourlyRate} / hour
                </span>
              </div>
            </div>

            {/* Current Match / Occupancy info */}
            {selectedTable.currentMatch ? (
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 mb-6">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  Active Match
                </div>
                <div className="text-xs text-white font-medium">
                  {selectedTable.currentMatch.players}
                </div>
                <div className="text-[11px] text-slate-300 font-mono-custom mt-0.5">
                  {selectedTable.currentMatch.game} • Playing: {selectedTable.currentMatch.elapsed}
                </div>
                {selectedTable.occupiedUntil && (
                  <div className="text-[11px] text-amber-300/80 font-mono-custom mt-1">
                    Estimated Available: {selectedTable.occupiedUntil}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 mb-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready For Immediate Play
                </div>
                <div className="text-xs text-slate-300">
                  Walk-ins welcome or lock in this table for your group now.
                </div>
              </div>
            )}

            {/* Table Features Checklist */}
            <div className="mb-6">
              <span className="text-[11px] font-mono-custom text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Table Amenities
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedTable.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking CTA Button */}
            <button
              id={`book-selected-table-${selectedTable.id}`}
              onClick={() => onSelectTableForBooking(selectedTable.id)}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Reserve Table #{selectedTable.number}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
