import React, { useState, useRef } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { Send, Mail, MapPin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Stars } from '@react-three/drei';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

// Interactive 3D Wireframe Globe
const WireframeEarth = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[2.5, 32, 32]}>
          <meshBasicMaterial color="#aa3bff" wireframe transparent opacity={0.15} />
        </Sphere>
        {/* Abstract Location Pin */}
        <group position={[1.8, 1, 1.3]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Spotlight effect for the form
  const formRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const { left, top } = formRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thanks for reaching out! (Demo)");
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <SectionWrapper id="contact" className="bg-[#050505] relative min-h-screen flex items-center overflow-hidden py-24">
      {/* 3D Background specifically for Contact section */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
          <group position={[-3, 0, -2]}>
            <WireframeEarth />
          </group>
        </Canvas>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Typography & Info */}
          <div className="space-y-10">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[1px] bg-primary"></span>
                05. What's Next?
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-heading font-semibold text-white mb-6 leading-tight">
                Let's build <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  something amazing.
                </span>
              </h2>
              <p className="text-foreground/60 text-lg font-light max-w-md leading-relaxed">
                Whether you have a groundbreaking idea, a project that needs a senior architect, or just want to say hi, I'm always open to discussing new opportunities.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/5">
              <motion.a 
                href="mailto:shloksuthar25@gmail.com"
                whileHover={{ x: 10 }}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0a0510] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 font-mono tracking-wider mb-1 uppercase">Drop an email</p>
                  <p className="text-lg md:text-xl font-medium text-white group-hover:text-primary transition-colors">shloksuthar25@gmail.com</p>
                </div>
              </motion.a>
              
              <motion.div 
                whileHover={{ x: 10 }}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0a0510] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 font-mono tracking-wider mb-1 uppercase">Current Location</p>
                  <p className="text-lg md:text-xl font-medium text-white">Ahmedabad, India</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="relative">
            <motion.form 
              ref={formRef}
              onMouseMove={handleMouseMove}
              onSubmit={handleSubmit} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative p-8 md:p-12 rounded-3xl bg-[#0a0510]/80 backdrop-blur-xl border border-white/10 flex flex-col gap-6 shadow-2xl overflow-hidden"
            >
              {/* Hover Spotlight */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      600px circle at ${mouseX}px ${mouseY}px,
                      rgba(170, 59, 255, 0.15),
                      transparent 80%
                    )
                  `,
                }}
              />

              <div className="relative z-10 flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/60 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/80 focus:bg-white/10 transition-all placeholder:text-foreground/20 font-light"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/60 ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/80 focus:bg-white/10 transition-all placeholder:text-foreground/20 font-light"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/60 ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/80 focus:bg-white/10 transition-all placeholder:text-foreground/20 font-light resize-none"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 w-full py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};
