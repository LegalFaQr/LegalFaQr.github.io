import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ScrambleText from './ScrambleText';
import { getLenis } from '../hooks/useLenis';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]; 

const Hero = memo(function Hero() {
  const [primaryHover, setPrimaryHover] = useState(false);

  const scrollToProducts = () => {
    const lenis = getLenis();
    const el = document.getElementById('products');
    if (el && lenis) lenis.scrollTo(el, { offset: -64, duration: 1.2 });
    else if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="relative mx-auto w-full max-w-[1400px] z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left: Typography */}
        <div className="flex flex-col justify-center h-full order-2 lg:order-1">
          {/* Overline */}
          <motion.div
            className="inline-flex items-center gap-3 mb-8 self-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
            <span className="text-sm font-bold tracking-[0.2em] text-black uppercase">
              <ScrambleText text="SHADOVIS TECHNOLOGIES" delay={300} />
            </span>
          </motion.div>

          {/* Massive Headline */}
          <h1
            className="font-black uppercase text-left leading-[0.85] tracking-tighter"
            style={{
              fontSize: 'clamp(4rem, 8vw, 8rem)',
              color: '#000000',
              marginBottom: '2rem',
              marginLeft: '-0.04em',
            }}
          >
            <div className="overflow-hidden">
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4, ease }}>
                <ScrambleText text="TECH FROM" delay={600} />
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5, ease }}>
                <ScrambleText text="THE FUTURE." delay={900} />
              </motion.div>
            </div>
          </h1>

          <div className="flex flex-col md:flex-row items-start justify-start gap-8 mt-12 lg:mt-24">
            {/* Brutally confident subline */}
            <motion.p
              className="font-medium text-left"
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                lineHeight: 1.5,
                color: '#000000',
                maxWidth: '540px',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5, ease }}
            >
              We build impossible software that the industry hasn't even heard of yet. And we make it so simple that absolutely anyone can use it.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-4 shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.7, ease }}
            >
              <MagneticButton
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center cursor-pointer font-bold uppercase tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '0px', // Brutalist square button
                  fontSize: '0.875rem',
                  border: '1px solid #000000',
                  transform: primaryHover ? 'scale(0.96)' : 'scale(1)',
                  boxShadow: primaryHover ? '12px 12px 0px rgba(0,0,0,0.1)' : '0px 0px 0px rgba(0,0,0,0)',
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
              >
                Examine the Tech
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Right: Uploaded PNG Logo */}
        <div className="flex justify-center items-center h-full order-1 lg:order-2">
          <motion.img 
            src="/logo.png" 
            alt="Shadovis Logo"
            className="w-full max-w-[300px] lg:max-w-[500px] object-contain"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        </div>

      </div>
    </section>
  );
});

export default Hero;
