
import React, { useEffect, useRef } from 'react';
import { Smartphone, Database, Globe, Share2, BarChart } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 card-hover animate-on-scroll" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral/70">{description}</p>
    </div>
  );
};

export const Services: React.FC = () => {
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
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Do conceito à realidade digital
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Transformamos suas ideias em soluções digitais robustas e escaláveis, 
            acompanhando cada etapa do desenvolvimento com excelência técnica e foco em resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Smartphone size={24} />}
            title="Aplicativos móveis (iOS/Android)"
            description="Crie experiências mobile imersivas e de alta performance para seus usuários, com design intuitivo e funcionalidades avançadas."
            delay={0}
          />
          <ServiceCard
            icon={<Database size={24} />}
            title="Sistemas corporativos"
            description="Automatize processos internos com sistemas sob medida que aumentam a produtividade e reduzem custos operacionais."
            delay={200}
          />
          <ServiceCard
            icon={<Globe size={24} />}
            title="Plataformas web escaláveis"
            description="Desenvolva soluções web que crescem junto com seu negócio, garantindo performance mesmo com milhões de usuários."
            delay={400}
          />
          <ServiceCard
            icon={<Share2 size={24} />}
            title="Integrações API"
            description="Conecte seus sistemas com ferramentas externas e crie ecossistemas tecnológicos que ampliam as capacidades do seu negócio."
            delay={600}
          />
          <ServiceCard
            icon={<BarChart size={24} />}
            title="Manutenção evolutiva"
            description="Mantenha suas aplicações atualizadas e seguras com nossa equipe dedicada de suporte e desenvolvimento contínuo."
            delay={800}
          />
        </div>
      </div>
    </section>
  );
};
