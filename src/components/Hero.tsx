import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { getLenis } from '../hooks/useLenis';

const ease = [0.25, 0.1, 0.25, 1] as const;

const headingLines = [
  { text: 'We build technology', hasAccent: false },
  { text: "that doesn't need", hasAccent: true, accentWord: "doesn't" },
  { text: 'you to learn it.', hasAccent: false },
];

const Hero = memo(function Hero() {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScrollIndicatorVisible(false), 4000);

    const onScroll = () => setScrollIndicatorVisible(false);
    window.addEventListener('scroll', onScroll, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToVision = useCallback(() => {
    const lenis = getLenis();
    const el = document.getElementById('vision');
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -64, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center"
      style={{
        minHeight: '100dvh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      {/* Subtle radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full" style={{ maxWidth: '1200px' }}>
        {/* Overline */}
        <motion.span
          className="block font-medium uppercase"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            color: '#737373',
            marginBottom: '2rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          SHADOVIS TECHNOLOGIES PVT. LTD.
        </motion.span>

        {/* Main heading with clip-path reveal */}
        <h1
          style={{
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '2rem',
          }}
        >
          {headingLines.map((line, i) => (
            <motion.span
              key={i}
              className="block overflow-hidden font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
                color: '#000000',
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease }}
            >
              {line.hasAccent ? (
                <>
                  {'that '}
                  <em style={{ color: '#000000', fontStyle: 'italic' }}>doesn&apos;t</em>
                  {' need'}
                </>
              ) : (
                line.text
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: '#525252',
            maxWidth: '560px',
            marginBottom: '2rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease }}
        >
          AI-powered software for everyone — from someone who doesn&apos;t know how a computer works to someone who knows everything.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center"
          style={{ gap: '1rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease }}
        >
          <MagneticButton
            onClick={scrollToVision}
            className="inline-flex items-center cursor-pointer font-medium transition-colors duration-200"
            style={{
              backgroundColor: primaryHover ? '#333333' : '#000000',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.875rem',
              letterSpacing: '0.02em',
              border: 'none',
            }}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
          >
            See What We&apos;re Building
          </MagneticButton>

          <MagneticButton
            onClick={() => {
              const lenis = getLenis();
              const el = document.getElementById('vision');
              if (el && lenis) lenis.scrollTo(el, { offset: -64, duration: 1.2 });
              else if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center cursor-pointer font-medium transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              color: secondaryHover ? '#000000' : '#737373',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.875rem',
              letterSpacing: '0.02em',
              border: secondaryHover ? '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(0,0,0,0.1)',
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            About Us
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollIndicatorVisible ? 0.4 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5a5a6e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: 'bob 2s ease-in-out infinite' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
});

export default Hero;
