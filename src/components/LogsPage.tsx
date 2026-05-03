import { motion } from 'motion/react';
import { useSimulation } from '../hooks/useSimulation';
import { Search, Filter, Download, Trash2 } from 'lucide-react';

export const LogsPage = () => {
  const { logs } = useSimulation();

  return (
    <div className="p-6 pt-24 min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-glow-cyan mb-2">SYSTEM_LOGS</h1>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Real-time event orchestration stream</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="SEARCH_LOGS..." 
                className="bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-xs font-mono focus:border-cyber-cyan/50 outline-none transition-all w-64"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4 text-white/60" />
            </button>
            <button className="p-2 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-all">
              <Download className="w-4 h-4 text-white/60" />
            </button>
            <button className="p-2 bg-cyber-red/10 border border-cyber-red/20 rounded-sm hover:bg-cyber-red/20 transition-all">
              <Trash2 className="w-4 h-4 text-cyber-red" />
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 border-b border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest">
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-1">Level</div>
            <div className="col-span-2">Service</div>
            <div className="col-span-7">Message</div>
          </div>
          
          <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <div className="p-12 text-center text-white/20 italic">No logs generated in current session.</div>
            ) : (
              logs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-white/5 transition-colors group"
                >
                  <div className="col-span-2 text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  <div className={`col-span-1 font-bold ${
                    log.level === 'CRITICAL' ? 'text-cyber-red' : 
                    log.level === 'ERROR' ? 'text-cyber-red/70' : 
                    log.level === 'WARN' ? 'text-cyber-gold' : 'text-cyber-cyan'
                  }`}>
                    {log.level}
                  </div>
                  <div className="col-span-2 text-cyber-cyan/60">[{log.service}]</div>
                  <div className="col-span-7 text-white/80 group-hover:text-white transition-colors">{log.message}</div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
