/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { AlertFeed } from './components/AlertFeed';
import { KenyaMap } from './components/KenyaMap';
import { InvestigationConsole } from './components/InvestigationConsole';
import { TrendAnalytics } from './components/TrendAnalytics';
import { activeAlerts, Severity } from './data/mockData';

export default function App() {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(activeAlerts[0]?.id || null);
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');
  const [filterDisease, setFilterDisease] = useState<string | 'all'>('all');

  const filteredAlerts = activeAlerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterDisease !== 'all' && alert.disease !== filterDisease) return false;
    return true;
  });

  const selectedAlert = activeAlerts.find(a => a.id === selectedAlertId);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#050505] text-slate-300 font-sans overflow-hidden cursor-default selection:bg-rose-500/30 selection:text-white">
      {/* Visual scanline decorative overlay */}
      <div className="scan-line" />
      
      <Header />
      
      {/* Main interface area under header */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        <div className="flex-1 flex min-h-0 relative z-10">
          <AlertFeed 
            alerts={filteredAlerts} 
            onSelectAlert={setSelectedAlertId} 
          />
          
          <div className="flex-1 flex flex-col min-h-0 relative">
             <KenyaMap 
               alerts={filteredAlerts}
               selectedId={selectedAlertId} 
               onSelectAlert={setSelectedAlertId}
               filterSeverity={filterSeverity}
               setFilterSeverity={setFilterSeverity}
               filterDisease={filterDisease}
               setFilterDisease={setFilterDisease}
             />
             <TrendAnalytics />
          </div>
          
          <InvestigationConsole alert={selectedAlert} />
        </div>
      </div>
    </div>
  );
}

