import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import ScrambleText from './ScrambleText';
import { audioManager } from '../lib/AudioManager';
import { scaleIn, staggerContainerFast, revealUp, viewportConfig } from '../lib/animations';

const features = [
  { 
    title: 'ABSOLUTE OFFLINE',
    desc: 'The industry\'s first and only AI agent that requires zero internet. Absolute privacy. Zero latency. Unheard of in modern tech.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 9.86a10.94 10.94 0 0 0-3.27 2.69M8.56 16.55a10.94 10.94 0 0 1-5.11-2.91M19.07 19.07a10.94 10.94 0 0 0 2.53-2.53M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      </svg>
    )
  },
  { 
    title: 'GPU-PIXEL AWARE',
    desc: 'It doesn\'t need APIs. It reads raw pixel data directly from your screen in real-time, seeing exactly what you see.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  { 
    title: 'AUTONOMOUS EXECUTION',
    desc: 'Multi-step reasoning allows it to take total control of your mouse and keyboard, completing complex tasks with zero manual input.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
];

const Products = memo(function Products() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('bento-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section
      id="products"
      style={{
        padding: '8rem 1.5rem',
        backgroundColor: 'transparent',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Section header */}
        <motion.div
          className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div>
            <SectionLabel>THE GOLDMINE</SectionLabel>
            <h2
              className="font-black tracking-tighter uppercase"
              style={{
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                color: '#ffffff',
                marginTop: '1rem',
                lineHeight: 0.9,
              }}
            >
              <ScrambleText text="TECH THAT" delay={200} /><br/>
              <ScrambleText text="SHOULDN'T" delay={400} /><br/>
              <ScrambleText text="EXIST YET." delay={600} />
            </h2>
          </div>
          <p
            className="font-medium max-w-sm"
            style={{
              fontSize: '1.125rem',
              color: '#ffffff',
              lineHeight: 1.5,
            }}
          >
            We are building unique products that the industry hasn't even heard of. Complete disruption.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          onMouseMove={handleMouseMove}
        >
          {/* Main PRISM Card (Spans 2 columns) */}
          <motion.div
            variants={scaleIn}
            onMouseEnter={() => audioManager.playHum()}
            className="bento-card group relative overflow-hidden bg-[#111111] lg:col-span-2 flex flex-col justify-between cursor-default"
            style={{
              borderRadius: '0px',
              border: '1px solid #333333',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            {/* Spotlight pseudo-element */}
            <div 
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)',
                zIndex: 0,
              }}
            />
            
            {/* Top row: badge + status */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-16">
              <span className="text-[12px] font-bold tracking-[0.2em] text-white border border-white/20 px-4 py-1.5 uppercase">
                CODENAME
              </span>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 animate-pulse" />
                <span className="text-[12px] font-bold tracking-[0.2em] text-white uppercase">
                  Classified / In Development
                </span>
              </div>
            </div>

            <div className="relative z-10">
              <h3
                className="font-black tracking-tighter uppercase"
                style={{
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  color: '#ffffff',
                  lineHeight: 0.85,
                  marginBottom: '2rem',
                }}
              >
                PRISM
              </h3>
              <p
                className="font-medium"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  color: '#ffffff',
                  lineHeight: 1.4,
                  maxWidth: '700px',
                  letterSpacing: '-0.02em',
                }}
              >
                The world's first and only AI agentic app that functions entirely offline. It sees your screen, understands your intent, and executes multi-step tasks across any software. No API. No internet. Just pure, autonomous execution.
              </p>
            </div>
          </motion.div>

          {/* Feature Cards Column */}
          <div className="flex flex-col gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                onMouseEnter={() => audioManager.playHum()}
                className="bento-card relative bg-[#111111] flex flex-col justify-between group flex-1 cursor-default overflow-hidden"
                style={{
                  borderRadius: '0px',
                  border: '1px solid #333333',
                  padding: '2.5rem',
                }}
              >
                <div 
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.03), transparent 40%)',
                    zIndex: 0,
                  }}
                />
                <div 
                  className="relative z-10 w-12 h-12 bg-[#222222] border border-[#333333] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {feature.icon}
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-black tracking-tight text-white mb-3 uppercase">
                    {feature.title}
                  </h4>
                  <p className="text-base text-white/70 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Products;
