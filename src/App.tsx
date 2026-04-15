import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SignalHigh, 
  User, 
  Shield, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  Share2, 
  Search, 
  ChevronRight, 
  Mic, 
  Navigation, 
  Verified, 
  HeartPulse, 
  Phone, 
  MessageSquare, 
  Info, 
  Stethoscope, 
  History, 
  Ban, 
  Bell, 
  ShieldAlert, 
  Compass, 
  Network, 
  UserPlus,
  Timer,
  Infinity as InfinityIcon,
  Settings,
  ShieldEllipsis,
  Map as MapIcon
} from 'lucide-react';
import { cn } from './lib/utils';
import { ViewState, Contact } from './types';

// --- Mock Data ---
const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    status: 'online',
    lastSeen: 'near Shibuya',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoS6ucwAop0ar7VSTIgDiYUJXbgKWJMCudhaUOWI8IWZldSPC183_BHlEmxKXeFfZNFOy_Y2ouiti1eHp0PdASCH1kvFH1ALSBCD6fIi1jhQc0Vo6gAksh_NBMSjb-2DtTQFbmwuZz5S9ybC1h1LqFkEq7j5dRnTkR7WTOt1L6Kn7Ahw2Bm2T5oKow9abEduhqSPg7f1v-bX18xb0o-F7_lecMmeuBsPKBqBTdPmwHeKtmIOEl9r-kYU7ppJLBPcmJyP4JdeBziFw'
  },
  {
    id: '2',
    name: 'Marcus Vane',
    status: 'nearby',
    lastSeen: '0.4 km • Kinetic Void',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Hn7NVXkOfGIUqpv2NyjAxdThMuLu2zUpEtBPXDP68Jqjj2hKRRw2G67m3pY_6bBbGAvE2eukahm0CWFrKawcNUd-e9vY7yq5oaZfVm--iIIegpKlQ1XBWrTsjkUE64cXaJ8yUaolskikQ1uz2AByLXU_KLPGGNvxjhTJnFw8v4XCy8FPA4e6baQZadL6UBM6QPeDUUHZjBtDnNAjIn7WYr5GrNmXm29PayXfUIAy-yV_NVeziBFBEPAFei6TBPstZB8SpBMgr3A'
  },
  {
    id: '3',
    name: 'Elena Rossi',
    status: 'offline',
    lastSeen: 'Last active 4h ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzdWHERfgK5AGJP_vsx6CA5hi9-w13VAle14vboGHwk8CxRwLSDR2LhzOA0KGouI6AFtKuTNhVYBHMLDK9SBKt-7FTf0Dmn1-7c-yTTUnwrfX3e9GkWP2MA65eQXh8ijRDrzBjyz_Vqa0yZ08KPGp_ysgXYSbT7jqBXXRf4D493C4W1Dy2rqmLeDWngCb0lL3yJ5-FUWHoN0yhwEmfalMeGq00nsaAVr-vncfmin7lugAS3Jwhu7g8H3lVteXyeUYd0vJetxmJu-Q'
  }
];

// --- Components ---

const TopBar = ({ view, setView }: { view: ViewState, setView: (v: ViewState) => void }) => (
  <header className="fixed top-0 w-full px-6 py-4 z-50 flex justify-between items-center bg-transparent backdrop-blur-xl">
    <div className="flex items-center gap-3">
      <SignalHigh className="text-purple-400 w-5 h-5" />
      <div className="flex flex-col">
        <span className="text-[10px] font-medium uppercase tracking-widest opacity-50">Local</span>
        <span className="text-xs font-bold font-headline text-secondary-fixed">09:41 AM</span>
      </div>
    </div>
    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer" onClick={() => setView('aura')}>
      <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-headline">SafeHer</h1>
      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-primary/60 mt-0.5">You are not invisible</span>
    </div>
    <div 
      className="w-10 h-10 rounded-full border border-white/10 p-0.5 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
      onClick={() => setView('profile')}
    >
      <img 
        alt="User Profile" 
        className="w-full h-full object-cover rounded-full" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoXEPccP4kUC9Sg1IqgBdHHSOuvz5r_H5w54bn2C0VxumGKibFw_sCLw2qyb4JwIlVhPd-CUSTmd-wkn__FyudhiZKBqfmdIisQR-SyWfTaAdc3hC-cKCNGL1LQpvgPwmo3Yxf6Vp9J6JcB4_qLF3B3mwEfvWl2Wh1UbmBPZpFZA7TIzA6LIfF-7sKR1DskOjVh9ajrUkjYJBci3vQCZ1MwFK8Q4Ice3YBRDLtyBl2eNAbhgeKlSud7tw9gbcbe9--sA9XyX4YR2g" 
      />
    </div>
  </header>
);

