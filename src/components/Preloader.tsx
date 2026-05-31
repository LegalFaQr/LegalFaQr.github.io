import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = memo(function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('shadovis-preloaded')) {
      setShow(false);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('shadovis-preloaded', 'true');
      setTimeout(onComplete, 500);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 10000,
            backgroundColor: '#ffffff',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Shadovis"
            className="h-14 w-auto"
            style={{ filter: 'invert(1)', mixBlendMode: 'multiply' }}
          />

          {/* Progress bar */}
          <div
            className="mt-8 overflow-hidden"
            style={{
              width: '120px',
              height: '1px',
              backgroundColor: 'rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000000',
                transformOrigin: 'left',
                animation: 'progress-fill 1.5s ease-in-out forwards',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Preloader;
