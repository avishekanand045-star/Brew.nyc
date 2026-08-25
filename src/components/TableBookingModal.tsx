import React, { useState } from 'react';
import { PoolTable, BookingDetails } from '../types';
import { POOL_TABLES } from '../data/mockData';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Beer, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Download, 
  ArrowRight,
  CircleDot
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTableId?: string;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({
  isOpen,
  onClose,
  initialTableId
}) => {
  const [selectedTableId, setSelectedTableId] = useState<string>(initialTableId || POOL_TABLES[0].id);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('8:00 PM');
  const [duration, setDuration] = useState<number>(2);
  const [guests, setGuests] = useState<number>(4);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [drinkPackage, setDrinkPackage] = useState<'none' | 'craft-flight' | 'speakeasy-open-bar' | 'championship-bucket'>('craft-flight');
  const [cueUpgrade, setCueUpgrade] = useState<boolean>(true);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  if (!isOpen) return null;

  const currentTable = POOL_TABLES.find(t => t.id === selectedTableId) || POOL_TABLES[0];

  // Price calculations
  const tableBasePrice = currentTable.hourlyRate * duration;
  let drinkPackagePrice = 0;
  if (drinkPackage === 'craft-flight') drinkPackagePrice = 28 * guests;
  if (drinkPackage === 'speakeasy-open-bar') drinkPackagePrice = 55 * guests;
  if (drinkPackage === 'championship-bucket') drinkPackagePrice = 48;

  const cuePrice = cueUpgrade ? 15 : 0;
  const totalPrice = tableBasePrice + drinkPackagePrice + cuePrice;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const confirmationCode = `BREW-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${currentTable.number}`;
    
    const newBooking: BookingDetails = {
      id: `bk-${Date.now()}`,
      tableId: currentTable.id,
      tableName: currentTable.name,
      date,
      timeSlot,
      durationHours: duration,
      guestsCount: guests,
      fullName,
      email,
      phone,
      drinkPackage,
      cueUpgrade,
      notes: specialNotes,
      totalPrice,
      confirmationCode,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  const timeSlots = [
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', 
    '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-[#0c1219] border border-[#232f3e] rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-[#101822] border-b border-[#1f2c3c]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                {confirmedBooking ? 'Table Reservation Confirmed' : 'Reserve A Billiards Table'}
              </h3>
              <p className="text-xs text-slate-400 font-mono-custom">
                {confirmedBooking ? 'Present this pass at the brew.nyc host stand' : '148 Mercer St, SoHo • Guaranteed Simonis 860 Felt'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 text-slate-400 hover:text-white bg-[#16202c] hover:bg-[#202c3c] border border-[#232f3e] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {confirmedBooking ? (
          /* Confirmation Ticket Pass Screen */
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-[#121c28] via-[#162434] to-[#101722] border border-amber-500/40 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              
              {/* Gold watermark */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#233144] gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded text-[11px] font-mono-custom font-bold">
                    ✓ Confirmed & Locked
                  </span>
                  <h4 className="font-display text-2xl font-black text-white mt-2">
                    {confirmedBooking.tableName}
                  </h4>
                  <div className="text-xs text-slate-400 font-mono-custom">
                    Table #{currentTable.number} • {currentTable.typeName}
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <div className="text-[10px] uppercase font-mono-custom text-slate-400">Pass Code</div>
                  <div className="font-mono-custom text-xl font-bold text-amber-400 tracking-wider">
                    {confirmedBooking.confirmationCode}
                  </div>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-[#233144] text-xs font-mono-custom">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date</span>
                  <span className="font-bold text-white text-sm">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Time Slot</span>
                  <span className="font-bold text-amber-400 text-sm">{confirmedBooking.timeSlot}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Duration</span>
                  <span className="font-bold text-white text-sm">{confirmedBooking.durationHours} Hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Guests</span>
                  <span className="font-bold text-white text-sm">{confirmedBooking.guestsCount} Players</span>
                </div>
              </div>

              {/* Packages Included */}
              <div className="py-4 border-b border-[#233144] text-xs">
                <div className="text-slate-400 font-mono-custom text-[10px] uppercase mb-1">Add-Ons Included</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-[#182332] text-amber-300 rounded font-semibold border border-amber-500/20">
                    {confirmedBooking.drinkPackage === 'craft-flight' && '🍺 Craft Beer Tasting Flights'}
                    {confirmedBooking.drinkPackage === 'speakeasy-open-bar' && '🍸 Speakeasy Open Tap & Cocktails'}
                    {confirmedBooking.drinkPackage === 'championship-bucket' && '🧊 Ice Bucket & Truffle Fries'}
                    {confirmedBooking.drinkPackage === 'none' && 'Table Only'}
                  </span>
                  {confirmedBooking.cueUpgrade && (
                    <span className="px-2.5 py-1 bg-[#182332] text-emerald-300 rounded font-semibold border border-emerald-500/20">
                      🎯 Predator Revo Pro Carbon Cues
                    </span>
                  )}
                </div>
              </div>

              {/* Total & Guest Name */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="text-[11px] text-slate-400 block">Lead Cueist:</span>
                  <span className="text-sm font-bold text-white">{confirmedBooking.fullName} ({confirmedBooking.email})</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total Paid / Due at Host:</span>
                  <span className="text-2xl font-bold font-mono-custom text-amber-400">${confirmedBooking.totalPrice}</span>
                </div>
              </div>

            </div>

            {/* QR Code & Host Instructions */}
            <div className="p-4 bg-[#101822] rounded-xl border border-[#232f3e] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shadow">
                  <QrCode className="w-full h-full text-black" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">SoHo Host Stand Check-In</div>
                  <div className="text-[11px] text-slate-400">148 Mercer St • Arrive 10 mins prior to rack time.</div>
                </div>
              </div>

              <button
                onClick={() => alert(`Pass ${confirmedBooking.confirmationCode} downloaded to mobile wallet.`)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#172230] hover:bg-[#202d40] text-amber-400 text-xs font-bold font-mono-custom rounded-lg border border-amber-500/30 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Save Digital Pass
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Main Reservation Form */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
            
            {/* 1. Table Selection */}
            <div>
              <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                1. Select Billiards Table
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {POOL_TABLES.map((t) => {
                  const isSelected = t.id === selectedTableId;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setSelectedTableId(t.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#182535] border-amber-400 shadow-md ring-1 ring-amber-400'
                          : 'bg-[#101721] border-[#222e3e] hover:border-[#334255]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                        <span>Table #{t.number}</span>
                        <span className="text-amber-400 font-mono-custom">${t.hourlyRate}/h</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{t.typeName}</div>
                      <div className="text-[10px] text-slate-500 font-mono-custom mt-1">{t.zone}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Date, Time & Duration */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono-custom"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                  Start Time
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono-custom"
                >
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                  Duration (Hours)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono-custom"
                >
                  <option value={1}>1 Hour</option>
                  <option value={2}>2 Hours (Recommended)</option>
                  <option value={3}>3 Hours</option>
                  <option value={4}>4 Hours (Match Session)</option>
                </select>
              </div>
            </div>

            {/* 3. Guests Count */}
            <div>
              <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                Number of Players / Guests
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 4, 6, 8].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuests(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono-custom font-bold border transition-all ${
                      guests === num
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-[#121922] text-slate-300 border-[#232f3e] hover:bg-[#182330]'
                    }`}
                  >
                    {num} {num === 1 ? 'Player' : 'Players'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Taproom Drink & Food Package */}
            <div>
              <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                Taproom Drink & Hospitality Packages
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                
                <div
                  onClick={() => setDrinkPackage('none')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    drinkPackage === 'none'
                      ? 'bg-[#182535] border-amber-400 ring-1 ring-amber-400'
                      : 'bg-[#101721] border-[#222e3e] hover:bg-[#141d2a]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>A La Carte</span>
                    <span className="text-slate-400 font-mono-custom">$0</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Order individual drafts, cocktails, and bites directly from table tablet.
                  </p>
                </div>

                <div
                  onClick={() => setDrinkPackage('craft-flight')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    drinkPackage === 'craft-flight'
                      ? 'bg-[#182535] border-amber-400 ring-1 ring-amber-400'
                      : 'bg-[#101721] border-[#222e3e] hover:bg-[#141d2a]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                    <span>Craft Beer Flights</span>
                    <span className="text-amber-400 font-mono-custom font-bold">+$28/p</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    4 curated 5oz rare NYC microbrew pours per guest + warm pretzel fondue.
                  </p>
                </div>

                <div
                  onClick={() => setDrinkPackage('speakeasy-open-bar')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    drinkPackage === 'speakeasy-open-bar'
                      ? 'bg-[#182535] border-amber-400 ring-1 ring-amber-400'
                      : 'bg-[#101721] border-[#222e3e] hover:bg-[#141d2a]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300 mb-1">
                    <span>Speakeasy Open Tap</span>
                    <span className="text-emerald-400 font-mono-custom font-bold">+$55/p</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Unlimited rotating draft beers, signature cocktails & gourmet slider platter.
                  </p>
                </div>

              </div>
            </div>

            {/* 5. Predator Pro Cue Add-on */}
            <div className="flex items-center justify-between p-3.5 bg-[#101822] rounded-xl border border-[#232f3e]">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="cue-upgrade-toggle"
                  checked={cueUpgrade}
                  onChange={(e) => setCueUpgrade(e.target.checked)}
                  className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-700 rounded focus:ring-amber-400"
                />
                <label htmlFor="cue-upgrade-toggle" className="cursor-pointer">
                  <div className="text-xs font-bold text-white">Upgrade to Predator Revo Carbon Shaft Cues</div>
                  <div className="text-[11px] text-slate-400">Includes Taom V10 chalk & Kamui leather tip condition.</div>
                </label>
              </div>
              <span className="text-xs font-mono-custom font-bold text-amber-400">+$15 flat</span>
            </div>

            {/* 6. Guest Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#121922] border border-[#232f3e] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono-custom"
                  required
                />
              </div>
            </div>

            {/* Price Summary & Submit */}
            <div className="p-4 bg-[#141f2d] rounded-xl border border-[#223144] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-slate-400 font-mono-custom">
                  Table (${currentTable.hourlyRate} x {duration}h) + Drinks (${drinkPackagePrice}) + Gear (${cuePrice})
                </div>
                <div className="text-2xl font-black font-mono-custom text-amber-400">
                  Total: ${totalPrice}
                </div>
              </div>

              <button
                type="submit"
                id="submit-table-booking-btn"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm & Lock Table</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
