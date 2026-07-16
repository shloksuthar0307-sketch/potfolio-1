import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const AnimatedShapes = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-3, 1, -5]}>
          <MeshDistortMaterial
            color="#aa3bff"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.8, 64, 64]} position={[3, -2, -3]}>
          <MeshDistortMaterial
            color="#c084fc"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.1}
          />
        </Sphere>
      </Float>
    </>
  );
};

export const Hero = () => {
  // Staggered text animation
  const title = "Creative".split("");
  const subtitle = "Frontend Engineer".split("");

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <AnimatedShapes />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-4 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-foreground/80 tracking-wide"
        >
          Shlok Suthar
        </motion.div>

        <h1 className="flex space-x-2 md:space-x-4 mb-2 md:mb-6">
          {['Creative', 'Frontend', 'Engineer'].map((word, wordIdx) => (
            <span key={wordIdx} className="overflow-hidden flex">
              {word.split('').map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1], // easeOutCubic
                    delay: 2 + wordIdx * 0.1 + charIdx * 0.03,
                  }}
                  className={`inline-block ${wordIdx === 0 ? 'text-primary' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="max-w-xl text-lg md:text-xl text-foreground/60 mb-10 font-light"
        >
          I craft immersive web experiences where premium design meets seamless 3D performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.5 }}
          className="flex space-x-6"
        >
          <a
            href="#projects"
            className="hoverable px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="hoverable px-8 py-4 bg-transparent text-foreground border border-white/20 font-medium rounded-full hover:bg-white/5 transition-colors"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};
