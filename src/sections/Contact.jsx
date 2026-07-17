import React, { useState } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { Send, Mail, MapPin } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally handle form submission here
    console.log("Form submitted", formData);
    alert("Thanks for reaching out! (Demo)");
  };

  return (
    <SectionWrapper id="contact" className="bg-[#0a0510] relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div className="space-y-8 reveal-up opacity-0">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">05. What's Next?</span>
              <h2 className="text-5xl md:text-7xl font-heading font-semibold text-white mb-6">
                Let's work together.
              </h2>
              <p className="text-foreground/70 text-lg font-light max-w-md">
                I'm currently available for freelance work and open to new opportunities. Send me a message and let's craft something amazing.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-mono">Email</p>
                  <a href="mailto:shloksuthar25@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">shloksuthar25@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-mono">Location</p>
                  <p className="text-lg font-medium">Ahmdabad,India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-up opacity-0 transform translate-y-8">
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/70">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30 font-light"
                  placeholder="shlok suthar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/70">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30 font-light"
                  placeholder="shlok@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/70">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30 font-light resize-none"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="hoverable w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};
