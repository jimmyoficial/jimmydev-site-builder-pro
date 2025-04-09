
import React, { useRef, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FaqSection: React.FC = () => {
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
    <section id="faq" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Tecnologia sem mistérios
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Respondemos às dúvidas mais comuns sobre nossos processos e serviços 
            para que você possa tomar decisões informadas sobre seu projeto.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto animate-on-scroll" style={{ animationDelay: '400ms' }}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6 py-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Quanto tempo leva para desenvolver um aplicativo ou plataforma?
              </AccordionTrigger>
              <AccordionContent className="text-neutral/70 pt-2">
                O tempo de desenvolvimento varia de acordo com a complexidade e escopo do projeto. 
                Aplicativos simples podem levar de 2 a 3 meses, enquanto plataformas mais complexas 
                podem exigir 4 a 8 meses. Durante nossa consultoria inicial, apresentamos um 
                cronograma detalhado baseado nos seus requisitos específicos.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6 py-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Como funciona a política de revisões e ajustes?
              </AccordionTrigger>
              <AccordionContent className="text-neutral/70 pt-2">
                Trabalhamos com sprints de desenvolvimento seguindo a metodologia Agile. 
                Ao final de cada sprint, apresentamos os resultados e coletamos feedback. 
                Nossos contratos incluem até três ciclos de revisão por entrega, 
                garantindo alinhamento com suas expectativas sem custos adicionais.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6 py-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Quais tecnologias são utilizadas nos projetos?
              </AccordionTrigger>
              <AccordionContent className="text-neutral/70 pt-2">
                Utilizamos tecnologias modernas e comprovadas que garantem performance e escalabilidade. 
                Para desenvolvimento mobile: React Native, Flutter, Swift e Kotlin. 
                Para web: React, Next.js, Node.js e Python. 
                Para bancos de dados: MongoDB, PostgreSQL e Firebase. 
                Adaptamos nossa stack às necessidades específicas de cada projeto.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6 py-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Quais são os modelos de contrato disponíveis?
              </AccordionTrigger>
              <AccordionContent className="text-neutral/70 pt-2">
                Oferecemos três principais modelos: 
                Projeto Fechado (escopo e orçamento fixos), 
                Time & Materials (pagamento baseado em horas trabalhadas, ideal para projetos com escopo flexível), 
                e Retainer (contrato contínuo para manutenção e melhorias). 
                Durante a consultoria, recomendamos o modelo mais adequado para seu caso.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6 py-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Como funciona o suporte após o lançamento?
              </AccordionTrigger>
              <AccordionContent className="text-neutral/70 pt-2">
                Todos os projetos incluem 30 dias de suporte gratuito após o lançamento. 
                Após esse período, oferecemos planos de manutenção mensais que garantem 
                monitoramento, correções de bugs, atualizações de segurança e pequenas melhorias. 
                Para evoluções mais significativas, trabalhamos com contratos de desenvolvimento contínuo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
