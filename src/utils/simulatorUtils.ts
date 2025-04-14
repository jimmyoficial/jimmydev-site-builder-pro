
import { toast } from 'sonner';

export type AppTemplate = 'ecommerce' | 'social' | 'fitness' | 'delivery' | 'finance';
export type DeviceModel = 'iphone14' | 'iphone15' | 'galaxyS23' | 'pixel7';

export interface AppSimulatorConfig {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  template: AppTemplate;
  appName: string;
  deviceModel: DeviceModel;
  darkMode: boolean;
  customImages: Record<string, string>;
}

export const defaultConfig: AppSimulatorConfig = {
  logo: null,
  primaryColor: '#1E3A8A', // Corporate blue
  secondaryColor: '#2563EB', // Secondary blue
  template: 'ecommerce',
  appName: 'JimmyDev App',
  deviceModel: 'iphone14',
  darkMode: false,
  customImages: {
    // Initialize with empty values to prevent undefined errors
    post1: '',
    product1: ''
  }
};

export const templates = {
  ecommerce: {
    name: 'E-commerce',
    description: 'Plataforma completa de compras online para empresas.',
    icon: '🛍️',
  },
  social: {
    name: 'Rede Social',
    description: 'Rede social corporativa para comunicação empresarial.',
    icon: '👥',
  },
  fitness: {
    name: 'Fitness',
    description: 'App de bem-estar corporativo para equipes.',
    icon: '💪',
  },
  delivery: {
    name: 'Delivery',
    description: 'Sistema de entrega para serviços corporativos.',
    icon: '🚚',
  },
  finance: {
    name: 'Finanças',
    description: 'Gestão financeira e investimentos empresariais.',
    icon: '📊',
  },
};

// Enhanced device models with better smartphone dimensions and properties
export const deviceModels = {
  iphone14: {
    name: 'iPhone 14',
    width: 320,
    height: 692,
    bezelColor: '#121212',
    bezelWidth: 12,
    notchStyle: 'dynamic-island',
    shadowStyle: '0px 20px 40px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.1)',
    borderRadius: '40px'
  },
  iphone15: {
    name: 'iPhone 15 Pro',
    width: 330,
    height: 716,
    bezelColor: '#1A1A1A',
    bezelWidth: 10,
    notchStyle: 'dynamic-island',
    shadowStyle: '0px 20px 40px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.1)',
    borderRadius: '55px'
  },
  galaxyS23: {
    name: 'Galaxy S23',
    width: 310,
    height: 680,
    bezelColor: '#0F0F0F',
    bezelWidth: 8,
    notchStyle: 'punch-hole',
    shadowStyle: '0px 15px 35px rgba(0,0,0,0.22), inset 0 1px 1px rgba(255,255,255,0.05)',
    borderRadius: '30px'
  },
  pixel7: {
    name: 'Pixel 7',
    width: 315,
    height: 685,
    bezelColor: '#0A0A0A',
    bezelWidth: 10,
    notchStyle: 'punch-hole',
    shadowStyle: '0px 15px 35px rgba(0,0,0,0.22), inset 0 1px 1px rgba(255,255,255,0.05)',
    borderRadius: '28px'
  }
};

export const isValidDeviceModel = (model: string): model is DeviceModel => {
  return Object.keys(deviceModels).includes(model as DeviceModel);
};

