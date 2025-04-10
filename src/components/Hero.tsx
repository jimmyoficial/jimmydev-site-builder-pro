
import React, { useEffect, useRef } from 'react';
import { Code, Cpu, Database, Server, CircuitBoard, Smartphone, Laptop, LineChart, BarChart3, PieChart } from 'lucide-react';

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
      {/* Professional 3D floating tech icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] animate-float perspective-icon text-secondary/15">
          <Code size={48} />
        </div>
        <div className="absolute top-[20%] left-[80%] animate-float animation-delay-1000 perspective-icon text-secondary/15">
          <CircuitBoard size={48} />
        </div>
        <div className="absolute top-[60%] left-[20%] animate-float animation-delay-2000 perspective-icon text-secondary/15">
          <Cpu size={48} />
        </div>
        <div className="absolute top-[70%] left-[70%] animate-float animation-delay-3000 perspective-icon text-secondary/15">
          <Database size={48} />
        </div>
        <div className="absolute top-[40%] left-[50%] animate-float animation-delay-4000 perspective-icon text-secondary/15">
          <Server size={48} />
        </div>
        <div className="absolute top-[30%] left-[30%] animate-float animation-delay-2500 perspective-icon text-secondary/15">
          <Smartphone size={48} />
        </div>
        <div className="absolute top-[50%] left-[85%] animate-float animation-delay-3500 perspective-icon text-secondary/15">
          <Laptop size={48} />
        </div>
        <div className="absolute top-[15%] left-[55%] animate-float animation-delay-1800 perspective-icon text-secondary/15">
          <BarChart3 size={48} />
        </div>
        <div className="absolute top-[45%] left-[15%] animate-float animation-delay-2700 perspective-icon text-secondary/15">
          <LineChart size={48} />
        </div>
        <div className="absolute top-[65%] left-[45%] animate-float animation-delay-3200 perspective-icon text-secondary/15">
          <PieChart size={48} />
        </div>
      </div>
      
      <div className="container-custom min-h-[90vh] flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6 animate-on-scroll">
            <img 
              src="/lovable-uploads/35f90851-3845-49d7-bf24-cbdccf2974b6.png" 
              alt="JimmyDev Logo" 
              className="h-32 md:h-40 w-auto"
            />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 animate-on-scroll" style={{animationDelay: '200ms'}}>
            Transforme sua visão em <span className="gradient-text">tecnologia poderosa</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral/80 mb-8 animate-on-scroll" style={{animationDelay: '400ms'}}>
            Desenvolvimento de aplicativos, softwares e plataformas sob medida para alavancar seus resultados e impulsionar sua empresa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll" style={{animationDelay: '600ms'}}>
            <a href="#contact" className="btn-primary">
              Solicitar consultoria especializada
            </a>
            <a href="#simulator" className="btn-outline">
              Experimentar simulador
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
