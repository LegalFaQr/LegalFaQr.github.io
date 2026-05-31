import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';
import ScrambleText from './ScrambleText';
import { viewportConfig } from '../lib/animations';

const teamMembers = [
  {
    name: 'ARINDAM BHATTACHARYA',
    role: 'CTO & CMD',
    description:
      'Architected and built the entire platform — GPU pipeline, AI orchestration, desktop application. Everything tech, end to end.',
  },
  {
    name: 'SHIVANSH SHARMA',
    role: 'CEO',
    description:
      'Drives go-to-market strategy, partnerships, revenue operations, and overall business direction.',
  },
  {
    name: 'AISHPREET KAUR',
    role: 'CFO & COO',
    description:
      'Oversees financial planning, operations, growth initiatives, and organizational efficiency.',
  },
];

const Team = memo(function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="team"
      style={{
        padding: '8rem 1.5rem',
        backgroundColor: 'transparent',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionLabel>THE ARCHITECTS</SectionLabel>
          <h2
            className="font-black tracking-tighter uppercase"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              letterSpacing: '-0.04em',
              color: '#000000',
              marginTop: '1rem',
              lineHeight: 1,
            }}
          >
            <ScrambleText text="THREE FOUNDERS." delay={200} /><br />
            <ScrambleText text="ONE VISION." delay={500} />
          </h2>
        </motion.div>

        {/* Typographic List */}
        <div className="flex flex-col border-t border-[#000000]">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              className="relative border-b border-[#000000] group cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div 
                className="pointer-events-none absolute inset-0 bg-[#000000] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ zIndex: 0 }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 px-4 transition-colors duration-500 group-hover:text-white">
                <h3
                  className="font-black tracking-tighter uppercase m-0 leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                  }}
                >
                  {member.name}
                </h3>
                
                <div className="mt-4 md:mt-0 md:text-right w-full md:w-[400px]">
                  <p className="font-bold tracking-widest uppercase text-sm mb-2 opacity-60">
                    {member.role}
                  </p>
                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-medium text-base overflow-hidden"
                      >
                        {member.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Team;
