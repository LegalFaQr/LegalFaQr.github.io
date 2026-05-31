import { useEffect, useState } from 'react';
import { audioManager } from '../lib/AudioManager';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>?/[]{}';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, className = '', delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let frameId: number;
    let iteration = 0;
    
    // Start empty, then wait for delay
    setDisplayText('');
    
    const timeoutId = setTimeout(() => {
      const animate = () => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('');
        });

        // Increase iteration slowly so the scramble lasts a bit
        iteration += 1 / 3;
        
        // Play tick sound every few frames
        if (Math.random() > 0.7) {
          audioManager.playTick();
        }

        if (iteration < text.length) {
          frameId = requestAnimationFrame(animate);
        }
      };
      
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}