const BottomNav = ({ view, setView }: { view: ViewState, setView: (v: ViewState) => void }) => {
  const isEmergency = view === 'emergency' || view === 'safety-active' || view === 'medical-emergency' || view === 'nearby-help';
  
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-slate-950/40 backdrop-blur-2xl rounded-t-[3rem] border-t border-white/10 shadow-[0_-10px_40px_rgba(138,43,226,0.15)]">
      <button 
        onClick={() => setView('aura')}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-300",
          view === 'aura' ? "text-purple-400 drop-shadow-[0_0_8px_rgba(138,43,226,0.8)] scale-110" : "text-slate-500 opacity-60 hover:text-purple-300"
        )}
      >
        <Shield className="w-6 h-6" />
        <span className="uppercase tracking-[0.05em] text-[10px] mt-1">Aura</span>
      </button>

      <button 
        onClick={() => setView('explore')}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-300",
          view === 'explore' ? "text-purple-400 drop-shadow-[0_0_8px_rgba(138,43,226,0.8)] scale-110" : "text-slate-500 opacity-60 hover:text-purple-300"
        )}
      >
        <Compass className="w-6 h-6" />
        <span className="uppercase tracking-[0.05em] text-[10px] mt-1">Global</span>
      </button>

      <div className="relative -mt-16">
        <div className="absolute inset-0 bg-tertiary/20 rounded-full blur-2xl animate-pulse" />
        <button 
          onClick={() => setView('emergency')}
          className={cn(
            "relative w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center shadow-[0_0_30px_rgba(202,0,22,0.4)] border border-tertiary/50 active:scale-90 transition-transform",
            isEmergency && "ring-4 ring-tertiary/20"
          )}
        >
          <ShieldAlert className="text-white w-8 h-8 fill-current" />
        </button>
      </div>

      <button 
        onClick={() => setView('network')}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-300",
          view === 'network' ? "text-purple-400 drop-shadow-[0_0_8px_rgba(138,43,226,0.8)] scale-110" : "text-slate-500 opacity-60 hover:text-purple-300"
        )}
      >
        <Network className="w-6 h-6" />
        <span className="uppercase tracking-[0.05em] text-[10px] mt-1">Alerts</span>
      </button>

      <button 
        onClick={() => setView('profile')}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-300",
          view === 'profile' ? "text-purple-400 drop-shadow-[0_0_8px_rgba(138,43,226,0.8)] scale-110" : "text-slate-500 opacity-60 hover:text-purple-300"
        )}
      >
        <User className="w-6 h-6" />
        <span className="uppercase tracking-[0.05em] text-[10px] mt-1">Vault</span>
      </button>
    </nav>
  );
};

// --- Views ---

