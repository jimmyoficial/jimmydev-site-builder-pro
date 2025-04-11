
import React from 'react';
import { Layout } from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Serviço</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">1. Aceitação dos Termos</h2>
              <p className="text-gray-600">Ao acessar ou utilizar os serviços da JimmyDev, você concorda em cumprir e ficar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos serviços.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">2. Descrição dos Serviços</h2>
              <p className="text-gray-600">A JimmyDev oferece serviços de desenvolvimento de software, aplicativos móveis, plataformas web e consultoria tecnológica. Os detalhes específicos, prazos e entregáveis serão definidos em contratos individuais para cada projeto.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">3. Processo de Desenvolvimento</h2>
              <p className="text-gray-600 mb-2">Nosso processo de desenvolvimento inclui as seguintes etapas:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Levantamento e análise de requisitos</li>
                <li>Planejamento e definição de escopo</li>
                <li>Design e prototipagem</li>
                <li>Desenvolvimento</li>
                <li>Testes e garantia de qualidade</li>
                <li>Implementação e entrega</li>
                <li>Manutenção e suporte (conforme contratado)</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">4. Pagamentos e Faturamento</h2>
              <p className="text-gray-600">Os preços, formas de pagamento e cronograma de faturamento serão estabelecidos em contrato específico para cada projeto. Geralmente, trabalhamos com um modelo de pagamento em etapas, vinculado à entrega de marcos do projeto.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">5. Propriedade Intelectual</h2>
              <p className="text-gray-600 mb-2">Após a conclusão do projeto e pagamento integral, o cliente recebe os direitos de uso do software desenvolvido conforme especificado em contrato. A JimmyDev mantém os direitos sobre:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Componentes e bibliotecas proprietárias</li>
                <li>Metodologias e processos de desenvolvimento</li>
                <li>Ferramentas internas utilizadas no desenvolvimento</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">6. Confidencialidade</h2>
              <p className="text-gray-600">Comprometemo-nos a manter a confidencialidade de todas as informações compartilhadas durante o processo de desenvolvimento. Da mesma forma, esperamos que o cliente mantenha confidencialidade sobre aspectos técnicos e metodológicos revelados durante a prestação dos serviços.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">7. Limitação de Responsabilidade</h2>
              <p className="text-gray-600">A JimmyDev não será responsável por danos indiretos, incidentais, especiais ou consequentes, incluindo perda de receita ou lucros, resultantes do uso ou incapacidade de usar nossos serviços, mesmo que tenhamos sido avisados da possibilidade de tais danos.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">8. Cancelamento e Rescisão</h2>
              <p className="text-gray-600">As condições para cancelamento, rescisão e reembolso serão especificadas em contrato. Em geral, em caso de cancelamento por parte do cliente, os valores referentes às etapas já executadas e aprovadas não serão reembolsáveis.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">9. Alterações nos Termos</h2>
              <p className="text-gray-600">Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor após a publicação dos termos revisados em nosso site. É responsabilidade do cliente revisar periodicamente estes termos.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">10. Lei Aplicável</h2>
              <p className="text-gray-600">Estes termos serão regidos e interpretados de acordo com as leis do Brasil. Quaisquer disputas relacionadas a estes termos serão submetidas à jurisdição exclusiva dos tribunais de Curitiba, PR.</p>
            </div>
            
            <p className="text-gray-600 italic">Última atualização: 11 de abril de 2025</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
