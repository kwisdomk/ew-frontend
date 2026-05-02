import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { weekGraphData } from '../data/mockData';

export function TrendAnalytics() {
  return (
    <div className="h-64 border-t border-slate-800 bg-slate-950 flex z-30">
      
      {/* Left section: Filter/Stats */}
      <div className="w-80 border-r border-slate-800 p-4 flex flex-col justify-between bg-slate-900/20">
         <div>
           <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3">National Aggregation</div>
           <div className="text-3xl font-sans font-light text-slate-200 tracking-tight">
             1,244 <span className="text-sm font-mono text-rose-500 ml-1">↑ +14%</span>
           </div>
           <div className="text-xs text-slate-500 font-mono uppercase mt-1">Active Cases (7D-MA)</div>
         </div>
         
         <div className="space-y-2 mt-4">
           <div className="flex justify-between items-center text-xs font-mono">
             <span className="text-slate-400">Cholera</span>
             <span className="text-slate-200">650</span>
           </div>
           <div className="flex justify-between items-center text-xs font-mono">
             <span className="text-slate-400">Malaria</span>
             <span className="text-slate-200">412</span>
           </div>
           <div className="flex justify-between items-center text-xs font-mono">
             <span className="text-slate-400">Typhoid</span>
             <span className="text-slate-200">182</span>
           </div>
         </div>
      </div>

      {/* Right Section: Chart */}
      <div className="flex-1 p-4 flex flex-col relative">
        <div className="flex justify-between items-center mb-2">
           <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Temporal Velocity [Global]</span>
           <div className="flex space-x-3 font-mono text-[9px] uppercase">
             <span className="flex items-center text-slate-400"><span className="w-2 h-2 bg-rose-500 opacity-50 mr-1 rounded-sm"/> Actual</span>
             <span className="flex items-center text-slate-400"><span className="w-2 h-2 bg-emerald-500 opacity-50 mr-1 rounded-sm"/> Baseline</span>
           </div>
        </div>
        
        <div className="flex-1 overflow-hidden min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={5} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '11px', fontFamily: 'monospace' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <ReferenceLine y={150} stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.5} label={{ position: 'insideTopLeft', value: 'ALERT THRESHOLD', fill: '#f59e0b', fontSize: 9, opacity: 0.5 }} />
              <Area type="monotone" dataKey="baseline" stroke="#10b981" strokeOpacity={0.5} strokeWidth={1} fillOpacity={0} />
              <Area type="monotone" dataKey="cases" stroke="#f43f5e" fillOpacity={1} fill="url(#colorCases)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
