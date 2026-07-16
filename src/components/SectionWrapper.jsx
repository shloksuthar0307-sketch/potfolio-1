import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const SectionWrapper = ({
  children,
  id,
  className = '',
  noPadding = false,
}) => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Basic fade-up animation for all sections
      const elements = sectionRef.current.querySelectorAll('.reveal-up');
      
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full ${
        noPadding ? '' : 'py-24 md:py-32 px-6 md:px-12 lg:px-24'
      } ${className}`}
    >
      {children}
    </section>
  );
};
