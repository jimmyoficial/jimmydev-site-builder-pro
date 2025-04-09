
import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Monitor, DownloadCloud, RotateCcw, Upload } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface SimulatorConfig {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  template: 'modern' | 'minimal' | 'corporate';
}

const defaultConfig: SimulatorConfig = {
  logo: null,
  primaryColor: '#2563EB',
  secondaryColor: '#06B6D4',
  template: 'modern',
};

const templates = {
  modern: {
    name: 'Moderno',
    description: 'Design contemporâneo com elementos interativos e foco em experiência do usuário.',
  },
  minimal: {
    name: 'Minimalista',
    description: 'Estilo clean e minimalista com foco em conteúdo e navegação simplificada.',
  },
  corporate: {
    name: 'Corporativo',
    description: 'Layout profissional ideal para empresas que buscam transmitir credibilidade e seriedade.',
  },
};

export const Simulator: React.FC = () => {
  const [config, setConfig] = useLocalStorage<SimulatorConfig>('jimmydev-simulator', defaultConfig);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect when the section is visible
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
      setConfig({
        ...config,
        logo: e.target?.result as string,
      });
      toast.success('Logo carregado com sucesso!');
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
      setConfig({
        ...config,
        logo: e.target?.result as string,
      });
      toast.success('Logo carregado com sucesso!');
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
    // In a real implementation, this would generate a PDF with the configuration
    // For this demo, we'll just show a success message
    toast.success('Configuração salva como PDF! Em um ambiente real, o PDF seria gerado.');
  };

  const TemplatePreview: React.FC<{ type: 'modern' | 'minimal' | 'corporate' }> = ({ type }) => {
    return (
      <div className={`h-full bg-white rounded-lg shadow-md overflow-hidden ${viewMode === 'mobile' ? 'w-[320px] mx-auto' : 'w-full'}`}>
        {/* Header */}
        <div 
          className={`p-4 flex justify-between items-center ${type === 'modern' ? 'bg-gradient-to-r' : type === 'minimal' ? 'border-b' : 'bg-neutral'}`} 
          style={{
            backgroundImage: type === 'modern' ? `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})` : 'none',
            borderColor: type === 'minimal' ? config.primaryColor : 'transparent',
            backgroundColor: type === 'corporate' ? config.primaryColor : (type === 'minimal' ? 'white' : 'transparent'),
          }}
        >
          <div className="flex items-center">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-10" />
            ) : (
              <div className="text-xl font-bold" style={{ color: type === 'minimal' ? config.primaryColor : 'white' }}>
                LOGO
              </div>
            )}
          </div>
          <nav className="hidden md:flex space-x-4">
            {viewMode === 'desktop' && (
              <>
                <div className={`text-sm ${type === 'minimal' ? 'text-neutral' : 'text-white'}`}>Home</div>
                <div className={`text-sm ${type === 'minimal' ? 'text-neutral' : 'text-white'}`}>Serviços</div>
                <div className={`text-sm ${type === 'minimal' ? 'text-neutral' : 'text-white'}`}>Sobre</div>
                <div className={`text-sm ${type === 'minimal' ? 'text-neutral' : 'text-white'}`}>Contato</div>
              </>
            )}
          </nav>
          {viewMode === 'mobile' && (
            <div className={`${type === 'minimal' ? 'text-neutral' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          )}
        </div>
        
        {/* Hero Section */}
        <div 
          className={`p-6 ${type === 'modern' ? 'bg-gray-50' : type === 'minimal' ? 'bg-white' : 'bg-gray-100'}`}
        >
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: type === 'minimal' ? config.primaryColor : (type === 'corporate' ? config.primaryColor : '#1F2937') }}
          >
            Bem-vindo ao seu site
          </h1>
          <p className="text-gray-700 mb-4">Este é um exemplo de como seu site ficaria com as personalizações selecionadas.</p>
          <button 
            className="px-4 py-2 rounded-lg text-white text-sm"
            style={{ 
              backgroundColor: type === 'minimal' ? 'white' : config.primaryColor,
              color: type === 'minimal' ? config.primaryColor : 'white',
              border: type === 'minimal' ? `1px solid ${config.primaryColor}` : 'none',
            }}
          >
            Saiba mais
          </button>
        </div>
        
        {/* Content Preview */}
        <div className="p-6">
          <div className="flex space-x-4 mb-4">
            <div 
              className="w-1/3 h-20 rounded-lg"
              style={{ backgroundColor: type === 'modern' ? config.secondaryColor : (type === 'minimal' ? '#f3f4f6' : config.secondaryColor) }}
            ></div>
            <div 
              className="w-1/3 h-20 rounded-lg"
              style={{ backgroundColor: type === 'modern' ? config.primaryColor : (type === 'minimal' ? '#f3f4f6' : config.primaryColor) }}
            ></div>
            <div 
              className="w-1/3 h-20 rounded-lg"
              style={{ backgroundColor: type === 'modern' ? config.secondaryColor : (type === 'minimal' ? '#f3f4f6' : config.secondaryColor) }}
            ></div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="h-3 w-full rounded bg-gray-200"></div>
            <div className="h-3 w-full rounded bg-gray-200"></div>
            <div className="h-3 w-2/3 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="simulator" ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Veja seu projeto ganhar vida - Experimente agora!
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Personalize as cores, adicione sua logo e explore diferentes layouts 
            para visualizar como seu projeto ficaria em nossa plataforma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalizar</h3>
            
            {/* Logo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral mb-2">
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
            
            {/* Color Pickers */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral mb-2">
                Cor principal
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
              <label className="block text-sm font-medium text-neutral mb-2">
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
            
            {/* Template Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral mb-2">
                Modelo de layout
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(templates).map(([key, template]) => (
                  <TooltipProvider key={key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`p-3 border rounded-lg text-center text-sm transition-all ${
                            config.template === key 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setConfig({...config, template: key as SimulatorConfig['template']})}
                        >
                          {template.name}
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
            
            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={generatePDF} 
                className="btn-primary flex items-center justify-center"
              >
                <DownloadCloud size={18} className="mr-2" />
                Salvar configuração
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
          
          {/* Preview */}
          <div className="col-span-2 animate-on-scroll" style={{ animationDelay: '600ms' }}>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Visualização</h3>
                <div className="bg-white rounded-lg p-1 flex">
                  <button 
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'desktop' ? 'bg-primary text-white' : 'text-neutral'}`}
                    onClick={() => setViewMode('desktop')}
                  >
                    <Monitor size={18} />
                  </button>
                  <button 
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'mobile' ? 'bg-primary text-white' : 'text-neutral'}`}
                    onClick={() => setViewMode('mobile')}
                  >
                    <Smartphone size={18} />
                  </button>
                </div>
              </div>
              
              <div className="h-[500px] overflow-auto bg-gray-200 rounded-lg p-4" ref={previewRef}>
                <Tabs defaultValue={config.template} onValueChange={(value) => setConfig({...config, template: value as SimulatorConfig['template']})}>
                  <TabsList className="mx-auto mb-4">
                    <TabsTrigger value="modern">Moderno</TabsTrigger>
                    <TabsTrigger value="minimal">Minimalista</TabsTrigger>
                    <TabsTrigger value="corporate">Corporativo</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="modern" className="mt-0">
                    <TemplatePreview type="modern" />
                  </TabsContent>
                  
                  <TabsContent value="minimal" className="mt-0">
                    <TemplatePreview type="minimal" />
                  </TabsContent>
                  
                  <TabsContent value="corporate" className="mt-0">
                    <TemplatePreview type="corporate" />
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
