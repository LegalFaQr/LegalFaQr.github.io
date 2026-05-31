import { useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { getLenis } from '../hooks/useLenis';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Custom spring-like easing

const headingLines = [
  { text: 'Intelligent software', hasAccent: false },
  { text: 'that doesn\'t need', hasAccent: true },
  { text: 'a manual.', hasAccent: false },
];

const Hero = memo(function Hero() {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '15%']);

  const scrollToVision = () => {
    const lenis = getLenis();
    const el = document.getElementById('products');
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -64, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      {/* Dot matrix background pattern */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          y: backgroundY,
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full flex flex-col items-center text-center" style={{ maxWidth: '1000px', zIndex: 10 }}>
        {/* Overline */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-black/70 uppercase">
            Shadovis Technologies Pvt. Ltd.
          </span>
        </motion.div>

        {/* Main heading with clip-path reveal */}
        <h1
          className="font-bold tracking-tighter"
          style={{
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '2rem',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            color: '#000000',
          }}
        >
          {headingLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}
              >
                {line.hasAccent ? (
                  <>
                    {'that '}
                    <span className="text-black/40 italic font-medium">doesn&apos;t</span>
                    {' need'}
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            lineHeight: 1.6,
            color: '#525252',
            maxWidth: '640px',
            marginBottom: '3rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
        >
          AI-powered software for everyone — from someone who doesn&apos;t know how a computer works to someone who knows everything.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
        >
          <MagneticButton
            onClick={scrollToVision}
            className="inline-flex items-center cursor-pointer font-semibold transition-transform duration-300"
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: '99px',
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              border: 'none',
              transform: primaryHover ? 'scale(0.96)' : 'scale(1)',
              boxShadow: primaryHover ? '0 8px 32px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.1)',
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
            className="inline-flex items-center cursor-pointer font-semibold transition-all duration-300"
            style={{
              color: '#000000',
              padding: '1rem 2rem',
              borderRadius: '99px',
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              border: '1px solid rgba(0,0,0,0.1)',
              transform: secondaryHover ? 'scale(0.96)' : 'scale(1)',
              backgroundColor: secondaryHover ? 'rgba(0,0,0,0.03)' : 'transparent',
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div
          className="w-[1px] h-16 bg-gradient-to-b from-black/20 to-transparent"
        />
      </motion.div>
    </section>
  );
});

export default Hero;
