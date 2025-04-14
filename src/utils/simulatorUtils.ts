
import { toast } from 'sonner';

// Device models available in the simulator
export const deviceModels = {
  iphone15: {
    name: 'iPhone 15',
    width: 390,
    height: 844,
    bezelWidth: 10,
    bezelColor: '#222',
    borderRadius: '44px',
    notchStyle: 'dynamic-island',
    shadowStyle: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    scale: 1,
  },
  pixel7: {
    name: 'Pixel 7',
    width: 375,
    height: 812,
    bezelWidth: 12,
    bezelColor: '#333',
    borderRadius: '38px',
    notchStyle: 'punch-hole',
    shadowStyle: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
    scale: 0.95,
  },
  samsung: {
    name: 'Galaxy S22',
    width: 380,
    height: 800,
    bezelWidth: 8,
    bezelColor: '#111',
    borderRadius: '36px',
    notchStyle: 'punch-hole',
    shadowStyle: '0 15px 30px -8px rgba(0, 0, 0, 0.35)',
    scale: 0.95,
  },
  generic: {
    name: 'Generic',
    width: 360,
    height: 780,
    bezelWidth: 10,
    bezelColor: '#222',
    borderRadius: '32px',
    notchStyle: 'none',
    shadowStyle: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
    scale: 0.9,
  }
};

// App templates
export const templates = {
  ecommerce: {
    name: 'E-commerce',
    description: 'Plataforma completa de comércio eletrônico para empresas.',
    icon: '🛍️',
  },
  social: {
    name: 'Rede Social',
    description: 'Rede social corporativa para comunicação interna.',
    icon: '💬',
  },
  fitness: {
    name: 'Fitness',
    description: 'Aplicativo de bem-estar e saúde para equipes corporativas.',
    icon: '🏃',
  },
};

// Default configuration
export interface AppSimulatorConfig {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  template: keyof typeof templates;
  appName: string;
  deviceModel: keyof typeof deviceModels;
  darkMode: boolean;
  customImages: Record<string, string>;
}

export const defaultConfig: AppSimulatorConfig = {
  logo: null,
  primaryColor: '#3B82F6',
  secondaryColor: '#1D4ED8',
  template: 'ecommerce',
  appName: 'Corporate App',
  deviceModel: 'iphone15',
  darkMode: false,
  customImages: {},
};

// Export configuration as JSON
export function exportConfiguration(config: AppSimulatorConfig) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "app-simulator-config.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// Export as GIF (mockup - in a real app this would use a screen capture library)
export function exportAsGif(deviceRef: React.RefObject<HTMLDivElement>) {
  toast.success('Exporting as GIF...', {
    description: 'In a real app, this would capture the screen and save as a GIF.'
  });
  
  // Mock download
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'app-simulator.gif';
    document.body.appendChild(link);
    // In a real implementation, we would generate or capture a GIF here
    toast.success('GIF exported successfully!');
    document.body.removeChild(link);
  }, 1500);
}

// Generate mock usage data for analytics panel
export function generateUsageReport() {
  return {
    screensViewed: Math.floor(Math.random() * 20) + 5,
    totalTimeSpent: `${Math.floor(Math.random() * 30) + 5}m ${Math.floor(Math.random() * 60)}s`,
    conversionRate: `${(Math.random() * 10 + 2).toFixed(1)}%`,
    mostClickedFeature: ['Catalogo', 'Perfil', 'Busca', 'Checkout'][Math.floor(Math.random() * 4)],
    deviceBreakdown: {
      mobile: `${(Math.random() * 40 + 40).toFixed(1)}%`,
      tablet: `${(Math.random() * 30 + 10).toFixed(1)}%`,
      desktop: `${(Math.random() * 20 + 5).toFixed(1)}%`,
    }
  };
}

// Track analytics event
export function trackEvent(eventName: string, eventData = {}) {
  console.info('Analytics event tracked:', eventName, eventData);
  
  // Log analytics data (would be sent to a real analytics service in production)
  console.info('Analytics data:', {
    event: eventName,
    timestamp: new Date().toISOString(),
    data: eventData,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
    userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
    deviceInfo: {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      language: navigator.language
    }
  });
}

// Start guided demo
export function startGuidedDemo(
  config: AppSimulatorConfig, 
  setConfig: (config: AppSimulatorConfig) => void,
  setShowGuide: (show: boolean) => void,
  setDemoStep: (step: number) => void
) {
  // Reset to a known good configuration for the demo
  setConfig({
    ...config,
    template: 'ecommerce',
    deviceModel: 'iphone15',
  });
  
  // Show the guide overlay
  setShowGuide(true);
  setDemoStep(1);
  
  // Track the demo start
  trackEvent('guided_demo_started');
}

// Save the current configuration as a template
export function saveAsTemplate(config: AppSimulatorConfig) {
  // In a real app, this would save to backend or localStorage
  localStorage.setItem('saved_template', JSON.stringify(config));
  trackEvent('template_saved');
}
