
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
  Monitor,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  User,
  Heart
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
  title: 'JimmyDev - Soluções Inteligentes',
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
    preview: (config: WebsiteConfig, {handleInteraction}) => {
      const [activeNav, setActiveNav] = useState('home');
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      
      return (
        <div className="bg-white h-full overflow-hidden flex flex-col">
          {/* Header */}
          <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
            <div className="flex items-center">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-8 mr-3" />
              ) : (
                <div className="font-bold text-white text-xl">{config.title}</div>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {['Início', 'Sobre', 'Serviços', 'Clientes', 'Contato'].map((item) => (
                <button 
                  key={item}
                  className={`text-white hover:text-opacity-80 transition-opacity ${
                    activeNav === item.toLowerCase() ? 'border-b-2 border-white' : ''
                  }`}
                  onClick={() => {
                    setActiveNav(item.toLowerCase());
                    handleInteraction('nav_item_click', { item });
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="text-white p-2" 
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  handleInteraction('toggle_mobile_menu');
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <button 
              className="py-2 px-4 rounded text-white hidden md:block" 
              style={{ backgroundColor: config.secondaryColor }}
              onClick={() => handleInteraction('contact_button_click')}
            >
              Fale Conosco
            </button>
          </header>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-lg">
              <div className="flex flex-col p-4">
                {['Início', 'Sobre', 'Serviços', 'Clientes', 'Contato'].map((item) => (
                  <button 
                    key={item}
                    className="py-3 border-b border-gray-100 text-left"
                    onClick={() => {
                      setActiveNav(item.toLowerCase());
                      setMobileMenuOpen(false);
                      handleInteraction('mobile_nav_item_click', { item });
                    }}
                  >
                    {item}
                  </button>
                ))}
                <button 
                  className="py-3 mt-2 text-center rounded" 
                  style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                  onClick={() => {
                    handleInteraction('mobile_contact_click');
                    setMobileMenuOpen(false);
                  }}
                >
                  Fale Conosco
                </button>
              </div>
            </div>
          )}
          
          {/* Main Content Based on Navigation */}
          <div className="flex-1 overflow-auto">
            {activeNav === 'início' || activeNav === 'home' ? (
              <>
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
                      <button 
                        className="py-2 px-6 rounded font-medium" 
                        style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                        onClick={() => {
                          setActiveNav('serviços');
                          handleInteraction('services_button_click');
                        }}
                      >
                        Nossos Serviços
                      </button>
                      <button 
                        className="py-2 px-6 rounded font-medium border border-white text-white"
                        onClick={() => {
                          setActiveNav('sobre');
                          handleInteraction('about_button_click');
                        }}
                      >
                        Saiba Mais
                      </button>
                    </div>
                  </div>
                </section>
                
                {/* Services */}
                <section className="py-12 px-6">
                  <h2 className="text-2xl font-bold text-center mb-8" style={{ color: config.primaryColor }}>Nossos Serviços</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: 1, title: 'Consultoria Estratégica', desc: 'Soluções personalizadas para otimizar seus processos de negócio.' },
                      { id: 2, title: 'Desenvolvimento Web', desc: 'Sites e aplicativos web responsivos com as tecnologias mais modernas.' },
                      { id: 3, title: 'Marketing Digital', desc: 'Estratégias completas para aumentar sua presença online e gerar leads.' }
                    ].map((service) => (
                      <div key={service.id} className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${config.primaryColor}20` }}>
                          <div className="w-6 h-6" style={{ color: config.primaryColor }}>
                            <Layers />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.desc}</p>
                        <button 
                          className="font-medium flex items-center" 
                          style={{ color: config.secondaryColor }}
                          onClick={() => handleInteraction('service_details_click', { service: service.id })}
                        >
                          Saiba mais <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Testimonials */}
                <section className="py-12 px-6 bg-gray-50">
                  <h2 className="text-2xl font-bold text-center mb-8" style={{ color: config.primaryColor }}>Depoimentos de Clientes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[
                      { id: 1, name: 'Marcos Silva', role: 'CEO, Tech Solutions', text: 'A parceria com a equipe superou todas as nossas expectativas. Entregaram um projeto excepcional no prazo combinado.' },
                      { id: 2, name: 'Carolina Mendes', role: 'Diretora de Marketing, GlobalBrand', text: 'Estamos muito satisfeitos com os resultados. A estratégia digital implementada aumentou nosso tráfego em mais de 200%.' }
                    ].map((testimonial) => (
                      <div key={testimonial.id} className="p-6 rounded-lg bg-white shadow-md">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500">
                            <User size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 italic">"{testimonial.text}"</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : activeNav === 'sobre' ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>Sobre Nossa Empresa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="mb-4 text-gray-700">
                      Fundada em 2010, somos uma empresa especializada em soluções digitais para negócios de todos os portes.
                      Nossa missão é transformar ideias em soluções tecnológicas que impulsionem o crescimento dos nossos clientes.
                    </p>
                    <p className="mb-4 text-gray-700">
                      Com uma equipe de profissionais altamente qualificados, oferecemos serviços que vão desde consultoria estratégica
                      até implementação de soluções completas e personalizadas.
                    </p>
                    <button 
                      className="mt-4 py-2 px-6 rounded font-medium" 
                      style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                      onClick={() => handleInteraction('team_button_click')}
                    >
                      Conheça Nossa Equipe
                    </button>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    {config.customImages.banner ? (
                      <img src={config.customImages.banner} alt="Sobre nós" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
                        <Image size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeNav === 'serviços' ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>Nossos Serviços</h2>
                <div className="space-y-6">
                  {[
                    { id: 1, title: 'Consultoria Estratégica', desc: 'Análise completa do seu negócio, identificando oportunidades e propondo soluções personalizadas para otimizar seus processos e aumentar sua competitividade.' },
                    { id: 2, title: 'Desenvolvimento Web', desc: 'Criação de websites, aplicativos web e e-commerces responsivos, focados em performance, experiência do usuário e resultados.' },
                    { id: 3, title: 'Marketing Digital', desc: 'Estratégias completas de marketing digital, incluindo SEO, mídias sociais, email marketing e campanhas pagas para aumentar sua presença online.' },
                    { id: 4, title: 'Design UX/UI', desc: 'Design de interfaces intuitivas e experiências de usuário que convertem visitantes em clientes, com base em pesquisas e testes de usabilidade.' },
                    { id: 5, title: 'Suporte Técnico', desc: 'Suporte contínuo para suas soluções digitais, com atendimento rápido e eficiente para garantir que seus sistemas funcionem sem interrupções.' }
                  ].map((service) => (
                    <div key={service.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.desc}</p>
                      <button 
                        className="text-sm font-medium px-4 py-2 rounded" 
                        style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                        onClick={() => handleInteraction('service_request_click', { service: service.id })}
                      >
                        Solicitar Proposta
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeNav === 'clientes' ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>Nossos Clientes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((clientId) => (
                    <div 
                      key={clientId} 
                      className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center p-4 hover:shadow-md transition-shadow"
                      onClick={() => handleInteraction('client_click', { client: clientId })}
                    >
                      <div className="text-gray-500 font-semibold">Cliente {clientId}</div>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-4">Casos de Sucesso</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((caseId) => (
                    <div key={caseId} className="border rounded-lg overflow-hidden">
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <Image size={32} className="text-gray-400" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">Projeto {caseId}</h4>
                        <p className="text-sm text-gray-600 mb-3">Implementação de solução digital completa, aumentando a eficiência operacional em 45%.</p>
                        <button 
                          className="text-sm font-medium" 
                          style={{ color: config.secondaryColor }}
                          onClick={() => handleInteraction('case_study_click', { case: caseId })}
                        >
                          Ver Detalhes →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeNav === 'contato' ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>Entre em Contato</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Seu nome completo"
                          onChange={() => handleInteraction('form_input')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="seu@email.com"
                          onChange={() => handleInteraction('form_input')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Assunto da mensagem"
                          onChange={() => handleInteraction('form_input')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                        <textarea 
                          className="w-full px-3 py-2 border rounded-md h-32"
                          placeholder="Como podemos ajudar?"
                          onChange={() => handleInteraction('form_input')}
                        ></textarea>
                      </div>
                      <button 
                        type="button"
                        className="w-full py-2 px-4 rounded font-medium" 
                        style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                        onClick={() => {
                          handleInteraction('form_submit');
                          toast.success('Mensagem enviada com sucesso!');
                        }}
                      >
                        Enviar Mensagem
                      </button>
                    </form>
                  </div>
                  <div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
                      <div className="space-y-3">
                        <p className="flex items-start">
                          <span className="mr-3 mt-1 text-gray-500">📍</span>
                          <span>Av. Paulista, 1000, São Paulo - SP</span>
                        </p>
                        <p className="flex items-start">
                          <span className="mr-3 mt-1 text-gray-500">📞</span>
                          <span>(11) 4567-8901</span>
                        </p>
                        <p className="flex items-start">
                          <span className="mr-3 mt-1 text-gray-500">✉️</span>
                          <span>contato@{config.title.toLowerCase().replace(/\s+/g, '')}.com</span>
                        </p>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Horário de Atendimento</h3>
                        <p>Segunda a Sexta: 9h às 18h</p>
                        <p>Sábado: 9h às 13h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          
          {/* Footer */}
          <footer className="p-6 bg-gray-800 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="font-bold text-xl mb-2">{config.title}</div>
                <p className="text-sm text-gray-300">© {new Date().getFullYear()} Todos os direitos reservados.</p>
              </div>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <button 
                    key={social} 
                    className="text-white hover:text-gray-300"
                    onClick={() => handleInteraction('social_click', { platform: social })}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </footer>
        </div>
      );
    }
  },
  ecommerce: {
    name: 'E-commerce',
    description: 'Loja virtual completa com catálogo de produtos e carrinho de compras.',
    icon: <ShoppingCart size={24} />,
    preview: (config: WebsiteConfig, {handleInteraction}) => {
      const [searchTerm, setSearchTerm] = useState('');
      const [cartItems, setCartItems] = useState(0);
      const [activeCategory, setActiveCategory] = useState('all');
      const [currentPage, setCurrentPage] = useState('home');
      const [productView, setProductView] = useState(null);
      const [favorites, setFavorites] = useState<number[]>([]);
      
      const addToCart = () => {
        setCartItems(cartItems + 1);
        handleInteraction('add_to_cart');
        toast.success('Produto adicionado ao carrinho!');
      };
      
      const toggleFavorite = (id: number) => {
        if (favorites.includes(id)) {
          setFavorites(favorites.filter(fav => fav !== id));
          handleInteraction('remove_favorite');
        } else {
          setFavorites([...favorites, id]);
          handleInteraction('add_favorite');
          toast.success('Produto adicionado aos favoritos!');
        }
      };
      
      // Product data
      const products = [
        { id: 1, name: 'Notebook Empresarial', price: 4999.99, category: 'electronics' },
        { id: 2, name: 'Mesa de Escritório', price: 899.99, category: 'furniture' },
        { id: 3, name: 'Monitor Ultrawide', price: 1799.99, category: 'electronics' },
        { id: 4, name: 'Cadeira Ergonômica', price: 1299.99, category: 'furniture' },
        { id: 5, name: 'Tablet Corporativo', price: 2499.99, category: 'electronics' },
        { id: 6, name: 'Software de Gestão', price: 499.99, category: 'software' },
        { id: 7, name: 'Pacote Office', price: 399.99, category: 'software' },
        { id: 8, name: 'Caixa de Som', price: 299.99, category: 'electronics' }
      ];
      
      // Filter products by category and search
      const filteredProducts = products.filter(product => 
        (activeCategory === 'all' || product.category === activeCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const renderProductGrid = () => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-white">
              <div 
                className="h-36 bg-gray-200 flex items-center justify-center relative cursor-pointer"
                onClick={() => {
                  setProductView(product);
                  setCurrentPage('product');
                  handleInteraction('product_view', { product: product.id });
                }}
              >
                {config.customImages.product ? (
                  <img src={config.customImages.product} alt="Product" className="h-full object-contain w-full" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Image size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Produto {product.id}</span>
                  </div>
                )}
                <button 
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                >
                  <Heart size={16} fill={favorites.includes(product.id) ? "red" : "none"} color={favorites.includes(product.id) ? "red" : "gray"} />
                </button>
              </div>
              <div className="p-3">
                <h3 
                  className="font-medium text-sm mb-1 cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    setProductView(product);
                    setCurrentPage('product');
                    handleInteraction('product_view', { product: product.id });
                  }}
                >
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold" style={{ color: config.primaryColor }}>R$ {product.price.toFixed(2)}</span>
                  <button 
                    className="p-1.5 rounded" 
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => addToCart()}
                  >
                    <ShoppingCart size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
      
      return (
        <div className="bg-white h-full overflow-auto">
          {/* Header */}
          <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
            <div className="flex items-center cursor-pointer" onClick={() => {
              setCurrentPage('home');
              handleInteraction('logo_click');
            }}>
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-7 mr-2" />
              ) : (
                <div className="font-bold text-white text-lg mr-2">{config.title}</div>
              )}
            </div>
            <div className="flex-1 mx-4">
              <div className="relative max-w-md mx-auto">
                <input 
                  type="text" 
                  placeholder="Buscar produtos..." 
                  className="py-1.5 px-3 rounded text-sm w-full pr-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleInteraction('search_input');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleInteraction('search_submit', { term: searchTerm });
                    }
                  }}
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => handleInteraction('search_button_click', { term: searchTerm })}
                >
                  <Search size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              <button className="text-white" onClick={() => handleInteraction('favorites_click')}>
                <Heart size={20} />
              </button>
              <button className="relative" onClick={() => handleInteraction('cart_click')}>
                <ShoppingCart size={20} className="text-white" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: config.secondaryColor, color: 'white' }}>
                    {cartItems}
                  </span>
                )}
              </button>
              <button className="text-white hidden md:block" onClick={() => handleInteraction('account_click')}>
                <User size={20} />
              </button>
            </div>
          </header>
          
          {currentPage === 'home' ? (
            <>
              {/* Categories */}
              <div className="bg-gray-100 p-3 flex space-x-4 overflow-x-auto">
                <button 
                  className={`px-3 py-1.5 rounded text-sm whitespace-nowrap ${activeCategory === 'all' ? 'text-white' : 'bg-white text-gray-700'}`}
                  style={activeCategory === 'all' ? { backgroundColor: config.secondaryColor } : {}}
                  onClick={() => {
                    setActiveCategory('all');
                    handleInteraction('category_select', { category: 'all' });
                  }}
                >
                  Todos os Produtos
                </button>
                {['electronics', 'furniture', 'software'].map(category => {
                  const categoryNames = {
                    electronics: 'Eletrônicos',
                    furniture: 'Mobiliário',
                    software: 'Software'
                  };
                  
                  return (
                    <button 
                      key={category}
                      className={`px-3 py-1.5 rounded text-sm whitespace-nowrap ${activeCategory === category ? 'text-white' : 'bg-white text-gray-700'}`}
                      style={activeCategory === category ? { backgroundColor: config.secondaryColor } : {}}
                      onClick={() => {
                        setActiveCategory(category);
                        handleInteraction('category_select', { category });
                      }}
                    >
                      {categoryNames[category]}
                    </button>
                  );
                })}
              </div>
              
              {/* Banner */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {config.customImages.banner ? (
                  <img src={config.customImages.banner} alt="Banner" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Image size={32} className="text-gray-400 mb-2" />
                    <span className="text-gray-500">Banner promocional</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Ofertas Especiais</h2>
                    <p className="mb-4">Descontos exclusivos para empresas</p>
                    <button 
                      className="px-4 py-2 rounded text-sm font-medium"
                      style={{ backgroundColor: config.secondaryColor }}
                      onClick={() => handleInteraction('promo_button_click')}
                    >
                      Ver Ofertas
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Products */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Produtos em Destaque</h2>
                {filteredProducts.length > 0 ? (
                  renderProductGrid()
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum produto encontrado para sua busca.</p>
                    <button 
                      className="mt-3 px-4 py-2 rounded text-white"
                      style={{ backgroundColor: config.primaryColor }}
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                        handleInteraction('clear_filters');
                      }}
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : currentPage === 'product' && productView ? (
            <div className="p-4">
              <button 
                className="mb-4 flex items-center text-sm"
                onClick={() => {
                  setCurrentPage('home');
                  handleInteraction('back_to_products');
                }}
              >
                <ArrowRight size={16} className="mr-1 transform rotate-180" />
                Voltar para produtos
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                  {config.customImages.product ? (
                    <img src={config.customImages.product} alt={productView.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Image size={48} className="text-gray-400 mb-2" />
                      <span className="text-gray-500">Imagem do produto</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold">{productView.name}</h2>
                    <button 
                      className="p-2 bg-gray-100 rounded-full"
                      onClick={() => toggleFavorite(productView.id)}
                    >
                      <Heart 
                        size={20} 
                        fill={favorites.includes(productView.id) ? "red" : "none"} 
                        color={favorites.includes(productView.id) ? "red" : "gray"} 
                      />
                    </button>
                  </div>
                  
                  <div className="text-2xl font-bold mb-4" style={{ color: config.primaryColor }}>
                    R$ {productView.price.toFixed(2)}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Descrição:</h3>
                    <p className="text-gray-700">
                      {productView.name} de alta performance para uso profissional. 
                      Ideal para empresas que buscam qualidade e durabilidade. 
                      Produto com garantia e suporte técnico especializado.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      className="w-full py-2.5 rounded font-medium text-white flex items-center justify-center"
                      style={{ backgroundColor: config.secondaryColor }}
                      onClick={() => addToCart()}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Adicionar ao Carrinho
                    </button>
                    
                    <button 
                      className="w-full py-2.5 rounded font-medium border"
                      style={{ borderColor: config.primaryColor, color: config.primaryColor }}
                      onClick={() => {
                        handleInteraction('buy_now_click');
                        toast.success('Redirecionando para checkout!');
                      }}
                    >
                      Comprar Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  },
  dashboard: {
    name: 'Dashboard',
    description: 'Painel administrativo com gráficos e indicadores de desempenho.',
    icon: <LayoutDashboard size={24} />,
    preview: (config: WebsiteConfig, {handleInteraction}) => {
      const [activeMenu, setActiveMenu] = useState('dashboard');
      const [sidebarOpen, setSidebarOpen] = useState(true);
      
      const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'analytics', name: 'Analytics', icon: <Code size={18} /> },
        { id: 'reports', name: 'Relatórios', icon: <FileText size={18} /> },
        { id: 'users', name: 'Usuários', icon: <User size={18} /> }
      ];
      
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
      return (
        <div className={`h-full overflow-hidden flex ${config.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
          {/* Sidebar */}
          <div 
            className={`${sidebarOpen ? 'w-64' : 'w-16'} border-r transition-width duration-300 ease-in-out flex flex-col`} 
            style={{ 
              backgroundColor: config.primaryColor, 
              borderColor: config.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
            }}
          >
            <div className={`p-4 flex ${sidebarOpen ? 'justify-between' : 'justify-center'} items-center border-b`} style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {sidebarOpen ? (
                <>
                  <div className="flex items-center overflow-hidden">
                    {config.logo ? (
                      <img src={config.logo} alt="Logo" className="h-8 w-auto mr-2" />
                    ) : (
                      <div className="font-bold text-white">{config.title}</div>
                    )}
                  </div>
                  <button 
                    className="text-white/70 hover:text-white"
                    onClick={() => {
                      setSidebarOpen(false);
                      handleInteraction('toggle_sidebar');
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              ) : (
                <button 
                  className="text-white/70 hover:text-white"
                  onClick={() => {
                    setSidebarOpen(true);
                    handleInteraction('toggle_sidebar');
                  }}
                >
                  <Menu size={20} />
                </button>
              )}
            </div>
            
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`flex items-center w-full ${sidebarOpen ? 'px-4' : 'justify-center'} py-2.5 hover:bg-white/10 transition-colors ${
                        activeMenu === item.id ? 'bg-white/20' : ''
                      }`}
                      onClick={() => {
                        setActiveMenu(item.id);
                        handleInteraction('menu_click', { menu: item.id });
                      }}
                    >
                      <div className="text-white">{item.icon}</div>
                      {sidebarOpen && <span className="ml-3 text-white">{item.name}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className={`mt-auto p-4 ${sidebarOpen ? 'block' : 'hidden'}`}>
              <button 
                className="flex items-center justify-center w-full py-2 rounded-md bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
                onClick={() => handleInteraction('profile_click')}
              >
                <User size={16} className="mr-2" />
                Perfil
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto">
            {/* Header */}
            <header 
              className={`p-4 flex justify-between items-center border-b ${
                config.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}
            >
              <h1 className="text-xl font-semibold">
                {menuItems.find(item => item.id === activeMenu)?.name || 'Dashboard'}
              </h1>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className={`py-1.5 px-3 rounded-md text-sm w-40 md:w-60 ${
                      config.darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800'
                    }`}
                    onChange={() => handleInteraction('search_input')}
                  />
                </div>
                <button 
                  className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleInteraction('notifications_click')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path>
                    <path d="M19 17h1a1 1 0 0 0 0-2V8a8 8 0 1 0-16 0v7a1 1 0 0 0 0 2h1"></path>
                    <path d="M12 2v1"></path>
                  </svg>
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white" 
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    3
                  </span>
                </button>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${config.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  onClick={() => handleInteraction('profile_avatar_click')}
                >
                  <span className="text-xs">JD</span>
                </div>
              </div>
            </header>
            
            {/* Dashboard Content */}
            <div className="p-5">
              {activeMenu === 'dashboard' ? (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { name: 'Clientes', value: '128', change: '+12%', up: true },
                      { name: 'Vendas', value: 'R$ 38.5k', change: '-5%', up: false },
                      { name: 'Projetos', value: '12/24', change: '+18%', up: true },
                      { name: 'Tarefas', value: '64%', change: '-2%', up: false }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${
                          config.darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
                        }`}
                        onClick={() => handleInteraction('stat_card_click', { stat: item.name })}
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                        <p className="text-2xl font-bold mt-1" style={{ color: config.secondaryColor }}>
                          {item.value}
                        </p>
                        <div className={`text-xs mt-2 ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                          {item.up ? `${item.change} ↑` : `${item.change} ↓`} desde o último mês
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Charts */}
                  <div className={`p-4 rounded-lg mb-6 ${config.darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold">Desempenho de Vendas</h2>
                      <select 
                        className={`text-sm p-1.5 rounded ${config.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                        onChange={() => handleInteraction('time_period_change')}
                      >
                        <option>Este mês</option>
                        <option>Último mês</option>
                        <option>Este ano</option>
                      </select>
                    </div>
                    <div className="h-48 flex items-end space-x-2">
                      {[35, 50, 40, 70, 85, 65, 75, 90, 80, 60, 55, 75].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center group">
                          <div 
                            className="w-full rounded-t group-hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ height: `${height}%`, backgroundColor: config.secondaryColor }}
                            onClick={() => handleInteraction('chart_bar_click', { month: months[index], value: height })}
                          ></div>
                          <div className="text-xs mt-1">{months[index]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Activities */}
                  <div className={`p-4 rounded-lg ${config.darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                    <h2 className="font-semibold mb-4">Atividades Recentes</h2>
                    <div className="space-y-4">
                      {[
                        { user: 'Carlos Silva', action: 'adicionou um novo cliente', time: '5 min atrás' },
                        { user: 'Ana Ramos', action: 'concluiu 3 tarefas', time: '2 horas atrás' },
                        { user: 'Pedro Costa', action: 'atualizou o status do projeto', time: '5 horas atrás' },
                        { user: 'Maria Souza', action: 'adicionou um pagamento', time: 'ontem' }
                      ].map((activity, index) => (
                        <div 
                          key={index} 
                          className={`p-3 rounded-md ${
                            config.darkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'
                          } transition-colors cursor-pointer`}
                          onClick={() => handleInteraction('activity_click', { activity: index })}
                        >
                          <div className="flex items-center">
                            <div 
                              className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" 
                              style={{ backgroundColor: config.primaryColor + '30' }}
                            >
                              <span className="text-xs" style={{ color: config.primaryColor }}>
                                {activity.user.split(' ').map(name => name[0]).join('')}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className={config.darkMode ? 'text-white' : 'text-gray-800'}>
                                <span className="font-medium">{activity.user}</span> {activity.action}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : activeMenu === 'analytics' ? (
                <div className="text-center py-20 px-4">
                  <h3 className="text-xl font-semibold mb-2">Página de Analytics</h3>
                  <p className={`mb-6 ${config.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Esta seção mostraria gráficos e métricas detalhadas sobre o desempenho da empresa.
                  </p>
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => handleInteraction('generate_report_click')}
                  >
                    Gerar Relatório
                  </button>
                </div>
              ) : activeMenu === 'reports' ? (
                <div className="text-center py-20 px-4">
                  <h3 className="text-xl font-semibold mb-2">Página de Relatórios</h3>
                  <p className={`mb-6 ${config.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Aqui você encontraria relatórios detalhados e documentos exportáveis.
                  </p>
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => handleInteraction('download_report_click')}
                  >
                    Baixar Relatório Mensal
                  </button>
                </div>
              ) : activeMenu === 'users' ? (
                <div className="text-center py-20 px-4">
                  <h3 className="text-xl font-semibold mb-2">Gerenciamento de Usuários</h3>
                  <p className={`mb-6 ${config.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Esta seção permitiria gerenciar usuários do sistema e suas permissões.
                  </p>
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => handleInteraction('add_user_click')}
                  >
                    Adicionar Novo Usuário
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  },
  blog: {
    name: 'Blog Corporativo',
    description: 'Blog empresarial para compartilhamento de conteúdo e notícias.',
    icon: <FileText size={24} />,
    preview: (config: WebsiteConfig, {handleInteraction}) => {
      const [currentView, setCurrentView] = useState('home');
      const [selectedArticle, setSelectedArticle] = useState(null);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [searchOpen, setSearchOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      
      const articles = [
        { id: 1, title: "As Tendências de Tecnologia Corporativa para 2025", 
          excerpt: "Descubra as inovações que irão transformar o ambiente corporativo no próximo ano.", 
          category: "Tecnologia", date: "3 dias atrás", featured: true },
        { id: 2, title: "Como Implementar uma Cultura de Inovação na Sua Empresa", 
          excerpt: "Estratégias práticas para fomentar a criatividade e inovação no ambiente de trabalho.", 
          category: "Gestão", date: "1 semana atrás" },
        { id: 3, title: "Segurança de Dados: Protegendo Informações Corporativas", 
          excerpt: "Medidas essenciais para garantir a segurança dos dados da sua empresa.", 
          category: "Segurança", date: "2 semanas atrás" },
        { id: 4, title: "Transformação Digital: Por Onde Começar", 
          excerpt: "Um guia passo a passo para iniciar a jornada de transformação digital.", 
          category: "Transformação Digital", date: "3 semanas atrás" }
      ];
      
      const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setCurrentView('article');
        handleInteraction('article_click', { article: article.id });
        window.scrollTo(0, 0);
      };
      
      return (
        <div className="bg-white h-full overflow-y-auto">
          {/* Header */}
          <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
            <div className="flex items-center">
              <button 
                className="flex items-center"
                onClick={() => {
                  setCurrentView('home');
                  handleInteraction('logo_click');
                }}
              >
                {config.logo ? (
                  <img src={config.logo} alt="Logo" className="h-8 mr-3" />
                ) : (
                  <div className="font-bold text-white text-xl">{config.title}</div>
                )}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {['Início', 'Artigos', 'Categorias', 'Sobre', 'Contato'].map((item) => (
                <button 
                  key={item}
                  className="text-white hover:text-opacity-80 transition-opacity"
                  onClick={() => {
                    if (item === 'Início') {
                      setCurrentView('home');
                    } else if (item === 'Artigos') {
                      setCurrentView('articles');
                    } else {
                      setCurrentView(item.toLowerCase());
                    }
                    handleInteraction('nav_click', { item: item.toLowerCase() });
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex">
              <button 
                className="text-white p-2 mr-2" 
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  handleInteraction('search_toggle');
                }}
              >
                <Search size={20} />
              </button>
              <button 
                className="text-white p-2" 
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  handleInteraction('menu_toggle');
                }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            
            <button 
              className="p-2 rounded text-white hidden md:block"
              onClick={() => {
                setSearchOpen(!searchOpen);
                handleInteraction('search_toggle');
              }}
            >
              <Search size={20} />
            </button>
          </header>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg z-20">
              <div className="flex flex-col p-4">
                {['Início', 'Artigos', 'Categorias', 'Sobre', 'Contato'].map((item) => (
                  <button 
                    key={item}
                    className="py-3 border-b border-gray-100 text-left"
                    onClick={() => {
                      if (item === 'Início') {
                        setCurrentView('home');
                      } else if (item === 'Artigos') {
                        setCurrentView('articles');
                      } else {
                        setCurrentView(item.toLowerCase());
                      }
                      setMobileMenuOpen(false);
                      handleInteraction('mobile_nav_click', { item: item.toLowerCase() });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Search Bar */}
          {searchOpen && (
            <div className="bg-white p-4 border-b border-gray-200">
              <div className="relative max-w-md mx-auto">
                <input 
                  type="text" 
                  placeholder="Buscar no blog..." 
                  className="w-full px-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    handleInteraction('search_submit', { term: searchTerm });
                    toast.success('Busca realizada!');
                    setSearchOpen(false);
                  }}
                >
                  <Search size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          )}
          
          {currentView === 'home' && (
            <>
              {/* Featured Post */}
              <div className="relative h-64 bg-gray-900">
                <div 
                  className="absolute inset-0 opacity-60 bg-center bg-cover"
                  style={{ 
                    backgroundImage: config.customImages.banner ? `url(${config.customImages.banner})` : 'url(https://via.placeholder.com/1200x400)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 py-4 mx-auto max-w-3xl text-center">
                    <span 
                      className="inline-block px-2 py-1 text-xs font-semibold rounded mb-2 text-white" 
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      EM DESTAQUE
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {articles.find(a => a.featured)?.title || "As Tendências de Tecnologia Corporativa para 2025"}
                    </h1>
                    <p className="text-white text-opacity-90 mb-4 text-sm md:text-base">
                      {articles.find(a => a.featured)?.excerpt || "Descubra as inovações que irão transformar o ambiente corporativo no próximo ano"}
                    </p>
                    <button 
                      className="inline-block px-4 py-2 rounded font-medium text-sm text-white" 
                      style={{ backgroundColor: config.secondaryColor }}
                      onClick={() => {
                        const featuredArticle = articles.find(a => a.featured) || articles[0];
                        handleArticleClick(featuredArticle);
                      }}
                    >
                      Ler artigo
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Posts */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Artigos Recentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {articles.slice(0, 3).map((article) => (
                    <div 
                      key={article.id} 
                      className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => handleArticleClick(article)}
                    >
                      <div className="h-40 bg-gray-200 cursor-pointer">
                        {config.customImages.product ? (
                          <img src={config.customImages.product} alt="Article" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <Image size={32} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <span 
                          className="inline-block px-2 py-0.5 text-xs rounded mb-2 text-white" 
                          style={{ backgroundColor: config.primaryColor }}
                        >
                          {article.category}
                        </span>
                        <h3 className="font-medium text-lg mb-2 cursor-pointer hover:text-blue-600">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{article.date}</span>
                          <button 
                            className="text-sm font-medium flex items-center" 
                            style={{ color: config.secondaryColor }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArticleClick(article);
                            }}
                          >
                            Ler mais <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button 
                    className="px-5 py-2 border rounded-md font-medium" 
                    style={{ borderColor: config.primaryColor, color: config.primaryColor }}
                    onClick={() => {
                      setCurrentView('articles');
                      handleInteraction('view_all_articles');
                    }}
                  >
                    Ver todos os artigos
                  </button>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="py-12 px-6 bg-gray-50">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-2xl font-bold mb-3" style={{ color: config.primaryColor }}>Inscreva-se em nossa newsletter</h2>
                  <p className="text-gray-600 mb-6">Receba nossos melhores conteúdos diretamente em seu email</p>
                  <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input 
                      type="email" 
                      placeholder="Seu melhor email" 
                      className="flex-1 px-4 py-2 rounded-md border" 
                      onChange={() => handleInteraction('newsletter_input')}
                    />
                    <button 
                      className="px-6 py-2 rounded-md text-white" 
                      style={{ backgroundColor: config.secondaryColor }}
                      onClick={() => {
                        handleInteraction('newsletter_submit');
                        toast.success('Inscrição realizada com sucesso!');
                      }}
                    >
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {currentView === 'articles' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>Todos os Artigos</h2>
              <div className="space-y-6">
                {articles.map((article) => (
                  <div 
                    key={article.id} 
                    className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="w-full sm:w-48 h-48 bg-gray-200 cursor-pointer">
                      {config.customImages.product ? (
                        <img src={config.customImages.product} alt="Article" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <Image size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <span 
                          className="inline-block px-2 py-0.5 text-xs rounded mb-2 text-white" 
                          style={{ backgroundColor: config.primaryColor }}
                        >
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.date}</span>
                      </div>
                      <h3 className="font-medium text-xl mb-2 cursor-pointer hover:text-blue-600">{article.title}</h3>
                      <p className="text-gray-600 mb-3">{article.excerpt}</p>
                      <button 
                        className="text-sm font-medium flex items-center" 
                        style={{ color: config.secondaryColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArticleClick(article);
                        }}
                      >
                        Ler mais <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentView === 'article' && selectedArticle && (
            <div className="p-6">
              <button 
                className="mb-6 flex items-center text-sm"
                onClick={() => {
                  setCurrentView('home');
                  handleInteraction('back_to_home');
                }}
              >
                <ArrowRight size={16} className="mr-1 transform rotate-180" />
                Voltar para o blog
              </button>
              
              <article className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4" style={{ color: config.primaryColor }}>{selectedArticle.title}</h1>
                
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span 
                    className="mr-4 px-2 py-0.5 rounded text-white text-xs" 
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {selectedArticle.category}
                  </span>
                  <span>{selectedArticle.date}</span>
                </div>
                
                {config.customImages.banner ? (
                  <img 
                    src={config.customImages.banner} 
                    alt={selectedArticle.title} 
                    className="w-full h-auto max-h-96 object-cover mb-6 rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-6 rounded-lg">
                    <Image size={48} className="text-gray-400" />
                  </div>
                )}
                
                <div className="prose max-w-none">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, 
                    nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi. Sed euismod, urna eu tincidunt consectetur,
                    nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi.
                  </p>
                  <p className="mb-4">
                    Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur,
                    nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi.
                  </p>
                  <h2 className="text-2xl font-semibold mt-6 mb-4">Subtítulo do Artigo</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, 
                    nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi. Sed euismod, urna eu tincidunt consectetur,
                    nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi.
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">Primeiro ponto importante sobre o tema</li>
                    <li className="mb-2">Segundo aspecto relevante a considerar</li>
                    <li className="mb-2">Terceira consideração para empresas</li>
                    <li className="mb-2">Tendências futuras para o mercado</li>
                  </ul>
                  <p className="mb-4">
                    Sed euismod, urna eu tincidunt consectetur, nisl nunc euismod nisi, eu porttitor nisl nunc euismod nisi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                
                <div className="border-t border-b py-6 my-8 flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button 
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        handleInteraction('share_article', { platform: 'facebook' });
                        toast.success('Artigo compartilhado no Facebook!');
                      }}
                    >
                      Facebook
                    </button>
                    <button 
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        handleInteraction('share_article', { platform: 'twitter' });
                        toast.success('Artigo compartilhado no Twitter!');
                      }}
                    >
                      Twitter
                    </button>
                    <button 
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        handleInteraction('share_article', { platform: 'linkedin' });
                        toast.success('Artigo compartilhado no LinkedIn!');
                      }}
                    >
                      LinkedIn
                    </button>
                  </div>
                  <button 
                    className="flex items-center gap-1 text-sm"
                    onClick={() => {
                      handleInteraction('copy_link');
                      toast.success('Link copiado para a área de transferência!');
                    }}
                  >
                    <Share2 size={16} /> Copiar Link
                  </button>
                </div>
                
                <div className="my-8">
                  <h3 className="text-xl font-semibold mb-4">Artigos Relacionados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articles.filter(a => a.id !== selectedArticle.id).slice(0, 2).map((article) => (
                      <div 
                        key={article.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleArticleClick(article)}
                      >
                        <h4 className="font-medium mb-2">{article.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{article.date}</span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: config.primaryColor + '20', color: config.primaryColor }}>
                            {article.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          )}
          
          {/* Footer */}
          <footer className="bg-gray-800 text-white p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
                <p className="text-gray-300 text-sm">
                  Blog corporativo especializado em conteúdos sobre tecnologia, inovação e negócios.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Categorias</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {['Tecnologia', 'Gestão', 'Segurança', 'Transformação Digital'].map((cat) => (
                    <li key={cat}>
                      <button 
                        className="hover:text-white transition-colors"
                        onClick={() => handleInteraction('category_click', { category: cat })}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {['Início', 'Sobre', 'Contato', 'Política de Privacidade'].map((link) => (
                    <li key={link}>
                      <button 
                        className="hover:text-white transition-colors"
                        onClick={() => handleInteraction('footer_link_click', { link })}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Receba nossos artigos em seu email.
                </p>
                <div className="flex">
                  <input 
                    type="email"
                    placeholder="Seu email"
                    className="px-3 py-1.5 rounded-l text-sm text-gray-800 w-full"
                    onChange={() => handleInteraction('footer_newsletter_input')}
                  />
                  <button 
                    className="px-3 py-1.5 rounded-r text-white text-sm" 
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => {
                      handleInteraction('footer_newsletter_submit');
                      toast.success('Inscrição realizada com sucesso!');
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} {config.title}. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      );
    }
  },
  portfolio: {
    name: 'Portfólio',
    description: 'Site para apresentação de projetos e casos de sucesso da empresa.',
    icon: <Code size={24} />,
    preview: (config: WebsiteConfig, {handleInteraction}) => {
      const [currentPage, setCurrentPage] = useState('home');
      const [selectedProject, setSelectedProject] = useState(null);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
      
      const projects = [
        { id: 1, title: 'Redesign de E-commerce', category: 'Web Design', client: 'Fashion Store Inc.' },
        { id: 2, title: 'Aplicativo de Gestão', category: 'Aplicativo Mobile', client: 'Tech Solutions' },
        { id: 3, title: 'Sistema de Dashboards', category: 'Web App', client: 'Analytics Corp' },
        { id: 4, title: 'Landing Page Corporativa', category: 'Web Design', client: 'Enterprise Ltd' },
        { id: 5, title: 'Loja Virtual Responsiva', category: 'E-commerce', client: 'Global Shop' },
        { id: 6, title: 'Plataforma Educacional', category: 'Web App', client: 'EduTech Co.' }
      ];
      
      const handleProjectClick = (project) => {
        setSelectedProject(project);
        setCurrentPage('project');
        handleInteraction('project_click', { project: project.id });
        window.scrollTo(0, 0);
      };
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactForm({ ...contactForm, [name]: value });
        handleInteraction('form_input', { field: name });
      };
      
      const handleSubmitContact = (e) => {
        e.preventDefault();
        handleInteraction('contact_submit', contactForm);
        toast.success('Mensagem enviada com sucesso!');
        setContactForm({ name: '', email: '', message: '' });
      };
      
      return (
        <div className="bg-white h-full overflow-y-auto">
          {/* Header */}
          <header className="p-4 flex justify-between items-center" style={{ backgroundColor: config.primaryColor }}>
            <div className="flex items-center">
              <button 
                className="flex items-center"
                onClick={() => {
                  setCurrentPage('home');
                  handleInteraction('logo_click');
                }}
              >
                {config.logo ? (
                  <img src={config.logo} alt="Logo" className="h-8 mr-3" />
                ) : (
                  <div className="font-bold text-white text-xl">{config.title}</div>
                )}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {['Início', 'Projetos', 'Sobre', 'Contato'].map((item) => (
                <button 
                  key={item}
                  className={`text-white hover:text-opacity-80 transition-opacity ${
                    currentPage === item.toLowerCase() ? 'border-b-2 border-white pb-1' : ''
                  }`}
                  onClick={() => {
                    setCurrentPage(item.toLowerCase());
                    handleInteraction('nav_click', { item: item.toLowerCase() });
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="text-white p-2" 
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  handleInteraction('menu_toggle');
                }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </header>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg">
              <div className="flex flex-col p-4">
                {['Início', 'Projetos', 'Sobre', 'Contato'].map((item) => (
                  <button 
                    key={item}
                    className="py-3 border-b border-gray-100 text-left"
                    onClick={() => {
                      setCurrentPage(item.toLowerCase());
                      setMobileMenuOpen(false);
                      handleInteraction('mobile_nav_click', { item: item.toLowerCase() });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Main Content Based on Current Page */}
          {currentPage === 'home' && (
            <>
              {/* Hero */}
              <section className="py-16 px-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: config.primaryColor }}>Soluções Digitais Corporativas</h1>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                  Nossa agência especializada em criar experiências digitais para empresas de todos os portes.
                  Transformamos ideias em realidade com designs modernos e tecnologia avançada.
                </p>
                <button 
                  className="py-2 px-6 rounded-lg text-white font-medium" 
                  style={{ backgroundColor: config.secondaryColor }}
                  onClick={() => {
                    setCurrentPage('projetos');
                    handleInteraction('view_projects_button');
                  }}
                >
                  Ver projetos
                </button>
              </section>
              
              {/* Featured Projects */}
              <section className="px-6 pb-16">
                <h2 className="text-2xl font-bold text-center mb-8" style={{ color: config.primaryColor }}>
                  Projetos em Destaque
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.slice(0, 3).map((project) => (
                    <div 
                      key={project.id} 
                      className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div 
                        className="aspect-[4/3] bg-cover bg-center"
                        style={{ 
                          backgroundImage: config.customImages.product 
                            ? `url(${config.customImages.product})`
                            : 'url(https://via.placeholder.com/400)'
                        }}
                      >
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                        <div className="text-center p-4">
                          <h3 className="text-white font-medium mb-1">{project.title}</h3>
                          <p className="text-white text-opacity-80 text-sm mb-3">{project.category}</p>
                          <button 
                            className="px-4 py-1.5 text-sm rounded text-white"
                            style={{ backgroundColor: config.secondaryColor }}
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button 
                    className="py-2 px-6 rounded-lg border font-medium"
                    style={{ borderColor: config.primaryColor, color: config.primaryColor }}
                    onClick={() => {
                      setCurrentPage('projetos');
                      handleInteraction('view_all_projects_button');
                    }}
                  >
                    Ver todos os projetos
                  </button>
                </div>
              </section>
              
              {/* Services */}
              <section className="py-16 px-6 bg-gray-50">
                <h2 className="text-2xl font-bold text-center mb-8" style={{ color: config.primaryColor }}>
                  Nossos Serviços
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[
                    { title: 'Web Design', description: 'Criamos websites modernos, responsivos e otimizados para conversão.' },
                    { title: 'Desenvolvimento', description: 'Implementamos soluções web e mobile com as tecnologias mais avançadas.' },
                    { title: 'Branding', description: 'Criamos identidades visuais que comunicam a essência da sua marca.' }
                  ].map((service, index) => (
                    <div 
                      key={index} 
                      className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => handleInteraction('service_click', { service: service.title })}
                    >
                      <div 
                        className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                        style={{ backgroundColor: `${config.primaryColor}20` }}
                      >
                        <div style={{ color: config.primaryColor }}>
                          <Layers size={20} />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Testimonial */}
              <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="text-5xl mb-6 mx-auto w-16 h-16 flex items-center justify-center" style={{ color: config.secondaryColor }}>
                    "
                  </div>
                  <blockquote className="text-xl italic mb-6">
                    A equipe entregou um projeto excepcional que superou todas as nossas expectativas. 
                    O design moderno e a implementação técnica impecável resultaram em um aumento significativo 
                    nas nossas conversões.
                  </blockquote>
                  <div className="font-medium" style={{ color: config.primaryColor }}>
                    Carlos Mendes, CEO da TechCorp
                  </div>
                </div>
              </section>
              
              {/* CTA */}
              <section 
                className="py-16 px-6 text-white"
                style={{ backgroundColor: config.primaryColor }}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar suas ideias em realidade?</h2>
                  <p className="mb-8">Entre em contato conosco para discutir seu próximo projeto.</p>
                  <button 
                    className="py-2.5 px-8 rounded-lg font-medium" 
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => {
                      setCurrentPage('contato');
                      handleInteraction('cta_contact_button');
                    }}
                  >
                    Fale Conosco
                  </button>
                </div>
              </section>
            </>
          )}
          
          {currentPage === 'projetos' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: config.primaryColor }}>
                Nosso Portfólio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-pointer shadow-md"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div 
                      className="aspect-[4/3] bg-cover bg-center"
                      style={{ 
                        backgroundImage: config.customImages.product 
                          ? `url(${config.customImages.product})`
                          : 'url(https://via.placeholder.com/400)'
                      }}
                    >
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                      <div className="text-center p-4">
                        <h3 className="text-white font-medium mb-1">{project.title}</h3>
                        <p className="text-white text-opacity-80 text-sm mb-3">{project.category}</p>
                        <button 
                          className="px-4 py-1.5 text-sm rounded text-white"
                          style={{ backgroundColor: config.secondaryColor }}
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentPage === 'sobre' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>
                  Sobre Nossa Empresa
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <p className="mb-4 text-gray-700">
                      Fundada em 2015, somos uma agência digital especializada no desenvolvimento 
                      de soluções web e mobile para empresas que buscam destacar-se no mercado digital.
                    </p>
                    <p className="mb-4 text-gray-700">
                      Nossa equipe é formada por profissionais experientes e apaixonados por tecnologia e design, 
                      sempre buscando as melhores práticas e tendências do mercado.
                    </p>
                    <p className="mb-4 text-gray-700">
                      Acreditamos que cada projeto é único e merece uma abordagem personalizada. 
                      Por isso, trabalhamos em estreita colaboração com nossos clientes para entender 
                      suas necessidades e objetivos.
                    </p>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    {config.customImages.banner ? (
                      <img src={config.customImages.banner} alt="Sobre nós" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
                        <Image size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4" style={{ color: config.primaryColor }}>
                  Nossa Equipe
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { name: 'Ana Silva', role: 'Diretora Criativa' },
                    { name: 'Carlos Rocha', role: 'Desenvolvedor Front-end' },
                    { name: 'Mariana Costa', role: 'UX Designer' }
                  ].map((person, index) => (
                    <div 
                      key={index} 
                      className="text-center p-4"
                      onClick={() => handleInteraction('team_member_click', { person: person.name })}
                    >
                      <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                      </div>
                      <h4 className="font-medium">{person.name}</h4>
                      <p className="text-sm text-gray-500">{person.role}</p>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4" style={{ color: config.primaryColor }}>
                  Nosso Processo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: '01', title: 'Descoberta', desc: 'Entendemos suas necessidades e objetivos.' },
                    { step: '02', title: 'Estratégia', desc: 'Definimos a melhor abordagem para seu projeto.' },
                    { step: '03', title: 'Design & Dev', desc: 'Criamos e implementamos a solução.' },
                    { step: '04', title: 'Lançamento', desc: 'Entregamos e monitoramos os resultados.' }
                  ].map((process, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      onClick={() => handleInteraction('process_step_click', { step: process.step })}
                    >
                      <div 
                        className="text-2xl font-bold mb-2"
                        style={{ color: config.secondaryColor }}
                      >
                        {process.step}
                      </div>
                      <h4 className="font-medium mb-2">{process.title}</h4>
                      <p className="text-sm text-gray-600">{process.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentPage === 'contato' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>
                  Entre em Contato
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input 
                          type="text" 
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                        <textarea 
                          name="message"
                          value={contactForm.message}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md h-32"
                          placeholder="Como podemos ajudar?"
                          required
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2 px-4 rounded font-medium" 
                        style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                      >
                        Enviar Mensagem
                      </button>
                    </form>
                  </div>
                  <div>
                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                      <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div 
                            className="w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                            style={{ backgroundColor: `${config.primaryColor}20` }}
                          >
                            <span className="text-lg" style={{ color: config.primaryColor }}>📍</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Endereço</h4>
                            <p className="text-gray-600">Av. Paulista, 1000, São Paulo - SP</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div 
                            className="w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                            style={{ backgroundColor: `${config.primaryColor}20` }}
                          >
                            <span className="text-lg" style={{ color: config.primaryColor }}>📞</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Telefone</h4>
                            <p className="text-gray-600">(11) 4567-8901</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div 
                            className="w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                            style={{ backgroundColor: `${config.primaryColor}20` }}
                          >
                            <span className="text-lg" style={{ color: config.primaryColor }}>✉️</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Email</h4>
                            <p className="text-gray-600">contato@{config.title.toLowerCase().replace(/\s+/g, '')}.com</p>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-medium mb-2">Siga-nos</h4>
                          <div className="flex space-x-4">
                            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                              <button 
                                key={social}
                                className="p-2 rounded-full" 
                                style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
                                onClick={() => handleInteraction('social_click', { platform: social })}
                              >
                                {social[0]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentPage === 'project' && selectedProject && (
            <div className="p-6">
              <button 
                className="mb-6 flex items-center text-sm"
                onClick={() => {
                  setCurrentPage('projetos');
                  handleInteraction('back_to_projects');
                }}
              >
                <ArrowRight size={16} className="mr-1 transform rotate-180" />
                Voltar para projetos
              </button>
              
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: config.primaryColor }}>
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {selectedProject.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    Cliente: {selectedProject.client}
                  </span>
                </div>
                
                <div className="mb-8">
                  {config.customImages.banner ? (
                    <img 
                      src={config.customImages.banner} 
                      alt={selectedProject.title} 
                      className="w-full rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-64 sm:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Sobre o Projeto</h3>
                  <p className="text-gray-700 mb-4">
                    Este projeto foi desenvolvido para {selectedProject.client}, com o objetivo de 
                    criar uma solução digital moderna e eficiente que atendesse às necessidades específicas do cliente.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Utilizamos as tecnologias mais avançadas do mercado para garantir performance, 
                    segurança e uma experiência de usuário excepcional.
                  </p>
                  <p className="text-gray-700 mb-4">
                    O processo incluiu pesquisa de usuário, desenvolvimento de wireframes, criação de 
                    protótipos interativos e implementação técnica completa.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Desafios</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Integração com sistemas legados complexos</li>
                      <li>Desenvolvimento de uma interface intuitiva e moderna</li>
                      <li>Garantir performance em dispositivos de diferentes tamanhos</li>
                      <li>Implementação de funcionalidades avançadas com prazos restritos</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Soluções</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Desenvolvimento de APIs personalizadas para integração</li>
                      <li>Design system completo com componentes reutilizáveis</li>
                      <li>Implementação de design responsivo em todos os breakpoints</li>
                      <li>Metodologia ágil para entrega contínua de valor</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Resultados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: config.secondaryColor }}>+150%</div>
                      <p className="text-sm text-gray-600">Aumento em conversões</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: config.secondaryColor }}>-40%</div>
                      <p className="text-sm text-gray-600">Redução na taxa de rejeição</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: config.secondaryColor }}>+85%</div>
                      <p className="text-sm text-gray-600">Aumento na satisfação</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <button 
                    className="px-6 py-2 rounded-lg text-white font-medium" 
                    style={{ backgroundColor: config.secondaryColor }}
                    onClick={() => {
                      setCurrentPage('contato');
                      handleInteraction('project_contact_button');
                    }}
                  >
                    Quero um projeto assim
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer */}
          <footer className="bg-gray-800 text-white p-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{config.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Desenvolvemos soluções digitais que transformam negócios e criam experiências memoráveis.
                  </p>
                  <div className="flex space-x-3">
                    {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                      <button 
                        key={social}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        onClick={() => handleInteraction('footer_social', { platform: social })}
                      >
                        {social[0]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                  <ul className="space-y-2">
                    {[
                      { name: 'Início', page: 'home' },
                      { name: 'Projetos', page: 'projetos' },
                      { name: 'Sobre', page: 'sobre' },
                      { name: 'Contato', page: 'contato' }
                    ].map((link) => (
                      <li key={link.name}>
                        <button 
                          className="text-gray-300 hover:text-white transition-colors"
                          onClick={() => {
                            setCurrentPage(link.page);
                            handleInteraction('footer_nav', { page: link.page });
                          }}
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contato</h3>
                  <address className="text-gray-300 text-sm not-italic">
                    <p className="mb-2">Av. Paulista, 1000</p>
                    <p className="mb-2">São Paulo - SP, Brasil</p>
                    <p className="mb-2">contato@{config.title.toLowerCase().replace(/\s+/g, '')}.com</p>
                    <p>(11) 4567-8901</p>
                  </address>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} {config.title}. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </div>
      );
    }
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
  
  const handleInteraction = (action: string, data?: any) => {
    console.log(`Website interaction: ${action}`, data);
    // Track interaction events here if needed
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
                placeholder="JimmyDev - Soluções Inteligentes"
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
                    {templates[config.template].preview(config, { handleInteraction })}
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
