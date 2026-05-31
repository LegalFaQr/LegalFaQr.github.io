import { useState, useCallback, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { audioManager } from './lib/AudioManager';
import Preloader from './components/Preloader';
import GrainOverlay from './components/GrainOverlay';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Products from './components/Products';
import Team from './components/Team';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';


export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  // Unlock AudioContext on first interaction
  useEffect(() => {
    const unlockAudio = () => {
      audioManager.init();
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  // (IntersectionObserver logic was moved directly into Navigation.tsx for better performance)

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={handlePreloaderComplete} />
      <GrainOverlay />

      {loaded && (
        <>
          <Navigation />
          <main>
            <Hero />
            <Vision />
            <Products />
            <Team />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
