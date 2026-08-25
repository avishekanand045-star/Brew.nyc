import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveFloorPlan } from './components/LiveFloorPlan';
import { InteractiveTrickshotCanvas } from './components/InteractiveTrickshotCanvas';
import { MenuSection } from './components/MenuSection';
import { LeaguesAndEvents } from './components/LeaguesAndEvents';
import { MembershipsSection } from './components/MembershipsSection';
import { LocationAndHours } from './components/LocationAndHours';
import { Footer } from './components/Footer';
import { TableBookingModal } from './components/TableBookingModal';
import { ScorekeeperModal } from './components/ScorekeeperModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTableIdForBooking, setSelectedTableIdForBooking] = useState<string | undefined>(undefined);
  const [scorekeeperModalOpen, setScorekeeperModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleOpenBooking = (tableId?: string) => {
    setSelectedTableIdForBooking(tableId);
    setBookingModalOpen(true);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-[#e2e8f0] relative selection:bg-amber-500 selection:text-black">
      
      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenScorekeeper={() => setScorekeeperModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreFloor={() => handleScrollToSection('floor-plan')}
          onTryInteractiveGame={() => handleScrollToSection('interactive-table')}
        />

        {/* Live Floor Map & Table Inspection */}
        <LiveFloorPlan
          onSelectTableForBooking={(tableId) => handleOpenBooking(tableId)}
        />

        {/* In-Browser Interactive Billiards Simulator */}
        <InteractiveTrickshotCanvas soundEnabled={soundEnabled} />

        {/* Craft Taplist & Kitchen */}
        <MenuSection />

        {/* Tournaments & APA/BCA Leagues */}
        <LeaguesAndEvents />

        {/* Memberships & Cue Lockers */}
        <MembershipsSection onOpenBooking={() => handleOpenBooking()} />

        {/* SoHo Location, Hours & House Etiquette */}
        <LocationAndHours onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenScorekeeper={() => setScorekeeperModalOpen(true)}
      />

      {/* Table Reservation Modal */}
      <TableBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTableId={selectedTableIdForBooking}
      />

      {/* Digital Pool Match Scorekeeper Companion Modal */}
      <ScorekeeperModal
        isOpen={scorekeeperModalOpen}
        onClose={() => setScorekeeperModalOpen(false)}
        soundEnabled={soundEnabled}
      />

    </div>
  );
}
