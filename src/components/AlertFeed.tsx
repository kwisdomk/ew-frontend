import { AlertTriangle, ChevronRight, Activity, Thermometer } from 'lucide-react';
import { activeAlerts, Alert, Severity } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const severityColors: Record<Severity, { border: string; bg: string; text: string; icon: string }> = {
  red: { border: 'border-rose-500/50', bg: 'bg-rose-500/10', text: 'text-rose-500', icon: 'text-rose-500' },
  orange: { border: 'border-orange-500/50', bg: 'bg-orange-500/10', text: 'text-orange-500', icon: 'text-orange-500' },
  yellow: { border: 'border-yellow-500/50', bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: 'text-yellow-500' },
  green: { border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: 'text-emerald-500' },
};

export function AlertFeed({ alerts, onSelectAlert }: { alerts: Alert[], onSelectAlert: (id: string) => void }) {

  
  // Simulate incoming events
  useEffect(() => {
    // Just a visual simulation hook, no real updates right now to avoid messy states.
  }, []);

  return (
    <div className="w-80 h-full bg-slate-950/50 border-r border-slate-800 flex flex-col pt-14 z-20 backdrop-blur-sm relative">
      <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <h2 className="font-mono text-xs uppercase tracking-widest text-slate-400">Tactical Feed</h2>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        <AnimatePresence>
          {alerts.map((alert) => {
            const colors = severityColors[alert.severity];
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "group relative cursor-pointer overflow-hidden border border-slate-800 rounded-sm bg-slate-900/40 p-3 transition-all hover:bg-slate-800",
                  alert.isNew && colors.border,
                  alert.isNew && colors.bg
                )}
                onClick={() => onSelectAlert(alert.id)}
              >
                {alert.isNew && (
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1", colors.bg, { 'bg-rose-500': alert.severity === 'red', 'bg-orange-500': alert.severity === 'orange'})} />
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Activity className={cn("w-3.5 h-3.5", colors.icon)} />
                    <span className="font-mono text-xs font-semibold text-slate-300">{alert.id}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{alert.timestamp.split('T')[1].substring(0, 5)}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-sm font-sans font-medium text-slate-200">{alert.county}</span>
                  <span className="text-slate-600 text-xs">—</span>
                  <span className={cn("text-xs font-semibold uppercase tracking-wider", colors.text)}>{alert.disease}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2 font-mono text-[10px]">
                  <div className="bg-slate-950/50 p-1.5 rounded border border-slate-800/50 flex flex-col">
                    <span className="text-slate-500 uppercase opacity-70">Risk Score</span>
                    <span className={cn("text-sm", alert.riskScore > 80 ? 'text-rose-400' : 'text-slate-300')}>{alert.riskScore.toFixed(1)}</span>
                  </div>
                  <div className="bg-slate-950/50 p-1.5 rounded border border-slate-800/50 flex flex-col">
                    <span className="text-slate-500 uppercase opacity-70">Z-Score</span>
                    <span className="text-slate-300">{alert.zScore > 0 ? '+' : ''}{alert.zScore.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {alert.summary}
                </p>
                
                <div className="mt-2 flex justify-end">
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
