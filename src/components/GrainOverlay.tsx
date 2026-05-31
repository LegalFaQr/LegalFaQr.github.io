import { memo } from 'react';

const GrainOverlay = memo(function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <div
        className="absolute opacity-40"
        style={{
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          animation: 'grain 8s steps(10) infinite',
        }}
      />
    </div>
  );
});

export default GrainOverlay;
