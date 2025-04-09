
import React, { useRef, useEffect } from 'react';

export const IntermediateCta: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

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

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section ref={ctaRef} className="py-16 bg-primary text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-on-scroll">
          Pronto para dar o próximo passo tecnológico?
        </h2>
        <div className="animate-on-scroll" style={{ animationDelay: '200ms' }}>
          <button
            onClick={() => {
              const form = document.querySelector('.floating-form button');
              if (form instanceof HTMLElement) {
                form.click();
              }
            }}
            className="btn-secondary"
          >
            Agendar consultoria grátis →
          </button>
        </div>
      </div>
    </section>
  );
};

export const FinalCta: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

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

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" ref={ctaRef} className="section-padding bg-neutral text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
          Sua revolução digital começa aqui
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 opacity-80 animate-on-scroll" style={{ animationDelay: '200ms' }}>
          Transforme sua visão em realidade com soluções tecnológicas sob medida 
          que impulsionam seus resultados e abrem novas possibilidades para seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => {
              const form = document.querySelector('.floating-form button');
              if (form instanceof HTMLElement) {
                form.click();
              }
            }}
            className="bg-white text-primary hover:bg-white/90 font-semibold py-3 px-6 rounded-lg transition-all"
          >
            Quero meu projeto personalizado
          </button>
          <a href="#" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-all">
            Ver portfólio completo
          </a>
        </div>
      </div>
    </section>
  );
};
