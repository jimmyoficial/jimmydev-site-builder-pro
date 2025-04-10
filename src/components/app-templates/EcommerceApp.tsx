
import React, { useState } from 'react';
import { AppSimulatorConfig } from '@/utils/simulatorUtils';
import { 
  Home, Search, ShoppingBag, Heart, User, 
  ChevronLeft, Share2, Star, Plus, Minus, 
  ShoppingCart, Filter, X, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/simulatorUtils';

interface EcommerceAppProps {
  config: AppSimulatorConfig;
  onInteraction: (action: string) => void;
}

export const EcommerceApp: React.FC<EcommerceAppProps> = ({ 
  config, 
  onInteraction 
}) => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'product' | 'cart' | 'checkout'>('home');
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectionError, setShowConnectionError] = useState(false);

  const products = [
    { id: 1, name: 'Smartphone Corporate Elite', price: 1299.99, rating: 4.8, reviews: 245, image: config.customImages['product1'] || null },
    { id: 2, name: 'Notebook Ultra Pro', price: 2499.99, rating: 4.6, reviews: 189, image: config.customImages['product2'] || null },
    { id: 3, name: 'Smartwatch Executive', price: 499.99, rating: 4.7, reviews: 312, image: config.customImages['product3'] || null },
    { id: 4, name: 'Fones Wireless Premium', price: 179.99, rating: 4.5, reviews: 156, image: config.customImages['product4'] || null },
  ];

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  const handleAddToCart = (productId: number) => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate random connection error (10% chance)
      if (Math.random() < 0.1) {
        setShowConnectionError(true);
        setTimeout(() => setShowConnectionError(false), 3000);
        return;
      }
      
      const product = getProductById(productId);
      if (!product) return;
      
      const existingItem = cartItems.find(item => item.id === productId);
      
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      
      toast.success('Produto adicionado ao carrinho');
      trackEvent('add_to_cart', { productId, productName: product.name });
      onInteraction('add_to_cart');
    }, 800);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.success('Produto removido do carrinho');
    trackEvent('remove_from_cart', { productId });
    onInteraction('remove_from_cart');
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
    trackEvent('update_quantity', { productId, delta });
    onInteraction('update_quantity');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Busca realizada: "${searchQuery}"`);
      setSearchQuery('');
      trackEvent('search', { query: searchQuery });
      onInteraction('search');
    }, 500);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      setActiveScreen('checkout');
      trackEvent('begin_checkout', { cartTotal: getCartTotal() });
      onInteraction('begin_checkout');
    }, 1000);
  };

  const completeCheckout = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Pedido finalizado com sucesso!');
      setCartItems([]);
      setActiveScreen('home');
      trackEvent('purchase_complete', { orderTotal: getCartTotal() });
      onInteraction('purchase_complete');
    }, 1500);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`.replace('.', ',');
  };

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-4"
      onClick={() => {
        setSelectedProduct(product.id);
        setActiveScreen('product');
        trackEvent('view_product', { productId: product.id });
        onInteraction('view_product');
      }}
    >
      <div 
        className="h-48 bg-gray-100 flex items-center justify-center"
        style={{ backgroundColor: `${config.primaryColor}10` }}
      >
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div 
            className="h-24 w-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.primaryColor}20` }}
          >
            <ShoppingBag size={36} style={{ color: config.primaryColor }} />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold" style={{ color: config.primaryColor }}>
            {formatCurrency(product.price)}
          </span>
          <button 
            className="p-1.5 rounded-full"
            style={{ backgroundColor: config.primaryColor }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product.id);
            }}
          >
            <Plus size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  // Renderiza a tela inicial
  const renderHomeScreen = () => (
    <div className="h-full overflow-y-auto bg-gray-50 pt-4">
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: config.primaryColor }}>
              Olá, Cliente
            </h2>
            <p className="text-sm text-gray-500">Boas-vindas ao {config.appName}</p>
          </div>
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.primaryColor}15` }}
          >
            <User size={20} style={{ color: config.primaryColor }} />
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:outline-none text-sm"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                borderColor: `${config.primaryColor}30`,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
              }}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
        </form>
        
        <div className="mb-6">
          <div 
            className="h-40 bg-gradient-to-r rounded-2xl p-5 flex items-center shadow-md overflow-hidden relative"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`
            }}
          >
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-10">
              <div className="grid grid-cols-2 grid-rows-3 h-full w-full">
                {Array.from({length: 6}).map((_, i) => (
                  <div key={i} className="border border-white/10"></div>
                ))}
              </div>
            </div>
            
            <div className="z-10 flex-1">
              <h3 className="text-white font-bold text-lg mb-1">Lançamentos corporativos</h3>
              <p className="text-white/80 text-sm mb-4">Tecnologia de ponta para sua empresa</p>
              <button 
                className="bg-white/95 text-sm py-2 px-4 rounded-lg font-medium backdrop-blur-sm shadow-md"
                style={{ color: config.primaryColor }}
                onClick={() => onInteraction('promotion_click')}
              >
                Explorar novidades
              </button>
            </div>
            
            <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center z-10">
              <ShoppingBag size={40} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Populares</h3>
            <span 
              className="text-sm font-medium"
              style={{ color: config.primaryColor }}
            >
              Ver todos
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderiza a tela de detalhes do produto
  const renderProductScreen = () => {
    const product = selectedProduct ? getProductById(selectedProduct) : null;
    
    if (!product) return null;
    
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="relative">
          <div 
            className="h-72 bg-gray-100 flex items-center justify-center relative"
            style={{ backgroundColor: `${config.primaryColor}10` }}
          >
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div 
                className="h-32 w-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}20` }}
              >
                <ShoppingBag size={56} style={{ color: config.primaryColor }} />
              </div>
            )}
            
            <button 
              className="absolute top-4 left-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
              onClick={() => {
                setActiveScreen('home');
                setSelectedProduct(null);
                onInteraction('back_to_products');
              }}
            >
              <ChevronLeft size={22} />
            </button>
            
            <button 
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
              onClick={() => {
                toast.success('Produto compartilhado!');
                onInteraction('share_product');
              }}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <button 
                className="h-9 w-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
                onClick={() => {
                  toast.success('Adicionado aos favoritos!');
                  onInteraction('favorite_product');
                }}
              >
                <Heart size={18} style={{ color: config.primaryColor }} />
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={star <= Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}
                    fill={star <= Math.floor(product.rating) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium ml-2">{product.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({product.reviews} avaliações)</span>
            </div>
            
            <div className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>
              {formatCurrency(product.price)}
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Descrição</h3>
              <p className="text-sm text-gray-600">
                Este produto de alta qualidade foi projetado especificamente para atender às necessidades corporativas, 
                oferecendo desempenho excepcional e durabilidade superior. Com tecnologia de ponta e 
                design elegante, é a solução perfeita para profissionais exigentes.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-3">Especificações</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Processador</div>
                <div className="font-medium">Octa-core 2.5GHz</div>
                <div className="text-gray-500">Memória</div>
                <div className="font-medium">8GB RAM</div>
                <div className="text-gray-500">Armazenamento</div>
                <div className="font-medium">256GB SSD</div>
                <div className="text-gray-500">Garantia</div>
                <div className="font-medium">12 meses</div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="flex-1 py-3.5 rounded-xl font-semibold text-white shadow-md"
                style={{ backgroundColor: config.primaryColor }}
                onClick={() => handleAddToCart(product.id)}
              >
                Adicionar ao carrinho
              </button>
              <button 
                className="py-3.5 px-4 rounded-xl font-semibold border shadow-sm flex items-center justify-center"
                style={{ 
                  borderColor: `${config.primaryColor}30`,
                  color: config.primaryColor
                }}
                onClick={() => {
                  setActiveScreen('cart');
                  onInteraction('view_cart');
                }}
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="ml-1">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderiza a tela do carrinho
  const renderCartScreen = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="px-4 py-4 bg-white border-b border-gray-200 flex items-center shadow-sm">
        <button 
          className="h-10 w-10 rounded-lg flex items-center justify-center mr-3"
          style={{ backgroundColor: `${config.primaryColor}15` }}
          onClick={() => {
            setActiveScreen('home');
            onInteraction('back_to_home');
          }}
        >
          <ChevronLeft size={22} style={{ color: config.primaryColor }} />
        </button>
        <h1 className="text-lg font-bold">Carrinho de compras</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div 
              className="h-20 w-20 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${config.primaryColor}15` }}
            >
              <ShoppingCart size={32} style={{ color: config.primaryColor }} />
            </div>
            <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
            <p className="text-sm text-gray-500 mb-6">Adicione produtos para continuar comprando</p>
            <button 
              className="py-2.5 px-6 rounded-lg font-medium text-white"
              style={{ backgroundColor: config.primaryColor }}
              onClick={() => {
                setActiveScreen('home');
                onInteraction('shop_now');
              }}
            >
              Explorar produtos
            </button>
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-3 mb-3 shadow-sm border border-gray-100 flex">
                <div 
                  className="h-20 w-20 bg-gray-100 rounded-lg mr-3 flex items-center justify-center"
                  style={{ backgroundColor: `${config.primaryColor}10` }}
                >
                  {getProductById(item.id)?.image ? (
                    <img 
                      src={getProductById(item.id)?.image || ''} 
                      alt={item.name} 
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <ShoppingBag size={24} style={{ color: config.primaryColor }} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm line-clamp-1 mb-1">{item.name}</h3>
                    <button 
                      className="h-6 w-6 rounded-full flex items-center justify-center"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <X size={14} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2">
                    {formatCurrency(item.price)}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <button 
                        className="h-7 w-7 rounded-lg flex items-center justify-center border border-gray-200"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      <button 
                        className="h-7 w-7 rounded-lg flex items-center justify-center border border-gray-200"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="font-bold" style={{ color: config.primaryColor }}>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatCurrency(getCartTotal())}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Frete</span>
              <span className="font-medium">Grátis</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg" style={{ color: config.primaryColor }}>
                {formatCurrency(getCartTotal())}
              </span>
            </div>
          </div>
          
          <button 
            className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md flex items-center justify-center"
            style={{ backgroundColor: config.primaryColor }}
            onClick={handleCheckout}
          >
            Finalizar compra
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );

  // Renderiza a tela de checkout
  const renderCheckoutScreen = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="px-4 py-4 bg-white border-b border-gray-200 flex items-center shadow-sm">
        <button 
          className="h-10 w-10 rounded-lg flex items-center justify-center mr-3"
          style={{ backgroundColor: `${config.primaryColor}15` }}
          onClick={() => {
            setActiveScreen('cart');
            onInteraction('back_to_cart');
          }}
        >
          <ChevronLeft size={22} style={{ color: config.primaryColor }} />
        </button>
        <h1 className="text-lg font-bold">Finalizar pedido</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-medium mb-3">Resumo do pedido</h3>
          
          <div className="space-y-2 mb-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex">
                  <span>{item.quantity}x</span>
                  <span className="ml-2 flex-1">{item.name}</span>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatCurrency(getCartTotal())}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Frete</span>
              <span>Grátis</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold" style={{ color: config.primaryColor }}>
                {formatCurrency(getCartTotal())}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-medium mb-3">Método de pagamento</h3>
          
          <div 
            className="flex items-center p-3 rounded-xl border mb-2"
            style={{ borderColor: config.primaryColor, backgroundColor: `${config.primaryColor}10` }}
          >
            <div 
              className="h-10 w-10 rounded-full mr-3 flex items-center justify-center"
              style={{ backgroundColor: `${config.primaryColor}20` }}
            >
              <span className="text-lg">💳</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Cartão corporativo</div>
              <div className="text-xs text-gray-500">**** **** **** 4589</div>
            </div>
            <div 
              className="h-5 w-5 rounded-full border-2"
              style={{ borderColor: config.primaryColor }}
            >
              <div 
                className="h-3 w-3 rounded-full m-0.5"
                style={{ backgroundColor: config.primaryColor }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center p-3 rounded-xl border">
            <div className="h-10 w-10 rounded-full mr-3 flex items-center justify-center bg-gray-100">
              <span className="text-lg">🏦</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Boleto bancário</div>
              <div className="text-xs text-gray-500">Vencimento em 3 dias úteis</div>
            </div>
            <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-medium mb-3">Endereço de entrega</h3>
          
          <div className="p-3 rounded-xl border border-gray-200">
            <div className="font-medium text-sm mb-1">Sede Corporativa</div>
            <div className="text-xs text-gray-500">
              Av. Paulista, 1000, 10º andar<br />
              São Paulo - SP, 01310-100<br />
              Brasil
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button 
          className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md flex items-center justify-center"
          style={{ backgroundColor: config.primaryColor }}
          onClick={completeCheckout}
        >
          Confirmar pedido
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );

  // Componente de erro de conexão
  const ConnectionError = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-5/6 rounded-2xl p-5 shadow-lg">
        <div className="flex justify-center mb-4">
          <div 
            className="h-16 w-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.primaryColor}15` }}
          >
            <X size={32} style={{ color: config.primaryColor }} />
          </div>
        </div>
        <h3 className="text-center font-bold text-lg mb-2">Erro de conexão</h3>
        <p className="text-center text-gray-600 text-sm mb-4">
          Não foi possível conectar ao servidor. Por favor, verifique sua conexão e tente novamente.
        </p>
        <button 
          className="w-full py-3 rounded-xl text-white font-medium shadow-md"
          style={{ backgroundColor: config.primaryColor }}
          onClick={() => setShowConnectionError(false)}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );

  // Componente de carregamento
  const LoadingOverlay = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-[1px]">
      <div 
        className="h-14 w-14 rounded-full flex items-center justify-center relative"
        style={{ backgroundColor: `${config.primaryColor}40` }}
      >
        <div 
          className="h-10 w-10 rounded-full animate-spin"
          style={{ 
            borderWidth: '3px',
            borderColor: `${config.primaryColor}20`,
            borderTopColor: config.primaryColor
          }}
        ></div>
      </div>
    </div>
  );

  // Componente da barra de navegação
  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around">
        <NavItem icon={<Home size={22} />} label="Início" active={activeScreen === 'home'} color={config.primaryColor} />
        <NavItem icon={<Search size={22} />} label="Buscar" active={false} color={config.primaryColor} />
        <NavItem 
          icon={<ShoppingCart size={22} />} 
          label="Carrinho" 
          active={activeScreen === 'cart' || activeScreen === 'checkout'} 
          color={config.primaryColor}
          badge={cartItems.length > 0 ? cartItems.reduce((sum, item) => sum + item.quantity, 0).toString() : undefined}
          onClick={() => {
            setActiveScreen('cart');
            onInteraction('nav_to_cart');
          }}
        />
        <NavItem icon={<Heart size={22} />} label="Favoritos" active={false} color={config.primaryColor} />
        <NavItem icon={<User size={22} />} label="Perfil" active={false} color={config.primaryColor} />
      </div>
    </div>
  );

  // Item da navegação
  const NavItem = ({ 
    icon, 
    label, 
    active = false, 
    color = '#9CA3AF',
    badge,
    onClick
  }: { 
    icon: React.ReactNode;
    label: string; 
    active?: boolean;
    color?: string;
    badge?: string;
    onClick?: () => void;
  }) => (
    <button 
      className="flex flex-col items-center relative"
      onClick={onClick}
    >
      <div style={{ color: active ? color : '#9CA3AF' }} className="relative">
        {icon}
        {badge && (
          <div 
            className="absolute -top-2 -right-2 h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {badge}
          </div>
        )}
      </div>
      <span 
        className="text-xs mt-1" 
        style={{ color: active ? color : '#9CA3AF' }}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div className="h-full flex flex-col relative">
      {showConnectionError && <ConnectionError />}
      {isLoading && <LoadingOverlay />}
      
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'home' && renderHomeScreen()}
        {activeScreen === 'product' && renderProductScreen()}
        {activeScreen === 'cart' && renderCartScreen()}
        {activeScreen === 'checkout' && renderCheckoutScreen()}
      </div>
      
      {activeScreen !== 'product' && <BottomNav />}
    </div>
  );
};

