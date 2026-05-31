import { memo } from 'react';

interface SectionLabelProps {
  children: string;
}

const SectionLabel = memo(function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span
      className="inline-block font-medium uppercase"
      style={{
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        color: '#5a5a6e',
      }}
    >
      {children}
    </span>
  );
});

export default SectionLabel;
