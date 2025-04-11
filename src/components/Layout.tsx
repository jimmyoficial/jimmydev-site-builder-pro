
import React, { ReactNode, useState } from 'react';
import { FloatingForm } from './FloatingForm';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [legalDialogOpen, setLegalDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container-custom py-4 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/35f90851-3845-49d7-bf24-cbdccf2974b6.png" 
              alt="JimmyDev Logo" 
              className="h-10 w-auto"
            />
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
      
      <footer className="bg-secondary text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/35f90851-3845-49d7-bf24-cbdccf2974b6.png" 
                  alt="JimmyDev Logo" 
                  className="h-12 w-auto"
                />
              </div>
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
                <li><a href="#" onClick={(e) => { e.preventDefault(); setLegalDialogOpen(true); setActiveTab("help"); }} className="text-gray-300 hover:text-white transition-colors">Central de ajuda</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setLegalDialogOpen(true); setActiveTab("faq"); }} className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setLegalDialogOpen(true); setActiveTab("privacy"); }} className="text-gray-300 hover:text-white transition-colors">Política de privacidade</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setLegalDialogOpen(true); setActiveTab("terms"); }} className="text-gray-300 hover:text-white transition-colors">Termos de serviço</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="text-gray-300 mb-2">contato@jimmydev.com</p>
              <p className="text-gray-300">Curitiba, PR - Brasil</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} JimmyDev. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <Dialog open={legalDialogOpen} onOpenChange={setLegalDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="help">Central de Ajuda</TabsTrigger>
              <TabsTrigger value="privacy">Política de Privacidade</TabsTrigger>
              <TabsTrigger value="terms">Termos de Serviço</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">Como faço para solicitar um orçamento?</h3>
                  <p className="text-gray-600">Entre em contato conosco através do formulário de contato ou pelo e-mail contato@jimmydev.com para receber um orçamento personalizado para seu projeto.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">Qual é o prazo médio para desenvolvimento de um aplicativo?</h3>
                  <p className="text-gray-600">O prazo varia conforme a complexidade do projeto, mas geralmente leva de 2 a 4 meses para aplicativos de média complexidade. Durante a fase de planejamento, definiremos um cronograma detalhado.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">Como funciona o suporte após o lançamento?</h3>
                  <p className="text-gray-600">Oferecemos 30 dias de suporte gratuito após o lançamento. Depois disso, disponibilizamos planos de suporte contínuo com diferentes níveis de atendimento conforme a necessidade do cliente.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">É possível fazer ajustes durante o desenvolvimento?</h3>
                  <p className="text-gray-600">Sim, trabalhamos com metodologias ágeis que permitem flexibilidade. Realizamos entregas parciais para validação e os ajustes são incorporados nos ciclos de desenvolvimento subsequentes.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="help" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Central de Ajuda</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Primeiros passos</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Como iniciar um projeto</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Guia de planejamento</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Checklist de requisitos</a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Tutoriais e recursos</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Usando nossos simuladores</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Exportando especificações</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Compartilhando protótipos</a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Suporte técnico</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Solução de problemas comuns</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Base de conhecimento</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Contatar suporte técnico</a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Para clientes atuais</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Portal do cliente</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Solicitar manutenção</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                      <a href="#" className="text-primary hover:underline">Reportar problemas</a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h3 className="font-semibold text-lg mb-2">Precisa de ajuda adicional?</h3>
                <p className="text-gray-600 mb-3">Nossa equipe está disponível para responder suas dúvidas e auxiliar no que for necessário.</p>
                <a href="mailto:suporte@jimmydev.com" className="btn-primary inline-block">Contatar suporte</a>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Política de Privacidade</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Informações Coletadas</h3>
                  <p className="text-gray-600 mb-2">A JimmyDev coleta informações pessoais como nome, e-mail, telefone e outras informações de contato quando você as fornece voluntariamente através de nossos formulários, simuladores ou ao solicitar serviços.</p>
                  <p className="text-gray-600">Também coletamos informações de navegação como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência para melhorar a experiência do usuário e nossos serviços.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">2. Uso das Informações</h3>
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
                  <h3 className="font-semibold text-lg mb-2">3. Compartilhamento de Informações</h3>
                  <p className="text-gray-600">Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar informações com parceiros de confiança que nos auxiliam na operação do site e na prestação de serviços, sempre sob rigorosos padrões de confidencialidade.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">4. Segurança das Informações</h3>
                  <p className="text-gray-600">Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou alteração. No entanto, nenhum método de transmissão pela internet é 100% seguro, e não podemos garantir a segurança absoluta.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">5. Seus Direitos</h3>
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
                  <h3 className="font-semibold text-lg mb-2">6. Alterações na Política</h3>
                  <p className="text-gray-600">Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações. As alterações entram em vigor imediatamente após serem publicadas no site.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">7. Contato</h3>
                  <p className="text-gray-600">Se você tiver dúvidas ou preocupações sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: privacidade@jimmydev.com</p>
                </div>
                
                <p className="text-gray-600 italic">Última atualização: 11 de abril de 2025</p>
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Termos de Serviço</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Aceitação dos Termos</h3>
                  <p className="text-gray-600">Ao acessar ou utilizar os serviços da JimmyDev, você concorda em cumprir e ficar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos serviços.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">2. Descrição dos Serviços</h3>
                  <p className="text-gray-600">A JimmyDev oferece serviços de desenvolvimento de software, aplicativos móveis, plataformas web e consultoria tecnológica. Os detalhes específicos, prazos e entregáveis serão definidos em contratos individuais para cada projeto.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">3. Processo de Desenvolvimento</h3>
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
                  <h3 className="font-semibold text-lg mb-2">4. Pagamentos e Faturamento</h3>
                  <p className="text-gray-600">Os preços, formas de pagamento e cronograma de faturamento serão estabelecidos em contrato específico para cada projeto. Geralmente, trabalhamos com um modelo de pagamento em etapas, vinculado à entrega de marcos do projeto.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">5. Propriedade Intelectual</h3>
                  <p className="text-gray-600 mb-2">Após a conclusão do projeto e pagamento integral, o cliente recebe os direitos de uso do software desenvolvido conforme especificado em contrato. A JimmyDev mantém os direitos sobre:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Componentes e bibliotecas proprietárias</li>
                    <li>Metodologias e processos de desenvolvimento</li>
                    <li>Ferramentas internas utilizadas no desenvolvimento</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">6. Confidencialidade</h3>
                  <p className="text-gray-600">Comprometemo-nos a manter a confidencialidade de todas as informações compartilhadas durante o processo de desenvolvimento. Da mesma forma, esperamos que o cliente mantenha confidencialidade sobre aspectos técnicos e metodológicos revelados durante a prestação dos serviços.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">7. Limitação de Responsabilidade</h3>
                  <p className="text-gray-600">A JimmyDev não será responsável por danos indiretos, incidentais, especiais ou consequentes, incluindo perda de receita ou lucros, resultantes do uso ou incapacidade de usar nossos serviços, mesmo que tenhamos sido avisados da possibilidade de tais danos.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">8. Cancelamento e Rescisão</h3>
                  <p className="text-gray-600">As condições para cancelamento, rescisão e reembolso serão especificadas em contrato. Em geral, em caso de cancelamento por parte do cliente, os valores referentes às etapas já executadas e aprovadas não serão reembolsáveis.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">9. Alterações nos Termos</h3>
                  <p className="text-gray-600">Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor após a publicação dos termos revisados em nosso site. É responsabilidade do cliente revisar periodicamente estes termos.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">10. Lei Aplicável</h3>
                  <p className="text-gray-600">Estes termos serão regidos e interpretados de acordo com as leis do Brasil. Quaisquer disputas relacionadas a estes termos serão submetidas à jurisdição exclusiva dos tribunais de Curitiba, PR.</p>
                </div>
                
                <p className="text-gray-600 italic">Última atualização: 11 de abril de 2025</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};
