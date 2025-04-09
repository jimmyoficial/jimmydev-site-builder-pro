
import React, { useRef, useEffect } from 'react';
import { Zap, Rocket, Headphones, ShieldCheck, TrendingUp } from 'lucide-react';

interface DifferentialItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const DifferentialItem: React.FC<DifferentialItemProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="flex items-start gap-4 animate-on-scroll group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 perspective-icon group-hover:rotate-3d transition-all duration-500">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-neutral/70">{description}</p>
      </div>
    </div>
  );
};

export const Differentials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el) => el.classList.add('active'));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="differentials" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-primary/20 animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full bg-primary/10 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-primary/30 animate-float animation-delay-3000"></div>
        
        {/* 3D Cube */}
        <div className="absolute top-[20%] right-[10%] animate-float animation-delay-1500 perspective-icon">
          <div className="cube">
            <div className="cube-face cube-face-front"></div>
            <div className="cube-face cube-face-back"></div>
            <div className="cube-face cube-face-right"></div>
            <div className="cube-face cube-face-left"></div>
            <div className="cube-face cube-face-top"></div>
            <div className="cube-face cube-face-bottom"></div>
          </div>
        </div>
        
        {/* 3D Pyramid */}
        <div className="absolute bottom-[10%] right-[30%] animate-float animation-delay-2500 perspective-icon">
          <div className="pyramid">
            <div className="pyramid-face pyramid-face-front"></div>
            <div className="pyramid-face pyramid-face-right"></div>
            <div className="pyramid-face pyramid-face-left"></div>
            <div className="pyramid-face pyramid-face-back"></div>
          </div>
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Por que ser mais um quando você pode ser único?
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Entregamos mais do que código – criamos soluções que impulsionam o crescimento 
            do seu negócio com metodologias comprovadas e suporte completo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <DifferentialItem 
            icon={<Zap size={28} className="transition-all duration-300 group-hover:scale-110" />}
            title="Metodologia Agile"
            description="Desenvolvimento iterativo que permite visualizar resultados rapidamente e adaptar conforme o feedback, reduzindo riscos e aumentando a qualidade final."
            delay={0}
          />
          <DifferentialItem 
            icon={<Rocket size={28} className="transition-all duration-300 group-hover:scale-110" />}
            title="Prototipagem rápida"
            description="Criamos protótipos funcionais de alta fidelidade antes do desenvolvimento completo, permitindo validar conceitos e experiências com usuários reais."
            delay={200}
          />
          <DifferentialItem 
            icon={<Headphones size={28} className="transition-all duration-300 group-hover:scale-110" />}
            title="Suporte 24/7"
            description="Nossa equipe de suporte está disponível todos os dias para garantir que suas soluções estejam sempre funcionando perfeitamente, sem interrupções."
            delay={400}
          />
          <DifferentialItem 
            icon={<ShieldCheck size={28} className="transition-all duration-300 group-hover:scale-110" />}
            title="Segurança GDPR"
            description="Implementamos os mais altos padrões de segurança e conformidade com LGPD/GDPR em todos os projetos, protegendo dados sensíveis e a privacidade dos usuários."
            delay={600}
          />
          <DifferentialItem 
            icon={<TrendingUp size={28} className="transition-all duration-300 group-hover:scale-110" />}
            title="Escalabilidade garantida"
            description="Arquiteturas projetadas para crescer: suas aplicações funcionarão perfeitamente mesmo com aumento significativo de usuários e dados."
            delay={800}
          />
        </div>
      </div>
    </section>
  );
};
