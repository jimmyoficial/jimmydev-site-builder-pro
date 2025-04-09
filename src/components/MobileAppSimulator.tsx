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
      <div className="p-4 shadow-md" style={{ backgroundColor: config.primaryColor }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-9 w-auto mr-2 object-contain" />
            ) : (
              <div className="text-2xl font-bold text-white mr-2">{templates.rideshare.icon}</div>
            )}
            <span className="text-xl font-bold text-white">{config.appName}</span>
          </div>
          <div className="flex space-x-3">
            <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Para onde vamos?</p>
          <div className="flex items-center bg-gray-100 rounded-lg p-2.5">
            <div className="bg-gray-300 h-5 w-5 rounded-full mr-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-500">Buscar destino...</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full relative bg-[#E8ECF0]">
            <div className="absolute inset-0">
              <div className="h-2 bg-gray-300 absolute top-1/4 left-0 right-0"></div>
              <div className="h-2 bg-gray-300 absolute top-2/4 left-0 right-0"></div>
              <div className="h-2 bg-gray-300 absolute top-3/4 left-0 right-0"></div>
              <div className="w-2 bg-gray-300 absolute left-1/4 top-0 bottom-0"></div>
              <div className="w-2 bg-gray-300 absolute left-2/4 top-0 bottom-0"></div>
              <div className="w-2 bg-gray-300 absolute left-3/4 top-0 bottom-0"></div>
              
              <div className="absolute top-[10%] left-[10%] w-[15%] h-[15%] bg-gray-200 rounded-sm shadow-sm"></div>
              <div className="absolute top-[10%] left-[70%] w-[15%] h-[15%] bg-gray-200 rounded-sm shadow-sm"></div>
              <div className="absolute top-[60%] left-[30%] w-[15%] h-[15%] bg-gray-200 rounded-sm shadow-sm"></div>
              <div className="absolute top-[65%] left-[70%] w-[10%] h-[10%] bg-gray-200 rounded-sm shadow-sm"></div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="h-5 w-5 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                <div className="absolute -top-1 -left-1 h-7 w-7 rounded-full bg-blue-500/30 animate-ping"></div>
              </div>
            </div>
            
            <div className="absolute top-[30%] left-[65%]">
              <div className="h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-5 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-semibold">Transportes disponíveis</div>
          <div className="text-sm text-gray-500 font-medium">Agora</div>
        </div>
        
        <div className="flex justify-between items-center p-3.5 rounded-xl mb-3 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all duration-200">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
            <div>
              <div className="font-medium text-gray-900">Econômico</div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">3 min</span>
                <span className="inline-block h-1 w-1 rounded-full bg-gray-300 mx-1"></span>
                <span>Sedã</span>
              </div>
            </div>
          </div>
          <div className="font-semibold text-lg" style={{ color: config.primaryColor }}>R$ 18,90</div>
        </div>
        
        <div className="flex justify-between items-center p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all duration-200" 
             style={{ borderColor: config.primaryColor, backgroundColor: `${config.primaryColor}10` }}>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full mr-4 flex items-center justify-center" 
                 style={{ backgroundColor: `${config.primaryColor}20` }}>
              <div className="h-8 w-8 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: `${config.primaryColor}50` }}>
                <span className="text-sm">★</span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">Confort</div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">5 min</span>
                <span className="inline-block h-1 w-1 rounded-full bg-gray-300 mx-1"></span>
                <span>SUV</span>
              </div>
            </div>
          </div>
          <div className="font-semibold text-lg" style={{ color: config.primaryColor }}>R$ 25,50</div>
        </div>
        
        <button 
          className="w-full mt-4 py-3 rounded-xl font-semibold text-white transition-all shadow-md hover:shadow-lg"
          style={{ backgroundColor: config.primaryColor }}
        >
          Solicitar {config.appName}
        </button>
      </div>
    </div>
  );

  const FoodTemplate = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 shadow-sm" style={{ backgroundColor: config.primaryColor }}>
        <div className="flex items-center justify-between mb-4">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white mr-2">{templates.food.icon}</div>
              <span className="text-xl font-bold text-white">{config.appName}</span>
            </div>
          )}
          <div className="flex space-x-3 text-white">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20">
              <span className="text-sm">🔍</span>
            </div>
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20">
              <span className="text-sm">🛒</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg flex items-center p-3 shadow-md">
          <div className="text-gray-400 mr-2 text-lg">🔍</div>
          <span className="text-sm text-gray-500">Buscar restaurantes e pratos...</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <div className="rounded-xl overflow-hidden mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          <div className="h-44 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-30 flex items-center justify-center">
              <div className="grid grid-cols-3 w-full h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center text-4xl p-2">
                    {i % 3 === 0 ? '🍕' : i % 3 === 1 ? '🍔' : '🌮'}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="text-white font-bold text-xl mb-1">Aproveite hoje</div>
            <div className="text-white/90 text-sm mb-2">Descontos exclusivos em pratos selecionados</div>
            <button 
              className="px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
              style={{ backgroundColor: config.secondaryColor, color: 'white' }}
            >
              Pedir agora
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Categorias</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-1 px-1">
            <CategoryItem emoji="🍔" name="Lanches" color={config.primaryColor} />
            <CategoryItem emoji="🍕" name="Pizza" color={config.secondaryColor} />
            <CategoryItem emoji="🍣" name="Japonês" color="#EC4899" />
            <CategoryItem emoji="🥗" name="Saudável" color="#10B981" />
            <CategoryItem emoji="🍦" name="Doces" color="#8B5CF6" />
            <CategoryItem emoji="🍝" name="Massas" color="#F59E0B" />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Promoções</h3>
            <span className="text-sm font-medium" style={{ color: config.primaryColor }}>Ver todas</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PromotedRestaurant 
              emoji="🍔" 
              name="Burger Special" 
              discount="30% OFF" 
              time="30-45 min"
              rating={4.8}
              color={config.primaryColor}
            />
            <PromotedRestaurant 
              emoji="🍕" 
              name="Pizza Express" 
              discount="Frete Grátis" 
              time="40-55 min"
              rating={4.5}
              color={config.secondaryColor}
            />
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-3">Restaurantes próximos</h3>
          <div className="space-y-4">
            <RestaurantItem 
              logo="🍔"
              name="Burger King"
              info="Lanches • 0.8 km"
              time="25-35 min"
              rating={4.5}
              reviews={500}
              primary={config.primaryColor}
            />
            <RestaurantItem 
              logo="🍕"
              name="Pizza Hut"
              info="Pizza • 1.2 km"
              time="40-50 min"
              rating={4.2}
              reviews={350}
              primary={config.primaryColor}
            />
            <RestaurantItem 
              logo="🥗"
              name="Salad Days"
              info="Saudável • 0.9 km"
              time="20-30 min"
              rating={4.7}
              reviews={210}
              primary={config.primaryColor}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around">
          <NavItem icon="🏠" label="Início" active={true} color={config.primaryColor} />
          <NavItem icon="🔍" label="Buscar" active={false} />
          <NavItem icon="📋" label="Pedidos" active={false} />
          <NavItem icon="👤" label="Perfil" active={false} />
        </div>
      </div>
    </div>
  );

  const StreamingTemplate = () => (
    <div className="h-full bg-black text-white flex flex-col">
      <div className="p-4 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="flex items-center justify-between mb-6">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="text-xl font-bold" style={{ color: config.primaryColor || '#E50914' }}>{config.appName}</div>
          )}
          <div className="flex space-x-5">
            <div className="text-sm">🔍</div>
            <div className="text-sm">👤</div>
          </div>
        </div>
        
        <div className="flex space-x-5 text-sm mb-1">
          <div className="font-medium">Início</div>
          <div className="text-gray-400">Séries</div>
          <div className="text-gray-400">Filmes</div>
          <div className="text-gray-400">Minha Lista</div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pb-4">
        <div className="relative h-60 mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="h-full w-full bg-gradient-to-br from-purple-900 to-red-900 relative">
              <div className="absolute inset-0 opacity-20 grid grid-cols-2 grid-rows-2">
                <div className="flex items-center justify-center text-6xl opacity-30">🎬</div>
                <div className="flex items-center justify-center text-6xl opacity-30">🎭</div>
                <div className="flex items-center justify-center text-6xl opacity-30">🍿</div>
                <div className="flex items-center justify-center text-6xl opacity-30">📺</div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <div className="flex items-start mb-3">
              <div className="mr-2 text-sm px-1.5 py-0.5 bg-red-600 text-white font-bold rounded">TOP 10</div>
              <div className="text-sm px-1.5 py-0.5 bg-gray-800 text-white font-medium rounded">Novo</div>
            </div>
            <div className="font-bold text-2xl mb-1">Stranger Series</div>
            <div className="flex items-center mb-3">
              <div className="text-green-500 mr-2 text-sm font-medium">97% compatível</div>
              <div className="text-xs text-gray-400">2023</div>
              <div className="mx-1 text-gray-500 text-xs">•</div>
              <div className="text-xs border border-gray-600 px-1 rounded text-gray-400">16</div>
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-4 py-1.5 rounded flex items-center justify-center space-x-2 flex-1"
                style={{ backgroundColor: config.primaryColor || '#FFFFFF' }}
              >
                <span className="text-black">▶</span>
                <span className="text-black font-medium">Assistir</span>
              </button>
              <button className="px-3 py-1.5 bg-gray-800 rounded flex items-center justify-center space-x-2">
                <span>+</span>
                <span className="font-medium">Minha Lista</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-4 mb-6">
          <h3 className="font-bold mb-2">Continue assistindo</h3>
          <div className="flex space-x-3 overflow-x-auto py-2 -mx-1 px-1">
            <ContinueWatchingItem 
              emoji="🎭" 
              title="Drama Series" 
              progress={75} 
              primaryColor={config.primaryColor} 
            />
            <ContinueWatchingItem 
              emoji="🎬" 
              title="Action Movie" 
              progress={25} 
              primaryColor={config.primaryColor} 
            />
            <ContinueWatchingItem 
              emoji="👻" 
              title="Horror Show" 
              progress={50} 
              primaryColor={config.primaryColor} 
            />
          </div>
        </div>
        
        <div className="px-4 mb-6">
          <h3 className="font-bold mb-2">Populares no {config.appName}</h3>
          <div className="flex space-x-3 overflow-x-auto py-2 -mx-1 px-1">
            <ContentItem number={1} emoji="🦸" color="#3B82F6" />
            <ContentItem number={2} emoji="👻" color="#F43F5E" />
            <ContentItem number={3} emoji="😂" color="#10B981" />
            <ContentItem number={4} emoji="🤠" color="#F59E0B" />
            <ContentItem number={5} emoji="🚀" color="#8B5CF6" />
          </div>
        </div>
        
        <div className="px-4 mb-6">
          <h3 className="font-bold mb-2">Recomendados para você</h3>
          <div className="grid grid-cols-2 gap-3">
            <RecommendedItem 
              emoji="🦸" 
              title="Heroes" 
              match={98} 
              year="2023" 
              rating="13"
            />
            <RecommendedItem 
              emoji="🚀" 
              title="Space Saga" 
              match={95} 
              year="2022" 
              rating="16"
            />
            <RecommendedItem 
              emoji="🔍" 
              title="Detective" 
              match={89} 
              year="2021" 
              rating="14"
            />
            <RecommendedItem 
              emoji="👻" 
              title="Haunted" 
              match={86} 
              year="2023" 
              rating="18"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <NavItem icon="🏠" label="Início" active={true} color={config.primaryColor || '#E50914'} />
          <NavItem icon="🎮" label="Jogos" active={false} />
          <NavItem icon="🔽" label="Downloads" active={false} />
          <NavItem icon="⚙️" label="Mais" active={false} />
        </div>
      </div>
    </div>
  );

  const SocialTemplate = () => (
    <div className="h-full bg-white flex flex-col">
      <div className="border-b border-gray-200 p-3 shadow-sm">
        <div className="flex justify-between items-center">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="text-xl font-bold" style={{ color: config.primaryColor }}>{config.appName}</div>
          )}
          <div className="flex space-x-5">
            <button className="text-xl" style={{ color: config.primaryColor }}>➕</button>
            <button className="text-xl" style={{ color: config.primaryColor }}>💬</button>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex space-x-4 overflow-x-auto -mx-1 px-1">
          <StoryItem 
            emoji="👤" 
            username="Seu story" 
            isOwn={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor} 
          />
          <StoryItem 
            emoji="👩" 
            username="maria_s" 
            hasStory={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor} 
          />
          <StoryItem 
            emoji="👨" 
            username="carlos.r" 
            hasStory={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor} 
          />
          <StoryItem 
            emoji="👧" 
            username="ana_b" 
            hasStory={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor} 
          />
          <StoryItem 
            emoji="🧔" 
            username="pedro.m" 
            hasStory={false} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor} 
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-50">
        <PostItem 
          username="maria_s" 
          avatar="👩" 
          location="Rio de Janeiro, Brasil" 
          image="📸" 
          likes={523} 
          caption="Aproveitando o dia ensolarado! #praia #ferias" 
          timeAgo="2h" 
          comments={42} 
          primaryColor={config.primaryColor} 
        />
        
        <PostItem 
          username="carlos.r" 
          avatar="👨" 
          location="São Paulo, Brasil" 
          image="🌆" 
          likes={1204} 
          caption="Vista incrível da cidade! #saopaulo #skyline" 
          timeAgo="5h" 
          comments={87} 
          primaryColor={config.primaryColor} 
        />
      </div>
      
      <div className="bg-white border-t border-gray-200 p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around">
          <div className="text-xl" style={{ color: config.primaryColor }}>🏠</div>
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

  const CategoryItem = ({ emoji, name, color }: { emoji: string, name: string, color: string }) => (
    <div className="flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-xl mb-1.5 shadow-sm"
           style={{ background: `${color}15` }}>
        <div className="text-2xl">{emoji}</div>
      </div>
      <span className="text-xs font-medium">{name}</span>
    </div>
  );

  const PromotedRestaurant = ({ 
    emoji, name, discount, time, rating, color 
  }: { 
    emoji: string, 
    name: string, 
    discount: string, 
    time: string, 
    rating: number, 
    color: string 
  }) => (
    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <div className="h-24 bg-gray-100 relative" style={{ background: `${color}15` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {emoji}
        </div>
        <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full text-xs font-medium shadow-sm" 
             style={{ color }}>
          {discount}
        </div>
      </div>
      <div className="p-2">
        <div className="font-medium text-sm mb-0.5">{name}</div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">{time}</div>
          <div className="flex items-center">
            <span className="text-yellow-500 text-xs mr-0.5">★</span>
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const RestaurantItem = ({ 
    logo, name, info, time, rating, reviews, primary 
  }: { 
    logo: string, 
    name: string, 
    info: string, 
    time: string, 
    rating: number, 
    reviews: number, 
    primary: string 
  }) => (
    <div className="flex border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-3xl">
        {logo}
      </div>
      <div className="p-3 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-gray-500 mb-1">{info}</div>
          </div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
        <div className="flex items-center text-xs">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-medium mr-1">{rating}</span>
          <span className="text-gray-400">({reviews}+)</span>
          <div className="ml-auto">
            <span className="text-xs px-1.5 py-0.5 rounded" 
                  style={{ backgroundColor: `${primary}10`, color: primary }}>
              Pedir
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const ContinueWatchingItem = ({ 
    emoji, title, progress, primaryColor 
  }: { 
    emoji: string, 
    title: string, 
    progress: number, 
    primaryColor: string 
  }) => (
    <div className="w-32 flex-shrink-0">
      <div className="h-20 bg-gray-800 rounded-md mb-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
          <div className="h-full" style={{ width: `${progress}%`, backgroundColor: primaryColor || '#E50914' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/60">
          <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
            <div className="text-white text-sm">▶️</div>
          </div>
        </div>
      </div>
      <div className="text-xs">{title}</div>
    </div>
  );

  const ContentItem = ({ number, emoji, color }: { number: number, emoji: string, color: string }) => (
    <div className="relative h-24 w-16 flex-shrink-0">
      <div className="absolute top-0 -left-1 z-10 font-bold text-5xl text-white drop-shadow-md" style={{ WebkitTextStroke: '2px #000' }}>
        {number}
      </div>
      <div className="absolute inset-0 left-6 rounded-md bg-gray-800 overflow-hidden" style={{ background: `${color}40` }}>
        <div className="h-full w-full flex items-center justify-center">
          {emoji}
        </div>
      </div>
    </div>
  );

  const RecommendedItem = ({ 
    emoji, title, match, year, rating 
  }: { 
    emoji: string, 
    title: string, 
    match: number, 
    year: string, 
    rating: string 
  }) => (
    <div className="rounded-md overflow-hidden">
      <div className="h-32 bg-gray-800 rounded-md mb-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          {emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-2 left-2 text-xs font-bold">{title}</div>
      </div>
      <div className="flex items-center">
        <div className="text-xs text-green-500 font-medium">{match}% relevante</div>
        <div className="mx-1 text-xs text-gray-500">•</div>
        <div className="text-xs text-gray-400">{year}</div>
        <div className="ml-auto text-xs border border-gray-600 px-1 rounded text-gray-400">{rating}</div>
      </div>
    </div>
  );

  const StoryItem = ({ 
    emoji, username, isOwn = false, hasStory = false, primaryColor, secondaryColor 
  }: { 
    emoji: string, 
    username: string, 
    isOwn?: boolean, 
    hasStory?: boolean, 
    primaryColor: string, 
    secondaryColor: string 
  }) => (
    <div className="flex flex-col items-center min-w-[72px]">
      <div className={`h-16 w-16 rounded-full p-[2px] flex items-center justify-center mb-1 ${
        hasStory 
          ? 'bg-gradient-to-br from-pink-500 to-yellow-500' 
          : isOwn 
            ? `bg-gradient-to-br` 
            : 'bg-gray-200'
      }`}
        style={isOwn ? { backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` } : {}}
      >
        <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
          <div className="text-xl">{emoji}</div>
        </div>
      </div>
      <span className="text-xs truncate w-full text-center">{username}</span>
    </div>
  );

  const PostItem = ({ 
    username, avatar, location, image, likes, caption, timeAgo, comments, primaryColor 
  }: { 
    username: string, 
    avatar: string, 
    location: string, 
    image: string, 
    likes: number, 
    caption: string, 
    timeAgo: string, 
    comments: number, 
    primaryColor: string 
  }) => (
    <div className="border-b border-gray-200 bg-white mb-3">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center overflow-hidden">
            <div className="text-sm">{avatar}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{username}</div>
            <div className="text-xs text-gray-500">{location}</div>
          </div>
        </div>
        <button className="text-lg">⋯</button>
      </div>
      
      <div className="aspect-square bg-gray-100 flex items-center justify-center border-y border-gray-100">
        <div className="text-6xl">{image}</div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button className="text-2xl" style={{ color: primaryColor }}>❤️</button>
            <button className="text-2xl text-neutral-800">💬</button>
            <button className="text-2xl text-neutral-800">📤</button>
          </div>
          <button className="text-2xl text-neutral-800">🔖</button>
        </div>
        
        <div className="text-sm font-semibold mb-1">{likes.toLocaleString()} curtidas</div>
        
        <div className="text-sm">
          <span className="font-semibold">{username}</span> {caption}
        </div>
        
        <div className="text-sm text-gray-500 mt-1">Ver todos os {comments} comentários</div>
        
        <div className="text-xs text-gray-400 mt-1">{timeAgo}</div>
      </div>
    </div>
  );

  const NavItem = ({ 
    icon, label, active = false, color = '#9CA3AF' 
  }: { 
    icon: string, 
    label: string, 
    active?: boolean, 
    color?: string 
  }) => (
    <div className="flex flex-col items-center">
      <div className="text-lg" style={{ color: active ? color : '#9CA3AF' }}>{icon}</div>
      <span className="text-xs" style={{ color: active ? color : '#9CA3AF' }}>{label}</span>
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
          <div className="bg-white p-6 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalizar App</h3>
            
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
