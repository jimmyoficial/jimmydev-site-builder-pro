import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Plus, 
  Trash2, 
  Play, 
  Bot,
  Users,
  Clock,
  ArrowRight,
  Settings,
  BarChart3
} from 'lucide-react';

interface FlowStep {
  id: string;
  type: 'message' | 'condition' | 'delay' | 'action';
  title: string;
  content: string;
  conditions?: string[];
  delay?: number;
}

interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  steps: FlowStep[];
  active: boolean;
}

const predefinedFlows: AutomationFlow[] = [
  {
    id: 'welcome',
    name: 'Boas-vindas Automático',
    description: 'Mensagem de boas-vindas para novos contatos',
    trigger: 'Novo contato',
    active: true,
    steps: [
      {
        id: '1',
        type: 'message',
        title: 'Mensagem de Boas-vindas',
        content: 'Olá! 👋 Bem-vindo(a) à nossa empresa. Como posso ajudá-lo(a) hoje?'
      },
      {
        id: '2',
        type: 'condition',
        title: 'Aguardar Resposta',
        content: 'Aguarda resposta do cliente',
        conditions: ['Produto', 'Suporte', 'Vendas']
      }
    ]
  },
  {
    id: 'sales-funnel',
    name: 'Funil de Vendas',
    description: 'Sequência automatizada para conversão de leads',
    trigger: 'Palavra-chave: "produto"',
    active: true,
    steps: [
      {
        id: '1',
        type: 'message',
        title: 'Apresentar Produtos',
        content: 'Ótimo! Temos vários produtos incríveis. Qual área te interessa mais?'
      },
      {
        id: '2',
        type: 'delay',
        title: 'Aguardar 2 minutos',
        content: 'Pausa de 2 minutos',
        delay: 2
      },
      {
        id: '3',
        type: 'message',
        title: 'Oferta Especial',
        content: 'Temos uma oferta especial hoje! Desconto de 20% para novos clientes. Quer saber mais?'
      }
    ]
  }
];

const stepTypes = [
  { type: 'message', icon: MessageCircle, label: 'Mensagem', color: 'bg-blue-500' },
  { type: 'condition', icon: Settings, label: 'Condição', color: 'bg-yellow-500' },
  { type: 'delay', icon: Clock, label: 'Delay', color: 'bg-purple-500' },
  { type: 'action', icon: Bot, label: 'Ação', color: 'bg-green-500' }
];

