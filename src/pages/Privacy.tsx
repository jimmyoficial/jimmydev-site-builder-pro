
import React from 'react';
import { Layout } from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">1. Informações Coletadas</h2>
              <p className="text-gray-600 mb-2">A JimmyDev coleta informações pessoais como nome, e-mail, telefone e outras informações de contato quando você as fornece voluntariamente através de nossos formulários, simuladores ou ao solicitar serviços.</p>
              <p className="text-gray-600">Também coletamos informações de navegação como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência para melhorar a experiência do usuário e nossos serviços.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">2. Uso das Informações</h2>
              <p className="text-gray-600 mb-2">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Responder a suas solicitações e dúvidas</li>
                <li>Enviar informações relevantes sobre nossos serviços</li>
                <li>Personalizar sua experiência em nosso site</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">3. Compartilhamento de Informações</h2>
              <p className="text-gray-600">Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar informações com parceiros de confiança que nos auxiliam na operação do site e na prestação de serviços, sempre sob rigorosos padrões de confidencialidade.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">4. Segurança das Informações</h2>
              <p className="text-gray-600">Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou alteração. No entanto, nenhum método de transmissão pela internet é 100% seguro, e não podemos garantir a segurança absoluta.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">5. Seus Direitos</h2>
              <p className="text-gray-600 mb-2">Você tem direito a:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Acessar, corrigir ou excluir seus dados pessoais</li>
                <li>Retirar seu consentimento a qualquer momento</li>
                <li>Solicitar a limitação do processamento de seus dados</li>
                <li>Opor-se ao processamento de seus dados</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">6. Alterações na Política</h2>
              <p className="text-gray-600">Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações. As alterações entram em vigor imediatamente após serem publicadas no site.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">7. Contato</h2>
              <p className="text-gray-600">Se você tiver dúvidas ou preocupações sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: privacidade@jimmydev.com</p>
            </div>
            
            <p className="text-gray-600 italic">Última atualização: 11 de abril de 2025</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
