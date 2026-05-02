import { motion } from 'motion/react';
import { Alert, Severity } from '../data/mockData';
import { cn } from '../lib/utils';
import { Crosshair, Filter } from 'lucide-react';

const countyCoordinates: Record<string, { top: string; left: string }> = {
  "Turkana": { top: '25%', left: '30%' },
  "Kisumu": { top: '55%', left: '35%' },
  "Nairobi": { top: '60%', left: '55%' },
  "Mombasa": { top: '80%', left: '70%' },
  "Mandera": { top: '15%', left: '80%' },
  "Garissa": { top: '45%', left: '75%' },
};

export function KenyaMap({ 
  alerts, 
  selectedId, 
  onSelectAlert,
  filterSeverity,
  setFilterSeverity,
  filterDisease,
  setFilterDisease
}: { 
  alerts: Alert[];
  selectedId: string | null; 
  onSelectAlert: (id: string) => void;
  filterSeverity: string;
  setFilterSeverity: (sev: Severity | 'all') => void;
  filterDisease: string;
  setFilterDisease: (dis: string | 'all') => void;
}) {
  return (
    <div className="flex-1 bg-[#02050A] relative overflow-hidden flex items-center justify-center pt-14">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Radar Sweep Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full animate-[spin_10s_linear_infinite]" 
          style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, theme("colors.emerald.500") 360deg)' }}
        />
      </div>

      <div className="absolute top-20 left-6 text-emerald-500/40 font-mono text-[10px] space-y-1 z-10 pointer-events-none">
        <div>SYS.OP.GEOSPATIAL.v3.1</div>
        <div>LAT: 0° 23' 0" N</div>
        <div>LON: 37° 54' 0" E</div>
        <div>ZOOM: STRATEGIC</div>
      </div>
      
      {/* Filter HUD Controls */}
      <div className="absolute top-20 right-6 z-30 font-mono text-[10px] bg-slate-950/80 border border-slate-800 rounded p-3 backdrop-blur-md flex flex-col space-y-4">
        <div className="flex items-center text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
          <Filter className="w-3 h-3 mr-2" /> Display Filters
        </div>
        
        <div className="space-y-2">
          <div className="text-slate-500 uppercase">Severity</div>
          <div className="flex space-x-1">
             <button onClick={() => setFilterSeverity('all')} className={cn("px-2 py-1 border rounded transition-colors", filterSeverity === 'all' ? 'bg-slate-800 border-slate-600 text-slate-200' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>ALL</button>
             <button onClick={() => setFilterSeverity('red')} className={cn("px-2 py-1 border rounded transition-colors", filterSeverity === 'red' ? 'bg-rose-500/20 border-rose-500/50 text-rose-500' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>RED</button>
             <button onClick={() => setFilterSeverity('orange')} className={cn("px-2 py-1 border rounded transition-colors", filterSeverity === 'orange' ? 'bg-orange-500/20 border-orange-500/50 text-orange-500' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>ORG</button>
             <button onClick={() => setFilterSeverity('yellow')} className={cn("px-2 py-1 border rounded transition-colors", filterSeverity === 'yellow' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>YEL</button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-slate-500 uppercase">Disease Type</div>
          <div className="grid grid-cols-2 gap-1">
             <button onClick={() => setFilterDisease('all')} className={cn("px-2 py-1 border rounded transition-colors col-span-2 text-center", filterDisease === 'all' ? 'bg-slate-800 border-slate-600 text-slate-200' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>ALL VECTORS</button>
             <button onClick={() => setFilterDisease('Cholera')} className={cn("px-2 py-1 border rounded transition-colors text-center", filterDisease === 'Cholera' ? 'bg-slate-800 border-slate-600 text-slate-200' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>CHOLERA</button>
             <button onClick={() => setFilterDisease('Malaria')} className={cn("px-2 py-1 border rounded transition-colors text-center", filterDisease === 'Malaria' ? 'bg-slate-800 border-slate-600 text-slate-200' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>MALARIA</button>
             <button onClick={() => setFilterDisease('Typhoid')} className={cn("px-2 py-1 border rounded transition-colors text-center", filterDisease === 'Typhoid' ? 'bg-slate-800 border-slate-600 text-slate-200' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>TYPHOID</button>
             <button onClick={() => setFilterDisease('Dengue Fever')} className={cn("px-2 py-1 border rounded transition-colors text-center", filterDisease === 'Dengue Fever' ? 'bg-slate-800 border-slate-600 text-slate-200' : 'border-slate-800 text-slate-500 hover:text-slate-300')}>DENGUE</button>
          </div>
        </div>
      </div>

      {/* Abstract Map Nodes */}
      <div className="relative w-[800px] h-[600px] max-w-full max-h-full">
        
        {/* Connecting Lines for "Intelligence" map feel */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
           <path d="M 240 150 L 440 360 L 560 480" stroke="currentColor" strokeWidth="1" className="text-slate-500" strokeDasharray="4 4" />
           <path d="M 280 330 L 440 360 L 640 90" stroke="currentColor" strokeWidth="1" className="text-slate-500" strokeDasharray="4 4" />
           <path d="M 640 90 L 600 270 L 560 480" stroke="currentColor" strokeWidth="1" className="text-slate-500" strokeDasharray="4 4" />
        </svg>

        {alerts.map(alert => {
          const coords = countyCoordinates[alert.county];
          if (!coords) return null;
          
          const isSelected = selectedId === alert.id;
          const isRed = alert.severity === 'red';
          const isOrange = alert.severity === 'orange';
          
          return (
            <motion.div
              key={alert.id}
              className={cn(
                "absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-20",
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ top: coords.top, left: coords.left }}
              onClick={() => onSelectAlert(alert.id)}
            >
              <div className="relative flex items-center justify-center">
                {/* Ping animation for active/selected */}
                <span className={cn(
                  "absolute inline-flex h-12 w-12 rounded-full opacity-30",
                  isRed ? 'bg-rose-500' : isOrange ? 'bg-orange-500' : 'bg-yellow-500',
                  isSelected ? 'animate-ping opacity-50 h-24 w-24' : ''
                )} />
                
                {/* Core Dot */}
                <div className={cn(
                  "relative w-4 h-4 rounded-full border border-slate-900 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all",
                  isRed ? 'bg-rose-500' : isOrange ? 'bg-orange-500' : 'bg-yellow-500',
                  isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-white scale-125' : ''
                )}>
                  <div className="w-1 h-1 bg-white rounded-full opacity-80" />
                </div>
                
                {isSelected && (
                  <Crosshair className="absolute w-8 h-8 text-white opacity-40 animate-[spin_4s_linear_infinite]" />
                )}
                
                {/* Label Tooltip */}
                <div className={cn(
                  "absolute top-6 font-mono text-[10px] whitespace-nowrap bg-slate-950/80 px-2 py-1 border rounded pointer-events-none transition-opacity",
                  isSelected ? 'opacity-100 border-white/40 text-white' : 'opacity-0 group-hover:opacity-100 border-slate-800 text-slate-400',
                  isRed && isSelected ? 'border-rose-500/50' : ''
                )}>
                  {alert.county} <span className="opacity-50 ml-1">[{alert.disease}]</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] bg-slate-950/60 p-3 border border-slate-800/50 rounded pointer-events-none flex flex-col space-y-2 backdrop-blur-sm z-30">
        <div className="text-slate-500 uppercase tracking-wider mb-1">Threat Level Legend</div>
        <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div><span className="text-slate-300">CRITICAL OUTBREAK</span></div>
        <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div><span className="text-slate-300">ELEVATED THREAT</span></div>
        <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div><span className="text-slate-300">MONITORING REQUIRED</span></div>
      </div>
      
    </div>
  );
}
