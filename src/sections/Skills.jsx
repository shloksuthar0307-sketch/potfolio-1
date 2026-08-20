import React, { useRef } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code2, LayoutTemplate, Cuboid, Wrench } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot } from '@react-three/drei';

const skillCategories = [
  {
    title: "Core / Languages",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3 / SCSS", "Python"],
    color: "rgba(170, 59, 255, 0.4)" // primary
  },
  {
    title: "Frontend Engineering",
    icon: <LayoutTemplate className="w-6 h-6 text-cyan-400" />,
    skills: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Redux"],
    color: "rgba(34, 211, 238, 0.4)" // cyan
  },
  {
    title: "Creative & 3D Web",
    icon: <Cuboid className="w-6 h-6 text-fuchsia-400" />,
    skills: ["Three.js", "React Three Fiber", "GSAP", "Framer Motion", "WebGL"],
    color: "rgba(232, 121, 249, 0.4)" // fuchsia
  },
  {
    title: "Architecture & Tools",
    icon: <Wrench className="w-6 h-6 text-emerald-400" />,
    skills: ["Git & GitHub", "Figma", "RESTful APIs", "Vercel", "Django"],
    color: "rgba(52, 211, 153, 0.4)" // emerald
  }
];

// Interactive Spotlight Card
const SkillCard = ({ category }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative rounded-3xl border border-white/10 bg-[#0a0510]/80 backdrop-blur-md p-8 overflow-hidden shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${category.color},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
            {category.icon}
          </div>
          <h3 className="text-2xl font-heading font-medium text-white tracking-wide">
            {category.title}
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill, skillIdx) => (
            <motion.div
              key={skillIdx}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="px-4 py-2.5 bg-black/60 border border-white/10 rounded-full text-sm font-medium text-foreground/80 cursor-default transition-colors group-hover:border-white/20 shadow-lg"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3D Background Element
const BackgroundWireframe = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[9, 1.5, 128, 16]} position={[0, 0, -15]}>
        <meshBasicMaterial color="#aa3bff" wireframe transparent opacity={0.05} />
      </TorusKnot>
    </Float>
  );
};

export const Skills = () => {
  return (
    <SectionWrapper id="skills" className="relative min-h-screen overflow-hidden py-24">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <BackgroundWireframe />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">
        <div className="mb-20 text-center reveal-up opacity-0">
          <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-primary"></span>
            04. Arsenal
            <span className="w-8 h-[1px] bg-primary"></span>
          </span>
          <h2 className="text-5xl md:text-6xl font-heading font-semibold text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Expertise</span>
          </h2>
          <p className="mt-6 text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            A carefully curated stack of modern technologies, focusing on high-performance architectures and immersive creative development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="reveal-up opacity-0">
              <SkillCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
