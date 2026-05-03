import { useState, useEffect, useCallback } from 'react';
import { AttackEvent, LogEntry, SystemStats, Scenario } from '../types';

export const useSimulation = () => {
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 45,
    memoryUsage: 62,
    networkTraffic: 120,
    activeThreats: 0,
    blockedIps: 12,
  });
  const [isAutoPilot, setIsAutoPilot] = useState(true);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'INFO', service: string = 'KERNEL') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      service,
      message,
      level,
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100));
  }, []);

  const triggerScenario = useCallback((scenario: Scenario) => {
    const sourceIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    const newAttack: AttackEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      sourceIp,
      targetIp: '10.0.0.42',
      attackType: scenario.name,
      severity: scenario.difficulty === 'HARD' ? 'CRITICAL' : scenario.difficulty === 'MEDIUM' ? 'HIGH' : 'MEDIUM',
      status: 'ONGOING',
      description: scenario.description,
      payload: scenario.type === 'SQL_INJECTION' ? "UNION SELECT * FROM users--" : undefined
    };

    setAttacks(prev => [newAttack, ...prev]);
    addLog(`Inbound ${scenario.type} detected from ${sourceIp}`, 'WARN', 'IDS');

    if (isAutoPilot) {
      setTimeout(() => {
        setAttacks(prev => prev.map(a => a.id === newAttack.id ? { ...a, status: 'BLOCKED' } : a));
        setStats(prev => ({ ...prev, blockedIps: prev.blockedIps + 1 }));
        addLog(`Automated Response: Blocked IP ${sourceIp} via Firewall Rule #882`, 'INFO', 'IPS');
      }, 3000);
    }
  }, [addLog, isAutoPilot]);

  const generateRandomAttack = useCallback(() => {
    const scenarios: Scenario[] = [
      { id: '1', name: 'Brute Force SSH', type: 'BRUTE_FORCE', difficulty: 'MEDIUM', description: 'Multiple failed login attempts detected.' },
      { id: '2', name: 'SQL Injection', type: 'SQL_INJECTION', difficulty: 'HIGH', description: 'Malicious SQL patterns in web request.' },
      { id: '3', name: 'SYN Flood', type: 'DDOS', difficulty: 'HARD', description: 'High volume of SYN packets detected.' },
      { id: '4', name: 'Nmap Stealth Scan', type: 'PORT_SCAN', difficulty: 'EASY', description: 'Sequential port probing detected.' },
    ];
    triggerScenario(scenarios[Math.floor(Math.random() * scenarios.length)]);
  }, [triggerScenario]);

  useEffect(() => {
    const attackInterval = setInterval(() => {
      if (Math.random() > 0.8) generateRandomAttack();
    }, 5000);

    const statsInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpuUsage: Math.min(100, Math.max(0, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.min(100, Math.max(0, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkTraffic: Math.max(0, prev.networkTraffic + (Math.random() - 0.5) * 50),
        activeThreats: attacks.filter(a => a.status === 'ONGOING').length
      }));
    }, 2000);

    return () => {
      clearInterval(attackInterval);
      clearInterval(statsInterval);
    };
  }, [generateRandomAttack, attacks]);

  return { attacks, logs, stats, triggerScenario, isAutoPilot, setIsAutoPilot };
};
