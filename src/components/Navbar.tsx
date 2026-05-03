import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, LayoutDashboard, Terminal, Info, Server } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/dashboard', label: 'SOC Dashboard', icon: LayoutDashboard },
    { path: '/logs', label: 'System Logs', icon: Terminal },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center rounded-sm group-hover:border-cyber-cyan transition-all">
          <Shield className="w-6 h-6 text-cyber-cyan" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-glow-cyan">
          DevMate-AI
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-1 glass-panel p-1 rounded-full px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors",
                isActive ? "text-cyber-cyan" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-cyber-cyan/10 rounded-full border border-cyber-cyan/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex flex-col items-end font-mono text-[10px] text-white/40">
          <div className="flex items-center gap-2">
            <Server className="w-3 h-3" />
            LOC: ASIA-SOUTH-1
          </div>
          <div className="flex items-center gap-1 text-cyber-green">
            <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
            SEC_LEVEL: ALPHA
          </div>
        </div>
        <button className="px-4 py-2 border border-cyber-red/50 text-cyber-red text-[10px] font-bold uppercase tracking-widest hover:bg-cyber-red/10 transition-all rounded-sm">
          Emergency Exit
        </button>
      </div>
    </nav>
  );
};
