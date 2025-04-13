import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Monitor, DownloadCloud, RotateCcw, Upload, ClipboardCheck, Briefcase, BookOpen, Layers } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface SimulatorConfig {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  template: 'modern' | 'minimal' | 'corporate';
  companyName: string;
}

const defaultConfig: SimulatorConfig = {
  logo: null,
  primaryColor: '#1A365D', // Deep corporate blue
  secondaryColor: '#2B6CB0', // Medium corporate blue
  template: 'corporate',
  companyName: 'Empresa S.A.',
};

const templates = {
  modern: {
    name: 'Moderno',
    description: 'Design contemporâneo com elementos interativos e foco em experiência do usuário.',
    icon: <Layers size={18} />,
  },
  minimal: {
    name: 'Minimalista',
    description: 'Estilo clean e minimalista com foco em conteúdo e navegação simplificada.',
    icon: <BookOpen size={18} />,
  },
  corporate: {
    name: 'Corporativo',
    description: 'Layout profissional ideal para empresas que buscam transmitir credibilidade e seriedade.',
    icon: <Briefcase size={18} />,
  },
};

export const Simulator: React.FC = () => {
  const [config, setConfig] = useLocalStorage<SimulatorConfig>('jimmydev-simulator', defaultConfig);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setConfig({
          ...config,
          logo: e.target.result as string,
        });
        toast.success('Logo carregado com sucesso!');
      } else {
        toast.error('Ocorreu um erro ao carregar a imagem.');
      }
    };
    reader.onerror = () => {
      toast.error('Ocorreu um erro ao ler o arquivo.');
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
      if (e.target?.result) {
        setConfig({
          ...config,
          logo: e.target.result as string,
        });
        toast.success('Logo carregado com sucesso!');
      } else {
        toast.error('Ocorreu um erro ao carregar a imagem.');
      }
    };
    reader.onerror = () => {
      toast.error('Ocorreu um erro ao ler o arquivo.');
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

  const generatePDF = () => {
    toast.success('Configuração salva como PDF! Em um ambiente real, o PDF seria gerado.');
  };

  const TemplatePreview: React.FC<{ type: 'modern' | 'minimal' | 'corporate' }> = ({ type }) => {
    return (
      <div className={`h-full bg-white rounded-lg shadow-md overflow-hidden ${viewMode === 'mobile' ? 'w-[320px] mx-auto' : 'w-full'}`}>
        <div 
          className={`p-4 flex justify-between items-center ${
            type === 'modern' 
              ? 'bg-gradient-to-r' 
              : type === 'minimal' 
                ? 'border-b' 
                : 'bg-neutral'
          }`} 
          style={{
            backgroundImage: type === 'modern' 
              ? `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})` 
              : 'none',
            borderColor: type === 'minimal' ? config.primaryColor : 'transparent',
            backgroundColor: type === 'corporate' ? config.primaryColor : (type === 'minimal' ? 'white' : 'transparent'),
          }}
        >
          <div className="flex items-center space-x-2">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className={`text-lg font-bold ${type === 'minimal' ? 'text-neutral-800' : 'text-white'}`}>
                {config.companyName || 'EMPRESA S.A.'}
              </div>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {viewMode === 'desktop' && (
              <>
                <div className={`text-sm font-medium ${
                  type === 'minimal' 
                    ? 'text-neutral-800' 
                    : 'text-white'
                }`}>Início</div>
                <div className={`text-sm ${
                  type === 'minimal' 
                    ? 'text-neutral-600' 
                    : 'text-white/80'
                }`}>Serviços</div>
                <div className={`text-sm ${
                  type === 'minimal' 
                    ? 'text-neutral-600' 
                    : 'text-white/80'
                }`}>Produtos</div>
                <div className={`text-sm ${
                  type === 'minimal' 
                    ? 'text-neutral-600' 
                    : 'text-white/80'
                }`}>Sobre</div>
                <div className={`text-sm ${
                  type === 'minimal' 
                    ? 'text-neutral-600' 
                    : 'text-white/80'
                }`}>Contato</div>
              </>
            )}
          </nav>
          
          {viewMode === 'mobile' && (
            <div className={`${type === 'minimal' ? 'text-neutral-800' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          )}
        </div>
        
        <div 
          className={`relative overflow-hidden ${
            type === 'modern' 
              ? 'py-12 px-6' 
              : type === 'minimal' 
                ? 'py-16 px-6' 
                : 'py-10 px-6'
          }`}
          style={{ 
            backgroundColor: type === 'minimal' 
              ? '#ffffff' 
              : type === 'corporate' 
                ? '#f8fafc' 
                : '#f1f5f9'
          }}
        >
          {type === 'corporate' && (
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br" 
                   style={{backgroundImage: `linear-gradient(to bottom right, ${config.primaryColor}, ${config.secondaryColor})`}}></div>
              <div className="absolute -left-10 bottom-0 w-32 h-32 rounded-full bg-gradient-to-tr"
                   style={{backgroundImage: `linear-gradient(to top right, ${config.secondaryColor}, ${config.primaryColor})`}}></div>
            </div>
          )}
          
          {type === 'modern' && (
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-bl"
                   style={{backgroundImage: `linear-gradient(to bottom left, ${config.primaryColor}40, transparent)`}}></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full"
                   style={{backgroundColor: `${config.secondaryColor}30`}}></div>
            </div>
          )}
          
          <div className="relative z-10">
            <h1 
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ 
                color: type === 'minimal' 
                  ? config.primaryColor 
                  : (type === 'corporate' ? '#1e293b' : '#1e293b')
              }}
            >
              {config.companyName || 'Empresa S.A.'}
            </h1>
            
            <p className={`${
              type === 'corporate' 
                ? 'text-slate-700 max-w-lg' 
                : type === 'minimal' 
                  ? 'text-neutral-600 max-w-md' 
                  : 'text-slate-700 max-w-xl'
            } mb-6`}>
              Soluções empresariais personalizadas para impulsionar o crescimento do seu negócio com tecnologia inovadora e resultados comprovados.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  type === 'minimal' 
                    ? 'bg-white border' 
                    : 'text-white'
                }`}
                style={{ 
                  backgroundColor: type === 'minimal' ? 'white' : config.primaryColor,
                  color: type === 'minimal' ? config.primaryColor : 'white',
                  borderColor: type === 'minimal' ? config.primaryColor : 'transparent',
                }}
              >
                Solicitar demonstração
              </button>
              
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  type === 'minimal' 
                    ? 'text-neutral-700 bg-gray-100' 
                    : type === 'corporate' 
                      ? 'text-slate-700 bg-white border border-gray-200' 
                      : 'text-slate-800 bg-white/80 backdrop-blur-sm'
                }`}
              >
                Conhecer serviços
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white">
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${
              type === 'corporate' 
                ? 'text-slate-800 border-b border-gray-200 pb-2' 
                : type === 'minimal' 
                  ? 'text-neutral-800'
                  : 'text-slate-800'
            }`}
              style={{
                color: type === 'minimal' ? config.primaryColor : undefined
              }}
            >
              Nossos serviços
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              <ServiceCard 
                title="Consultoria" 
                type={type} 
                primaryColor={config.primaryColor} 
                secondaryColor={config.secondaryColor} 
              />
              <ServiceCard 
                title="Desenvolvimento" 
                type={type} 
                primaryColor={config.primaryColor} 
                secondaryColor={config.secondaryColor} 
              />
              <ServiceCard 
                title="Suporte" 
                type={type} 
                primaryColor={config.primaryColor} 
                secondaryColor={config.secondaryColor} 
              />
            </div>
          </div>
          
          <div>
            <h2 className={`text-lg font-semibold mb-4 ${
              type === 'corporate' 
                ? 'text-slate-800 border-b border-gray-200 pb-2' 
                : type === 'minimal' 
                  ? 'text-neutral-800'
                  : 'text-slate-800'
            }`}
              style={{
                color: type === 'minimal' ? config.primaryColor : undefined
              }}
            >
              Depoimentos
            </h2>
            
            <div className={`p-4 rounded-lg ${
              type === 'corporate' 
                ? 'bg-slate-50 border border-slate-100' 
                : type === 'minimal' 
                  ? 'bg-gray-50' 
                  : 'bg-gradient-to-br from-slate-50 to-white border border-slate-100'
            }`}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <div className="font-medium text-sm text-slate-900">Cliente Corporativo</div>
                  <div className="text-xs text-slate-500">Diretor de Tecnologia</div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                "As soluções implementadas pela {config.companyName || 'Empresa'} superaram nossas expectativas e ajudaram a impulsionar nossos resultados de negócios significativamente."
              </div>
            </div>
          </div>
        </div>
        
        <div className={`p-4 text-sm ${
          type === 'corporate' 
            ? 'bg-slate-800 text-white/80' 
            : type === 'minimal' 
              ? 'border-t border-gray-200 text-neutral-500' 
              : 'bg-gradient-to-r text-white/80'
        }`}
          style={{
            backgroundImage: type === 'modern' 
              ? `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})` 
              : 'none',
            backgroundColor: type === 'corporate' ? config.primaryColor : (type === 'minimal' ? 'white' : 'transparent'),
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              © {new Date().getFullYear()} {config.companyName || 'Empresa S.A.'}
            </div>
            <div className="flex space-x-4">
              <span>Política</span>
              <span>Termos</span>
              <span>Contato</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServiceCard: React.FC<{ 
    title: string; 
    type: 'modern' | 'minimal' | 'corporate';
    primaryColor: string;
    secondaryColor: string;
  }> = ({ title, type, primaryColor, secondaryColor }) => {
    return (
      <div className={`p-4 rounded-lg ${
        type === 'corporate' 
          ? 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow' 
          : type === 'minimal' 
            ? 'bg-gray-50 hover:bg-gray-100 transition-colors' 
            : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all'
      }`}>
        <div 
          className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${
            type === 'minimal' ? 'bg-white border' : 'text-white'
          }`}
          style={{ 
            backgroundColor: type === 'minimal' ? 'white' : primaryColor,
            borderColor: type === 'minimal' ? primaryColor : 'transparent',
          }}
        >
          <div className={type === 'minimal' ? '' : 'text-white'} style={{ color: type === 'minimal' ? primaryColor : undefined }}>
            {title === 'Consultoria' ? '💼' : title === 'Desenvolvimento' ? '💻' : '🛠️'}
          </div>
        </div>
        <h3 className="text-sm font-medium mb-1 text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    );
  };

  return (
    <section id="simulator" ref={sectionRef} className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Simule seu projeto corporativo
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Personalize as cores, adicione sua logo e explore diferentes layouts 
            para visualizar como seu projeto ficaria em uma aplicação corporativa profissional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalização corporativa</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nome da empresa
              </label>
              <input
                type="text"
                value={config.companyName}
                onChange={(e) => setConfig({...config, companyName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Empresa S.A."
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Logo da empresa
              </label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {config.logo ? (
                  <div className="flex flex-col items-center">
                    <img src={config.logo} alt="Logo Preview" className="max-h-20 mb-4" />
                    <button 
                      className="text-sm text-primary flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <Upload size={16} className="mr-1" />
                      Trocar logo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Arraste sua logo ou clique para selecionar</p>
                    <p className="text-xs text-gray-400">PNG, JPG, SVG (máx. 2MB)</p>
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
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cor principal corporativa
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
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cor secundária corporativa
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
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Estilo de site corporativo
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(templates).map(([key, template]) => (
                  <TooltipProvider key={key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`p-4 border rounded-lg text-center transition-all ${
                            config.template === key 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setConfig({...config, template: key as SimulatorConfig['template']})}
                        >
                          <div className="flex flex-col items-center">
                            <div className="mb-2">{template.icon}</div>
                            <div className="text-sm font-medium">{template.name}</div>
                          </div>
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
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={generatePDF} 
                className="btn-primary flex items-center justify-center"
              >
                <ClipboardCheck size={18} className="mr-2" />
                Exportar configuração
              </button>
              <button 
                onClick={handleReset} 
                className="btn-outline flex items-center justify-center"
              >
                <RotateCcw size={18} className="mr-2" />
                Restaurar padrão
              </button>
            </div>
          </div>
          
          <div className="col-span-2 animate-on-scroll" style={{ animationDelay: '600ms' }}>
            <div className="bg-white p-6 rounded-xl shadow-sm h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Visualização corporativa</h3>
                <div className="bg-slate-100 rounded-lg p-1 flex">
                  <button 
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'desktop' ? 'bg-primary text-white' : 'text-neutral-600'}`}
                    onClick={() => setViewMode('desktop')}
                  >
                    <Monitor size={18} />
                  </button>
                  <button 
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'mobile' ? 'bg-primary text-white' : 'text-neutral-600'}`}
                    onClick={() => setViewMode('mobile')}
                  >
                    <Smartphone size={18} />
                  </button>
                </div>
              </div>
              
              <div className="h-[500px] overflow-auto bg-slate-100 rounded-lg p-4" ref={previewRef}>
                <Tabs defaultValue={config.template} onValueChange={(value) => setConfig({...config, template: value as SimulatorConfig['template']})}>
                  <TabsList className="mx-auto mb-4 bg-white/60 backdrop-blur">
                    <TabsTrigger value="corporate" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                      <div className="flex items-center">
                        <Briefcase size={16} className="mr-2" />
                        Corporativo
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="modern" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                      <div className="flex items-center">
                        <Layers size={16} className="mr-2" />
                        Moderno
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="minimal" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                      <div className="flex items-center">
                        <BookOpen size={16} className="mr-2" />
                        Minimalista
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="corporate" className="mt-0">
                    <TemplatePreview type="corporate" />
                  </TabsContent>
                  
                  <TabsContent value="modern" className="mt-0">
                    <TemplatePreview type="modern" />
                  </TabsContent>
                  
                  <TabsContent value="minimal" className="mt-0">
                    <TemplatePreview type="minimal" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
