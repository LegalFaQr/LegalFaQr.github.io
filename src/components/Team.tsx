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
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionLabel>THE TEAM</SectionLabel>
          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              letterSpacing: '-0.02em',
              color: '#000000',
              marginTop: '1rem',
            }}
          >
            Three founders. One vision.
          </h2>
        </motion.div>

        {/* Team cards */}
        <motion.div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
              className="transition-all duration-300"
              style={{
                backgroundColor: '#f9f9f9',
                border: '1px solid rgba(0,0,0,0.08)',
                borderLeft: '2px solid #000000',
                borderRadius: '12px',
                padding: '2rem',
              }}
              whileHover={{
                borderColor: 'rgba(0,0,0,0.16)',
                y: -2,
                backgroundColor: '#ffffff',
              }}
            >
              <h3
                className="font-semibold"
                style={{
                  fontSize: '1.25rem',
                  color: '#000000',
                }}
              >
                {member.name}
              </h3>
              <p
                className="font-medium"
                style={{
                  fontSize: '0.875rem',
                  color: '#000000',
                  letterSpacing: '0.02em',
                  marginTop: '0.25rem',
                }}
              >
                {member.role}
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: '#525252',
                  marginTop: '0.75rem',
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
