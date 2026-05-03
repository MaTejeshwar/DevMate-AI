export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AttackEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetIp: string;
  attackType: string;
  severity: ThreatLevel;
  status: 'DETECTED' | 'MITIGATED' | 'ONGOING' | 'BLOCKED';
  description: string;
  payload?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  service: string;
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  source?: string;
}

export interface SystemStats {
  cpuUsage: number;
  memoryUsage: number;
  networkTraffic: number;
  activeThreats: number;
  blockedIps: number;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HIGH' | 'HARD';
  type: 'BRUTE_FORCE' | 'SQL_INJECTION' | 'PORT_SCAN' | 'DDOS';
}
