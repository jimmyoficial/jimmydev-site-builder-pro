import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Award, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Gift,
  X
} from 'lucide-react';

const achievements = [
  { icon: Award, label: 'Prêmio Inovação 2024', color: 'text-yellow-600' },
  { icon: Users, label: '+1000 Clientes Satisfeitos', color: 'text-blue-600' },
  { icon: TrendingUp, label: '98% Taxa de Sucesso', color: 'text-green-600' },
  { icon: Zap, label: 'Entrega em 48h', color: 'text-purple-600' },
  { icon: Shield, label: 'Garantia Total', color: 'text-red-600' },
  { icon: Clock, label: 'Suporte 24/7', color: 'text-orange-600' }
];

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    company: 'TechCorp',
    role: 'CEO',
    content: 'Excelente trabalho! Nossa plataforma ficou perfeita e as vendas aumentaram 300%.',
    rating: 5,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'João Santos',
    company: 'StartupXYZ',
    role: 'Fundador',
    content: 'Profissionais incríveis. Entregaram tudo no prazo e superaram expectativas.',
    rating: 5,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Ana Costa',
    company: 'E-commerce Pro',
    role: 'Diretora',
    content: 'O app desenvolvido é fantástico. Interface linda e performance excelente.',
    rating: 5,
    image: '/placeholder.svg'
  }
];

const offers = [
  {
    id: 'consultation',
    title: 'Consultoria Gratuita',
    description: 'Análise completa do seu projeto + plano de desenvolvimento',
    value: 'R$ 500',
    highlight: 'GRÁTIS',
    cta: 'Agendar Agora',
    urgent: false
  },
  {
    id: 'discount',
    title: 'Desconto Especial',
    description: 'Para os primeiros 10 projetos este mês',
    value: '25% OFF',
    highlight: 'ÚLTIMAS VAGAS',
    cta: 'Garantir Desconto',
    urgent: true
  }
];

export const EnhancedVisuals: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show offer popup after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowOffer(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const FloatingBadges = () => (
    <div className="fixed bottom-4 left-4 z-40 space-y-2 animate-on-scroll">
      <div className="bg-green-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        <span className="text-sm font-medium">Online agora</span>
      </div>
      <div className="bg-primary text-primary-foreground px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
        <Users size={16} />
        <span className="text-sm">+50 projetos este mês</span>
      </div>
    </div>
  );

  const AchievementBadges = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-on-scroll">
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return (
          <Card 
            key={index} 
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 text-center">
              <Icon 
                size={32} 
                className={`mx-auto mb-2 group-hover:scale-110 transition-transform ${achievement.color}`} 
              />
              <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {achievement.label}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const TestimonialSlider = () => (
    <Card className="overflow-hidden animate-on-scroll bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="p-8">
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-500 ${
                index === currentTestimonial 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-0 transform translate-x-4 absolute inset-0'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentTestimonial ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const OfferPopup = () => {
    if (!showOffer) return null;

    const offer = offers[currentOffer];

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full animate-scale-in">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                {offer.urgent && (
                  <Badge variant="destructive" className="animate-pulse">
                    OFERTA URGENTE
                  </Badge>
                )}
                <h3 className="text-xl font-bold">{offer.title}</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowOffer(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-4">{offer.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-primary">{offer.highlight}</div>
              {offer.value && (
                <div className="text-sm text-muted-foreground line-through">{offer.value}</div>
              )}
            </div>

            {offer.urgent && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <Clock size={16} />
                  <span className="font-medium">Oferta expira em:</span>
                </div>
                <div className="text-2xl font-bold text-red-600 font-mono">
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}

            <Button className="w-full" size="lg">
              <Gift size={16} className="mr-2" />
              {offer.cta}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  const AnimatedCTA = () => (
    <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient-x rounded-xl p-8 text-white text-center animate-on-scroll">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Pronto para transformar seu negócio?</h3>
        <p className="text-white/90">
          Junte-se a centenas de empresas que já revolucionaram seus resultados
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="secondary"
            className="group animate-bounce hover:animate-none"
          >
            Começar Agora
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <CheckCircle size={16} />
            Consultoria gratuita incluída
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-background to-muted/20">
        <div className="container-custom space-y-16">
          {/* Achievement Badges */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-on-scroll">
                Reconhecimento e Excelência
              </h2>
              <p className="text-muted-foreground animate-on-scroll" style={{ animationDelay: '200ms' }}>
                Nossos resultados comprovados falam por si
              </p>
            </div>
            <AchievementBadges />
          </div>

          {/* Testimonial Slider */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-on-scroll">
                O que nossos clientes dizem
              </h2>
            </div>
            <TestimonialSlider />
          </div>

          {/* Animated CTA */}
          <AnimatedCTA />
        </div>
      </section>

      {/* Floating Elements */}
      <FloatingBadges />
      <OfferPopup />
    </>
  );
};