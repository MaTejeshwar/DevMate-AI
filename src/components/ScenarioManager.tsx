import { motion } from 'motion/react';
import { Play, Shield, Target, Zap, AlertCircle } from 'lucide-react';
import { Scenario } from '../types';
import { useState, useEffect } from 'react';

interface ScenarioManagerProps {
  onTrigger: (scenario: Scenario) => void;
  isAutoPilot: boolean;
  onToggleAutoPilot: (val: boolean) => void;
}

export const ScenarioManager = ({ onTrigger, isAutoPilot, onToggleAutoPilot }: ScenarioManagerProps) => {
  const scenarios: Scenario[] = [
    { id: '1', name: 'SSH Brute Force', type: 'BRUTE_FORCE', difficulty: 'MEDIUM', description: 'Simulate multiple failed SSH login attempts from a single source.' },
    { id: '2', name: 'SQL Injection', type: 'SQL_INJECTION', difficulty: 'HIGH', description: 'Inject malicious SQL payloads into web application parameters.' },
    { id: '3', name: 'DDoS SYN Flood', type: 'DDOS', difficulty: 'HARD', description: 'Overwhelm the target with a high volume of SYN packets.' },
    { id: '4', name: 'Stealth Port Scan', type: 'PORT_SCAN', difficulty: 'EASY', description: 'Perform a silent Nmap scan to identify open ports.' },
  ];

  return (
    <div className="glass-panel p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-mono tracking-widest uppercase flex items-center gap-2">
          <Target className="w-4 h-4 text-cyber-cyan" /> Scenario Controller
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/40 uppercase">Auto-Mitigation</span>
          <button 
            onClick={() => onToggleAutoPilot(!isAutoPilot)}
            className={`w-10 h-5 rounded-full relative transition-colors ${isAutoPilot ? 'bg-cyber-green' : 'bg-white/10'}`}
          >
            <motion.div 
              animate={{ x: isAutoPilot ? 20 : 2 }}
              className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id}
            className="group p-4 bg-white/5 border border-white/5 rounded hover:border-cyber-cyan/30 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  {scenario.name}
                  <span className={`text-[8px] px-1.5 py-0.5 rounded border ${
                    scenario.difficulty === 'HARD' ? 'border-cyber-red text-cyber-red' :
                    scenario.difficulty === 'MEDIUM' ? 'border-cyber-gold text-cyber-gold' :
                    'border-cyber-green text-cyber-green'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
                <div className="text-[10px] text-white/40 mt-1 leading-tight">{scenario.description}</div>
              </div>
              <button 
                onClick={() => onTrigger(scenario)}
                className="p-2 bg-cyber-cyan/10 text-cyber-cyan rounded hover:bg-cyber-cyan hover:text-cyber-black transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 text-cyber-gold">
          <AlertCircle className="w-4 h-4" />
          <div className="text-[10px] font-mono uppercase tracking-widest">Training Mode Active</div>
        </div>
      </div>
    </div>
  );
};
