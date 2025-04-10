
import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RotateCcw, 
  Upload, 
  Globe, 
  ShoppingCart, 
  LayoutDashboard, 
  FileText, 
  Code,
  Share2,
  Image,
  Layers,
  Monitor
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface WebsiteConfig {
  title: string;
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  template: WebsiteTemplate;
  darkMode: boolean;
  customImages: Record<string, string>;
}

type WebsiteTemplate = 'institutional' | 'ecommerce' | 'dashboard' | 'blog' | 'portfolio';

const defaultConfig: WebsiteConfig = {
  title: 'JimmyDev Website',
  logo: null,
  primaryColor: '#1A2B47',
  secondaryColor: '#ED422A',
  template: 'institutional',
  darkMode: false,
  customImages: {
    banner: '',
    product: ''
  }
};

const templates = {
  institutional: {
    name: 'Site Institucional',
    description: 'Site empresarial com apresentação de serviços e informações corporativas.',
    icon: <Globe size={24} />,
    preview: (config: WebsiteConfig) => (
      <div className="bg-white h-full overflow-hidden">
        {/* Header */}
        <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
          <div className="flex items-center">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-8 mr-3" />
            ) : (
              <div className="font-bold text-white text-xl">{config.title}</div>
            )}
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-opacity-80">Início</a>
            <a href="#" className="text-white hover:text-opacity-80">Sobre</a>
            <a href="#" className="text-white hover:text-opacity-80">Serviços</a>
            <a href="#" className="text-white hover:text-opacity-80">Clientes</a>
            <a href="#" className="text-white hover:text-opacity-80">Contato</a>
          </nav>
          <button className="py-2 px-4 rounded text-white" style={{ backgroundColor: config.secondaryColor }}>
            Fale Conosco
          </button>
        </header>
        
        {/* Hero */}
        <section className="relative h-60 flex items-center justify-center overflow-hidden bg-gray-900">
          <div 
            className="absolute inset-0 opacity-50 bg-center bg-cover"
            style={{ 
              backgroundImage: config.customImages.banner ? `url(${config.customImages.banner})` : 'url(https://via.placeholder.com/1200x400)'
            }}
          ></div>
          <div className="relative text-center px-6 z-10">
            <h1 className="text-3xl font-bold text-white mb-4">Soluções Corporativas Personalizadas</h1>
            <p className="text-white text-xl mb-6">Transformando ideias em realidade para sua empresa</p>
            <div className="flex gap-4 justify-center">
              <button className="py-2 px-6 rounded font-medium" style={{ backgroundColor: config.secondaryColor, color: 'white' }}>
                Nossos Serviços
              </button>
              <button className="py-2 px-6 rounded font-medium border border-white text-white">
                Saiba Mais
              </button>
            </div>
          </div>
        </section>
        
        {/* Services */}
        <section className="py-12 px-6">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: config.primaryColor }}>Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 rounded-lg shadow-md bg-white">
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${config.primaryColor}20` }}>
                  <div className="w-6 h-6" style={{ color: config.primaryColor }}>
                    <Layers />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Serviço Empresarial {item}</h3>
                <p className="text-gray-600 mb-4">Descritivo do serviço corporativo com detalhes sobre as vantagens para seu negócio.</p>
                <a href="#" className="font-medium" style={{ color: config.secondaryColor }}>
                  Saiba mais →
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  ecommerce: {
    name: 'E-commerce',
    description: 'Loja virtual completa com catálogo de produtos e carrinho de compras.',
    icon: <ShoppingCart size={24} />,
    preview: (config: WebsiteConfig) => (
      <div className="bg-white h-full overflow-hidden">
        {/* Header */}
        <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
          <div className="flex items-center">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-8 mr-3" />
            ) : (
              <div className="font-bold text-white text-xl">{config.title}</div>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="py-1 px-3 rounded text-sm w-40 md:w-64"
              />
            </div>
            <button className="relative">
              <ShoppingCart size={20} className="text-white" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: config.secondaryColor, color: 'white' }}>
                3
              </span>
            </button>
          </div>
        </header>
        
        {/* Categories */}
        <div className="bg-gray-100 p-3 flex space-x-4 overflow-x-auto">
          <button className="px-3 py-1 rounded text-white text-sm whitespace-nowrap" style={{ backgroundColor: config.secondaryColor }}>
            Todos
          </button>
          <button className="px-3 py-1 rounded bg-white text-gray-700 text-sm whitespace-nowrap">
            Eletrônicos
          </button>
          <button className="px-3 py-1 rounded bg-white text-gray-700 text-sm whitespace-nowrap">
            Mobiliário
          </button>
          <button className="px-3 py-1 rounded bg-white text-gray-700 text-sm whitespace-nowrap">
            Equipamentos
          </button>
          <button className="px-3 py-1 rounded bg-white text-gray-700 text-sm whitespace-nowrap">
            Software
          </button>
        </div>
        
        {/* Products */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Produtos em Destaque</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden bg-white">
                <div className="h-32 bg-gray-200 flex items-center justify-center">
                  {config.customImages.product ? (
                    <img src={config.customImages.product} alt="Product" className="h-full object-cover w-full" />
                  ) : (
                    <Image size={32} className="text-gray-400" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">Produto Corporativo {item}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold" style={{ color: config.primaryColor }}>R$ 299,99</span>
                    <button className="p-1 rounded" style={{ backgroundColor: config.secondaryColor }}>
                      <ShoppingCart size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  dashboard: {
    name: 'Dashboard',
    description: 'Painel administrativo com gráficos e indicadores de desempenho.',
    icon: <LayoutDashboard size={24} />,
    preview: (config: WebsiteConfig) => (
      <div className={`h-full overflow-hidden ${config.darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        {/* Sidebar and Header */}
        <div className="flex h-full">
          <div className="w-16 md:w-56 p-3 h-full" style={{ backgroundColor: config.primaryColor }}>
            <div className="mb-6 flex justify-center md:justify-start items-center">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-8" />
              ) : (
                <div className="font-bold text-white text-lg">{config.title}</div>
              )}
            </div>
            <nav className="space-y-2">
              {[
                { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                { name: 'Analytics', icon: <Code size={20} /> },
                { name: 'Reports', icon: <FileText size={20} /> },
                { name: 'Users', icon: <Globe size={20} /> },
              ].map((item) => (
                <div 
                  key={item.name}
                  className="flex items-center space-x-3 rounded p-2 cursor-pointer"
                  style={{ backgroundColor: item.name === 'Dashboard' ? config.secondaryColor : 'transparent' }}
                >
                  <div className="text-white">{item.icon}</div>
                  <span className="text-white text-sm hidden md:block">{item.name}</span>
                </div>
              ))}
            </nav>
          </div>
          
          <div className="flex-1 overflow-auto">
            {/* Header */}
            <header className={`p-4 flex justify-between items-center border-b ${config.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h1 className="text-xl font-semibold">Dashboard Corporativo</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className={`py-1 px-3 rounded text-sm w-32 md:w-64 ${config.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100'}`}
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs">JD</span>
                </div>
              </div>
            </header>
            
            {/* Dashboard Content */}
            <div className="p-4">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {['Clientes', 'Vendas', 'Projetos', 'Tarefas'].map((item, index) => (
                  <div 
                    key={item} 
                    className={`p-4 rounded-lg ${config.darkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}
                  >
                    <p className="text-sm text-gray-500">{item}</p>
                    <p className="text-2xl font-bold" style={{ color: config.secondaryColor }}>
                      {index === 0 ? '128' : index === 1 ? 'R$ 38.5k' : index === 2 ? '12/24' : '64%'}
                    </p>
                    <div className="text-xs mt-2" style={{ color: index % 2 === 0 ? '#4CAF50' : '#F44336' }}>
                      {index % 2 === 0 ? '+12% ↑' : '-5% ↓'} desde o último mês
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Charts */}
              <div className={`p-4 rounded-lg mb-6 ${config.darkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Desempenho de Vendas</h2>
                  <select className={`text-sm p-1 rounded ${config.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <option>Este mês</option>
                    <option>Último mês</option>
                    <option>Este ano</option>
                  </select>
                </div>
                <div className="h-48 flex items-end space-x-2">
                  {[35, 50, 40, 70, 85, 65, 75, 90, 80, 60, 55, 75].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t" 
                        style={{ height: `${height}%`, backgroundColor: config.secondaryColor }}
                      ></div>
                      <div className="text-xs mt-1">{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][index]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  blog: {
    name: 'Blog Corporativo',
    description: 'Blog empresarial para compartilhamento de conteúdo e notícias.',
    icon: <FileText size={24} />,
    preview: (config: WebsiteConfig) => (
      <div className="bg-white h-full overflow-hidden">
        {/* Header */}
        <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
          <div className="flex items-center">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-8 mr-3" />
            ) : (
              <div className="font-bold text-white text-xl">{config.title}</div>
            )}
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-opacity-80">Início</a>
            <a href="#" className="text-white hover:text-opacity-80">Artigos</a>
            <a href="#" className="text-white hover:text-opacity-80">Categorias</a>
            <a href="#" className="text-white hover:text-opacity-80">Sobre</a>
            <a href="#" className="text-white hover:text-opacity-80">Contato</a>
          </nav>
          <button className="p-2 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </header>
        
        {/* Featured Post */}
        <div className="relative h-48 bg-gray-900">
          <div 
            className="absolute inset-0 opacity-60 bg-center bg-cover"
            style={{ 
              backgroundImage: config.customImages.banner ? `url(${config.customImages.banner})` : 'url(https://via.placeholder.com/1200x400)'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 py-4 mx-auto max-w-2xl text-center">
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded mb-2 text-white" style={{ backgroundColor: config.secondaryColor }}>
                EM DESTAQUE
              </span>
              <h1 className="text-2xl font-bold text-white mb-2">As Tendências de Tecnologia Corporativa para 2025</h1>
              <p className="text-white text-opacity-80 mb-4 text-sm">Descubra as inovações que irão transformar o ambiente corporativo no próximo ano</p>
              <a href="#" className="inline-block px-4 py-2 rounded font-medium text-sm text-white" style={{ backgroundColor: config.secondaryColor }}>
                Ler artigo
              </a>
            </div>
          </div>
        </div>
        
        {/* Posts */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Artigos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden bg-white">
                <div className="h-32 bg-gray-200">
                  {config.customImages.product ? (
                    <img src={config.customImages.product} alt="Article" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <Image size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <span className="inline-block px-2 py-0.5 text-xs rounded mb-2 text-white" style={{ backgroundColor: config.primaryColor }}>
                    CATEGORIA
                  </span>
                  <h3 className="font-medium">Artigo Corporativo {item}</h3>
                  <p className="text-gray-600 text-sm mt-1">Uma breve descrição do conteúdo deste artigo corporativo.</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">3 dias atrás</span>
                    <a href="#" className="text-sm font-medium" style={{ color: config.secondaryColor }}>
                      Ler mais →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  portfolio: {
    name: 'Portfólio',
    description: 'Site para apresentação de projetos e casos de sucesso da empresa.',
    icon: <Code size={24} />,
    preview: (config: WebsiteConfig) => (
      <div className="bg-white h-full overflow-hidden">
        {/* Header */}
        <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
          <div className="flex items-center">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-8 mr-3" />
            ) : (
              <div className="font-bold text-white text-xl">{config.title}</div>
            )}
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-opacity-80">Início</a>
            <a href="#" className="text-white hover:text-opacity-80">Projetos</a>
            <a href="#" className="text-white hover:text-opacity-80">Sobre</a>
            <a href="#" className="text-white hover:text-opacity-80">Contato</a>
          </nav>
        </header>
        
        {/* Hero */}
        <section className="py-10 px-6 text-center">
          <h1 className="text-3xl font-bold mb-3" style={{ color: config.primaryColor }}>Soluções Digitais Corporativas</h1>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Nossa agência especializada em criar experiências digitais para empresas de todos os portes.
          </p>
          <button className="py-2 px-6 rounded-lg text-white font-medium" style={{ backgroundColor: config.secondaryColor }}>
            Ver projetos
          </button>
        </section>
        
        {/* Projects */}
        <section className="px-4 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-lg bg-gray-900">
                <div 
                  className="aspect-square bg-cover bg-center"
                  style={{ 
                    backgroundImage: config.customImages.product 
                      ? `url(${config.customImages.product})`
                      : 'url(https://via.placeholder.com/400)'
                  }}
                >
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-70">
                  <div className="text-center p-4">
                    <h3 className="text-white font-medium mb-2">Projeto Corporativo {item}</h3>
                    <p className="text-white text-opacity-70 text-sm mb-3">Desenvolvimento web para empresa</p>
                    <button className="px-3 py-1 text-xs rounded text-white" style={{ backgroundColor: config.secondaryColor }}>
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
};

export const WebsiteSimulator: React.FC = () => {
  const [config, setConfig] = useLocalStorage<WebsiteConfig>('jimmydev-website-simulator', defaultConfig);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploadType, setImageUploadType] = useState<'logo' | 'custom'>('logo');
  const [customImageKey, setCustomImageKey] = useState<string>('');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect when the section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('active');
              }, i * 150);
            });
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (imageUploadType === 'logo') {
        setConfig({
          ...config,
          logo: e.target?.result as string,
        });
        toast.success('Logo carregado com sucesso!');
      } else if (imageUploadType === 'custom' && customImageKey) {
        const updatedCustomImages = {
          ...config.customImages,
          [customImageKey]: e.target?.result as string
        };
        
        setConfig({
          ...config,
          customImages: updatedCustomImages
        });
        toast.success(`Imagem personalizada carregada com sucesso!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Por favor, arraste um arquivo de imagem válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (imageUploadType === 'logo') {
        setConfig({
          ...config,
          logo: e.target?.result as string,
        });
        toast.success('Logo carregado com sucesso!');
      } else if (imageUploadType === 'custom' && customImageKey) {
        const updatedCustomImages = {
          ...config.customImages,
          [customImageKey]: e.target?.result as string
        };
        
        setConfig({
          ...config,
          customImages: updatedCustomImages
        });
        toast.success(`Imagem personalizada carregada com sucesso!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    toast.success('Configurações restauradas para o padrão.');
  };

  const ImageUploader = ({ 
    type, 
    imageKey 
  }: { 
    type: 'logo' | 'custom'; 
    imageKey?: string;
  }) => {
    const handleClick = () => {
      setImageUploadType(type);
      if (type === 'custom' && imageKey) {
        setCustomImageKey(imageKey);
      }
      fileInputRef.current?.click();
    };
    
    // Safely access customImages with fallbacks
    const customImages = config.customImages || {};
    const currentImage = type === 'logo' 
      ? config.logo 
      : (imageKey ? customImages[imageKey] || null : null);
    
    return (
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {currentImage ? (
          <div className="flex flex-col items-center">
            <img src={currentImage} alt="Preview" className="max-h-16 mb-2 object-contain" />
            <button 
              className="text-sm text-primary flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <Upload size={14} className="mr-1" />
              Trocar imagem
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Image className="h-8 w-8 text-gray-400 mb-1" />
            <p className="text-xs text-gray-500 mb-1">
              {type === 'logo' 
                ? 'Arraste seu logo ou clique' 
                : 'Arraste uma imagem ou clique'}
            </p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*" 
          onChange={handleLogoUpload} 
        />
      </div>
    );
  };

  return (
    <section id="website-simulator" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Experimente seu site corporativo
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Visualize diferentes modelos de websites para sua empresa e personalize 
            cores, logo e conteúdo para criar a presença digital ideal para seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-white p-8 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalização do website</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Título do site
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({...config, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="JimmyDev Website"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Logo do site
              </label>
              <ImageUploader type="logo" />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cor primária
              </label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color" 
                  value={config.primaryColor} 
                  onChange={(e) => setConfig({...config, primaryColor: e.target.value})} 
                  className="w-10 h-10 rounded-lg overflow-hidden cursor-pointer"
                />
                <input 
                  type="text" 
                  value={config.primaryColor} 
                  onChange={(e) => setConfig({...config, primaryColor: e.target.value})} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cor secundária
              </label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color" 
                  value={config.secondaryColor} 
                  onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} 
                  className="w-10 h-10 rounded-lg overflow-hidden cursor-pointer"
                />
                <input 
                  type="text" 
                  value={config.secondaryColor} 
                  onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tipo de website
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(templates).map(([key, template]) => (
                  <TooltipProvider key={key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`p-3 border rounded-lg flex flex-col items-center transition-all ${
                            config.template === key 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setConfig({...config, template: key as WebsiteTemplate})}
                        >
                          <div className="mb-1">{template.icon}</div>
                          <div className="text-xs font-medium">{template.name}</div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{template.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Imagens personalizadas
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Banner principal</div>
                  <ImageUploader type="custom" imageKey="banner" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Imagem produto/conteúdo</div>
                  <ImageUploader type="custom" imageKey="product" />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={handleReset} 
                className="w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center"
              >
                <RotateCcw size={18} className="mr-2" />
                Restaurar padrões
              </button>
            </div>
          </div>
          
          {/* Preview */}
          <div className="col-span-2 animate-on-scroll" style={{ animationDelay: '600ms' }}>
            <div className="bg-white p-6 rounded-xl shadow-sm h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Visualização do website</h3>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          className="p-2 rounded-lg transition-colors text-neutral-600 hover:bg-slate-100"
                          onClick={() => {
                            toast.success('Link do simulador copiado para a área de transferência!');
                          }}
                        >
                          <Share2 size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Compartilhar simulador</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="h-[600px] overflow-hidden bg-slate-100 rounded-lg flex items-center justify-center p-4">
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg h-full w-full max-w-3xl mx-auto">
                  <div className="h-10 bg-gray-100 border-b flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-white rounded-full text-xs py-1 px-3 border border-gray-200 flex items-center max-w-md w-full">
                        <Globe size={12} className="mr-2 text-gray-500" />
                        <span className="truncate">www.{config.title.toLowerCase().replace(/\s+/g, '-')}.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[calc(100%-2.5rem)] overflow-auto">
                    {templates[config.template].preview(config)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
