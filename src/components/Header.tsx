import { Activity, ShieldAlert, Wifi, Hexagon, Fingerprint } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export function Header() {
  const [time, setTime] = useState(new Date().toISOString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 fixed top-0 w-full z-50 text-xs font-mono">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-rose-500">
          <Fingerprint className="w-5 h-5 opacity-80" />
          <span className="font-sans font-bold text-sm tracking-wider uppercase">EpidemiWatch Sentinel</span>
        </div>
        
        <div className="h-4 w-px bg-slate-800"></div>
        
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="opacity-60 uppercase">Mode</span>
          <div className="flex bg-slate-900 rounded border border-slate-800 p-0.5">
            <button className="px-3 py-1 bg-slate-800 text-slate-200 rounded-sm shadow-sm transition-colors">Operations</button>
            <button className="px-3 py-1 text-slate-500 hover:text-slate-300 transition-colors">Analysis</button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center space-x-8">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase text-slate-500 opacity-80">Critical</span>
            <span className="text-rose-500 font-bold">2</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase text-slate-500 opacity-80">Elevated</span>
            <span className="text-orange-500 font-bold">2</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex flex-col items-start">
            <span className="text-[9px] uppercase text-slate-500 opacity-80">Monitored</span>
            <span className="text-yellow-500 font-bold">2</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase text-slate-500 opacity-80 tracking-widest">Global Sync</span>
          <span className="text-slate-300 tabular-nums">{time.split('T')[1].replace('Z', '')} UTC</span>
        </div>
        <div className="flex items-center space-x-2 text-emerald-500">
          <Wifi className="w-4 h-4 animate-pulse relative" />
          <span className="uppercase text-[10px] tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Secure</span>
        </div>
      </div>
    </header>
  );
}
