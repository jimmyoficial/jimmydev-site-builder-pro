import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  RefreshCw, 
  Upload, 
  CheckCircle2, 
  Map, 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  Search, 
  Home, 
  ShoppingBag, 
  List, 
  User, 
  Play,
  Heart, 
  MessageSquare,
  BookOpen,
  PlusCircle,
  Share2
} from 'lucide-react';
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
  primaryColor: '#1E3A8A', // Corporate blue
  secondaryColor: '#2563EB', // Secondary blue
  template: 'rideshare',
  appName: 'Corporativo App',
};

const templates = {
  rideshare: {
    name: 'Transporte Executivo',
    description: 'Aplicativo de transporte corporativo para empresas.',
    icon: <Map size={20} />,
  },
  food: {
    name: 'Delivery Empresarial',
    description: 'Plataforma de delivery para ambientes corporativos.',
    icon: <ShoppingBag size={20} />,
  },
  streaming: {
    name: 'Streaming Corporativo',
    description: 'Plataforma de conteúdo para treinamentos empresariais.',
    icon: <Play size={20} />,
  },
  social: {
    name: 'Rede Corporativa',
    description: 'Rede social interna para comunicação empresarial.',
    icon: <MessageSquare size={20} />,
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
              <div className="text-xl font-bold text-white mr-2">{config.appName}</div>
            )}
          </div>
          <div className="flex space-x-3">
            <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Agendar transporte executivo</p>
          <div className="flex items-center bg-gray-100 rounded-lg p-2.5">
            <Search size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Buscar destino corporativo...</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full relative bg-white">
            {/* Map View */}
            <div className="absolute inset-0">
              {/* Corporate styled map */}
              <div className="h-full w-full bg-slate-100">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full opacity-30">
                  {Array.from({length: 64}).map((_, i) => (
                    <div key={i} className="border border-slate-200"></div>
                  ))}
                </div>
                
                {/* Buildings */}
                <div className="absolute top-[20%] left-[15%] w-[15%] h-[15%] bg-slate-300 shadow-sm"></div>
                <div className="absolute top-[25%] left-[40%] w-[12%] h-[10%] bg-slate-300 shadow-sm"></div>
                <div className="absolute top-[60%] left-[25%] w-[10%] h-[12%] bg-slate-300 shadow-sm"></div>
                <div className="absolute top-[45%] left-[70%] w-[15%] h-[15%] bg-slate-300 shadow-sm"></div>
                
                {/* Roads */}
                <div className="absolute top-[30%] left-0 right-0 h-[3%] bg-slate-200"></div>
                <div className="absolute top-0 bottom-0 left-[30%] w-[3%] bg-slate-200"></div>
                <div className="absolute top-0 bottom-0 left-[60%] w-[3%] bg-slate-200"></div>
                <div className="absolute top-[65%] left-0 right-0 h-[3%] bg-slate-200"></div>
                
                {/* Current location marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div 
                      className="h-5 w-5 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: config.primaryColor }}
                    ></div>
                    <div 
                      className="absolute -top-1 -left-1 h-7 w-7 rounded-full animate-ping opacity-70"
                      style={{ backgroundColor: `${config.primaryColor}50` }}
                    ></div>
                  </div>
                </div>
                
                {/* Destination marker */}
                <div className="absolute top-[30%] left-[65%]">
                  <div className="h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-5 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-semibold text-gray-800">Veículos disponíveis</div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>Agora</span>
          </div>
        </div>
        
        <div 
          className="flex justify-between items-center p-3.5 rounded-xl mb-3 border shadow-sm hover:shadow transition-all duration-200"
          style={{ borderColor: 'rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center">
            <div 
              className="h-12 w-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: `${config.primaryColor}15` }}
            >
              <div className="text-lg">🚗</div>
            </div>
            <div>
              <div className="font-medium text-gray-900">Sedan Executivo</div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">3 min</span>
                <span className="inline-block h-1 w-1 rounded-full bg-gray-300 mx-1"></span>
                <span>Premium</span>
              </div>
            </div>
          </div>
          <div className="font-semibold text-lg" style={{ color: config.primaryColor }}>R$ 48,90</div>
        </div>
        
        <div 
          className="flex justify-between items-center p-3.5 rounded-xl border shadow-sm hover:shadow transition-all duration-200"
          style={{ 
            borderColor: config.primaryColor, 
            backgroundColor: `${config.primaryColor}10` 
          }}
        >
          <div className="flex items-center">
            <div 
              className="h-12 w-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: `${config.primaryColor}20` }}
            >
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}30` }}
              >
                <span className="text-lg">🚙</span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">SUV Corporativa</div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">5 min</span>
                <span className="inline-block h-1 w-1 rounded-full bg-gray-300 mx-1"></span>
                <span>Executivo</span>
              </div>
            </div>
          </div>
          <div className="font-semibold text-lg" style={{ color: config.primaryColor }}>R$ 65,50</div>
        </div>
        
        <button 
          className="w-full mt-4 py-3 rounded-xl font-semibold text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          style={{ backgroundColor: config.primaryColor }}
        >
          <CheckCircle2 size={18} className="mr-2" />
          Solicitar {config.appName}
        </button>
      </div>
    </div>
  );

  const FoodTemplate = () => (
    <div className="h-full bg-white flex flex-col">
      <div 
        className="p-4 shadow-sm"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex items-center justify-between mb-4">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="flex items-center">
              <div className="text-xl font-bold text-white">{config.appName}</div>
            </div>
          )}
          <div className="flex space-x-3 text-white">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20">
              <Search size={16} className="text-white" />
            </div>
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20">
              <ShoppingBag size={16} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg flex items-center p-3 shadow-md">
          <Search size={18} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">Buscar restaurantes corporativos...</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <div className="rounded-xl overflow-hidden mb-6 relative shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          <div 
            className="h-44 flex items-center justify-center relative"
            style={{ backgroundColor: config.secondaryColor }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-4 grid-rows-3 h-full w-full">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="flex items-center justify-center border border-white/10"></div>
                ))}
              </div>
            </div>
            <div className="text-4xl text-white">🍽️</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="text-white font-bold text-xl mb-1">Refeições corporativas</div>
            <div className="text-white/90 text-sm mb-2">Alimentação de qualidade para seu time</div>
            <button 
              className="px-4 py-2 rounded-lg text-sm font-semibold shadow-lg text-white"
              style={{ backgroundColor: config.primaryColor }}
            >
              Ver opções
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Categorias empresariais</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-1 px-1">
            <CategoryItem emoji="🥗" name="Saudável" color={config.primaryColor} icon={<BookOpen size={18} />} />
            <CategoryItem emoji="🍲" name="Almoço" color={config.secondaryColor} icon={<Clock size={18} />} />
            <CategoryItem emoji="☕" name="Coffee break" color={`${config.primaryColor}`} icon={<Calendar size={18} />} />
            <CategoryItem emoji="🥪" name="Snacks" color={`${config.secondaryColor}`} icon={<ShoppingBag size={18} />} />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Serviços especiais</h3>
            <span 
              className="text-sm font-medium" 
              style={{ color: config.primaryColor }}
            >
              Ver todos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PromotedRestaurant 
              title="Coffee Break" 
              subtitle="Serviço corporativo" 
              discount="Desconto 15%" 
              time="30-45 min"
              rating={4.8}
              color={config.primaryColor}
            />
            <PromotedRestaurant 
              title="Buffet Executivo" 
              subtitle="Para eventos" 
              discount="Frete Grátis" 
              time="Agendar"
              rating={4.9}
              color={config.secondaryColor}
            />
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-3">Restaurantes parceiros</h3>
          <div className="space-y-4">
            <RestaurantItem 
              title="Executive Grill"
              description="Grelhados • 0.8 km"
              time="25-35 min"
              rating={4.7}
              reviews={120}
              primary={config.primaryColor}
            />
            <RestaurantItem 
              title="Corporate Pasta"
              description="Italiana • 1.2 km"
              time="30-40 min"
              rating={4.5}
              reviews={95}
              primary={config.primaryColor}
            />
            <RestaurantItem 
              title="Business Lunch"
              description="Variado • 0.5 km"
              time="20-30 min"
              rating={4.8}
              reviews={210}
              primary={config.primaryColor}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around">
          <NavItem icon={<Home size={18} />} label="Início" active={true} color={config.primaryColor} />
          <NavItem icon={<Search size={18} />} label="Buscar" active={false} />
          <NavItem icon={<List size={18} />} label="Pedidos" active={false} />
          <NavItem icon={<User size={18} />} label="Perfil" active={false} />
        </div>
      </div>
    </div>
  );

  const StreamingTemplate = () => (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="flex items-center justify-between mb-6">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div 
              className="text-xl font-bold"
              style={{ color: config.primaryColor }}
            >
              {config.appName}
            </div>
          )}
          <div className="flex space-x-5">
            <Search size={18} className="text-gray-300" />
            <User size={18} className="text-gray-300" />
          </div>
        </div>
        
        <div className="flex space-x-5 text-sm mb-1">
          <div className="font-medium">Início</div>
          <div className="text-gray-400">Conteúdos</div>
          <div className="text-gray-400">Treinamentos</div>
          <div className="text-gray-400">Favoritos</div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pb-4">
        <div className="relative h-60 mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
          <div 
            className="h-44 flex items-center justify-center relative"
            style={{ backgroundColor: config.primaryColor }}
          >
            <div className="absolute inset-0 opacity-30">
              {/* Corporate pattern */}
              <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                {Array.from({length: 16}).map((_, i) => (
                  <div key={i} className="border border-white/10 flex items-center justify-center">
                    {i % 5 === 0 && <div className="w-8 h-8 rounded-full bg-white/10"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-4xl text-white">🎥</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <div className="flex items-start mb-3">
              <div 
                className="mr-2 text-sm px-1.5 py-0.5 text-white font-bold rounded"
                style={{ backgroundColor: config.secondaryColor }}
              >
                DESTAQUE
              </div>
              <div className="text-sm px-1.5 py-0.5 bg-gray-800 text-white font-medium rounded">
                Novo
              </div>
            </div>
            <div className="font-bold text-2xl mb-1">Liderança Corporativa</div>
            <div className="flex items-center mb-3">
              <div 
                className="mr-2 text-sm font-medium"
                style={{ color: config.secondaryColor }}
              >
                97% relevante
              </div>
              <div className="text-xs text-gray-400">2023</div>
              <div className="mx-1 text-gray-500 text-xs">•</div>
              <div className="text-xs border border-gray-600 px-1 rounded text-gray-400">10h</div>
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-4 py-1.5 rounded flex items-center justify-center space-x-2 flex-1"
                style={{ backgroundColor: config.secondaryColor }}
              >
                <Play size={14} />
                <span className="font-medium">Assistir</span>
              </button>
              <button className="px-3 py-1.5 bg-gray-800 rounded flex items-center justify-center space-x-2">
                <PlusCircle size={14} />
                <span className="font-medium">Minha lista</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-4 mb-6">
          <h3 className="font-bold mb-2">Continue assistindo</h3>
          <div className="flex space-x-3 overflow-x-auto py-2 -mx-1 px-1">
            <ContinueWatchingItem 
              title="Gestão de Equipes" 
              progress={75} 
              primaryColor={config.primaryColor}
              icon={<User size={20} />}
            />
            <ContinueWatchingItem 
              title="Marketing B2B" 
              progress={25} 
              primaryColor={config.primaryColor}
              icon={<MessageSquare size={20} />}
            />
            <ContinueWatchingItem 
              title="Vendas Corporativas" 
              progress={50} 
              primaryColor={config.primaryColor}
              icon={<ShoppingBag size={20} />}
            />
          </div>
        </div>
        
        <div className="px-4 mb-6">
          <h3 className="font-bold mb-2">Treinamentos corporativos</h3>
          <div className="grid grid-cols-2 gap-3">
            <RecommendedItem 
              title="Inteligência Corporativa" 
              match={98} 
              tag="Corporativo"
              time="3h 20m" 
              icon={<User size={18} />}
              color={config.primaryColor}
            />
            <RecommendedItem 
              title="Estratégia de Mercado" 
              match={95} 
              tag="Negócios"
              time="5h 45m" 
              icon={<ShoppingBag size={18} />}
              color={config.primaryColor}
            />
            <RecommendedItem 
              title="Gerenciamento de Projetos" 
              match={92} 
              tag="Projetos"
              time="8h 15m" 
              icon={<Calendar size={18} />}
              color={config.primaryColor}
            />
            <RecommendedItem 
              title="Liderança e Inovação" 
              match={94} 
              tag="Liderança"
              time="4h 30m"
              icon={<MessageSquare size={18} />}
              color={config.primaryColor}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <NavItem 
            icon={<Home size={18} />} 
            label="Início" 
            active={true} 
            color={config.secondaryColor} 
          />
          <NavItem 
            icon={<BookOpen size={18} />} 
            label="Catálogo" 
            active={false}
          />
          <NavItem 
            icon={<Download size={18} />} 
            label="Downloads" 
            active={false}
          />
          <NavItem 
            icon={<User size={18} />} 
            label="Perfil" 
            active={false}
          />
        </div>
      </div>
    </div>
  );

  const SocialTemplate = () => (
    <div className="h-full bg-white flex flex-col">
      <div 
        className="border-b border-gray-200 p-3 shadow-sm"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex justify-between items-center">
          {config.logo ? (
            <img src={config.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="text-xl font-bold text-white">{config.appName}</div>
          )}
          <div className="flex space-x-4 text-white">
            <button className="text-white">
              <PlusCircle size={18} />
            </button>
            <button className="text-white">
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex space-x-4 overflow-x-auto -mx-1 px-1">
          <StoryItem 
            name="Seu status" 
            isOwn={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor} 
            icon={<PlusCircle size={16} />}
          />
          <StoryItem 
            name="Marketing" 
            department="Depto"
            hasStory={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor}
            icon={<MessageSquare size={16} />}
          />
          <StoryItem 
            name="Financeiro" 
            department="Depto"
            hasStory={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor}
            icon={<ShoppingBag size={16} />}
          />
          <StoryItem 
            name="RH" 
            department="Depto"
            hasStory={true} 
            primaryColor={config.primaryColor} 
            secondaryColor={config.secondaryColor}
            icon={<User size={16} />}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-50">
        <PostItem 
          username="Carlos Mendes" 
          department="Marketing" 
          location="Sede Corporativa" 
          content="Reunião estratégica"
          likes={28} 
          caption="Planejando as estratégias do próximo trimestre com a equipe. #marketing #estrategia #corporativo" 
          timeAgo="2h" 
          comments={8} 
          primaryColor={config.primaryColor}
          icon={<MessageSquare size={20} />} 
        />
        
        <PostItem 
          username="Andrea Silva" 
          department="Financeiro" 
          location="Filial São Paulo" 
          content="Apresentação" 
          likes={34} 
          caption="Apresentação de resultados do último trimestre para a diretoria. Superamos as metas! #resultados #financeiro" 
          timeAgo="5h" 
          comments={12} 
          primaryColor={config.primaryColor}
          icon={<ShoppingBag size={20} />}
        />
      </div>
      
      <div className="bg-white border-t border-gray-200 p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around">
          <div className="text-xl" style={{ color: config.primaryColor }}>
            <Home size={20} />
          </div>
          <div className="text-xl text-gray-400">
            <Search size={20} />
          </div>
          <div className="text-xl text-gray-400">
            <PlusCircle size={20} />
          </div>
          <div className="text-xl text-gray-400">
            <Heart size={20} />
          </div>
          <div 
            className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `${config.primaryColor}20` }}
          >
            <User size={16} style={{ color: config.primaryColor }} />
          </div>
        </div>
      </div>
    </div>
  );

  const CategoryItem = ({ 
    emoji, name, color, icon 
  }: { 
    emoji: string, 
    name: string, 
    color: string,
    icon: React.ReactNode
  }) => (
    <div className="flex flex-col items-center">
      <div 
        className="h-16 w-16 rounded-full mb-1.5 shadow-sm flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl">{emoji}</div>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
      <span className="text-xs font-medium">{name}</span>
    </div>
  );

  const PromotedRestaurant = ({ 
    title, subtitle, discount, time, rating, color 
  }: { 
    title: string,
    subtitle: string,
    discount: string, 
    time: string, 
    rating: number, 
    color: string 
  }) => (
    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow transition-all">
      <div 
        className="h-24 relative" 
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 opacity-20">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="border border-black/5"></div>
          ))}
        </div>
        <div className="h-full w-full flex items-center justify-center">
          <div 
            className="h-12 w-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}30` }}
          >
            <div style={{ color }}>
              {title === 'Coffee Break' ? '☕' : '🍽️'}
            </div>
          </div>
        </div>
        <div 
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm text-white"
          style={{ backgroundColor: color }}
        >
          {discount}
        </div>
      </div>
      <div className="p-3">
        <div className="font-medium text-sm mb-0.5">{title}</div>
        <div className="text-xs text-gray-500 mb-2">{subtitle}</div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <Star size={12} className="text-yellow-500 mr-0.5" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const RestaurantItem = ({ 
    title, description, time, rating, reviews, primary 
  }: { 
    title: string, 
    description: string, 
    time: string, 
    rating: number, 
    reviews: number, 
    primary: string 
  }) => (
    <div className="flex border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div 
        className="w-20 h-20 flex items-center justify-center"
        style={{ backgroundColor: `${primary}15` }}
      >
        <div 
          className="h-12 w-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${primary}25` }}
        >
          {title.includes('Grill') ? '🍖' : title.includes('Pasta') ? '🍝' : '🍽️'}
        </div>
      </div>
      <div className="p-3 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-gray-500 mb-1">{description}</div>
          </div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
        <div className="flex items-center text-xs">
          <Star size={12} className="text-yellow-500 mr-1" />
          <span className="font-medium mr-1">{rating}</span>
          <span className="text-gray-400">({reviews})</span>
          <div className="ml-auto">
            <span 
              className="text-xs px-2 py-1 rounded font-medium text-white"
              style={{ backgroundColor: primary }}
            >
              Solicitar
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const ContinueWatchingItem = ({ 
    title, progress, primaryColor, icon
  }: { 
    title: string, 
    progress: number, 
    primaryColor: string,
    icon: React.ReactNode
  }) => (
    <div className="w-32 flex-shrink-0">
      <div className="h-24 bg-gray-800 rounded-lg mb-2 relative overflow-hidden">
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}30` }}
        >
          <div className="h-full w-full rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'white' }}
          >
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              {icon}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
          <div 
            className="h-full" 
            style={{ width: `${progress}%`, backgroundColor: primaryColor }}
          ></div>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-xs text-white font-medium line-clamp-1">{title}</div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/60">
          <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
            <Play size={14} className="text-white ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );

  const RecommendedItem = ({ 
    title, match, tag, time, icon, color
  }: { 
    title: string, 
    match: number, 
    tag: string, 
    time: string,
    icon: React.ReactNode,
    color: string
  }) => (
    <div className="rounded-lg overflow-hidden">
      <div className="h-32 bg-gray-800 rounded-lg mb-1 relative overflow-hidden">
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `${color}40` }}
        >
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="font-medium text-white text-sm mb-1">{title}</div>
          <div className="flex items-center justify-between">
            <div 
              className="text-xs font-medium px-1.5 py-0.5 rounded-sm" 
              style={{ backgroundColor: `${color}`, color: 'white' }}
            >
              {tag}
            </div>
            <div className="text-xs text-gray-300">{time}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-xs text-green-500 font-medium">{match}% relevante</div>
      </div>
    </div>
  );

  const StoryItem = ({ 
    name, department, isOwn = false, hasStory = false, primaryColor, secondaryColor, icon
  }: { 
    name: string, 
    department?: string,
    isOwn?: boolean, 
    hasStory?: boolean, 
    primaryColor: string, 
    secondaryColor: string,
    icon: React.ReactNode
  }) => (
    <div className="flex flex-col items-center min-w-[72px]">
      <div 
        className={`h-16 w-16 rounded-full p-[2px] flex items-center justify-center mb-1 ${
          hasStory 
            ? '' 
            : isOwn 
              ? '' 
              : 'bg-gray-200'
        }`}
        style={
          hasStory 
            ? { backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` } 
            : isOwn 
              ? { backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` } 
              : {}
        }
      >
        <div 
          className="h-full w-full rounded-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'white' }}
        >
          <div 
            className="h-10 w-10 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: hasStory || isOwn ? `${primaryColor}20` : '#f3f4f6' }}
          >
            {icon}
          </div>
        </div>
      </div>
      <span className="text-xs font-medium truncate w-full text-center">{name}</span>
      {department && (
        <span className="text-[10px] text-gray-500 truncate w-full text-center">{department}</span>
      )}
    </div>
  );

  const PostItem = ({ 
    username, department, location, content, likes, caption, timeAgo, comments, primaryColor, icon
  }: { 
    username: string, 
    department: string, 
    location: string, 
    content: string, 
    likes: number, 
    caption: string, 
    timeAgo: string, 
    comments: number, 
    primaryColor: string,
    icon: React.ReactNode
  }) => (
    <div className="border-b border-gray-200 bg-white mb-3">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="h-10 w-10 rounded-full mr-3 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            {icon}
          </div>
          <div>
            <div className="text-sm font-semibold">{username}</div>
            <div className="flex items-center text-xs text-gray-500">
              <span>{department}</span>
              <span className="mx-1">•</span>
              <span className="flex items-center">
                <MapPin size={10} className="mr-0.5" /> 
                {location}
              </span>
            </div>
          </div>
        </div>
        <button className="text-lg text-gray-500">⋯</button>
      </div>
      
      <div 
        className="aspect-square flex items-center justify-center border-y border-gray-100"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
            {Array.from({length: 36}).map((_, i) => (
              <div key={i} className="border border-black/5"></div>
            ))}
          </div>
          
          <div 
            className="h-32 w-32 rounded-xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <div className="text-lg text-center font-medium" style={{ color: primaryColor }}>
              {content}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-red-500 transition-colors">
              <Heart size={22} />
            </button>
            <button className="text-gray-700">
              <MessageSquare size={22} />
            </button>
            <button className="text-gray-700">
              <Share2 size={22} className="-scale-x-100" />
            </button>
          </div>
          <button className="text-gray-700">
            <BookOpen size={22} />
          </button>
        </div>
        
        <div className="text-sm font-semibold mb-1">{likes} curtidas</div>
        
        <div className="text-sm">
          <span className="font-semibold mr-1">{username}</span>
          {caption}
        </div>
        
        <div className="text-sm text-gray-500 mt-1">Ver todos os {comments} comentários</div>
        
        <div className="text-xs text-gray-400 mt-1">
          {timeAgo}
        </div>
      </div>
    </div>
  );

  const NavItem = ({ 
    icon, label, active = false, color = '#9CA3AF' 
  }: { 
    icon: React.ReactNode,
    label: string, 
    active?: boolean, 
    color?: string 
  }) => (
    <div className="flex flex-col items-center">
      <div style={{ color: active ? color : '#9CA3AF' }}>
        {icon}
      </div>
      <span className="text-xs" style={{ color: active ? color : '#9CA3AF' }}>{label}</span>
    </div>
  );

  return (
    <section id="mobile-simulator" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Simule seu aplicativo corporativo
          </h2>
          <p className="text-neutral/70 animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Experimente diferentes modelos de aplicativos empresariais e personalize cores, 
            logo e conteúdo para visualizar como seu app corporativo ficaria.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-6">Personalização do App</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nome do aplicativo
              </label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => setConfig({...config, appName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Corporativo App"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
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
              <label className="block text-sm font-medium text-neutral-700 mb-2">
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
                Modelo de aplicativo
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(templates).map(([key, template]) => (
                  <button
                    key={key}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      config.template === key 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setConfig({...config, template: key as AppTemplate})}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-2">{template.icon}</div>
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</div>
                    </div>
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
                Exportar configuração
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
                      <TabsTrigger value="rideshare" className="text-xs">
                        <Map size={16} />
                      </TabsTrigger>
                      <TabsTrigger value="food" className="text-xs">
                        <ShoppingBag size={16} />
                      </TabsTrigger>
                      <TabsTrigger value="streaming" className="text-xs">
                        <Play size={16} />
                      </TabsTrigger>
                      <TabsTrigger value="social" className="text-xs">
                        <MessageSquare size={16} />
                      </TabsTrigger>
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
