import { memo } from 'react';

const AuroraBackground = memo(function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Base white background */}
      <div className="absolute inset-0 bg-[#ffffff]" />
      
      {/* Animated glowing orbs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"
        style={{
          background: 'linear-gradient(to right, #e0f2fe, #bae6fd)',
          animation: 'blob 10s infinite alternate',
        }}
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob"
        style={{
          background: 'linear-gradient(to right, #f3e8ff, #e9d5ff)',
          animation: 'blob 12s infinite alternate-reverse',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 animate-blob"
        style={{
          background: 'linear-gradient(to right, #f0fdf4, #bbf7d0)',
          animation: 'blob 14s infinite alternate',
          animationDelay: '4s',
        }}
      />
      
      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
});

export default AuroraBackground;
