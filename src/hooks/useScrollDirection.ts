import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setIsAtTop(currentY < 100);

      if (Math.abs(currentY - lastScrollY) > 5) {
        setDirection(currentY > lastScrollY ? 'down' : 'up');
        lastScrollY = currentY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { direction, scrollY, isAtTop };
}
