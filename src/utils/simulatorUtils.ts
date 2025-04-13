
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

export const deviceModels = {
  iphone14: {
    name: 'iPhone 14',
    width: 375,
    height: 812,
    bezelColor: '#121212',
    bezelWidth: 12,
    notchStyle: 'dynamic-island',
    shadowStyle: '0px 30px 60px rgba(0,0,0,0.25)',
    borderRadius: '40px'
  },
  iphone15: {
    name: 'iPhone 15 Pro',
    width: 390,
    height: 844,
    bezelColor: '#1A1A1A',
    bezelWidth: 10,
    notchStyle: 'dynamic-island',
    shadowStyle: '0px 30px 60px rgba(0,0,0,0.3)',
    borderRadius: '55px'
  },
  galaxyS23: {
    name: 'Galaxy S23',
    width: 360,
    height: 800,
    bezelColor: '#0F0F0F',
    bezelWidth: 8,
    notchStyle: 'punch-hole',
    shadowStyle: '0px 25px 50px rgba(0,0,0,0.2)',
    borderRadius: '30px'
  },
  pixel7: {
    name: 'Pixel 7',
    width: 380,
    height: 820,
    bezelColor: '#0A0A0A',
    bezelWidth: 10,
    notchStyle: 'punch-hole',
    shadowStyle: '0px 25px 50px rgba(0,0,0,0.2)',
    borderRadius: '28px'
  }
};

export const isValidDeviceModel = (model: string): model is DeviceModel => {
  return Object.keys(deviceModels).includes(model as DeviceModel);
};

export const generateUsageReport = () => {
  return {
    screensViewed: Math.floor(Math.random() * 12) + 3,
    totalTimeSpent: `${Math.floor(Math.random() * 10) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    conversionRate: `${(Math.random() * 15 + 5).toFixed(1)}%`,
    mostClickedFeature: ['Produtos', 'Carrinho', 'Perfil', 'Busca', 'Pagamento'][Math.floor(Math.random() * 5)],
    deviceBreakdown: {
      mobile: `${(Math.random() * 30 + 60).toFixed(1)}%`,
      tablet: `${(Math.random() * 20).toFixed(1)}%`,
      desktop: `${(Math.random() * 20).toFixed(1)}%`,
    }
  };
};

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
    return true;
  } catch (error) {
    console.error('Error exporting configuration:', error);
    toast.error(`Erro ao exportar configuração: ${error}`);
    trackEvent('export_configuration_error', { error: String(error) });
    return false;
  }
};

export const exportAsGif = () => {
  try {
    // In a real implementation, this would capture the app simulator and convert it to a GIF
    // For now, we'll just show a success message
    setTimeout(() => {
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
    }, 500);
    
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

export const saveAsTemplate = () => {
  try {
    // In a real implementation, this would save the current configuration as a template
    // For demonstration purposes, we'll just show a success message
    const configStr = localStorage.getItem('jimmydev-app-simulator');
    if (!configStr) {
      toast.error('Nenhuma configuração encontrada para salvar como modelo');
      return false;
    }
    
    // Simulate saving template
    const templates = JSON.parse(localStorage.getItem('jimmydev-templates') || '[]');
    const config = JSON.parse(configStr);
    
    templates.push({
      ...config,
      id: `template-${Date.now()}`,
      name: `${config.appName} Template`,
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('jimmydev-templates', JSON.stringify(templates));
    
    toast.success('Configuração salva como modelo personalizado!');
    trackEvent('save_template_success');
    return true;
  } catch (error) {
    console.error('Error saving as template:', error);
    toast.error(`Erro ao salvar como modelo: ${error}`);
    trackEvent('save_template_error', { error: String(error) });
    return false;
  }
};

export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  console.log(`Analytics event tracked: ${eventName}`, eventData);
};

export const startGuidedDemo = (config, setConfig, setShowGuide, setDemoStep) => {
  try {
    // Set the template to ecommerce for the demo
    setConfig({
      ...config,
      template: 'ecommerce'
    });
    
    // Initialize the guided demo
    setShowGuide(true);
    setDemoStep(1);
    
    // Show first instruction after a short delay
    setTimeout(() => {
      // Show toast message
      toast.success('Comece navegando para o carrinho de compras', {
        position: 'top-center',
        duration: 6000
      });
    }, 500);
    
    // Track the event
    trackEvent('start_guided_demo');
    return true;
  } catch (error) {
    console.error('Error starting guided demo:', error);
    toast.error(`Erro ao iniciar demonstração guiada: ${error}`);
    trackEvent('start_guided_demo_error', { error: String(error) });
    return false;
  }
};
