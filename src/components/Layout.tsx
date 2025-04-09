
import React, { ReactNode } from 'react';
import { FloatingForm } from './FloatingForm';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container-custom py-4 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Jimmy<span className="text-gradient-primary">Dev</span></span>
          </a>
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#services" className="text-neutral hover:text-primary transition-colors">Serviços</a>
            <a href="#simulator" className="text-neutral hover:text-primary transition-colors">Simulador</a>
            <a href="#differentials" className="text-neutral hover:text-primary transition-colors">Diferenciais</a>
            <a href="#faq" className="text-neutral hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="btn-primary">Contato</a>
          </nav>
          <button className="md:hidden text-neutral">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <FloatingForm />
      
      <footer className="bg-neutral text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JimmyDev</h3>
              <p className="text-gray-300 mb-4">Transforme sua visão em tecnologia poderosa.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Serviços</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Aplicativos móveis</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sistemas corporativos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Plataformas web</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrações API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Manutenção evolutiva</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Termos de serviço</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="text-gray-300 mb-2">contato@jimmydev.com</p>
              <p className="text-gray-300 mb-2">+55 (11) 9999-9999</p>
              <p className="text-gray-300">São Paulo, SP - Brasil</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} JimmyDev. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
