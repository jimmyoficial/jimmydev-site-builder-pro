import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, ShoppingBag, Camera, FileText, Truck, Utensils, Heart, Code } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  preview: React.ReactNode;
  popular?: boolean;
}

const categories = [
  { id: 'all', name: 'Todos', icon: Code },
  { id: 'institutional', name: 'Institucional', icon: Building2 },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingBag },
  { id: 'portfolio', name: 'Portfólio', icon: Camera },
  { id: 'blog', name: 'Blog/Notícias', icon: FileText },
  { id: 'delivery', name: 'Delivery', icon: Truck },
  { id: 'restaurant', name: 'Restaurante', icon: Utensils },
  { id: 'health', name: 'Saúde', icon: Heart },
];

const templates: Template[] = [
  {
    id: 'corp-modern',
    name: 'Corporativo Moderno',
    description: 'Template elegante para empresas de tecnologia e startups',
    category: 'institutional',
    image: '/placeholder.svg',
    features: ['Design responsivo', 'Seção de equipe', 'Portfolio integrado', 'Formulários de contato'],
    popular: true,
    preview: (
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-lg text-white text-xs">
        <div className="bg-white/20 rounded p-2 mb-2">
          <div className="h-2 bg-white/40 rounded mb-1"></div>
          <div className="h-1 bg-white/30 rounded w-2/3"></div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="h-8 bg-white/20 rounded"></div>
          <div className="h-8 bg-white/20 rounded"></div>
          <div className="h-8 bg-white/20 rounded"></div>
        </div>
      </div>
    )
  },
  {
    id: 'ecom-fashion',
    name: 'Loja de Moda',
    description: 'E-commerce otimizado para roupas e acessórios',
    category: 'ecommerce',
    image: '/placeholder.svg',
    features: ['Catálogo de produtos', 'Carrinho de compras', 'Pagamento integrado', 'Área do cliente'],
    preview: (
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-lg text-white text-xs">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="h-6 bg-white/20 rounded"></div>
          <div className="h-6 bg-white/20 rounded"></div>
        </div>
        <div className="h-1 bg-white/30 rounded mb-2"></div>
        <div className="grid grid-cols-4 gap-1">
          <div className="h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    )
  },
  {
    id: 'portfolio-creative',
    name: 'Portfólio Criativo',
    description: 'Showcase profissional para designers e artistas',
    category: 'portfolio',
    image: '/placeholder.svg',
    features: ['Galeria responsiva', 'Lightbox integrado', 'Bio profissional', 'Contato direto'],
    popular: true,
    preview: (
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-lg text-white text-xs">
        <div className="h-3 bg-white/20 rounded mb-2"></div>
        <div className="grid grid-cols-3 gap-1 mb-2">
          <div className="h-8 bg-white/30 rounded"></div>
          <div className="h-8 bg-white/20 rounded"></div>
          <div className="h-8 bg-white/25 rounded"></div>
        </div>
        <div className="h-1 bg-white/30 rounded w-1/2"></div>
      </div>
    )
  },
  {
    id: 'blog-news',
    name: 'Blog Profissional',
    description: 'Plataforma de conteúdo com CMS integrado',
    category: 'blog',
    image: '/placeholder.svg',
    features: ['Sistema de posts', 'Categorias', 'Comentários', 'Newsletter'],
    preview: (
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-lg text-white text-xs">
        <div className="h-2 bg-white/20 rounded mb-2"></div>
        <div className="space-y-1 mb-2">
          <div className="h-1 bg-white/30 rounded"></div>
          <div className="h-1 bg-white/25 rounded w-3/4"></div>
          <div className="h-1 bg-white/20 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="h-6 bg-white/20 rounded"></div>
          <div className="h-6 bg-white/15 rounded"></div>
        </div>
      </div>
    )
  },
  {
    id: 'delivery-app',
    name: 'App de Delivery',
    description: 'Aplicativo completo para delivery de comida',
    category: 'delivery',
    image: '/placeholder.svg',
    features: ['Cardápio digital', 'Pedidos online', 'Rastreamento', 'Pagamento móvel'],
    preview: (
      <div className="bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-lg text-white text-xs">
        <div className="flex justify-between items-center mb-2">
          <div className="h-2 bg-white/20 rounded w-1/3"></div>
          <div className="h-2 bg-white/30 rounded w-1/4"></div>
        </div>
        <div className="space-y-1">
          <div className="flex gap-1">
            <div className="h-4 bg-white/25 rounded w-1/4"></div>
            <div className="flex-1 space-y-1">
              <div className="h-1 bg-white/30 rounded"></div>
              <div className="h-1 bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="h-4 bg-white/25 rounded w-1/4"></div>
            <div className="flex-1 space-y-1">
              <div className="h-1 bg-white/30 rounded"></div>
              <div className="h-1 bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'restaurant-elegant',
    name: 'Restaurante Elegante',
    description: 'Site sofisticado para restaurantes e bares',
    category: 'restaurant',
    image: '/placeholder.svg',
    features: ['Cardápio online', 'Reservas', 'Galeria de pratos', 'Localização'],
    preview: (
      <div className="bg-gradient-to-br from-amber-600 to-yellow-700 p-4 rounded-lg text-white text-xs">
        <div className="h-2 bg-white/20 rounded mb-2 w-1/2 mx-auto"></div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="h-6 bg-white/20 rounded"></div>
          <div className="h-6 bg-white/20 rounded"></div>
        </div>
        <div className="h-1 bg-white/30 rounded mb-1"></div>
        <div className="h-1 bg-white/25 rounded w-3/4"></div>
      </div>
    )
  }
];

export const TemplateGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    // Scroll to simulators or trigger customization
    const simulatorSection = document.getElementById('simulators');
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="templates" className="section-padding bg-gradient-to-br from-background to-muted/20">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Escolha seu template profissional
          </h2>
          <p className="text-muted-foreground text-lg animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Selecione entre nossos templates cuidadosamente projetados e comece a personalizar 
            seu projeto com a base perfeita para o seu negócio.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/50 animate-on-scroll" style={{ animationDelay: '400ms' }}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium hidden lg:block">{category.name}</span>
                  <span className="text-xs font-medium lg:hidden">{category.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll" style={{ animationDelay: '600ms' }}>
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  {template.preview}
                  {template.popular && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                  {template.name}
                </CardTitle>
                <CardDescription className="mb-4 text-sm">
                  {template.description}
                </CardDescription>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.features.length - 3} mais
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleSelectTemplate(template)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                  >
                    {selectedTemplate?.id === template.id ? 'Selecionado' : 'Escolher Template'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="mt-12 p-6 bg-primary/5 rounded-xl border animate-on-scroll">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                Template selecionado: {selectedTemplate.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                Agora você pode personalizar este template nos simuladores abaixo
              </p>
              <Button 
                onClick={() => {
                  const simulatorSection = document.getElementById('simulators');
                  if (simulatorSection) {
                    simulatorSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
              >
                Começar Personalização
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};