const AuraView = ({ setView }: { setView: (v: ViewState) => void }) => (
  <motion.main 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="relative z-10 flex flex-col items-center justify-center h-full px-6"
  >
    <div className="relative flex items-center justify-center mb-24">
      <div className="aura-pulse absolute w-24 h-24 rounded-full bg-primary/20 border border-primary/30" />
      <div className="absolute w-40 h-40 rounded-full border border-primary/10 scale-110 opacity-30" />
      <div className="relative w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(138,43,226,0.6)]">
        <User className="text-on-primary-container w-6 h-6 fill-current" />
      </div>
    </div>

    <div className="w-full max-w-sm glass-card rounded-lg p-6 mb-8 border border-white/5 relative group overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <ShieldCheck className="text-secondary-fixed w-10 h-10" />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_#00ffff]" />
        <span className="text-secondary-fixed font-headline font-bold text-lg tracking-tight">Area Status: Safe</span>
      </div>
      <p className="text-on-surface-variant font-medium text-[10px] uppercase tracking-wider mb-4">Based on recent activity in your perimeter</p>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-primary font-medium text-sm">Safer route available</span>
        <ArrowRight className="text-primary w-5 h-5" />
      </div>
    </div>

    <div className="flex flex-col gap-3 w-full max-w-sm mb-32">
      <button className="flex items-center justify-between w-full h-14 px-6 rounded-full bg-surface-container-high/60 border border-primary/20 hover:bg-surface-container-highest transition-all group">
        <div className="flex items-center gap-3">
          <Users className="text-primary w-5 h-5" />
          <span className="font-headline text-sm font-semibold tracking-wide text-on-surface">Walk Companion</span>
        </div>
        <span className="text-[10px] font-medium text-primary/60 px-2 py-0.5 rounded-full border border-primary/20">3 NEARBY</span>
      </button>
      <button className="flex items-center justify-between w-full h-14 px-6 rounded-full bg-surface-container-high/60 border border-white/5 hover:bg-surface-container-highest transition-all">
        <div className="flex items-center gap-3">
          <Share2 className="text-slate-400 w-5 h-5" />
          <span className="font-headline text-sm font-semibold tracking-wide text-on-surface">Share Live Location</span>
        </div>
        <ChevronRight className="text-slate-500 w-5 h-5" />
      </button>
      <button 
        onClick={() => setView('nearby-help')}
        className="flex items-center justify-between w-full h-14 px-6 rounded-full bg-surface-container-high/60 border border-white/5 hover:bg-surface-container-highest transition-all"
      >
        <div className="flex items-center gap-3">
          <Search className="text-slate-400 w-5 h-5" />
          <span className="font-headline text-sm font-semibold tracking-wide text-on-surface">Check Nearby Help</span>
        </div>
        <ChevronRight className="text-slate-500 w-5 h-5" />
      </button>
    </div>
  </motion.main>
);

