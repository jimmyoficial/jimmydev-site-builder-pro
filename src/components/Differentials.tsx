
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
      className="flex items-start gap-4 animate-on-scroll"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
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
    <section id="differentials" ref={sectionRef} className="section-padding">
      <div className="container-custom">
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
            icon={<Zap size={24} />}
            title="Metodologia Agile"
            description="Desenvolvimento iterativo que permite visualizar resultados rapidamente e adaptar conforme o feedback, reduzindo riscos e aumentando a qualidade final."
            delay={0}
          />
          <DifferentialItem 
            icon={<Rocket size={24} />}
            title="Prototipagem rápida"
            description="Criamos protótipos funcionais de alta fidelidade antes do desenvolvimento completo, permitindo validar conceitos e experiências com usuários reais."
            delay={200}
          />
          <DifferentialItem 
            icon={<Headphones size={24} />}
            title="Suporte 24/7"
            description="Nossa equipe de suporte está disponível todos os dias para garantir que suas soluções estejam sempre funcionando perfeitamente, sem interrupções."
            delay={400}
          />
          <DifferentialItem 
            icon={<ShieldCheck size={24} />}
            title="Segurança GDPR"
            description="Implementamos os mais altos padrões de segurança e conformidade com LGPD/GDPR em todos os projetos, protegendo dados sensíveis e a privacidade dos usuários."
            delay={600}
          />
          <DifferentialItem 
            icon={<TrendingUp size={24} />}
            title="Escalabilidade garantida"
            description="Arquiteturas projetadas para crescer: suas aplicações funcionarão perfeitamente mesmo com aumento significativo de usuários e dados."
            delay={800}
          />
        </div>
      </div>
    </section>
  );
};
