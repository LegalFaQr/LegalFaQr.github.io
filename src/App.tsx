import { useState, useEffect, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import Preloader from './components/Preloader';
import GrainOverlay from './components/GrainOverlay';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Products from './components/Products';
import Team from './components/Team';
import Contact from './components/Contact';

const sectionIds = ['hero', 'vision', 'products', 'team', 'contact'];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis smooth scroll
  useLenis();

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!loaded) return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-64px 0px 0px 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [loaded]);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <GrainOverlay />

      {loaded && (
        <>
          <Navigation activeSection={activeSection} />
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
