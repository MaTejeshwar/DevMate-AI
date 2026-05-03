import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export const ThreatMap = () => {
  // Mock threat locations
  const threats = [
    { id: 1, x: '20%', y: '30%', size: 4, color: 'bg-cyber-red' },
    { id: 2, x: '65%', y: '45%', size: 6, color: 'bg-cyber-red' },
    { id: 3, x: '45%', y: '70%', size: 3, color: 'bg-cyber-gold' },
    { id: 4, x: '80%', y: '25%', size: 5, color: 'bg-cyber-red' },
  ];

  return (
    <div className="glass-panel p-6 rounded-lg h-[400px] relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-sm font-mono tracking-widest uppercase flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyber-cyan" /> Global Threat Map
        </h3>
        <div className="text-[10px] font-mono text-white/40 uppercase">Live Vector Tracking</div>
      </div>

      {/* Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 400" className="w-full h-full fill-cyber-cyan/20">
          <path d="M150,100 Q200,50 300,100 T500,150 T700,100" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M100,250 Q250,200 400,250 T700,300" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="150" r="2" />
          <circle cx="450" cy="250" r="2" />
          <circle cx="600" cy="100" r="2" />
        </svg>
      </div>

      {/* Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
            className="absolute w-64 h-64 border border-cyber-cyan/20 rounded-full"
          />
        ))}
      </div>

      {/* Threat Nodes */}
      {threats.map((threat) => (
        <motion.div
          key={threat.id}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute ${threat.color} rounded-full blur-[2px] shadow-[0_0_10px_currentColor]`}
          style={{ 
            left: threat.x, 
            top: threat.y, 
            width: `${threat.size * 2}px`, 
            height: `${threat.size * 2}px` 
          }}
        >
          <motion.div 
            animate={{ scale: [1, 3], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-inherit rounded-full"
          />
        </motion.div>
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-fine opacity-10 pointer-events-none" />
      
      <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
        Coordinate System: WGS-84 / EPSG:4326
      </div>
    </div>
  );
};
