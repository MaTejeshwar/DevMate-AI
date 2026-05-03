import { motion } from 'motion/react';

export const CyberGrid = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 cyber-grid-fine opacity-40" />
      
      {/* Perspective Grid */}
      <div className="absolute inset-0 [perspective:1000px] overflow-hidden">
        <motion.div 
          initial={{ rotateX: 60, y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 origin-top"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 242, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            height: '200%',
            transform: 'rotateX(60deg) translateY(-50%)'
          }}
        />
      </div>

      {/* Moving Scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-1 bg-cyber-cyan/10 animate-scanline blur-sm" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_#050505_100%] opacity-80" />
    </div>
  );
};
