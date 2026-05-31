import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { revealUp, staggerContainerSlow, viewportConfig } from '../lib/animations';

const convictions = [
  'Technology should not require you to learn it. It should see what you see, understand what you need, and do it for you. No skill floor. No onboarding. No manual.',
  "We build for the largest audience possible — not a niche. The same tool, the same experience, for the most technical power user and the complete beginner. No compromise on either side.",
  "Optimistic, futuristic ideas fuel everything we do. The next generation of software should be autonomous, screen-aware, and human-first. That's what we're building.",
];

const Vision = memo(function Vision() {
  return (
    <section
      id="vision"
      style={{
        padding: '8rem 1.5rem',
      }}
    >
      <div
        className="mx-auto grid gap-16 lg:gap-24"
        style={{
          maxWidth: '1200px',
          gridTemplateColumns: '1fr',
        }}
      >
        {/* Desktop: two-column layout */}
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left column */}
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <SectionLabel>OUR CONVICTION</SectionLabel>
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                color: '#f0f0f5',
                marginTop: '1rem',
              }}
            >
              Technology should<br className="hidden lg:inline" /> just work.
            </h2>
          </motion.div>

          {/* Right column — conviction blocks */}
          <motion.div
            className="flex flex-col"
            style={{ gap: '1.25rem' }}
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {convictions.map((text, i) => (
              <motion.div
                key={i}
                variants={revealUp}
                style={{
                  borderLeft: '2px solid #ffffff',
                  borderRadius: '1px',
                  paddingLeft: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#8a8a9a',
                  }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Vision;
