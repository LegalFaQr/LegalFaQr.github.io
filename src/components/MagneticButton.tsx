import { type ReactNode, type RefCallback, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MagneticButton({ children, className = '', onClick, href, style, onMouseEnter, onMouseLeave }: MagneticButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 15 });
  const y = useSpring(rawY, { stiffness: 300, damping: 15 });

  const elementRef = useCallback<RefCallback<HTMLElement>>(() => {}, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      rawX.set(Math.min(Math.max(dx * 0.3, -4), 4));
      rawY.set(Math.min(Math.max(dy * 0.3, -4), 4));
    }
  };

  const handleMouseLeaveInternal = () => {
    rawX.set(0);
    rawY.set(0);
    if (onMouseLeave) onMouseLeave();
  };

  const Tag = href ? 'a' : 'button';

  return (
    <motion.div
      style={{ x, y, display: 'inline-block' }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
    >
      <Tag
        ref={elementRef as unknown as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
        className={className}
        onClick={onClick}
        href={href}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={handleMouseLeaveInternal}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
