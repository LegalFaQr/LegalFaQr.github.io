import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { scaleIn, staggerContainerFast, revealUp, viewportConfig } from '../lib/animations';

const featurePills = [
  { label: 'GPU-Pixel Awareness', color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
  { label: 'Autonomous Execution', color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
  { label: 'Offline Mode', color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
  { label: 'Self-Correcting', color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
];

const Products = memo(function Products() {
  return (
    <section
      id="products"
      style={{
        padding: '8rem 1.5rem',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '3rem' }}
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <SectionLabel>WHAT WE'RE BUILDING</SectionLabel>
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              letterSpacing: '-0.02em',
              color: '#f0f0f5',
              marginTop: '1rem',
            }}
          >
            Our first product.
          </h2>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#5a5a6e',
              marginTop: '0.5rem',
            }}
          >
            In development. Here&apos;s a glimpse.
          </p>
        </motion.div>

        {/* Product card */}
        <motion.div
          className="mx-auto group transition-all duration-300"
          style={{
            maxWidth: '800px',
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          whileHover={{
            borderColor: 'rgba(255,255,255,0.16)',
            y: -2,
            backgroundColor: '#121212',
          }}
        >
          {/* Top row: badge + status */}
          <div className="flex flex-wrap items-center justify-between" style={{ gap: '1rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontWeight: 500,
              }}
            >
              CODENAME
            </span>
             <div className="flex items-center" style={{ gap: '0.5rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#a3a3a3' }}>
                In Development
              </span>
            </div>
          </div>

          {/* Product name */}
          <h3
            className="font-extrabold"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3rem)',
              letterSpacing: '-0.03em',
              color: '#f0f0f5',
              marginTop: '1.5rem',
            }}
          >
            PRISM
          </h3>

          {/* One-liner */}
          <p
            style={{
              fontSize: '1.25rem',
              color: '#8a8a9a',
              marginTop: '0.75rem',
            }}
          >
            An AI that sees your screen and does the work for you.
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#8a8a9a',
              marginTop: '1.25rem',
              maxWidth: '600px',
            }}
          >
            A desktop assistant that reads live GPU pixel data from your screen, understands what&apos;s happening in real time, and autonomously executes multi-step tasks across applications — online or offline. One hotkey. Any screen. Any skill level. Just say what you want done.
          </p>

          {/* Feature pills */}
          <motion.div
            className="flex flex-wrap"
            style={{ gap: '0.5rem', marginTop: '1.25rem' }}
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {featurePills.map((pill) => (
              <motion.span
                key={pill.label}
                variants={revealUp}
                style={{
                  fontSize: '0.75rem',
                  color: pill.color,
                  backgroundColor: pill.bg,
                  borderRadius: '9999px',
                  padding: '0.375rem 0.75rem',
                  fontWeight: 500,
                }}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Bottom note */}
          <p
            className="italic"
            style={{
              fontSize: '0.75rem',
              color: '#5a5a6e',
              marginTop: '2rem',
              textAlign: 'right',
            }}
          >
            Final name TBA at launch
          </p>
        </motion.div>
      </div>
    </section>
  );
});

export default Products;
