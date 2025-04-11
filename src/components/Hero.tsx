
import React, { useEffect, useRef } from 'react';
import { Code, Cpu, Database, Server, CircuitBoard, Smartphone, Laptop, LineChart, BarChart3, PieChart } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

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

  // Enhanced 3D Logo animation effect
  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;
    
    // Initialize rotation values
    let rotateX = 0;
    let rotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let rotateZ = 0;
    
    // Function to handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const distanceX = (e.clientX - centerX) / (window.innerWidth / 2);
      const distanceY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Set target rotation based on mouse position
      targetRotateY = distanceX * 20; // Increased from 15 to 20 degrees for more dramatic effect
      targetRotateX = -distanceY * 15; // Increased from 10 to 15 degrees
    };
    
    // Add slight continuous rotation for more dynamic effect when not interacting
    let angle = 0;
    
    // Animation loop for smooth rotation
    const animateLogo = () => {
      // Smoothly interpolate current rotation to target rotation
      rotateX += (targetRotateX - rotateX) * 0.1;
      rotateY += (targetRotateY - rotateY) * 0.1;
      
      // Add continuous subtle rotation on Z axis
      angle += 0.005;
      rotateZ = Math.sin(angle) * 5; // Subtle 5 degree rotation on Z axis
      
      // Apply the transformation with enhanced perspective
      logo.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      logo.style.filter = `drop-shadow(0 ${5 + Math.abs(rotateX) / 2}px ${10 + Math.abs(rotateY)}px rgba(0,0,0,0.2))`;
      
      requestAnimationFrame(animateLogo);
    };
    
    // Start the animation loop
    const animationFrame = requestAnimationFrame(animateLogo);
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
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
            <div className="relative">
              <img 
                ref={logoRef}
                src="/lovable-uploads/35f90851-3845-49d7-bf24-cbdccf2974b6.png" 
                alt="JimmyDev Logo" 
                className="h-32 md:h-40 w-auto transition-transform duration-300"
                style={{ 
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
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

