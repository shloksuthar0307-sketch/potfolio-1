import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Core / Languages",
    skills: ["JavaScript (ES6+)", "HTML5", "CSS3 / SCSS", "Python"]
  },
  {
    title: "Frontend Engineering",
    skills: ["React.js", "Vite", "Tailwind CSS", "Redux Toolkit"]
  },
  {
    title: "Creative & 3D Web",
    skills: ["Three.js", "React Three Fiber", "GSAP", "Framer Motion", "WebGL Basics"]
  },
  {
    title: "Tools & Others",
    skills: ["Git & GitHub", "Figma", "RESTful APIs", "Vercel", "Netlify"]
  }
];

export const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16 reveal-up opacity-0">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">04. Arsenal</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">Technical Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors reveal-up opacity-0"
            >
              <h3 className="text-xl font-heading font-medium text-white mb-6 border-b border-white/10 pb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(170, 59, 255, 0.15)' }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-foreground/80 cursor-default transition-colors hover:border-primary/50"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
