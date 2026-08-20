import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Sparkles,
  Torus,
  Line,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// ---------------------------------------------------------------------
// Advanced Abstract Node System
// ---------------------------------------------------------------------
const AbstractCore = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Smoothly follow mouse
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        {/* TorusKnot for complex glass refractions */}
        <torusKnotGeometry args={[1.2, 0.4, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationDistance={1}
          attenuationColor="#aa3bff"
        />
      </mesh>
    </Float>
  );
};

// Orbital Rings
const OrbitalRings = () => {
  const ringsRef = useRef();

  useFrame((_, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x += delta * 0.05;
      ringsRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={ringsRef} position={[2, 0, -2]}>
      <Torus args={[3, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#c084fc" transparent opacity={0.2} />
      </Torus>
      <Torus args={[4, 0.01, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.15} />
      </Torus>
      <Torus args={[5, 0.02, 16, 100]} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#aa3bff" transparent opacity={0.3} />
      </Torus>
    </group>
  );
};

// Glowing particles
const ParticleSystem = () => {
  return (
    <group position={[2, 0, -2]}>
      <Sparkles count={150} scale={10} size={2} speed={0.4} color="#c084fc" opacity={0.6} />
      <Sparkles count={50} scale={12} size={3} speed={0.2} color="#67e8f9" opacity={0.4} />
      <Sparkles count={100} scale={8} size={1.5} speed={0.6} color="#aa3bff" opacity={0.8} />
    </group>
  );
};

// ---------------------------------------------------------------------
// Post-Processing & Scene Root
// ---------------------------------------------------------------------
const Scene = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#c084fc" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#67e8f9" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#aa3bff" />

      <AbstractCore />
      <OrbitalRings />
      <ParticleSystem />

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
          levels={8}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-background">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-foreground/80 tracking-wide uppercase">
            Available for new opportunities
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-4 leading-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Full-stack
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400"
          >
            Developer
          </motion.div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-xl text-lg md:text-xl text-foreground/60 mb-10 font-light"
        >
          Over  years of experience crafting high-performance, immersive web architectures and premium 3D user interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a
            href="#projects"
            className="hoverable group relative px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Explore Architecture</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="hoverable px-8 py-4 bg-transparent text-foreground border border-white/20 font-medium rounded-full hover:bg-white/5 transition-all hover:border-white/40"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Modern Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center space-x-4"
      >
        <motion.div
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[2px] h-12 bg-white/20 relative overflow-hidden"
        >
          <motion.div 
            className="absolute left-0 w-full bg-primary" 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ height: "50%" }}
          />
        </motion.div>
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 rotate-90 origin-left translate-y-6">Scroll</span>
      </motion.div>
    </section>
  );
};
