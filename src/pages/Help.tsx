
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <Layout>
      <div className="container-custom py-16 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Central de Ajuda</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Guias e recursos</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Começando com a JimmyDev</h3>
                <p className="text-gray-600 mb-2">Aprenda como iniciar seu projeto e planejar seu desenvolvimento.</p>
                <a href="#" className="text-primary hover:underline">Ver guia completo</a>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Usando nossos simuladores</h3>
                <p className="text-gray-600 mb-2">Aprenda a aproveitar ao máximo nossas ferramentas de simulação.</p>
                <a href="#" className="text-primary hover:underline">Ver tutorial</a>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Exportando e compartilhando</h3>
                <p className="text-gray-600 mb-2">Como exportar, salvar e compartilhar suas configurações.</p>
                <a href="#" className="text-primary hover:underline">Ver instruções</a>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Suporte técnico</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-2">Precisa de ajuda?</h3>
              <p className="text-gray-600 mb-3">Nossa equipe está pronta para ajudar com quaisquer dúvidas ou problemas.</p>
              <Button asChild variant="default" className="bg-primary">
                <a href="mailto:contato@jimmydev.com.br">Contatar suporte</a>
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Base de conhecimento</h3>
                <p className="text-gray-600 mb-2">Acesse nossa biblioteca completa de artigos e soluções.</p>
                <a href="#" className="text-primary hover:underline">Explorar artigos</a>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Solução de problemas comuns</h3>
                <p className="text-gray-600 mb-2">Encontre soluções para questões frequentes.</p>
                <a href="#" className="text-primary hover:underline">Ver soluções</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