// Enhanced analytics report generator
export const generateUsageReport = () => {
  // Create more realistic looking data
  const viewedScreens = Math.floor(Math.random() * 12) + 8;
  const conversionRate = (Math.random() * 15 + 10).toFixed(1);
  const mobilePercentage = (Math.random() * 30 + 60).toFixed(1);
  const tabletPercentage = (Math.random() * 20).toFixed(1);
  const desktopPercentage = (100 - parseFloat(mobilePercentage) - parseFloat(tabletPercentage)).toFixed(1);
  
  const minutes = Math.floor(Math.random() * 10) + 5;
  const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  
  const features = ['Produtos', 'Carrinho', 'Perfil', 'Busca', 'Pagamento', 'Categorias', 'Favoritos'];
  const mostClickedFeature = features[Math.floor(Math.random() * features.length)];
  
  return {
    screensViewed: viewedScreens,
    totalTimeSpent: `${minutes}:${seconds}`,
    conversionRate: `${conversionRate}%`,
    mostClickedFeature: mostClickedFeature,
    deviceBreakdown: {
      mobile: `${mobilePercentage}%`,
      tablet: `${tabletPercentage}%`,
      desktop: `${desktopPercentage}%`,
    },
    // Add more professional analytics data
    bounceRate: `${(Math.random() * 15 + 20).toFixed(1)}%`,
    averageSessionDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    returnVisitorRate: `${(Math.random() * 20 + 30).toFixed(1)}%`,
    topReferrers: [
      { source: 'Google', percentage: `${(Math.random() * 30 + 40).toFixed(1)}%` },
      { source: 'Direct', percentage: `${(Math.random() * 20 + 20).toFixed(1)}%` },
      { source: 'Social', percentage: `${(Math.random() * 15 + 5).toFixed(1)}%` },
    ]
  };
};

