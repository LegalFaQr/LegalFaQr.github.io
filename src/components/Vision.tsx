import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { revealUp, staggerContainerSlow, viewportConfig } from '../lib/animations';

const convictions = [
  {
    title: 'Zero Onboarding',
    text: 'Technology should not require you to learn it. It should see what you see, understand what you need, and do it for you. No skill floor. No manual.',
  },
  {
    title: 'Absolute Inclusion',
    text: 'We build for the largest audience possible — not a niche. The same tool, the same experience, for the most technical power user and the complete beginner. No compromise on either side.',
  },
  {
    title: 'Human First',
    text: 'Optimistic, futuristic ideas fuel everything we do. The next generation of software should be autonomous, screen-aware, and built to serve the human intent.',
  },
];

const Vision = memo(function Vision() {
  return (
    <section
      id="vision"
      className="relative"
      style={{
        padding: '12rem 1.5rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1200px',
        }}
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          
          {/* Left column (Sticky) */}
          <motion.div
            className="lg:sticky lg:top-40"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <SectionLabel>OUR CONVICTION</SectionLabel>
            <h2
              className="font-black tracking-tighter"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: '#000000',
                marginTop: '1rem',
              }}
            >
              Technology<br />should just work.
            </h2>
            <p className="text-[#525252] mt-6 text-lg max-w-sm leading-relaxed">
              We are stripping away the complexity of modern software. The interface of the future is just your intent.
            </p>
          </motion.div>

          {/* Right column (Scrolls past) */}
          <motion.div
            className="flex flex-col"
            style={{ gap: '4rem' }}
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {convictions.map((item, i) => (
              <motion.div
                key={i}
                variants={revealUp}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-black/10">
                  <motion.div 
                    className="w-[3px] h-8 bg-black -ml-[1px] rounded-full"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-black mb-3">
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.7,
                    color: '#525252',
                  }}
                >
                  {item.text}
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
