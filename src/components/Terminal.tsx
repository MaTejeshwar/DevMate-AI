import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TerminalProps {
  lines: string[];
  title?: string;
  className?: string;
}

export const Terminal = ({ lines, title = "SYSTEM_LOG", className }: TerminalProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lines.length > visibleLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(lines.slice(0, visibleLines.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [lines, visibleLines]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className={`glass-panel rounded-lg overflow-hidden flex flex-col font-mono text-xs ${className}`}>
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-red" />
          <div className="w-2 h-2 rounded-full bg-cyber-gold" />
          <div className="w-2 h-2 rounded-full bg-cyber-green" />
          <span className="ml-2 text-white/40 uppercase tracking-widest">{title}</span>
        </div>
        <div className="text-white/20">v4.0.2-STABLE</div>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 h-full overflow-y-auto scrollbar-hide bg-black/20"
      >
        <AnimatePresence mode="popLayout">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-1 flex gap-2"
            >
              <span className="text-cyber-cyan opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span className={line.includes('ERROR') || line.includes('CRITICAL') ? 'text-cyber-red' : line.includes('WARN') ? 'text-cyber-gold' : 'text-cyber-green'}>
                {line}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-cyber-cyan inline-block ml-1"
        />
      </div>
    </div>
  );
};
