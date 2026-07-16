import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Reveal text
    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
      // Wait a bit
      .to({}, { duration: 0.5 })
      // Slide text up and fade
      .to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      // Slide background up
      .to(bgRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut',
      });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9000] flex items-center justify-center font-heading pointer-events-none"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[#050505] origin-bottom w-full h-full"
      />
      <div ref={textRef} className="relative z-10 text-white text-4xl md:text-6xl font-semibold tracking-tighter">
        <span className="text-gradient">Welcome.</span>
      </div>
    </div>
  );
};
