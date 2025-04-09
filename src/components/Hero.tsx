
import React, { useEffect, useRef } from 'react';
import { Circuit, Code, Cpu, Database, Server } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={heroRef} className="bg-white relative overflow-hidden">
      {/* Floating tech icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] animate-float text-primary/20">
          <Code size={48} />
        </div>
        <div className="absolute top-[20%] left-[80%] animate-float animation-delay-1000 text-primary/20">
          <Circuit size={48} />
        </div>
        <div className="absolute top-[60%] left-[20%] animate-float animation-delay-2000 text-primary/20">
          <Cpu size={48} />
        </div>
        <div className="absolute top-[70%] left-[70%] animate-float animation-delay-3000 text-primary/20">
          <Database size={48} />
        </div>
        <div className="absolute top-[40%] left-[50%] animate-float animation-delay-4000 text-primary/20">
          <Server size={48} />
        </div>
      </div>
      
      <div className="container-custom min-h-[90vh] flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll">
            JimmyDev - Soluções para seus negócios
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 animate-on-scroll" style={{animationDelay: '200ms'}}>
            Transforme sua visão em <span className="gradient-text">tecnologia poderosa</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral/80 mb-8 animate-on-scroll" style={{animationDelay: '400ms'}}>
            Desenvolvimento de aplicativos, softwares e plataformas sob medida para alavancar seus resultados
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll" style={{animationDelay: '600ms'}}>
            <a href="#contact" className="btn-primary">
              Quero meu projeto personalizado
            </a>
            <a href="#simulator" className="btn-outline">
              Experimente o simulador
            </a>
          </div>
        </div>
        
        <div className="mt-16 animate-on-scroll" style={{animationDelay: '800ms'}}>
          <div className="bg-gradient-to-b from-white/0 to-white/80 py-6 rounded-lg text-center">
            <p className="text-neutral/60 mb-2">Confiado por empresas de todos os tamanhos</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-neutral/40 font-bold text-xl">EMPRESA A</div>
              <div className="text-neutral/40 font-bold text-xl">EMPRESA B</div>
              <div className="text-neutral/40 font-bold text-xl">EMPRESA C</div>
              <div className="text-neutral/40 font-bold text-xl">EMPRESA D</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
