import { memo } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { revealUp, viewportConfig } from '../lib/animations';

const Contact = memo(function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '8rem 1.5rem 0',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
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
            style={{ gap: '0.5rem', marginTop: '1.5rem' }}
          >
            <a
              href="https://shadovis.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link font-medium transition-colors duration-200"
              style={{
                fontSize: '1.125rem',
                color: '#000000',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#000000'; }}
            >
              shadovis.me
            </a>
            <a
              href="mailto:support@shadovis.tech"
              className="text-link transition-colors duration-200"
              style={{
                fontSize: '1.125rem',
                color: '#737373',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#737373'; }}
            >
              support@shadovis.tech
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.04)',
            marginTop: '3rem',
          }}
        />

        {/* Footer */}
        <motion.footer
          className="text-center"
          style={{
            padding: '2rem 0 4rem',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: '#737373',
              letterSpacing: '0.02em',
            }}
          >
            © 2026 Shadovis Technologies Pvt. Ltd. · Punjab, India
          </p>
        </motion.footer>
      </div>
    </section>
  );
});

export default Contact;