// Improved export configuration function with better mobile support
export const exportConfiguration = () => {
  try {
    // Get the current configuration from local storage
    const configStr = localStorage.getItem('jimmydev-app-simulator');
    if (!configStr) {
      console.error('No configuration found in local storage');
      toast.error('Nenhuma configuração encontrada no armazenamento local');
      return false;
    }
    
    const config = JSON.parse(configStr);
    
    // Create a blob with the configuration as formatted JSON
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jimmydev-app-config-${new Date().toISOString().slice(0, 10)}.json`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track the event
    trackEvent('export_configuration_success');
    
    // Show success toast
    toast.success('Configuração exportada com sucesso!');
    return true;
  } catch (error) {
    console.error('Error exporting configuration:', error);
    toast.error(`Erro ao exportar configuração: ${error}`);
    trackEvent('export_configuration_error', { error: String(error) });
    return false;
  }
};

// Improved GIF export function with better mobile support
export const exportAsGif = () => {
  try {
    // In a real implementation, this would capture the app simulator and convert it to a GIF
    // For now, we'll just create a sample GIF for download
    const dummyGifData = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    
    // Create a download link for the dummy GIF
    const a = document.createElement('a');
    a.href = dummyGifData;
    a.download = `jimmydev-app-${new Date().toISOString().slice(0, 10)}.gif`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    
    toast.success('Simulação exportada como GIF!');
    trackEvent('export_gif_success');
    return true;
  } catch (error) {
    console.error('Error exporting as GIF:', error);
    toast.error(`Erro ao exportar como GIF: ${error}`);
    trackEvent('export_gif_error', { error: String(error) });
    return false;
  }
};

// Improved template saving function
export const saveAsTemplate = () => {
  try {
    // Get current configuration
    const configStr = localStorage.getItem('jimmydev-app-simulator');
    if (!configStr) {
      toast.error('Nenhuma configuração encontrada para salvar como modelo');
      return false;
    }
    
    // Create the template
    const templates = JSON.parse(localStorage.getItem('jimmydev-templates') || '[]');
    const config = JSON.parse(configStr);
    
    const templateId = `template-${Date.now()}`;
    const templateName = `${config.appName} Template`;
    
    templates.push({
      ...config,
      id: templateId,
      name: templateName,
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('jimmydev-templates', JSON.stringify(templates));
    
    toast.success('Configuração salva como modelo personalizado!');
    trackEvent('save_template_success', { templateId, templateName });
    return true;
  } catch (error) {
    console.error('Error saving as template:', error);
    toast.error(`Erro ao salvar como modelo: ${error}`);
    trackEvent('save_template_error', { error: String(error) });
    return false;
  }
};

// Enhanced analytics tracking
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  console.log(`Analytics event tracked: ${eventName}`, eventData);
  
  // Send data to analytics service (mock implementation)
  const analyticsData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    data: eventData,
    sessionId: getSessionId(),
    userId: getUserId(),
    deviceInfo: {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      language: navigator.language,
    }
  };
  
  // Log the analytics data (in a real implementation, this would be sent to a server)
  console.log('Analytics data:', analyticsData);
};

// Helper functions for analytics
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

const getUserId = () => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('user_id', userId);
  }
  return userId;
};

// Enhanced Guided Demo with proper mobile support
export const startGuidedDemo = (config: AppSimulatorConfig, setConfig: Function, setShowGuide: Function, setDemoStep: Function) => {
  try {
    // Set the template to ecommerce for the demo
    setConfig({
      ...config,
      template: 'ecommerce'
    });
    
    // Initialize the guided demo
    setShowGuide(true);
    setDemoStep(1);
    
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    // Create demo overlay with enhanced UI
    const demoOverlay = document.createElement('div');
    demoOverlay.id = 'demo-overlay';
    demoOverlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center';
    
    const demoContent = document.createElement('div');
    demoContent.className = 'bg-white p-6 md:p-8 rounded-xl max-w-md md:max-w-2xl mx-4 shadow-2xl transform transition-all animate-fade-in animate-scale-in';
    demoContent.innerHTML = `
      <div class="absolute top-3 right-3">
        <button id="close-demo-x" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="mb-2 flex items-center">
        <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-3">1</div>
        <h2 class="text-xl md:text-2xl font-bold text-center">Demonstração Guiada</h2>
      </div>
      <p class="mb-6 text-gray-700 text-sm md:text-base">
        Esta demonstração interativa irá guiá-lo pelas principais funcionalidades do aplicativo corporativo.
        ${isMobile ? 'Toque nos elementos destacados para continuar.' : 'Siga as instruções que aparecerão no simulador.'}
      </p>
      <div class="flex flex-col md:flex-row gap-3 justify-center">
        <button id="close-demo" class="py-2 px-4 bg-blue-600 text-white rounded-lg text-sm md:text-base hover:bg-blue-700 transition-colors">
          Iniciar demonstração
        </button>
        <button id="skip-demo" class="py-2 px-4 border border-gray-300 rounded-lg text-sm md:text-base hover:bg-gray-50 transition-colors">
          Pular
        </button>
      </div>
    `;
    
    demoOverlay.appendChild(demoContent);
    document.body.appendChild(demoOverlay);
    
    // Add event listeners
    document.getElementById('close-demo')?.addEventListener('click', () => {
      document.body.removeChild(demoOverlay);
      
      // Show toast message after a short delay
      setTimeout(() => {
        toast.success('Demonstração iniciada! Confira as instruções na tela', {
          position: isMobile ? 'bottom-center' : 'top-center',
          duration: 6000
        });
      }, 500);
      
      // Scroll to simulator section
      const simulatorSection = document.getElementById('app-simulator');
      if (simulatorSection) {
        simulatorSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    document.getElementById('skip-demo')?.addEventListener('click', () => {
      document.body.removeChild(demoOverlay);
      setShowGuide(false);
      setDemoStep(0);
      toast.info('Demonstração ignorada');
    });
    
    document.getElementById('close-demo-x')?.addEventListener('click', () => {
      document.body.removeChild(demoOverlay);
      setShowGuide(false);
      setDemoStep(0);
    });
    
    // Track the event
    trackEvent('start_guided_demo', { isMobile });
    return true;
  } catch (error) {
    console.error('Error starting guided demo:', error);
    toast.error(`Erro ao iniciar demonstração guiada: ${error}`);
    trackEvent('start_guided_demo_error', { error: String(error) });
    return false;
  }
};
