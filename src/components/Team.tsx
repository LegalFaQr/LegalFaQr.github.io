import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { scaleIn, staggerContainer, viewportConfig } from '../lib/animations';

const teamMembers = [
  {
    name: 'Arindam Bhattacharya',
    role: 'CTO & CMD',
    description:
      'Architected and built the entire platform — GPU pipeline, AI orchestration, desktop application. Everything tech, end to end.',
  },
  {
    name: 'Shivansh Sharma',
    role: 'CEO',
    description:
      'Drives go-to-market strategy, partnerships, revenue operations, and overall business direction.',
  },
  {
    name: 'Aishpreet Kaur',
    role: 'CFO & COO',
    description:
      'Oversees financial planning, operations, growth initiatives, and organizational efficiency.',
  },
];

const Team = memo(function Team() {
  return (
    <section
      id="team"
      style={{
        padding: '8rem 1.5rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionLabel>THE TEAM</SectionLabel>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.04em',
              color: '#000000',
              marginTop: '1rem',
              lineHeight: 1.1,
            }}
          >
            Three founders. One vision.
          </h2>
        </motion.div>

        {/* Team cards */}
        <motion.div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={scaleIn}
              className="group relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '2.5rem',
              }}
              whileHover={{
                y: -4,
                boxShadow: '8px 8px 0px rgba(0,0,0,1)',
              }}
            >
              {/* Animated top border line */}
              <div className="absolute top-0 left-0 h-1 bg-black w-0 group-hover:w-full transition-all duration-500 ease-out" />

              <h3
                className="font-black tracking-tight"
                style={{
                  fontSize: '1.5rem',
                  color: '#000000',
                }}
              >
                {member.name}
              </h3>
              <p
                className="font-bold tracking-wider uppercase text-xs mt-2"
                style={{
                  color: '#000000',
                  opacity: 0.6,
                }}
              >
                {member.role}
              </p>
              <div className="w-8 h-[1px] bg-black/20 my-4" />
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#525252',
                }}
              >
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Team;