export const WhatsAppAutomation: React.FC = () => {
  const [flows, setFlows] = useState<AutomationFlow[]>(predefinedFlows);
  const [selectedFlow, setSelectedFlow] = useState<AutomationFlow | null>(flows[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [newStepType, setNewStepType] = useState<string>('message');
  const [testPhone, setTestPhone] = useState('');
  const [analytics, setAnalytics] = useState({
    totalSent: 1247,
    responses: 892,
    conversions: 156,
    responseRate: 71.5
  });

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const addNewStep = () => {
    if (!selectedFlow) return;
    
    const newStep: FlowStep = {
      id: Date.now().toString(),
      type: newStepType as FlowStep['type'],
      title: `Nova ${stepTypes.find(t => t.type === newStepType)?.label}`,
      content: 'Digite o conteúdo aqui...'
    };

    const updatedFlow = {
      ...selectedFlow,
      steps: [...selectedFlow.steps, newStep]
    };

    setSelectedFlow(updatedFlow);
    setFlows(flows.map(f => f.id === selectedFlow.id ? updatedFlow : f));
  };

  const deleteStep = (stepId: string) => {
    if (!selectedFlow) return;
    
    const updatedFlow = {
      ...selectedFlow,
      steps: selectedFlow.steps.filter(step => step.id !== stepId)
    };

    setSelectedFlow(updatedFlow);
    setFlows(flows.map(f => f.id === selectedFlow.id ? updatedFlow : f));
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (!selectedFlow || dragItem.current === null || dragOverItem.current === null) return;

    const dragItemIndex = dragItem.current;
    const dragOverItemIndex = dragOverItem.current;

    const newSteps = [...selectedFlow.steps];
    const draggedStep = newSteps.splice(dragItemIndex, 1)[0];
    newSteps.splice(dragOverItemIndex, 0, draggedStep);

    const updatedFlow = { ...selectedFlow, steps: newSteps };
    setSelectedFlow(updatedFlow);
    setFlows(flows.map(f => f.id === selectedFlow.id ? updatedFlow : f));

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const testAutomation = () => {
    if (!testPhone) {
      alert('Digite um número para testar');
      return;
    }
    alert(`Teste enviado para ${testPhone}! Verifique o WhatsApp.`);
  };

  const StepCard: React.FC<{ step: FlowStep; index: number }> = ({ step, index }) => {
    const stepType = stepTypes.find(t => t.type === step.type);
    const Icon = stepType?.icon || MessageCircle;

    return (
      <div
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragEnter={() => handleDragEnter(index)}
        onDragEnd={handleDragEnd}
        className="group relative"
      >
        <Card className="cursor-move transition-all hover:shadow-md border-l-4" 
              style={{ borderLeftColor: stepType?.color.replace('bg-', '') }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stepType?.color} text-white`}>
                  <Icon size={16} />
                </div>
                <div>
                  <CardTitle className="text-sm">{step.title}</CardTitle>
                  <CardDescription className="text-xs">{stepType?.label}</CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteStep(step.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground">
              {step.type === 'message' && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <MessageCircle size={14} className="inline mr-2 text-green-600" />
                  {step.content}
                </div>
              )}
              {step.type === 'condition' && (
                <div className="space-y-2">
                  <p>Aguarda uma das respostas:</p>
                  <div className="flex flex-wrap gap-1">
                    {step.conditions?.map((condition, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {step.type === 'delay' && (
                <div className="flex items-center gap-2 text-purple-600">
                  <Clock size={14} />
                  Aguardar {step.delay} minuto(s)
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {index < (selectedFlow?.steps.length || 0) - 1 && (
          <div className="flex justify-center my-2">
            <ArrowRight className="text-muted-foreground" size={20} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="whatsapp-automation" className="section-padding bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Automações para WhatsApp
          </h2>
          <p className="text-muted-foreground text-lg animate-on-scroll" style={{ animationDelay: '200ms' }}>
            Crie fluxos automatizados para atendimento, vendas e suporte no WhatsApp. 
            Aumente suas conversões e melhore a experiência do cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Analytics Panel */}
          <Card className="lg:col-span-1 animate-on-scroll" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={20} />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mensagens Enviadas</span>
                  <span className="font-semibold">{analytics.totalSent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Respostas</span>
                  <span className="font-semibold">{analytics.responses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversões</span>
                  <span className="font-semibold text-green-600">{analytics.conversions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Taxa de Resposta</span>
                  <span className="font-semibold text-primary">{analytics.responseRate}%</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Label htmlFor="test-phone" className="text-sm font-medium">Testar Automação</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="test-phone"
                    placeholder="(11) 99999-9999"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={testAutomation}>
                    <Play size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Flow Selection */}
            <Card className="animate-on-scroll" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Fluxos de Automação</CardTitle>
                    <CardDescription>Selecione um fluxo para editar ou criar um novo</CardDescription>
                  </div>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Visualizar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flows.map((flow) => (
                    <Card 
                      key={flow.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedFlow?.id === flow.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedFlow(flow)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm">{flow.name}</h4>
                          <Badge variant={flow.active ? "default" : "secondary"} className="text-xs">
                            {flow.active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{flow.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MessageCircle size={12} />
                          Trigger: {flow.trigger}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flow Builder */}
            {selectedFlow && (
              <Card className="animate-on-scroll" style={{ animationDelay: '800ms' }}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Bot size={20} />
                        {selectedFlow.name}
                      </CardTitle>
                      <CardDescription>{selectedFlow.description}</CardDescription>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <select 
                          value={newStepType} 
                          onChange={(e) => setNewStepType(e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          {stepTypes.map(type => (
                            <option key={type.type} value={type.type}>{type.label}</option>
                          ))}
                        </select>
                        <Button size="sm" onClick={addNewStep}>
                          <Plus size={14} className="mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedFlow.steps.map((step, index) => (
                      <StepCard key={step.id} step={step} index={index} />
                    ))}
                    
                    {selectedFlow.steps.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bot size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Nenhuma etapa adicionada ainda</p>
                        <p className="text-sm">Clique em "Adicionar" para criar seu primeiro passo</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};