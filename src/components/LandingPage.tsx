import { motion } from 'motion/react';
import { Shield, Zap, Activity, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-mono tracking-widest uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
          </span>
          System Status: Operational
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-glow-cyan"
        >
          DevMate-AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Intelligent Attack–Defence Simulation Platform. 
          Military-grade threat detection and automated response orchestration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link to="/dashboard">
            <button className="group relative px-8 py-4 bg-cyber-cyan text-cyber-black font-bold rounded-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]">
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
                Launch Simulation <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
              />
            </button>
          </Link>
          
          <button className="px-8 py-4 border border-white/20 hover:border-cyber-cyan/50 hover:bg-white/5 transition-all rounded-sm uppercase tracking-widest text-sm font-medium">
            View Architecture
          </button>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full relative z-10"
      >
        {[
          { icon: Shield, title: "Threat Detection", desc: "AI-driven anomaly detection across multi-vector attack surfaces." },
          { icon: Zap, title: "Auto Response", desc: "Instant mitigation orchestration using intelligent playbooks." },
          { icon: Activity, title: "Live Monitoring", desc: "Real-time visualization of network traffic and system health." }
        ].map((feature, i) => (
          <div key={i} className="glass-panel p-8 rounded-lg group hover:border-cyber-cyan/50 transition-all">
            <feature.icon className="w-12 h-12 text-cyber-cyan mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{feature.title}</h3>
            <p className="text-white/50 leading-relaxed font-light">{feature.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyber-cyan/5 to-transparent pointer-events-none" />
    </div>
  );
};
