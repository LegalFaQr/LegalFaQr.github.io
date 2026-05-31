import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Vision', target: 'vision' },
  { label: 'Products', target: 'products' },
  { label: 'Team', target: 'team' },
];

const Navigation = memo(function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide nav on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section active state
      const sections = ['vision', 'products', 'team'].map((id) => document.getElementById(id));
      const scrollPosition = currentScrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 z-50 flex justify-center px-4"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 16 : -100 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="flex items-center justify-between transition-all duration-500 ease-out overflow-hidden"
          style={{
            height: '56px',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
            border: isScrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent',
            boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.04)' : 'none',
            borderRadius: '999px',
            padding: '0 1.25rem',
            width: '100%',
            maxWidth: isScrolled ? '800px' : '1200px',
          }}
        >
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer outline-none">
            <img
              src="/logo.png"
              alt="Shadovis Technologies"
              className="h-6 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                className="relative cursor-pointer transition-colors duration-200 outline-none"
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.01em',
                  color: activeSection === item.target ? '#000000' : '#737373',
                  fontWeight: activeSection === item.target ? 500 : 400,
                }}
                onMouseEnter={(e) => { if (activeSection !== item.target) e.currentTarget.style.color = '#000000'; }}
                onMouseLeave={(e) => { if (activeSection !== item.target) e.currentTarget.style.color = '#737373'; }}
              >
                {item.label}
                {activeSection === item.target && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-black rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden cursor-pointer p-2 outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <motion.line
                x1="0" y1="1" x2="20" y2="1"
                stroke="#000000" strokeWidth="1.5"
                animate={mobileOpen ? { rotate: 45, y: 6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
                style={{ transformOrigin: 'center' }}
              />
              <motion.line
                x1="0" y1="7" x2="20" y2="7"
                stroke="#000000" strokeWidth="1.5"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.line
                x1="0" y1="13" x2="20" y2="13"
                stroke="#000000" strokeWidth="1.5"
                animate={mobileOpen ? { rotate: -45, y: -6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
                style={{ transformOrigin: 'center' }}
              />
            </svg>
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className="text-2xl font-medium tracking-tight text-black outline-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navigation;
