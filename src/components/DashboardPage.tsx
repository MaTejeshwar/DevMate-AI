import { motion } from 'motion/react';
import { useSimulation } from '../hooks/useSimulation';
import { Terminal } from './Terminal';
import { useState, useEffect } from 'react';
import { analyzeThreat } from '../services/geminiService';
import { ScenarioManager } from './ScenarioManager';
import { ThreatMap } from './ThreatMap';
import { 
  Activity, 
  ShieldAlert, 
  Cpu, 
  Database, 
  Globe, 
  AlertTriangle,
  Lock,
  Zap,
  BrainCircuit,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export const DashboardPage = () => {
  const { attacks, stats, triggerScenario, isAutoPilot, setIsAutoPilot } = useSimulation();
  const [aiAnalysis, setAiAnalysis] = useState<string>("Awaiting threat signature for analysis...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const latestAttack = attacks[0];
    if (latestAttack && latestAttack.severity === 'CRITICAL' && latestAttack.status === 'ONGOING') {
      setIsAnalyzing(true);
      analyzeThreat(latestAttack).then(analysis => {
        setAiAnalysis(analysis);
        setIsAnalyzing(false);
      });
    }
  }, [attacks]);

  const chartData = [
    { name: '00:00', traffic: 400, threats: 24 },
    { name: '04:00', traffic: 300, threats: 13 },
    { name: '08:00', traffic: 900, threats: 98 },
    { name: '12:00', traffic: 1400, threats: 39 },
    { name: '16:00', traffic: 1100, threats: 48 },
    { name: '20:00', traffic: 800, threats: 38 },
  ];

  return (
    <div className="p-6 pt-24 min-h-screen relative z-10">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "CPU LOAD", value: `${Math.round(stats.cpuUsage)}%`, icon: Cpu, color: "text-cyber-cyan" },
          { label: "BLOCKED IPS", value: stats.blockedIps, icon: ShieldCheck, color: "text-cyber-green" },
          { label: "ACTIVE THREATS", value: stats.activeThreats, icon: ShieldAlert, color: "text-cyber-red" },
          { label: "TRAFFIC", value: `${Math.round(stats.networkTraffic)} MB/s`, icon: Activity, color: "text-cyber-green" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-lg flex items-center justify-between border-l-4 border-l-cyber-cyan/30"
          >
            <div>
              <div className="text-white/40 text-xs font-mono mb-1 tracking-widest uppercase">{stat.label}</div>
              <div className={`text-3xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <ThreatMap />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-lg h-[300px]">
              <h3 className="text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyber-cyan" /> Network Traffic Analysis
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0e17', border: '1px solid #ffffff20', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="traffic" stroke="#00f2ff" fillOpacity={1} fill="url(#colorTraffic)" />
                  <Area type="monotone" dataKey="threats" stroke="#ff003c" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <Terminal 
              title="LIVE_THREAT_FEED"
              lines={attacks.map(a => `${a.severity}: ${a.attackType} from ${a.sourceIp} -> ${a.status}`)}
              className="h-[300px]"
            />
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <ScenarioManager 
            onTrigger={triggerScenario} 
            isAutoPilot={isAutoPilot} 
            onToggleAutoPilot={setIsAutoPilot} 
          />

          <div className="glass-panel p-6 rounded-lg">
            <h3 className="text-sm font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-cyber-cyan" /> AI Threat Intelligence
            </h3>
            <div className="relative">
              {isAnalyzing && (
                <div className="absolute inset-0 bg-cyber-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-cyber-cyan border-t-transparent rounded-full"
                  />
                </div>
              )}
              <div className="text-xs text-white/80 leading-relaxed font-mono bg-cyber-cyan/5 p-4 rounded border border-cyber-cyan/20 min-h-[100px]">
                <span className="text-cyber-cyan font-bold mr-2">GEMINI_CORE:</span>
                {aiAnalysis}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="w-full h-1 bg-cyber-cyan/20 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-cyber-cyan"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-lg">
            <h3 className="text-sm font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyber-gold" /> Security Protocols
            </h3>
            <div className="space-y-4">
              {[
                { name: "Firewall Level 4", status: "ACTIVE", color: "text-cyber-green" },
                { name: "Intrusion Detection", status: "SCANNING", color: "text-cyber-cyan" },
                { name: "AI Mitigation", status: "STANDBY", color: "text-cyber-gold" },
                { name: "Deep Packet Inspection", status: "ACTIVE", color: "text-cyber-green" }
              ].map((protocol, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5 hover:border-white/10 transition-all">
                  <div className="text-xs font-medium">{protocol.name}</div>
                  <div className={`text-[10px] font-mono font-bold ${protocol.color}`}>{protocol.status}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-cyber-red/20 border border-cyber-red/50 text-cyber-red text-xs font-bold uppercase tracking-widest hover:bg-cyber-red/40 transition-all">
              Initiate Lockdown
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
