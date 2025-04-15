
import React from 'react';
import { Layout } from '@/components/Layout';

const FAQ = () => {
  return (
    <Layout>
      <div className="container-custom py-16 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Perguntas Frequentes</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">1. Como faço para solicitar um orçamento?</h2>
              <p className="text-gray-600">Entre em contato conosco através do formulário de contato ou pelo e-mail contato@jimmydev.com.br para receber um orçamento personalizado para seu projeto.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">2. Qual é o prazo médio para desenvolvimento de um aplicativo?</h2>
              <p className="text-gray-600">O prazo varia conforme a complexidade do projeto, mas geralmente leva de 2 a 4 meses para aplicativos de média complexidade. Durante a fase de planejamento, definiremos um cronograma detalhado.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">3. Como funciona o suporte após o lançamento?</h2>
              <p className="text-gray-600">Oferecemos 30 dias de suporte gratuito após o lançamento. Depois disso, disponibilizamos planos de suporte contínuo com diferentes níveis de atendimento conforme a necessidade do cliente.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">4. É possível fazer ajustes durante o desenvolvimento?</h2>
              <p className="text-gray-600">Sim, trabalhamos com metodologias ágeis que permitem flexibilidade. Realizamos entregas parciais para validação e os ajustes são incorporados nos ciclos de desenvolvimento subsequentes.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">5. Quais tecnologias a JimmyDev utiliza?</h2>
              <p className="text-gray-600">Utilizamos as tecnologias mais modernas e adequadas para cada projeto, incluindo React, React Native, Node.js, TypeScript, Firebase, AWS, entre outras. A escolha das tecnologias é feita de acordo com as necessidades específicas de cada projeto.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">6. Vocês desenvolvem apenas aplicativos ou também outros tipos de software?</h2>
              <p className="text-gray-600">Desenvolvemos diversos tipos de soluções digitais, incluindo aplicativos móveis, sistemas web, plataformas e-commerce, integrações API e sistemas corporativos. Nosso foco é criar soluções personalizadas para necessidades específicas.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">7. Como funciona o processo de pagamento?</h2>
              <p className="text-gray-600">Trabalhamos com um modelo de pagamento em etapas, vinculado à entrega de marcos do projeto. Geralmente, dividimos em três parcelas: uma inicial, uma intermediária após aprovação da prototipagem, e uma final na entrega. Os detalhes são sempre definidos em contrato.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">8. Vocês oferecem serviços de manutenção contínua?</h2>
              <p className="text-gray-600">Sim, oferecemos planos de manutenção evolutiva e corretiva para garantir que seu software continue funcionando perfeitamente e evolua conforme as necessidades do negócio. Temos diferentes opções de contrato conforme a necessidade de cada cliente.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
