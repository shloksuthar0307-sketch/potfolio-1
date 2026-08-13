import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stars,
  Float,
  Icosahedron,
  Octahedron,
  TorusKnot,
  MeshTransmissionMaterial,
  Environment,
  Sparkles,
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// ---------------------------------------------------------------------
// Hit effect: a short-lived radial spray of glowing "bullets" fired
// outward from whatever shape was just touched, plus a matching flash
// of sparkles. Fully self-cleaning — it removes itself from the parent's
// state once its lifespan is up, no external timers needed.
// ---------------------------------------------------------------------
const BulletBurst = ({ id, position, color, onDone }) => {
  const born = useRef(performance.now());
  const finished = useRef(false);
  const groupRef = useRef();

  const bullets = useMemo(() => {
    const count = 10;
    return new Array(count).fill(0).map(() => ({
      dir: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(),
      speed: 3 + Math.random() * 2,
    }));
  }, []);

  useFrame(() => {
    const elapsed = (performance.now() - born.current) / 1000;
    const lifespan = 0.7;

    if (elapsed > lifespan) {
      if (!finished.current) {
        finished.current = true;
        onDone(id);
      }
      return;
    }

    const t = elapsed / lifespan;
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const b = bullets[i];
        if (!b) return;
        const dist = b.speed * elapsed;
        child.position.set(b.dir.x * dist, b.dir.y * dist, b.dir.z * dist);
        child.scale.setScalar(Math.max(0, 1 - t));
      });
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {bullets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <Sparkles count={16} scale={1.4} size={3} speed={1.2} color={color} opacity={0.9} />
    </group>
  );
};

// ---------------------------------------------------------------------
// Central engineered core: a wireframe icosahedron with a faint solid
// form glowing underneath it, tracking the cursor. Touch it to fire.
// ---------------------------------------------------------------------
const CrystalCore = ({ onHit }) => {
  const groupRef = useRef();
  const punchAt = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer, clock } = state;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08 + pointer.x * 0.3;
    groupRef.current.rotation.x = pointer.y * 0.15;

    const since = (performance.now() - punchAt.current) / 1000;
    const punch = since < 0.25 ? 1 + 0.25 * (1 - since / 0.25) : 1;
    groupRef.current.scale.setScalar(punch);
  });

  const handleHit = (e) => {
    e.stopPropagation();
    punchAt.current = performance.now();
    const worldPos = new THREE.Vector3();
    e.object.getWorldPosition(worldPos);
    onHit(worldPos, '#aa3bff');
  };

  return (
    <group
      ref={groupRef}
      position={[-3.5, 0.3, -4]}
      onPointerDown={handleHit}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <Icosahedron args={[1.6, 1]}>
        <meshStandardMaterial
          color="#aa3bff"
          wireframe
          emissive="#aa3bff"
          emissiveIntensity={hovered ? 0.9 : 0.5}
        />
      </Icosahedron>
      <Icosahedron args={[1.52, 1]}>
        <meshPhysicalMaterial
          color="#1a0b2e"
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={0.35}
        />
      </Icosahedron>
    </group>
  );
};

// ---------------------------------------------------------------------
// A refractive glass torus knot — the "creative" counterweight to the
// core's rigid structure. Touch it to fire.
// ---------------------------------------------------------------------
const GlassKnot = ({ onHit }) => {
  const ref = useRef();
  const punchAt = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.18;

    const since = (performance.now() - punchAt.current) / 1000;
    const punch = since < 0.25 ? 1 + 0.3 * (1 - since / 0.25) : 1;
    ref.current.scale.setScalar(punch);
  });

  const handleHit = (e) => {
    e.stopPropagation();
    punchAt.current = performance.now();
    const worldPos = new THREE.Vector3();
    e.object.getWorldPosition(worldPos);
    onHit(worldPos, '#c084fc');
  };

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.4}>
      <TorusKnot
        ref={ref}
        args={[0.55, 0.16, 128, 32]}
        position={[3.1, -1.3, -3]}
        onPointerDown={handleHit}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <MeshTransmissionMaterial
          color="#c084fc"
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.05}
        />
      </TorusKnot>
    </Float>
  );
};

// ---------------------------------------------------------------------
// A single drifting shard. Touch it to fire — each shard reacts
// independently with its own recoil punch.
// ---------------------------------------------------------------------
const Shard = ({ position, scale, speed, onHit }) => {
  const meshRef = useRef();
  const punchAt = useRef(0);

  useFrame(() => {
    if (!meshRef.current) return;
    const since = (performance.now() - punchAt.current) / 1000;
    const punch = since < 0.25 ? 1 + 0.6 * (1 - since / 0.25) : 1;
    meshRef.current.scale.setScalar(punch);
  });

  const handleHit = (e) => {
    e.stopPropagation();
    punchAt.current = performance.now();
    const worldPos = new THREE.Vector3();
    e.object.getWorldPosition(worldPos);
    onHit(worldPos, '#67e8f9');
  };

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Octahedron
        ref={meshRef}
        args={[scale, 0]}
        position={position}
        onPointerDown={handleHit}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <meshStandardMaterial
          color="#c084fc"
          emissive="#aa3bff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.4}
        />
      </Octahedron>
    </Float>
  );
};

const DriftingShards = ({ onHit }) => {
  const shards = useMemo(
    () =>
      new Array(6).fill(0).map(() => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          -6 - Math.random() * 4,
        ],
        scale: 0.15 + Math.random() * 0.2,
        speed: 1 + Math.random(),
      })),
    []
  );

  return (
    <>
      {shards.map((s, i) => (
        <Shard key={i} {...s} onHit={onHit} />
      ))}
    </>
  );
};

// ---------------------------------------------------------------------
// Scene root: owns the list of active bullet bursts so any shape can
// trigger one on touch, and each burst removes itself when it's done.
// ---------------------------------------------------------------------
const AnimatedShapes = () => {
  const [bursts, setBursts] = useState([]);
  const nextId = useRef(0);

  const triggerBurst = useCallback((position, color) => {
    const id = nextId.current++;
    setBursts((prev) => [...prev, { id, position: position.clone(), color }]);
  }, []);

  const removeBurst = useCallback((id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <>
      <Environment preset="night" />
      <CrystalCore onHit={triggerBurst} />
      <GlassKnot onHit={triggerBurst} />
      <DriftingShards onHit={triggerBurst} />
      <Sparkles count={60} scale={[10, 6, 6]} size={2} speed={0.3} color="#67e8f9" opacity={0.5} />
      {bursts.map((b) => (
        <BulletBurst key={b.id} id={b.id} position={b.position} color={b.color} onDone={removeBurst} />
      ))}
    </>
  );
};

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-4, -2, 2]} intensity={1.2} color="#aa3bff" />
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
