import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import ScrambleText from './ScrambleText';
import { revealUp, staggerContainerSlow, viewportConfig } from '../lib/animations';

const convictions = [
  {
    title: 'THE FUTURE, DELIVERED',
    text: 'We don\'t build iterations. We build technology that shouldn\'t exist for another decade, and we are delivering it today. The industry hasn\'t even heard of what we are building.',
  },
  {
    title: 'ZERO LEARNING CURVE',
    text: 'Technology should not require you to learn it. If you have to read a manual, we failed. Our tech sees what you see, understands what you need, and executes it. Period.',
  },
  {
    title: 'ABSOLUTE ELIGIBILITY',
    text: 'We build for everyone. Not a niche. The exact same tool, the exact same power, for the highest-tier software engineer and the complete beginner. No compromise on either side.',
  },
];

const Vision = memo(function Vision() {
  return (
    <section
      id="vision"
      className="relative"
      style={{
        padding: '12rem 1.5rem',
        backgroundColor: 'transparent',
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
              className="font-black tracking-tighter uppercase"
              style={{
                fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: '#000000',
                marginTop: '1rem',
              }}
            >
              <ScrambleText text="TECH THAT" delay={200} /><br />
              <ScrambleText text="REQUIRES YOU" delay={500} /><br />
              <ScrambleText text="NOT TO LEARN IT." delay={800} />
            </h2>
          </motion.div>

          {/* Right column (Scrolls past) */}
          <motion.div
            className="flex flex-col"
            style={{ gap: '6rem' }}
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {convictions.map((item, i) => (
              <motion.div
                key={i}
                variants={revealUp}
                className="relative"
              >
                <div className="w-16 h-[2px] bg-[#000000] mb-6" />
                <h3 className="text-3xl font-black tracking-tighter text-[#000000] mb-4 uppercase">
                  {item.title}
                </h3>
                <p
                  className="font-medium"
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                    color: '#000000',
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
