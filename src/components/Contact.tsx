import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { revealUp, viewportConfig } from '../lib/animations';

const Contact = memo(function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        padding: '8rem 1.5rem 0',
        backgroundColor: '#ffffff',
      }}
    >
      <div className="mx-auto flex flex-col items-center" style={{ maxWidth: '1200px', zIndex: 10, position: 'relative' }}>
        {/* Contact section */}
        <motion.div
          className="text-center"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <SectionLabel>GET IN TOUCH</SectionLabel>

          <div
            className="flex flex-col items-center"
            style={{ gap: '1rem', marginTop: '2rem' }}
          >
            <a
              href="https://shadovis.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold tracking-tight transition-colors duration-300"
              style={{
                color: '#000000',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#000000'; }}
            >
              shadovis.me
            </a>
            <a
              href="mailto:support@shadovis.tech"
              className="text-lg font-medium transition-colors duration-300"
              style={{
                color: '#525252',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#525252'; }}
            >
              support@shadovis.tech
            </a>
          </div>
        </motion.div>
      </div>

      {/* Massive Scaling Footer Typography */}
      <motion.div 
        className="w-full flex justify-center mt-24 pb-8 select-none pointer-events-none"
        style={{
          scale,
          opacity,
          y,
          transformOrigin: 'bottom center'
        }}
      >
        <h1 
          className="font-black tracking-tighter text-center"
          style={{
            fontSize: 'clamp(4rem, 15vw, 24rem)',
            lineHeight: 0.8,
            color: '#000000',
            opacity: 0.04,
          }}
        >
          SHADOVIS
        </h1>
      </motion.div>

      {/* Actual Footer */}
      <div className="absolute bottom-6 w-full flex justify-center z-20">
        <p
          style={{
            fontSize: '0.75rem',
            color: '#737373',
            letterSpacing: '0.02em',
            fontWeight: 500,
          }}
        >
          © 2026 Shadovis Technologies Pvt. Ltd. · Punjab, India
        </p>
      </div>
    </section>
  );
});

export default Contact;
