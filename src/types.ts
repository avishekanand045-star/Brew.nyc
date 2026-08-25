export type TableType = '9ft-diamond' | '8ft-brunswick' | 'vip-suite' | 'snooker-carom';
export type TableStatus = 'available' | 'reserved' | 'in-game' | 'tournament-only';

export interface PoolTable {
  id: string;
  number: number;
  name: string;
  type: TableType;
  typeName: string;
  cloth: string;
  clothColor: 'green' | 'blue' | 'charcoal' | 'burgundy';
  cues: string;
  balls: string;
  hourlyRate: number;
  status: TableStatus;
  zone: 'The Main Pit' | 'The Speakeasy Mezzanine' | 'The VIP Cellar' | 'Carom Corner';
  x: number; // percentage in floor plan
  y: number;
  width: number;
  height: number;
  occupiedUntil?: string;
  currentMatch?: {
    players: string;
    game: string;
    elapsed: string;
  };
  features: string[];
}

export interface BookingDetails {
  id: string;
  tableId: string;
  tableName: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  guestsCount: number;
  fullName: string;
  email: string;
  phone: string;
  drinkPackage: 'none' | 'craft-flight' | 'speakeasy-open-bar' | 'championship-bucket';
  cueUpgrade: boolean;
  notes: string;
  totalPrice: number;
  confirmationCode: string;
  createdAt: string;
}

export type MenuCategory = 'all' | 'craft-beers' | 'cocktails' | 'wines' | 'bites' | 'non-alcoholic';

export interface MenuItem {
  id: string;
  name: string;
  category: 'craft-beers' | 'cocktails' | 'wines' | 'bites' | 'non-alcoholic';
  subCategory?: string;
  price: number;
  description: string;
  abv?: string;
  ibu?: string;
  breweryOrOrigin?: string;
  pairingNote?: string;
  isHouseFavorite?: boolean;
  isNew?: boolean;
  tags: string[];
}

export interface Tournament {
  id: string;
  title: string;
  dayOfWeek: string;
  time: string;
  gameType: '8-Ball' | '9-Ball' | '10-Ball' | 'Doubles Scotch' | 'Straight Pool';
  format: string;
  entryFee: number;
  guaranteedPrize: number;
  maxPlayers: number;
  registeredPlayers: number;
  skillLevel: string;
  description: string;
  nextDate: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  perks: string[];
  tableDiscountPercent: number;
  includedHoursPerMonth: number;
  lockerAccess: boolean;
}

export type BilliardGameType = '8-ball' | '9-ball' | 'straight' | 'custom';

export interface ScorekeeperData {
  gameType: BilliardGameType;
  player1: {
    name: string;
    score: number;
    fouls: number;
    ballType?: 'solids' | 'stripes' | null;
  };
  player2: {
    name: string;
    score: number;
    fouls: number;
    ballType?: 'solids' | 'stripes' | null;
  };
  targetScore: number;
  currentRack: number;
  turnPlayer: 1 | 2;
  innings: number;
  shotClockTime: number;
  shotClockRunning: boolean;
  sunkBalls: number[];
  matchLog: string[];
}