const ExploreView = () => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative h-full w-full"
  >
    <div className="absolute inset-0 z-0 bg-surface-container-low overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-20" />
      {/* Simulated 3D Map Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green-500/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-error/10 blur-[80px]" />
      
      {/* User Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(220,184,255,0.8)]" />
          <div className="absolute -inset-2 border-2 border-primary/30 rounded-full animate-ping" />
        </div>
      </div>
    </div>

    <div className="fixed top-20 left-0 w-full px-6 z-40">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="glass-card rounded-full px-5 py-3 flex items-center gap-3 border border-white/5 shadow-2xl">
          <Search className="text-outline w-5 h-5" />
          <input 
            className="bg-transparent border-none focus:outline-none text-on-surface w-full font-sans placeholder:text-outline/60" 
            placeholder="Where to?" 
            type="text" 
          />
          <Mic className="text-primary w-5 h-5" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['Safety', 'Hospitals', 'Volunteers', 'Routes'].map((filter) => (
            <button key={filter} className="flex-shrink-0 px-4 py-1.5 rounded-full glass-card text-on-surface text-sm font-medium flex items-center gap-2 border border-outline-variant/30">
              {filter === 'Safety' && <Shield className="w-4 h-4" />}
              {filter === 'Hospitals' && <HeartPulse className="w-4 h-4" />}
              {filter === 'Volunteers' && <Users className="w-4 h-4" />}
              {filter === 'Routes' && <Navigation className="w-4 h-4" />}
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="fixed bottom-32 left-0 w-full px-6 z-40">
      <div className="max-w-md mx-auto">
        <div className="glass-card p-5 rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-secondary-fixed text-[10px] font-bold uppercase tracking-widest block mb-1">Recommended Route</span>
              <h3 className="text-xl font-headline font-bold text-on-surface">Safest Route: 6 min</h3>
              <p className="text-on-surface-variant text-xs mt-1">Via Well-Lit Main St. • 4 Volunteers Active</p>
            </div>
            <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <Verified className="w-4 h-4" />
              SECURE
            </div>
          </div>
          <button className="w-full py-4 rounded-full bg-gradient-to-r from-primary-container to-primary text-on-primary font-headline font-bold tracking-tight text-lg shadow-[0_0_20px_rgba(138,43,226,0.5)] active:scale-95 duration-200 flex items-center justify-center gap-2">
            <Navigation className="w-5 h-5" />
            Navigate Safely
          </button>
        </div>
      </div>
    </div>
  </motion.main>
);

const EmergencyHub = ({ setView }: { setView: (v: ViewState) => void }) => (
  <motion.main 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    className="relative h-full w-full flex flex-col items-center justify-center px-6"
  >
    <div className="text-center mb-16 space-y-2">
      <p className="font-medium text-secondary-fixed opacity-40 uppercase tracking-[0.2em] text-[10px]">Security Protocol Alpha</p>
      <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Emergency Hub</h2>
    </div>

    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute inset-0 border-[1px] border-outline-variant/20 rounded-full" />
      
      <div className="relative w-full h-full rounded-full glass-card shadow-2xl flex items-center justify-center overflow-hidden border border-white/5">
        <div 
          onClick={() => setView('safety-active')}
          className="absolute inset-0 w-1/2 h-full flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors duration-500 group"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.5)] border border-primary/30">
              <Shield className="text-on-primary-container w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-headline font-bold text-primary tracking-tight">I feel unsafe</p>
              <p className="text-[9px] text-primary/60 uppercase tracking-widest mt-1">Safety Mode</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setView('medical-emergency')}
          className="absolute inset-0 left-1/2 w-1/2 h-full flex items-center justify-center cursor-pointer hover:bg-tertiary-container/10 transition-colors duration-500 group"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center shadow-[0_0_20px_rgba(202,0,22,0.4)] border border-tertiary/30 animate-pulse">
              <HeartPulse className="text-white w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-headline font-bold text-tertiary tracking-tight">Medical emergency</p>
              <p className="text-[9px] text-tertiary/60 uppercase tracking-widest mt-1">Medical Mode</p>
            </div>
          </div>
        </div>

        <div className="absolute h-3/4 w-[1px] bg-gradient-to-b from-transparent via-outline-variant/30 to-transparent" />
      </div>

      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-container-high rounded-full border border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_#00fbfb]" />
        <span className="text-[10px] text-secondary-fixed tracking-wider uppercase">Live: Active Location</span>
      </div>
    </div>

    <div className="mt-12 text-center space-y-6">
      <p className="text-on-surface-variant opacity-60 text-sm max-w-[240px] mx-auto italic">
        System will act instantly upon selection. Authority dispatch triggered.
      </p>
    </div>
  </motion.main>
);

const SafetyActiveView = ({ setView }: { setView: (v: ViewState) => void }) => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative z-20 pt-28 px-6 flex flex-col items-center min-h-screen"
  >
    <div className="text-center mb-8">
      <h1 className="font-headline font-bold text-4xl tracking-tight text-on-surface mb-2">Safety Mode Active</h1>
      <p className="text-slate-400 text-sm tracking-wide uppercase">Stealth Monitoring Engaged</p>
    </div>

    <div className="w-full max-w-md grid grid-cols-6 gap-4 mb-6">
      <div className="col-span-6 glass-card rounded-lg p-6 border border-white/5 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-headline font-semibold text-secondary-fixed">You appear accompanied</h2>
            <p className="text-on-surface-variant text-sm mt-1">AI analyzing spatial density around you</p>
          </div>
          <Users className="text-secondary-fixed w-8 h-8" />
        </div>
        <div className="flex gap-2 items-center text-xs text-slate-500">
          <Share2 className="w-4 h-4" />
          Location shared with 2 trusted contacts
        </div>
      </div>

      <div className="col-span-4 glass-card rounded-lg p-5 border border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full border border-surface bg-primary-container flex items-center justify-center text-[10px] font-bold">JD</div>
            <div className="w-6 h-6 rounded-full border border-surface bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary">MK</div>
          </div>
          <span className="text-[10px] uppercase font-bold text-primary tracking-tighter">2 Nearby</span>
        </div>
        <p className="text-xs text-on-surface/80 leading-relaxed">Volunteers responding to your route path</p>
      </div>

      <div className="col-span-2 glass-card rounded-lg flex flex-col items-center justify-center p-4 border border-white/5">
        <ShieldCheck className="text-primary w-6 h-6 mb-1" />
        <span className="text-[9px] uppercase font-black text-center leading-tight">Shield<br />Verified</span>
      </div>
    </div>

    <div className="w-full max-w-md glass-card rounded-xl p-6 border border-primary/20 shadow-[0_0_50px_rgba(138,43,226,0.1)] mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
            <User className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Incoming Call</p>
            <p className="text-lg font-headline font-bold">Dad (Home)</p>
          </div>
        </div>
        <div className="text-primary text-xs font-mono">00:14</div>
      </div>
      <div className="flex justify-around items-center">
        <button className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
          <Phone className="w-6 h-6 rotate-[135deg]" />
        </button>
        <button className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
          <Phone className="w-6 h-6" />
        </button>
      </div>
      <p className="text-center text-[10px] text-slate-500 mt-6 tracking-widest uppercase">Stealth audio enabled</p>
    </div>

    <button 
      onClick={() => setView('aura')}
      className="w-full max-w-md py-5 rounded-full bg-gradient-to-r from-tertiary-container to-red-600 text-on-primary font-headline font-black text-xl tracking-tighter shadow-lg shadow-red-900/40 active:scale-95 transition-all mb-24"
    >
      ESCALATE VISIBILITY
    </button>
  </motion.main>
);

const MedicalEmergencyView = ({ setView }: { setView: (v: ViewState) => void }) => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-24 pb-32 px-6 max-w-lg mx-auto space-y-8"
  >
    <section className="text-center space-y-2">
      <h1 className="font-headline text-4xl font-black tracking-tight text-white uppercase leading-none">
        Medical <br /> <span className="text-tertiary">Emergency</span>
      </h1>
      <p className="text-xs uppercase tracking-[0.2em] text-outline">System Active • Telemetry Linked</p>
    </section>

    <section className="grid grid-cols-1 gap-4">
      {['Unconscious', 'Injury', 'Chest Pain'].map((type) => (
        <button key={type} className="glass-card group relative flex items-center justify-between p-6 rounded-lg border border-white/5 transition-all active:scale-95">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {type === 'Unconscious' && <Timer className="w-6 h-6" />}
              {type === 'Injury' && <UserPlus className="w-6 h-6" />}
              {type === 'Chest Pain' && <HeartPulse className="w-6 h-6" />}
            </div>
            <span className="font-headline text-xl font-bold tracking-tight text-on-surface">{type}</span>
          </div>
          <ChevronRight className="text-primary/40 group-hover:text-primary transition-colors" />
        </button>
      ))}
    </section>

    <div className="glass-card rounded-lg overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,49,49,0.2)]">
      <div className="p-4 bg-tertiary-container/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Live Responder</span>
        </div>
        <span className="font-headline font-bold text-lg text-white">2 min away</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-full">
            <Stethoscope className="text-on-primary w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-outline uppercase tracking-wider">Unit</p>
            <p className="text-xs font-bold text-white">EMS-Delta-09</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-secondary-fixed">First Aid Instructions</p>
          <div className="flex gap-3">
            <Info className="text-secondary-fixed w-5 h-5 shrink-0" />
            <p className="text-sm text-on-surface-variant leading-relaxed">Ensure the patient's airway is clear. Do not move them unless there is immediate danger.</p>
          </div>
        </div>
      </div>
    </div>
  </motion.main>
);

const NetworkView = () => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative min-h-screen pt-24 pb-32 px-6"
  >
    <section className="mb-12">
      <p className="text-[10px] uppercase tracking-[0.2em] text-secondary-fixed-dim font-medium mb-2">Network Control</p>
      <h2 className="text-5xl font-bold font-headline tracking-tighter text-on-surface">Your Circle</h2>
    </section>

    <section className="mb-10">
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {['Passive', 'Context', 'Temporary'].map((mode) => (
          <button key={mode} className={cn(
            "flex-none px-6 py-3 rounded-full font-medium text-sm border transition-all",
            mode === 'Passive' ? "bg-primary-container text-on-primary-container border-primary/20 shadow-[0_0_20px_rgba(138,43,226,0.3)]" : "bg-surface-container-high text-on-surface-variant border-outline-variant/10"
          )}>
            {mode}
          </button>
        ))}
      </div>
    </section>

    <section className="mb-12 flex gap-6 overflow-x-auto py-4 no-scrollbar">
      {CONTACTS.map((contact) => (
        <div key={contact.id} className="flex-none w-[280px] glass-card rounded-xl p-6 border border-white/5 relative group">
          <div className="flex justify-between items-start mb-6">
            <div className="relative">
              <img 
                className={cn(
                  "w-16 h-16 rounded-2xl object-cover border-2",
                  contact.status === 'online' ? "border-secondary-fixed shadow-[0_0_15px_rgba(0,251,251,0.6)]" : 
                  contact.status === 'nearby' ? "border-primary shadow-[0_0_15px_rgba(220,184,255,0.6)]" : "border-outline-variant"
                )} 
                src={contact.avatar} 
              />
              {contact.status !== 'offline' && (
                <span className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface",
                  contact.status === 'online' ? "bg-secondary-fixed" : "bg-primary"
                )} />
              )}
            </div>
            <span className={cn(
              "text-[10px] font-medium uppercase tracking-widest",
              contact.status === 'online' ? "text-secondary-fixed" : 
              contact.status === 'nearby' ? "text-primary" : "text-outline"
            )}>
              {contact.status}
            </span>
          </div>
          <h3 className="text-xl font-headline font-bold mb-1">{contact.name}</h3>
          <p className="text-sm text-outline mb-6">{contact.lastSeen}</p>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-xs font-medium uppercase tracking-wider">View location</span>
              <Navigation className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-xs font-medium uppercase tracking-wider">Share temporarily</span>
              <Timer className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </section>

    <section className="grid grid-cols-2 gap-4">
      <div className="col-span-2 glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between aspect-[2/1]">
        <div>
          <h4 className="text-sm font-medium uppercase tracking-widest text-outline mb-2">Network Reach</h4>
          <p className="text-4xl font-headline font-bold text-secondary-fixed">12 Active Nodes</p>
        </div>
        <div className="h-12 w-full flex items-end gap-1">
          {[40, 60, 85, 50, 95, 70, 30].map((h, i) => (
            <div key={i} className="flex-1 bg-secondary-fixed/40 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </section>

    <button className="fixed bottom-28 right-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-[0_10px_30px_rgba(138,43,226,0.4)] active:scale-90 transition-transform z-40">
      <UserPlus className="w-8 h-8" />
    </button>
  </motion.main>
);

const NearbyHelpView = () => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative min-h-screen pt-24 pb-40 px-6"
  >
    <div className="relative z-10 max-w-lg mx-auto">
      <div className="mb-8">
        <p className="text-secondary-fixed tracking-[0.2em] uppercase text-[10px] mb-2">Emergency Services</p>
        <h2 className="text-4xl font-headline font-bold tracking-tight text-on-surface">Nearby Help</h2>
      </div>

      <div className="mb-10 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-lg blur opacity-25" />
        <div className="relative glass-card rounded-lg p-6 border border-white/10 shadow-[0_0_30px_rgba(138,43,226,0.3)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-block px-2 py-1 bg-primary-container/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded mb-3 border border-primary/20">Best Option Recommended</span>
              <h3 className="text-2xl font-headline font-bold">St. Jude Medical</h3>
            </div>
            <div className="text-right">
              <p className="text-secondary-fixed font-headline text-xl font-bold">1.2 km</p>
              <p className="text-slate-400 text-xs">4 min drive</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-surface-container-low rounded-md p-3">
              <p className="text-[10px] uppercase text-slate-500 mb-1">ER Wait Time</p>
              <p className="text-secondary-fixed-dim font-headline font-medium">8 MINS</p>
            </div>
            <div className="bg-surface-container-low rounded-md p-3">
              <p className="text-[10px] uppercase text-slate-500 mb-1">Availability</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-on-surface font-headline font-medium">HIGH</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-primary text-on-primary py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              CALL NOW
            </button>
            <button className="flex-1 border border-primary/30 text-primary py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" />
              NAVIGATE
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-20">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest px-2 mb-4">Other Nearby Facilities</p>
        {[
          { name: 'City General Hospital', dist: '3.8 km', wait: '22 min wait', icon: HeartPulse },
          { name: 'Metropolitan Clinic', dist: '5.1 km', wait: '5 min wait', icon: ShieldCheck },
          { name: 'Unity Urgent Care', dist: '6.4 km', wait: 'At Capacity', icon: Stethoscope, capacity: true }
        ].map((h) => (
          <div key={h.name} className={cn("glass-card border border-white/5 rounded-lg p-5 flex items-center gap-5 group transition-all", h.capacity && "opacity-70")}>
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 border border-white/5">
              <h.icon className="text-slate-400 w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-headline font-semibold text-lg">{h.name}</h4>
                <span className="text-secondary-fixed text-sm font-headline">{h.dist}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <History className={cn("w-4 h-4", h.capacity ? "text-red-500" : "text-yellow-500")} />
                  <span className={cn("text-[11px]", h.capacity ? "text-red-400 uppercase font-bold" : "text-slate-400")}>{h.wait}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-slate-600 group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  </motion.main>
);

const ProfileView = () => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-screen-xl mx-auto px-6 pt-24 pb-32 space-y-12"
  >
    <section className="relative flex flex-col items-center justify-center py-8">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary-fixed to-primary-container shadow-[0_0_40px_rgba(138,43,226,0.3)]">
          <img 
            className="w-full h-full object-cover rounded-full" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoXEPccP4kUC9Sg1IqgBdHHSOuvz5r_H5w54bn2C0VxumGKibFw_sCLw2qyb4JwIlVhPd-CUSTmd-wkn__FyudhiZKBqfmdIisQR-SyWfTaAdc3hC-cKCNGL1LQpvgPwmo3Yxf6Vp9J6JcB4_qLF3B3mwEfvWl2Wh1UbmBPZpFZA7TIzA6LIfF-7sKR1DskOjVh9ajrUkjYJBci3vQCZ1MwFK8Q4Ice3YBRDLtyBl2eNAbhgeKlSud7tw9gbcbe9--sA9XyX4YR2g" 
          />
        </div>
        <div className="absolute -bottom-2 right-2 bg-secondary-container text-on-secondary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Verified</div>
      </div>
      <h1 className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(220,184,255,0.5)]">ELARA VANCE</h1>
      <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] mt-2">UUID: ECHO-992-X</p>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="glass-card p-6 rounded-lg space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-lg font-bold tracking-tight text-primary">MEDICAL OVERLAY</h2>
          <Stethoscope className="text-slate-500 w-5 h-5" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Blood Group</p>
            <p className="text-2xl font-headline font-bold text-secondary-fixed">AB-POS</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Height/Weight</p>
            <p className="text-2xl font-headline font-bold text-secondary-fixed">172cm / 64kg</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Known Allergies</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-tertiary-container/20 text-tertiary text-[10px] font-bold rounded uppercase">Penicillin</span>
            <span className="px-2 py-1 bg-tertiary-container/20 text-tertiary text-[10px] font-bold rounded uppercase">Latex</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-lg space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-lg font-bold tracking-tight text-tertiary">EMERGENCY PROTOCOL</h2>
          <ShieldAlert className="text-tertiary w-5 h-5" />
        </div>
        <div className="space-y-3">
          {[
            { name: 'Marcus Vance', role: 'Guardian / Next of Kin', icon: Phone },
            { name: 'Dr. Sarah Chen', role: 'Primary Physician', icon: MessageSquare }
          ].map((contact) => (
            <div key={contact.name} className="flex items-center gap-4 bg-surface-container-low p-3 rounded-lg border border-white/5">
              <div className="w-10 h-10 rounded-full bg-slate-800" />
              <div className="flex-1">
                <p className="font-bold text-sm">{contact.name}</p>
                <p className="text-xs text-slate-500">{contact.role}</p>
              </div>
              <contact.icon className="text-primary w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="glass-card p-6 rounded-lg">
      <h2 className="font-headline text-lg font-bold tracking-tight text-primary mb-6">SYSTEM PREFERENCES</h2>
      <div className="space-y-6">
        {[
          { title: 'Auto-Share Location', desc: 'Stream real-time telemetry to emergency nodes', active: true },
          { title: 'Offline Cache Mode', desc: 'Maintain medical records without active uplink', active: false },
          { title: 'Continuous Audio Monitor', desc: 'Record environmental noise during distress alerts', active: true }
        ].map((pref) => (
          <div key={pref.title} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-sm">{pref.title}</p>
              <p className="text-xs text-slate-500">{pref.desc}</p>
            </div>
            <div className={cn(
              "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
              pref.active ? "bg-primary-container" : "bg-slate-800"
            )}>
              <div className={cn(
                "w-5 h-5 bg-white rounded-full absolute top-[2px] transition-all",
                pref.active ? "left-[24px]" : "left-[2px]"
              )} />
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="pt-8 text-center">
      <button className="text-tertiary/60 hover:text-tertiary text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">Terminate Digital Persona</button>
    </div>
  </motion.main>
);

export default function App() {
  const [view, setView] = useState<ViewState>('aura');

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-lowest to-surface" />
        <div className="absolute inset-0 opacity-20 grid-texture" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <TopBar view={view} setView={setView} />

      <div className="relative z-10 h-screen overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          {view === 'aura' && (
            <motion.div key="aura" className="h-full">
              <AuraView setView={setView} />
            </motion.div>
          )}
          {view === 'explore' && (
            <motion.div key="explore" className="h-full">
              <ExploreView />
            </motion.div>
          )}
          {view === 'emergency' && (
            <motion.div key="emergency" className="h-full">
              <EmergencyHub setView={setView} />
            </motion.div>
          )}
          {view === 'safety-active' && (
            <motion.div key="safety-active" className="h-full">
              <SafetyActiveView setView={setView} />
            </motion.div>
          )}
          {view === 'medical-emergency' && (
            <motion.div key="medical-emergency" className="h-full">
              <MedicalEmergencyView setView={setView} />
            </motion.div>
          )}
          {view === 'network' && (
            <motion.div key="network" className="h-full">
              <NetworkView />
            </motion.div>
          )}
          {view === 'nearby-help' && (
            <motion.div key="nearby-help" className="h-full">
              <NearbyHelpView />
            </motion.div>
          )}
          {view === 'profile' && (
            <motion.div key="profile" className="h-full">
              <ProfileView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav view={view} setView={setView} />

      {/* Subtle Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] overflow-hidden">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_3px,transparent_3px)] bg-[length:100%_4px]" />
      </div>
    </div>
  );
}
