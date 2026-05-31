import { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { getLenis } from '../hooks/useLenis';
import { staggerContainer, revealUp } from '../lib/animations';

const navItems = [
  { label: 'Vision', target: 'vision' },
  { label: 'Products', target: 'products' },
  { label: 'Team', target: 'team' },
  { label: 'Contact', target: 'contact' },
];

const Navigation = memo(function Navigation({ activeSection }: { activeSection: string }) {
  const { direction, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const lenis = getLenis();
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -64, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Lock body on mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isVisible = isAtTop || direction === 'up';
  const isScrolled = !isAtTop;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full transition-colors duration-300"
        style={{
          zIndex: 100,
          height: '64px',
          backgroundColor: isScrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
        animate={{
          y: isVisible ? 0 : -64,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto flex h-full items-center justify-between" style={{ maxWidth: '1200px', padding: '0 1.5rem' }}>
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
            <img
              src="/logo.png"
              alt="Shadovis Technologies"
              className="h-7 w-auto"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
            />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                className="relative cursor-pointer transition-colors duration-200"
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.02em',
                  color: activeSection === item.target ? '#f0f0f5' : '#8a8a9a',
                  background: 'none',
                  border: 'none',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => { if (activeSection !== item.target) e.currentTarget.style.color = '#f0f0f5'; }}
                onMouseLeave={(e) => { if (activeSection !== item.target) e.currentTarget.style.color = '#8a8a9a'; }}
              >
                {item.label}
                {/* Active indicator dot */}
                {activeSection === item.target && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      bottom: '-8px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none' }}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <motion.line
                x1="0" y1="1" x2="22" y2="1"
                stroke="#f0f0f5" strokeWidth="1.5"
                animate={mobileOpen ? { rotate: 45, y: 7, x: 0 } : { rotate: 0, y: 0, x: 0 }}
                style={{ transformOrigin: 'center' }}
              />
              <motion.line
                x1="0" y1="8" x2="22" y2="8"
                stroke="#f0f0f5" strokeWidth="1.5"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.line
                x1="0" y1="15" x2="22" y2="15"
                stroke="#f0f0f5" strokeWidth="1.5"
                animate={mobileOpen ? { rotate: -45, y: -7, x: 0 } : { rotate: 0, y: 0, x: 0 }}
                style={{ transformOrigin: 'center' }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 md:hidden flex flex-col items-center justify-center"
            style={{ zIndex: 99, backgroundColor: '#000000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center"
              style={{ gap: '2rem' }}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.target}
                  variants={revealUp}
                  onClick={() => scrollTo(item.target)}
                  className="cursor-pointer"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: '#f0f0f5',
                    background: 'none',
                    border: 'none',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navigation;
