import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-cyber-black flex flex-col items-center justify-center font-mono"
    >
      <div className="w-64 h-1 bg-cyber-navy relative overflow-hidden mb-4">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-cyber-cyan shadow-[0_0_15px_rgba(0,242,255,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-cyber-cyan text-xs tracking-[0.3em] uppercase">
        Initializing System Matrix... {Math.round(progress)}%
      </div>
      <div className="mt-8 grid grid-cols-4 gap-2 opacity-30">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            className="w-2 h-2 bg-cyber-cyan"
          />
        ))}
      </div>
    </motion.div>
  );
};
