import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RotateCcw, 
  Upload, 
  Download, 
  ClipboardCheck, 
  Smartphone, 
  Monitor,
  BarChart2,
  Video,
  Layers,
  Moon,
  Sun,
  Share2,
  Image,
  Play
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from 'sonner';
import { 
  AppSimulatorConfig, 
  defaultConfig, 
  templates, 
  deviceModels,
  exportConfiguration,
  exportAsGif,
  generateUsageReport,
  trackEvent
} from '@/utils/simulatorUtils';
import { EcommerceApp } from './app-templates/EcommerceApp';
import { SocialApp } from './app-templates/SocialApp';
import { FitnessApp } from './app-templates/FitnessApp';

export const AppSimulator: React.FC = () => {
  const [config, setConfig] = useLocalStorage<AppSimulatorConfig>('jimmydev-app-simulator', defaultConfig);
  const [viewMode, setViewMode] = useState<'device' | 'analytics'>('device');
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const [imageUploadType, setImageUploadType] = useState<'logo' | 'custom'>('logo');
  const [customImageKey, setCustomImageKey] = useState<string>('');
  const [showGuide, setShowGuide] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  // Ensure the device model exists in our deviceModels object, otherwise use the default
  useEffect(() => {
    if (!deviceModels[config.deviceModel]) {
      console.warn(`Device model ${config.deviceModel} not found, using default`);
      setConfig({
        ...config,
        deviceModel: defaultConfig.deviceModel
      });
    }
  }, [config.deviceModel]);

  // Ensure customImages object is always initialized
  useEffect(() => {
    if (!config.customImages) {
      setConfig({
        ...config,
        customImages: {}
      });
    }
  }, [config]);

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

  // Track events
  useEffect(() => {
    trackEvent('app_simulator_viewed', { template: config.template });
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
    trackEvent('reset_simulator');
  };

  const handleExportConfig = () => {
    exportConfiguration();
    trackEvent('export_configuration');
  };

  const handleExportGif = () => {
    exportAsGif();
    trackEvent('export_as_gif');
  };

  const handleInteraction = (action: string) => {
    trackEvent('app_interaction', { action });
    
    // Guide steps
    if (showGuide) {
      if (demoStep === 1 && action === 'nav_to_cart') {
        setDemoStep(2);
        toast.success('Ótimo! Agora adicione um produto ao carrinho', {
          position: 'top-center',
          duration: 4000
        });
      } else if (demoStep === 2 && action === 'add_to_cart') {
        setDemoStep(3);
        toast.success('Excelente! Finalize a compra', {
          position: 'top-center',
          duration: 4000
        });
      } else if (demoStep === 3 && action === 'begin_checkout') {
        setDemoStep(4);
        toast.success('Perfeito! Demonstração concluída com sucesso.', {
          position: 'top-center',
          duration: 4000
        });
        setTimeout(() => {
          setShowGuide(false);
          setDemoStep(0);
        }, 2000);
      }
    }
  };

  const startGuidedDemo = () => {
    setShowGuide(true);
    setDemoStep(1);
    setConfig({
      ...config,
      template: 'ecommerce'
    });
    
    setTimeout(() => {
      toast.success('Comece navegando para o carrinho de compras', {
        position: 'top-center',
        duration: 6000
      });
    }, 500);
    
    trackEvent('start_guided_demo');
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
      fileInput?.click();
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
          ref={(input) => setFileInput(input)} 
          className="hidden" 
          accept="image/*" 
          onChange={handleLogoUpload} 
        />
      </div>
    );
  };

  const AnalyticsPanel = () => {
    const stats = generateUsageReport();
    
    return (
      <div className="h-full bg-white p-5 rounded-xl">
        <h3 className="font-bold text-lg mb-5">Análise de Uso do Aplicativo</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Panorama de engajamento</h4>
            <span className="text-xs text-gray-500">Última atualização: agora</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Telas visualizadas</div>
              <div className="text-2xl font-bold">{stats.screensViewed}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Tempo total</div>
              <div className="text-2xl font-bold">{stats.totalTimeSpent}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Taxa de conversão</div>
              <div className="text-2xl font-bold">{stats.conversionRate}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Recurso mais usado</div>
              <div className="text-2xl font-bold">{stats.mostClickedFeature}</div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3">Distribuição por dispositivo</h4>
          <div className="h-48 relative">
            <div className="absolute bottom-0 left-0 right-0 flex h-40">
              <div className="flex-1 flex flex-col items-center justify-end">
                <div 
                  className="w-16 bg-blue-500 rounded-t-lg"
                  style={{ height: `${parseInt(stats.deviceBreakdown.mobile)}%`, backgroundColor: config.primaryColor }}
                ></div>
                <div className="mt-2 text-sm">Mobile</div>
                <div className="text-xs text-gray-500">{stats.deviceBreakdown.mobile}</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end">
                <div 
                  className="w-16 bg-indigo-500 rounded-t-lg"
                  style={{ height: `${parseInt(stats.deviceBreakdown.tablet)}%`, backgroundColor: config.secondaryColor }}
                ></div>
                <div className="mt-2 text-sm">Tablet</div>
                <div className="text-xs text-gray-500">{stats.deviceBreakdown.tablet}</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end">
                <div 
                  className="w-16 rounded-t-lg"
                  style={{ 
                    height: `${parseInt(stats.deviceBreakdown.desktop)}%`, 
                    backgroundColor: '#A3A3A3' 
                  }}
                ></div>
                <div className="mt-2 text-sm">Desktop</div>
                <div className="text-xs text-gray-500">{stats.deviceBreakdown.desktop}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Feedback de usuários</h4>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                <div>
                  <div className="text-sm font-medium">Usuário corporativo</div>
                  <div className="text-xs text-gray-500">12 minutos atrás</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "A interface é intuitiva e os fluxos são muito bem projetados. Excelente experiência!"
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                <div>
                  <div className="text-sm font-medium">Gestor empresarial</div>
                  <div className="text-xs text-gray-500">1 hora atrás</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "Consegui visualizar perfeitamente como o app funcionaria. Design profissional e recursos completos."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeviceContent = () => {
    const getAppComponent = () => {
      switch (config.template) {
        case 'ecommerce':
          return <EcommerceApp config={config} onInteraction={handleInteraction} />;
        case 'social':
          return <SocialApp config={config} onInteraction={handleInteraction} />;
        case 'fitness':
          return <FitnessApp config={config} onInteraction={handleInteraction} />;
        default:
          return <EcommerceApp config={config} onInteraction={handleInteraction} />;
      }
    };
    
    // Make sure we have a valid device model, defaulting to the first one if needed
    const deviceModel = config.deviceModel;
    
    // Ensure we have a valid device model by checking if it exists
    if (!deviceModels[deviceModel]) {
      console.warn(`Invalid device model: ${deviceModel}, using default`);
      return <div>Loading device...</div>; // Show a loading state while we wait for the useEffect to fix the model
    }
    
    const deviceStyle = deviceModels[deviceModel];
    
    return (
      <div className="h-full flex items-center justify-center relative" ref={deviceRef}>
        {showGuide && (
          <div className="absolute top-4 left-0 right-0 z-20 flex justify-center">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
              <div className="flex items-center">
                <div 
                  className="h-6 w-6 rounded-full bg-white mr-2 flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {demoStep}
                </div>
                <span className="text-sm font-medium">
                  {demoStep === 1 && "Navegue para o carrinho"}
                  {demoStep === 2 && "Adicione um produto ao carrinho"}
                  {demoStep === 3 && "Finalize a compra"}
                  {demoStep === 4 && "Demonstração concluída!"}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div 
          className="device-frame relative transform transition-all duration-500"
          style={{
            width: `${deviceStyle.width * 1.1}px`,
            boxShadow: deviceStyle.shadowStyle,
          }}
        >
          <div 
            className="device-body rounded-[40px] overflow-hidden relative"
            style={{
              backgroundColor: deviceStyle.bezelColor,
              borderRadius: deviceStyle.borderRadius,
              padding: `${deviceStyle.bezelWidth}px`,
            }}
          >
            {/* Device notch or camera */}
            {deviceStyle.notchStyle === 'dynamic-island' ? (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[30px] w-[120px] bg-black rounded-b-[14px] z-10"></div>
            ) : (
              <div className="absolute top-[12px] right-[80px] h-[10px] w-[10px] bg-black rounded-full z-10 border border-gray-800"></div>
            )}
            
            {/* Device screen */}
            <div 
              className="device-screen rounded-[30px] overflow-hidden bg-white relative"
              style={{
                height: `${deviceStyle.height}px`,
                width: `${deviceStyle.width}px`,
              }}
            >
              {/* Status bar */}
              <div className="h-8 bg-transparent absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-5">
                <div className="text-xs font-medium">
                  {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 7C6 5.6 7.1 4.5 8.5 4.5C9.9 4.5 11 5.6 11 7S9.9 9.5 8.5 9.5C7.1 9.5 6 8.4 6 7ZM20 9H12V7H20V9ZM6 15C6 13.6 7.1 12.5 8.5 12.5C9.9 12.5 11 13.6 11 15S9.9 17.5 8.5 17.5C7.1 17.5 6 16.4 6 15ZM20 17H12V15H20V17Z" />
                    </svg>
                  </div>
                  <div className="h-3 w-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 20H20V22H4V20H7C7 17.24 9.24 15 12 15C14.76 15 17 17.24 17 20ZM12 13C9.33 13 4 14.34 4 17V20H1V17C1 13.5 8.67 11 12 11C15.33 11 23 13.5 23 17V20H20V17C20 14.34 14.67 13 12 13ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4Z" />
                    </svg>
                  </div>
                  <div className="h-3 w-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 18H6.5V21H4V18ZM8 18H10.5V21H8V18ZM12 18H14.5V21H12V18ZM16 18H18.5V21H16V18ZM19 10V8H22V6H19V4H17V6H14V4H12V6H9V4H7V6H4V8H7V10H4V12H7V14H4V16H7V18H9V16H12V18H14V16H17V18H19V16H22V14H19V12H22V10H19ZM10 8H12V10H10V8ZM10 12H12V14H10V12ZM14 8H16V10H14V8ZM14 12H16V14H14V12Z" />
                    </svg>
                  </div>
                  <div className="h-3 w-8 flex items-end justify-end space-x-0.5">
                    <div className="h-1 w-1 bg-current rounded-full"></div>
                    <div className="h-2 w-1 bg-current rounded-full"></div>
                    <div className="h-3 w-1 bg-current rounded-full"></div>
                    <div className="h-2 w-1 bg-current rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* App content */}
              <div className="h-full w-full">
                {getAppComponent()}
              </div>
            </div>
          </div>
          
          {/* Power button */}
          <div 
            className="absolute -right-[2px] top-[120px] h-[60px] w-[3px] rounded-l-sm"
            style={{ 
              backgroundColor: deviceStyle.bezelColor,
              background: 'linear-gradient(to right, #555, #222)',
            }}
          ></div>
          
          {/* Volume buttons */}
          <div 
            className="absolute -left-[2px] top-[100px] h-[30px] w-[3px] rounded-r-sm"
            style={{ 
              backgroundColor: deviceStyle.bezelColor,
              background: 'linear-gradient(to left, #555, #222)',
            }}
          ></div>
          <div 
            className="absolute -left-[2px] top-[140px] h-[30px] w-[3px] rounded-r-sm"
            style={{ 
              backgroundColor: deviceStyle.bezelColor,
              background: 'linear-gradient(to left, #555, #222)',
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section id="app-simulator" ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Experimente seu aplicativo corporativo
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Teste um protótipo funcional do seu aplicativo com uma experiência imersiva,
            interativa e personalizada para visualizar como sua solução funcionaria no mundo real.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-white p-8 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalização do aplicativo</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nome do aplicativo
              </label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => setConfig({...config, appName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="JimmyDev App"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Logo do aplicativo
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
                Modo de aparência
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`p-3 border rounded-lg flex items-center justify-center transition-all ${
                    !config.darkMode 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setConfig({...config, darkMode: false})}
                >
                  <Sun size={18} className="mr-2" />
                  <span className="text-sm font-medium">Claro</span>
                </button>
                <button
                  className={`p-3 border rounded-lg flex items-center justify-center transition-all ${
                    config.darkMode 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setConfig({...config, darkMode: true})}
                >
                  <Moon size={18} className="mr-2" />
                  <span className="text-sm font-medium">Escuro</span>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Modelo de dispositivo
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(deviceModels).map(([key, device]) => (
                  <button
                    key={key}
                    className={`p-3 border rounded-lg flex items-center justify-center transition-all flex-col ${
                      config.deviceModel === key 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setConfig({...config, deviceModel: key as any})}
                  >
                    <Smartphone size={20} className="mb-1" />
                    <span className="text-sm font-medium">{device.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tipo de aplicativo
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
                          onClick={() => setConfig({...config, template: key as any})}
                        >
                          <div className="text-2xl mb-1">{template.icon}</div>
                          <div className="text-sm font-medium">{template.name}</div>
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
                  <ImageUploader type="custom" imageKey="post1" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Produto 1</div>
                  <ImageUploader type="custom" imageKey="product1" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={startGuidedDemo} 
                className="btn-primary flex items-center justify-center bg-primary"
              >
                <Play size={18} className="mr-2" />
                Iniciar demonstração guiada
              </button>
              <button 
                onClick={handleExportConfig} 
                className="btn-primary flex items-center justify-center"
              >
                <ClipboardCheck size={18} className="mr-2" />
                Exportar configuração
              </button>
              <button 
                onClick={handleExportGif} 
                className="btn-outline flex items-center justify-center"
              >
                <Video size={18} className="mr-2" />
                Salvar como GIF
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
            <div className="bg-white p-6 rounded-xl shadow-sm h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Aplicativo interativo</h3>
                <div className="flex items-center">
                  <div className="bg-slate-100 rounded-lg p-1 flex mr-2">
                    <button 
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'device' ? 'bg-primary text-white' : 'text-neutral-600'}`}
                      onClick={() => setViewMode('device')}
                    >
                      <Smartphone size={18} />
                    </button>
                    <button 
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'analytics' ? 'bg-primary text-white' : 'text-neutral-600'}`}
                      onClick={() => setViewMode('analytics')}
                    >
                      <BarChart2 size={18} />
                    </button>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          className="p-2 rounded-lg transition-colors text-neutral-600 hover:bg-slate-100"
                          onClick={() => {
                            toast.success('Link do simulador copiado para a área de transferência!');
                            trackEvent('share_simulator');
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
              
              <div className="h-[680px] overflow-auto bg-slate-100 rounded-lg p-4">
                {viewMode === 'device' ? renderDeviceContent() : <AnalyticsPanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
