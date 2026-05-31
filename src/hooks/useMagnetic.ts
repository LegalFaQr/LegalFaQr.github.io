import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface MagneticResult {
  ref: React.RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

export function useMagnetic(radius = 80, strength = 0.3): MagneticResult {
  const ref = useRef<HTMLElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 15 });
  const y = useSpring(rawY, { stiffness: 300, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const moveX = Math.min(Math.max(dx * strength, -4), 4);
      const moveY = Math.min(Math.max(dy * strength, -4), 4);
      rawX.set(moveX);
      rawY.set(moveY);
    }
  }, [radius, strength, rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
