import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';

export const About = () => {
  return (
    <SectionWrapper id="about" className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div className="space-y-8">
          <div className="inline-flex reveal-up opacity-0">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">01. About Me</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-semibold reveal-up opacity-0">
            Bridging the gap between <span className="text-gradient">design & engineering.</span>
          </h2>
          
          <div className="space-y-6 text-foreground/70 text-lg reveal-up opacity-0 font-light leading-relaxed">
            <p>
              I am a Creative Frontend Engineer moving beyond standard interfaces. 
              My expertise lies in building interactive narratives, seamlessly blending logic with aesthetics 
              to produce award-winning experiences.
            </p>
            <p>
              With a deep understanding of Three.js, GSAP, and Framer Motion, 
              I elevate React architectures into dynamic, performant, and memorable digital products.
            </p>
          </div>
          
          <div className="pt-4 reveal-up opacity-0">
            <a href="https://github.com/shloksuthar0307-sketch" target="_blank" rel="noreferrer" className="hoverable text-primary border-b border-primary/50 hover:border-primary pb-1 transition-colors">
              Read the full story &rarr;
            </a>
          </div>
        </div>
        
        {/* Visual elements */}
        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden glass border border-white/5 reveal-up opacity-0 group">
          {/* Abstract placeholder visual - can be replaced with image or shader */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#120a1f] to-[#0a0510] opacity-80" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8">
            <div className="w-full h-full relative border border-white/10 rounded-xl overflow-hidden">
               <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 transform group-hover:scale-100 transition-transform duration-1000" />
               <div className="absolute inset-0 backdrop-blur-3xl flex items-center justify-center text-center p-8">
                  <p className="font-heading text-2xl md:text-3xl font-light text-white/80 leading-snug">
                    "Design is not just what it looks like and feels like. Design is how it works."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
