import React, { useEffect, useState, useRef } from 'react';
import { fetchGithubRepos } from '../utils/github';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchGithubRepos();
      setRepos(data);
      setLoading(false);
    };
    loadRepos();
  }, []);

  useGSAP(() => {
    if (!loading && repos.length > 0) {
      const slider = sliderRef.current;
      
      // Calculate how far to scroll. 
      // The total width of all panels minus the viewport width.
      const getScrollAmount = () => {
        let sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth);
      };

      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${slider.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
      
      // Reveal the title
      gsap.fromTo('.project-title', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [loading, repos]);

  return (
    <section id="projects" ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden">
      <div className="absolute top-24 left-6 md:left-24 z-10 project-title">
        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">02. Selected Works</span>
        <h2 className="text-5xl md:text-7xl font-heading font-semibold text-white">
          Showcase.
        </h2>
      </div>

      <div className="absolute top-0 h-full flex items-center pt-24" ref={sliderRef}>
        <div className="flex gap-8 px-6 md:px-24">
          {loading ? (
             <div className="text-white">Fetching projects...</div>
          ) : (
            repos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ repo, index }) => {
  return (
    <div className="w-[300px] md:w-[450px] h-[500px] md:h-[600px] glass rounded-3xl p-8 flex flex-col justify-between flex-shrink-0 group relative overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-500">
      
      {/* Background image mockup (since we don't have real preview images from GH API easily) */}
      <div className="absolute top-0 right-0 p-8 text-9xl font-heading font-bold text-white/5 right-12 bottom-12 z-0 pointer-events-none select-none">
        0{index + 1}
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <FaGithub className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full items-center gap-1 text-sm font-medium">
            <Star className="w-4 h-4" />
            {repo.stargazers_count}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mt-8 group-hover:text-primary transition-colors">
          {repo.name.replace(/-/g, ' ')}
        </h3>

        <p className="text-foreground/70 text-base leading-relaxed line-clamp-4">
          {repo.description || "No description provided for this repository."}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-6 mt-auto">
        <div className="flex flex-wrap gap-2">
          {repo.topics?.slice(0, 3).map(topic => (
            <span key={topic} className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 text-foreground/80">
              {topic}
            </span>
          ))}
          {(!repo.topics || repo.topics.length === 0) && repo.language && (
            <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 text-foreground/80">
              {repo.language}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="hoverable flex-1 flex justify-center items-center gap-2 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            Source Code
          </a>
          {repo.homepage ? (
             <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="hoverable w-12 h-12 flex justify-center items-center border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
