import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { scaleIn, staggerContainerFast, revealUp, viewportConfig } from '../lib/animations';

const features = [
  { 
    title: 'GPU-Pixel Awareness',
    desc: 'Reads raw pixel data directly from your screen in real time. No API required.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  { 
    title: 'Autonomous Execution',
    desc: 'Multi-step reasoning allows it to take control of the mouse and keyboard safely.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  { 
    title: 'Offline Mode',
    desc: 'Runs entirely locally on your machine. Absolute privacy, zero latency.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 9.86a10.94 10.94 0 0 0-3.27 2.69M8.56 16.55a10.94 10.94 0 0 1-5.11-2.91M19.07 19.07a10.94 10.94 0 0 0 2.53-2.53M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      </svg>
    )
  },
  { 
    title: 'Self-Correcting',
    desc: 'If it makes a mistake or a UI changes, it visually detects the error and fixes it.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
    )
  },
];

const Products = memo(function Products() {
  return (
    <section
      id="products"
      style={{
        padding: '8rem 1.5rem',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '4rem' }}
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <SectionLabel>WHAT WE'RE BUILDING</SectionLabel>
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
            A new paradigm of software.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Main PRISM Card (Spans 2 columns) */}
          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden bg-white md:col-span-2 lg:col-span-2 flex flex-col justify-between"
            style={{
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
            }}
          >
            {/* Top row: badge + status */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <span className="text-[10px] font-bold tracking-widest text-black/40 border border-black/10 px-3 py-1 rounded-full uppercase">
                CODENAME
              </span>
              <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wide text-black/60 uppercase">
                  In Development
                </span>
              </div>
            </div>

            <div>
              <h3
                className="font-black tracking-tighter"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: '#000000',
                  lineHeight: 1,
                  marginBottom: '1rem',
                }}
              >
                PRISM
              </h3>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  color: '#525252',
                  lineHeight: 1.5,
                  maxWidth: '500px',
                  letterSpacing: '-0.01em',
                }}
              >
                An AI that sees your screen, understands intent, and executes multi-step tasks across any application autonomously.
              </p>
            </div>
            
            {/* Subtle background decoration */}
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
              <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-white flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300"
              style={{
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
              }}
            >
              <div 
                className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black/70 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300"
              >
                {feature.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold tracking-tight text-black mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#525252] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default Products;
