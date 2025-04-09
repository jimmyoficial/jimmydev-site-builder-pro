
import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration: number;
  label: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-neutral/80">{label}</div>
    </div>
  );
};

export const SocialProof: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <Counter end={150} duration={2000} label="Projetos entregues" suffix="+" />
          <Counter end={98} duration={2000} label="Clientes satisfeitos" suffix="%" />
          <Counter end={12} duration={2000} label="Anos de experiência" />
          <Counter end={24} duration={2000} label="Profissionais" />
        </div>
      </div>
    </section>
  );
};
