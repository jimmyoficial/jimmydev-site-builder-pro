
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RefreshCw, Upload } from 'lucide-react';
import { toast } from 'sonner';

type AppTemplate = 'rideshare' | 'food' | 'streaming' | 'social';

interface MobileAppConfig {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  template: AppTemplate;
  appName: string;
}

const defaultConfig: MobileAppConfig = {
  logo: null,
  primaryColor: '#F97316', // Orange
  secondaryColor: '#8B5CF6', // Purple
  template: 'rideshare',
  appName: 'Meu Aplicativo',
};

const templates = {
  rideshare: {
    name: 'Transporte',
    description: 'Aplicativo de transporte estilo Uber e 99Taxi.',
    icon: '🚗',
  },
  food: {
    name: 'Delivery',
    description: 'Aplicativo de delivery estilo iFood e Rappi.',
    icon: '🍔',
  },
  streaming: {
    name: 'Streaming',
    description: 'Aplicativo de streaming estilo Netflix e Prime Video.',
    icon: '🎬',
  },
  social: {
    name: 'Social',
    description: 'Aplicativo de rede social estilo Instagram.',
    icon: '📱',
  },
};

export const MobileAppSimulator: React.FC = () => {
  const [config, setConfig] = useLocalStorage<MobileAppConfig>('jimmydev-app-simulator', defaultConfig);
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

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
    toast.success('Configuração salva como PDF! Em um ambiente real, o PDF seria gerado.');
  };

  const RideshareTemplate = () => (
    <div className="h-full bg-gray-100 flex flex-col">
      <div className="p-4" style={{ backgroundColor: config.primaryColor }}>
        <div className="flex items-center mb-4">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-10 mr-2" />
          ) : (
            <div className="text-2xl font-bold text-white mr-2">{templates.rideshare.icon}</div>
          )}
          <span className="text-xl font-bold text-white">{config.appName}</span>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-md">
          <p className="text-sm text-gray-600 mb-2">Para onde vamos?</p>
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <div className="bg-gray-300 h-4 w-4 rounded-full mr-2"></div>
            <span className="text-sm">Buscar destino...</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="h-full w-full bg-gray-200">
          {/* Simplified map */}
          <div className="grid grid-cols-5 grid-rows-5 h-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="border border-gray-300" style={{ backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}></div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 shadow-t-lg">
        <div className="flex justify-between mb-3">
          <div className="text-sm font-medium">Transportes disponíveis</div>
          <div className="text-sm text-gray-500">Agora</div>
        </div>
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg mb-2">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <div className="font-medium">Econômico</div>
              <div className="text-xs text-gray-500">3 min</div>
            </div>
          </div>
          <div className="font-medium">R$ 18,90</div>
        </div>
        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <div className="font-medium">Confort</div>
              <div className="text-xs text-gray-500">5 min</div>
            </div>
          </div>
          <div className="font-medium">R$ 25,50</div>
        </div>
      </div>
    </div>
  );

  const FoodTemplate = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4" style={{ backgroundColor: config.primaryColor }}>
        <div className="flex items-center justify-between mb-4">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-10" />
          ) : (
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white mr-2">{templates.food.icon}</div>
              <span className="text-xl font-bold text-white">{config.appName}</span>
            </div>
          )}
          <div className="flex space-x-2 text-white">
            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/20">
              <span className="text-sm">🔍</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg flex items-center p-2 shadow-md">
          <div className="text-gray-400 mr-2">🔍</div>
          <span className="text-sm text-gray-500">Buscar restaurantes e pratos...</span>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto">
        <div className="rounded-lg overflow-hidden mb-4 h-32 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🍕</div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
            <div className="text-sm font-medium">Aproveite hoje: 30% OFF</div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-3">Categorias</h3>
          <div className="flex space-x-3 overflow-x-auto py-2">
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-xl mb-1">🍔</div>
              <span className="text-xs">Lanches</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-xl mb-1">🍕</div>
              <span className="text-xs">Pizza</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-xl mb-1">🍣</div>
              <span className="text-xs">Japonês</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-xl mb-1">🥗</div>
              <span className="text-xs">Saudável</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3">Restaurantes próximos</h3>
          <div className="space-y-4">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-2xl">🍔</div>
              <div className="p-3 flex-1">
                <div className="font-medium">Burger King</div>
                <div className="text-xs text-gray-500 mb-1">25-35 min • 3.2 km</div>
                <div className="flex items-center text-xs">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">4.5 (500+)</span>
                </div>
              </div>
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-2xl">🍕</div>
              <div className="p-3 flex-1">
                <div className="font-medium">Pizza Hut</div>
                <div className="text-xs text-gray-500 mb-1">40-50 min • 2.8 km</div>
                <div className="flex items-center text-xs">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">4.2 (350+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <div className="flex flex-col items-center text-xs">
            <span>🏠</span>
            <span>Início</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-400">
            <span>🔍</span>
            <span>Buscar</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-400">
            <span>📋</span>
            <span>Pedidos</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-400">
            <span>👤</span>
            <span>Perfil</span>
          </div>
        </div>
      </div>
    </div>
  );

  const StreamingTemplate = () => (
    <div className="h-full bg-black text-white flex flex-col">
      <div className="p-4 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center justify-between mb-6">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8" />
          ) : (
            <div className="text-xl font-bold text-red-600">{config.appName}</div>
          )}
          <div className="flex space-x-4">
            <div className="text-sm">🔍</div>
            <div className="text-sm">👤</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto pb-4">
        <div className="relative h-40 mb-4">
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-4xl">🎬</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
            <div className="font-bold">Lançamento da Semana</div>
            <div className="text-sm text-gray-300">Nova temporada disponível</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-white/30 flex items-center justify-center">
              <div className="text-white text-xl">▶️</div>
            </div>
          </div>
        </div>
        <div className="px-4 mb-4">
          <h3 className="font-bold mb-2">Continue assistindo</h3>
          <div className="flex space-x-3 overflow-x-auto py-2">
            <div className="w-32 flex-shrink-0">
              <div className="h-20 bg-gray-800 rounded mb-1 relative">
                <div className="absolute inset-0 flex items-center justify-center">🎭</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div className="h-full w-3/4 bg-red-600"></div>
                </div>
              </div>
              <div className="text-xs">Série Drama</div>
            </div>
            <div className="w-32 flex-shrink-0">
              <div className="h-20 bg-gray-800 rounded mb-1 relative">
                <div className="absolute inset-0 flex items-center justify-center">🎬</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div className="h-full w-1/4 bg-red-600"></div>
                </div>
              </div>
              <div className="text-xs">Filme Ação</div>
            </div>
          </div>
        </div>
        <div className="px-4 mb-4">
          <h3 className="font-bold mb-2">Recomendados para você</h3>
          <div className="flex space-x-3 overflow-x-auto py-2">
            <div className="w-32 flex-shrink-0">
              <div className="h-48 bg-gray-800 rounded mb-1 flex items-center justify-center">
                <div className="text-3xl">🦸</div>
              </div>
              <div className="text-xs">Super-heróis</div>
            </div>
            <div className="w-32 flex-shrink-0">
              <div className="h-48 bg-gray-800 rounded mb-1 flex items-center justify-center">
                <div className="text-3xl">👻</div>
              </div>
              <div className="text-xs">Terror</div>
            </div>
            <div className="w-32 flex-shrink-0">
              <div className="h-48 bg-gray-800 rounded mb-1 flex items-center justify-center">
                <div className="text-3xl">😂</div>
              </div>
              <div className="text-xs">Comédia</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <div className="flex flex-col items-center text-xs">
            <span>🏠</span>
            <span>Início</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-500">
            <span>🎮</span>
            <span>Jogos</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-500">
            <span>🔽</span>
            <span>Downloads</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-500">
            <span>⚙️</span>
            <span>Mais</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SocialTemplate = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="border-b border-gray-200 p-3">
        <div className="flex justify-between items-center">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8" />
          ) : (
            <div className="text-xl font-bold" style={{ color: config.primaryColor }}>{config.appName}</div>
          )}
          <div className="flex space-x-4">
            <span>➕</span>
            <span>💬</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-b border-gray-200">
        <div className="flex space-x-3 overflow-x-auto">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 p-[2px]">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <div className="text-xl">👤</div>
              </div>
            </div>
            <span className="text-xs mt-1">Seu story</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 p-[2px]">
              <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <div className="text-xl">👩</div>
              </div>
            </div>
            <span className="text-xs mt-1">amigo1</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 p-[2px]">
              <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <div className="text-xl">👨</div>
              </div>
            </div>
            <span className="text-xs mt-1">amigo2</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="border-b border-gray-200">
          <div className="p-2 flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center overflow-hidden">
              <div className="text-sm">👩</div>
            </div>
            <div className="text-sm font-medium">amigo1</div>
          </div>
          <div className="h-72 bg-gray-200 flex items-center justify-center">
            <div className="text-5xl">📸</div>
          </div>
          <div className="p-3">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <span>❤️</span>
                <span>💬</span>
                <span>📤</span>
              </div>
              <span>🔖</span>
            </div>
            <div className="text-sm font-medium mb-1">500 curtidas</div>
            <div className="text-sm">
              <span className="font-medium">amigo1</span> Aproveitando o dia!
            </div>
            <div className="text-xs text-gray-500 mt-1">Ver todos os 50 comentários</div>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <div className="text-xl">🏠</div>
          <div className="text-xl text-gray-400">🔍</div>
          <div className="text-xl text-gray-400">📹</div>
          <div className="text-xl text-gray-400">❤️</div>
          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-xs">👤</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="mobile-simulator" className="section-padding bg-gray-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Visualize seu aplicativo móvel
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Experimente diferentes modelos de apps e personalize cores, logo e conteúdo para
            visualizar como seu aplicativo móvel ficaria.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-white p-6 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalizar App</h3>
            
            {/* App Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral mb-2">
                Nome do aplicativo
              </label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => setConfig({...config, appName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Meu Aplicativo"
              />
            </div>
            
            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral mb-2">
                Logo do aplicativo
              </label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInput?.click()}
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
                        fileInput?.click();
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
                  ref={(input) => setFileInput(input)} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleLogoUpload} 
                />
              </div>
            </div>
            
            {/* Color Pickers */}
            <div className="mb-6">
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
            
            <div className="mb-6">
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral mb-2">
                Tipo de aplicativo
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(templates).map(([key, template]) => (
                  <button
                    key={key}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      config.template === key 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setConfig({...config, template: key as AppTemplate})}
                  >
                    <div className="text-2xl mb-1">{template.icon}</div>
                    <div className="text-sm font-medium">{template.name}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={generatePDF} 
                className="btn-primary flex items-center justify-center"
              >
                <Download size={18} className="mr-2" />
                Salvar configuração
              </button>
              <button 
                onClick={handleReset} 
                className="btn-outline flex items-center justify-center"
              >
                <RefreshCw size={18} className="mr-2" />
                Restaurar padrão
              </button>
            </div>
          </div>
          
          {/* Preview */}
          <div className="col-span-2 animate-on-scroll" style={{ animationDelay: '600ms' }}>
            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-center">
              <div className="iphone-frame">
                <div className="iphone-notch"></div>
                <div className="iphone-screen">
                  <Tabs defaultValue={config.template} onValueChange={(value) => setConfig({...config, template: value as AppTemplate})}>
                    <TabsList className="absolute top-[40px] left-1/2 transform -translate-x-1/2 z-20 bg-black/70 text-white">
                      <TabsTrigger value="rideshare" className="text-xs">{templates.rideshare.icon}</TabsTrigger>
                      <TabsTrigger value="food" className="text-xs">{templates.food.icon}</TabsTrigger>
                      <TabsTrigger value="streaming" className="text-xs">{templates.streaming.icon}</TabsTrigger>
                      <TabsTrigger value="social" className="text-xs">{templates.social.icon}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="rideshare" className="h-full">
                      <RideshareTemplate />
                    </TabsContent>
                    
                    <TabsContent value="food" className="h-full">
                      <FoodTemplate />
                    </TabsContent>
                    
                    <TabsContent value="streaming" className="h-full">
                      <StreamingTemplate />
                    </TabsContent>
                    
                    <TabsContent value="social" className="h-full">
                      <SocialTemplate />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
