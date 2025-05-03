
import React, { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Database, Server, CircuitBoard, Smartphone, Laptop, LineChart, BarChart3, PieChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'breaking' | 'pieces' | 'rebuilding'>('idle');
  
  // Create references for logo pieces
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  
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

  // Handle logo click to start the animation
  const handleLogoClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationPhase('breaking');
    
    const animationSequence = async () => {
      // Breaking phase
      await new Promise(resolve => setTimeout(resolve, 500));
      setAnimationPhase('pieces');
      
      // Pieces scattered phase
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationPhase('rebuilding');
      
      // Rebuilding phase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnimationPhase('idle');
      setIsAnimating(false);
    };
    
    animationSequence();
  };

  // Enhanced 3D Logo animation effect with improved performance and effects
  useEffect(() => {
    if (!logoRef.current || isMobile || isAnimating) return;

    const logo = logoRef.current;
    
    // Initialize rotation values
    let rotateX = 0;
    let rotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let rotateZ = 0;
    let scale = 1;
    let targetScale = 1;
    
    // Function to handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const distanceX = (e.clientX - centerX) / (window.innerWidth / 2);
      const distanceY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Set target rotation based on mouse position
      targetRotateY = distanceX * 25; // Increased to 25 degrees for more dramatic effect
      targetRotateX = -distanceY * 20; // Increased to 20 degrees
      
      // Set target scale for zoom effect
      const distanceFromCenter = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      targetScale = 1 + Math.max(0, 0.15 - distanceFromCenter * 0.1); // Scale up to 1.15x, reducing as you move away
    };
    
    // Add slight continuous rotation for more dynamic effect when not interacting
    let angle = 0;
    
    // Animation loop for smooth rotation
    const animateLogo = () => {
      // Smoothly interpolate current rotation to target rotation
      rotateX += (targetRotateX - rotateX) * 0.1;
      rotateY += (targetRotateY - rotateY) * 0.1;
      scale += (targetScale - scale) * 0.1;
      
      // Add continuous subtle rotation on Z axis
      angle += 0.005;
      rotateZ = Math.sin(angle) * 5; // Subtle 5 degree rotation on Z axis
      
      // Apply the transformation with enhanced perspective and effects
      logo.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      
      // Dynamic drop shadow based on rotation
      const shadowX = rotateY * 0.5; // Shadow moves opposite to tilt
      const shadowY = rotateX * 0.5;
      const shadowBlur = 10 + Math.abs(rotateX) * 0.8 + Math.abs(rotateY) * 0.8;
      const shadowOpacity = 0.2 + Math.abs(rotateY) * 0.01 + Math.abs(rotateX) * 0.01;
      
      logo.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}))`;
      
      // Add subtle color shift effect based on angle
      const hue = 200 + Math.sin(angle) * 20; // Shift between blue tones
      const saturationBoost = Math.abs(rotateY) * 0.5; // More saturated colors with tilting
      
      logo.style.boxShadow = `0 0 30px rgba(0, 100, 255, ${0.1 + Math.abs(Math.sin(angle) * 0.1)})`;
      logo.style.border = `1px solid rgba(255, 255, 255, ${0.1 + Math.abs(Math.sin(angle * 2) * 0.1)})`;
      
      requestAnimationFrame(animateLogo);
    };
    
    // Start the animation loop
    const animationFrame = requestAnimationFrame(animateLogo);
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects specifically for the logo
    const handleMouseEnter = () => {
      targetScale = 1.2; // Bigger zoom on direct hover
      logo.style.transition = "all 0.3s ease-out";
    };
    
    const handleMouseLeave = () => {
      targetScale = 1;
      logo.style.transition = "all 0.5s ease-out";
    };
    
    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile, isAnimating]);

  // Special mobile-only 3D effects
  useEffect(() => {
    if (!logoRef.current || !isMobile || isAnimating) return;
    
    const logo = logoRef.current;
    let angle = 0;
    
    // Simplified animation for mobile to conserve performance
    const animateMobileLogo = () => {
      angle += 0.01;
      
      const rotateX = Math.sin(angle) * 10;
      const rotateY = Math.cos(angle) * 10;
      const scale = 1 + Math.sin(angle * 0.5) * 0.05;
      
      logo.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      logo.style.filter = `drop-shadow(0 ${5 + Math.abs(rotateX)}px ${10 + Math.abs(rotateY)}px rgba(0,0,0,0.3))`;
      
      requestAnimationFrame(animateMobileLogo);
    };
    
    const animationFrame = requestAnimationFrame(animateMobileLogo);
    
    // Handle device orientation for mobile tilt effect
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
        const tiltX = Math.min(Math.max(e.beta - 45, -20), 20); // Convert to reasonable range
        const tiltY = Math.min(Math.max(e.gamma, -20), 20);
        
        logo.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        logo.style.filter = `drop-shadow(${tiltY * 0.5}px ${tiltX * 0.5}px ${10}px rgba(0,0,0,0.3))`;
      }
    };
    
    // Try to use device orientation if available
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    return () => {
      cancelAnimationFrame(animationFrame);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [isMobile, isAnimating]);

  // Create explosion animation
  const renderLogo = () => {
    const logoSrc = "/lovable-uploads/35f90851-3845-49d7-bf24-cbdccf2974b6.png";
    
    if (animationPhase === 'idle' || animationPhase === 'breaking') {
      const scaleClass = animationPhase === 'breaking' ? 'scale-110' : '';
      const blurClass = animationPhase === 'breaking' ? 'blur-sm' : '';
      
      return (
        <img 
          ref={logoRef}
          src={logoSrc}
          alt="JimmyDev Logo" 
          className={`h-20 sm:h-24 md:h-32 lg:h-40 w-auto transition-all duration-300 cursor-pointer ${scaleClass} ${blurClass}`}
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            borderRadius: '20%',
            transform: isMobile ? 'perspective(1200px)' : 'none',
          }}
          onClick={handleLogoClick}
        />
      );
    } else if (animationPhase === 'pieces' || animationPhase === 'rebuilding') {
      // Calculate positions for the pieces
      const isRebuilding = animationPhase === 'rebuilding';
      
      // Piece positions when scattered
      const scatteredPositions = {
        topLeft: { x: -100, y: -80, rotate: -45 },
        topRight: { x: 100, y: -60, rotate: 30 },
        bottomLeft: { x: -80, y: 100, rotate: 60 },
        bottomRight: { x: 70, y: 80, rotate: -30 }
      };
      
      // Initial/final positions when assembled
      const assembledPositions = {
        topLeft: { x: 0, y: 0, rotate: 0 },
        topRight: { x: 0, y: 0, rotate: 0 },
        bottomLeft: { x: 0, y: 0, rotate: 0 },
        bottomRight: { x: 0, y: 0, rotate: 0 }
      };
      
      // Calculate current positions based on animation phase
      const positions = isRebuilding ? assembledPositions : scatteredPositions;
      const transitionDuration = isRebuilding ? '0.8s' : '0.5s';
      const transitionDelay = isRebuilding ? '0s' : '0.2s';
      
      return (
        <div className="relative" style={{ height: '10rem', width: '10rem' }}>
          {/* Top Left Piece */}
          <div 
            ref={topLeftRef}
            className="absolute w-1/2 h-1/2 overflow-hidden transition-all"
            style={{
              top: 0,
              left: 0,
              transform: `translate(${positions.topLeft.x}px, ${positions.topLeft.y}px) rotate(${positions.topLeft.rotate}deg)`,
              transitionDuration,
              transitionDelay: isRebuilding ? '0s' : '0s',
              zIndex: 10
            }}
          >
            <img 
              src={logoSrc} 
              alt="Logo Piece" 
              className="absolute object-cover w-[200%] h-[200%]" 
              style={{
                top: 0,
                left: 0,
                clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)'
              }}
            />
          </div>
          
          {/* Top Right Piece */}
          <div 
            ref={topRightRef}
            className="absolute w-1/2 h-1/2 overflow-hidden transition-all"
            style={{
              top: 0,
              left: '50%',
              transform: `translate(${positions.topRight.x}px, ${positions.topRight.y}px) rotate(${positions.topRight.rotate}deg)`,
              transitionDuration,
              transitionDelay: isRebuilding ? '0.1s' : '0.1s',
              zIndex: 20
            }}
          >
            <img 
              src={logoSrc} 
              alt="Logo Piece" 
              className="absolute object-cover w-[200%] h-[200%]" 
              style={{
                top: 0,
                left: '-100%',
                clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)'
              }}
            />
          </div>
          
          {/* Bottom Left Piece */}
          <div 
            ref={bottomLeftRef}
            className="absolute w-1/2 h-1/2 overflow-hidden transition-all"
            style={{
              top: '50%',
              left: 0,
              transform: `translate(${positions.bottomLeft.x}px, ${positions.bottomLeft.y}px) rotate(${positions.bottomLeft.rotate}deg)`,
              transitionDuration,
              transitionDelay: isRebuilding ? '0.2s' : '0.15s',
              zIndex: 30
            }}
          >
            <img 
              src={logoSrc} 
              alt="Logo Piece" 
              className="absolute object-cover w-[200%] h-[200%]" 
              style={{
                top: '-100%',
                left: 0,
                clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)'
              }}
            />
          </div>
          
          {/* Bottom Right Piece */}
          <div 
            ref={bottomRightRef}
            className="absolute w-1/2 h-1/2 overflow-hidden transition-all"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(${positions.bottomRight.x}px, ${positions.bottomRight.y}px) rotate(${positions.bottomRight.rotate}deg)`,
              transitionDuration,
              transitionDelay: isRebuilding ? '0.3s' : '0.2s',
              zIndex: 40
            }}
          >
            <img 
              src={logoSrc} 
              alt="Logo Piece" 
              className="absolute object-cover w-[200%] h-[200%]" 
              style={{
                top: '-100%',
                left: '-100%',
                clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)'
              }}
            />
          </div>
          
          {/* Click hint */}
          {(animationPhase === 'pieces' && !isMobile) && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-xs text-gray-500 whitespace-nowrap">
              Clique para montar
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div ref={heroRef} className="bg-white relative overflow-hidden">
      {/* Professional 3D floating tech icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] animate-float perspective-icon text-secondary/15">
          <Code size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[20%] left-[80%] animate-float animation-delay-1000 perspective-icon text-secondary/15">
          <CircuitBoard size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[60%] left-[20%] animate-float animation-delay-2000 perspective-icon text-secondary/15">
          <Cpu size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[70%] left-[70%] animate-float animation-delay-3000 perspective-icon text-secondary/15">
          <Database size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[40%] left-[50%] animate-float animation-delay-4000 perspective-icon text-secondary/15">
          <Server size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[30%] left-[30%] animate-float animation-delay-2500 perspective-icon text-secondary/15">
          <Smartphone size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[50%] left-[85%] animate-float animation-delay-3500 perspective-icon text-secondary/15">
          <Laptop size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[15%] left-[55%] animate-float animation-delay-1800 perspective-icon text-secondary/15">
          <BarChart3 size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[45%] left-[15%] animate-float animation-delay-2700 perspective-icon text-secondary/15">
          <LineChart size={isMobile ? 32 : 48} />
        </div>
        <div className="absolute top-[65%] left-[45%] animate-float animation-delay-3200 perspective-icon text-secondary/15">
          <PieChart size={isMobile ? 32 : 48} />
        </div>
      </div>
      
      <div className="container-custom min-h-[90vh] flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6 animate-on-scroll">
            <div className="relative">
              {renderLogo()}
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 animate-on-scroll" style={{animationDelay: '200ms'}}>
            Transforme sua visão em <span className="gradient-text">tecnologia poderosa</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral/80 mb-6 md:mb-8 animate-on-scroll px-4 sm:px-0" style={{animationDelay: '400ms'}}>
            Desenvolvimento de aplicativos, softwares e plataformas sob medida para alavancar seus resultados e impulsionar sua empresa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 animate-on-scroll px-4 sm:px-0" style={{animationDelay: '600ms'}}>
            <a href="#contact" className="btn-primary text-sm md:text-base py-2 md:py-3">
              Solicitar consultoria especializada
            </a>
            <a href="#simulator" className="btn-outline text-sm md:text-base py-2 md:py-3 mt-3 sm:mt-0">
              Experimentar simulador
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
