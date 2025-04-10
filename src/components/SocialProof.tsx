
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CodeXml, ShoppingBag, Users, Activity, HeartPulse, TrendingUp } from 'lucide-react';

interface ProjectSuggestionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ProjectSuggestion: React.FC<ProjectSuggestionProps> = ({ icon, title, description, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
      <div className="mb-4 p-3 rounded-lg inline-block" style={{ backgroundColor: `${color}25` }}>
        <div className="text-white p-2 rounded-lg" style={{ backgroundColor: color }}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        className="flex items-center text-sm font-medium"
        style={{ color }}
      >
        Explorar ideia <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export const SocialProof: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Sugestões de projetos</h2>
          <p className="text-gray-600">
            Explore essas ideias de aplicativos corporativos para inspirar seu próximo projeto
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectSuggestion 
            icon={<ShoppingBag size={24} />} 
            title="E-commerce B2B" 
            color="#4F46E5"
            description="Plataforma de comércio para transações entre empresas com catálogos personalizados e preços por volume." 
          />
          
          <ProjectSuggestion 
            icon={<Users size={24} />} 
            title="Intranet Corporativa" 
            color="#0EA5E9"
            description="Rede interna para comunicação, compartilhamento de documentos e colaboração entre departamentos." 
          />
          
          <ProjectSuggestion 
            icon={<HeartPulse size={24} />} 
            title="Bem-estar Corporativo" 
            color="#10B981"
            description="Aplicativo para promover saúde e bem-estar dos colaboradores com desafios e recompensas." 
          />
          
          <ProjectSuggestion 
            icon={<CodeXml size={24} />} 
            title="Gestor de Projetos" 
            color="#F59E0B"
            description="Ferramenta de gerenciamento de projetos com acompanhamento de tarefas e colaboração em tempo real." 
          />
          
          <ProjectSuggestion 
            icon={<Activity size={24} />} 
            title="Dashboard Analítico" 
            color="#EC4899"
            description="Visualização de dados empresariais com KPIs personalizados e relatórios automatizados." 
          />
          
          <ProjectSuggestion 
            icon={<TrendingUp size={24} />} 
            title="CRM Inteligente" 
            color="#8B5CF6"
            description="Sistema de gestão de relacionamento com clientes potencializado por inteligência artificial." 
          />
        </div>
      </div>
    </section>
  );
};
