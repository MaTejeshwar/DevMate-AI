/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { LogsPage } from './components/LogsPage';
import { Navbar } from './components/Navbar';
import { CyberGrid } from './components/CyberGrid';
import { CursorTrail } from './components/CursorTrail';
import { Loader } from './components/Loader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="relative min-h-screen bg-cyber-black text-white selection:bg-cyber-cyan selection:text-cyber-black">
            <CyberGrid />
            <CursorTrail />
            <Navbar />
            
            <main className="relative">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/logs" element={<LogsPage />} />
                  <Route path="/about" element={
                    <div className="p-24 min-h-screen flex items-center justify-center">
                      <div className="max-w-2xl text-center">
                        <h2 className="text-4xl font-bold mb-8 text-cyber-cyan">ABOUT DEVMATE-AI</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                          DevMate-AI is a next-generation cybersecurity simulation and defense platform. 
                          Built for high-stakes environments, it combines real-time data orchestration 
                          with AI-driven threat intelligence to provide a military-grade SOC experience.
                        </p>
                      </div>
                    </div>
                  } />
                </Routes>
              </AnimatePresence>
            </main>

            {/* Global UI Overlays */}
            <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
              <div className="glass-panel px-4 py-2 rounded-sm border-l-2 border-cyber-cyan">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Encryption</div>
                <div className="text-xs font-mono text-cyber-cyan">AES-256-GCM ACTIVE</div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}
