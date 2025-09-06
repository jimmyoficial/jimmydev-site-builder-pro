import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator,
  FileText,
  Send,
  History,
  Download,
  User,
  Building,
  Smartphone,
  Globe,
  Bot,
  Plus,
  Trash2,
  DollarSign
} from 'lucide-react';

interface QuoteItem {
  id: string;
  type: 'website' | 'app' | 'automation' | 'custom';
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Quote {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  items: QuoteItem[];
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: Date;
  notes: string;
}

const serviceTypes = [
  { id: 'website', name: 'Website Institucional', icon: Globe, basePrice: 2500 },
  { id: 'ecommerce', name: 'E-commerce', icon: Building, basePrice: 5500 },
  { id: 'app-simple', name: 'App Simples', icon: Smartphone, basePrice: 8000 },
  { id: 'app-complex', name: 'App Complexo', icon: Smartphone, basePrice: 15000 },
  { id: 'automation', name: 'Automação WhatsApp', icon: Bot, basePrice: 1200 },
  { id: 'maintenance', name: 'Manutenção Mensal', icon: FileText, basePrice: 500 }
];

export const SalesPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentQuote, setCurrentQuote] = useState<Quote>({
    id: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: '',
    items: [],
    total: 0,
    status: 'draft',
    createdAt: new Date(),
    notes: ''
  });
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [sellerInfo, setSellerInfo] = useState({
    name: 'João Vendedor',
    email: 'joao@empresa.com',
    company: 'JimmyDev Solutions',
    logo: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated login - in production this would validate credentials
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const addQuoteItem = (serviceType: string) => {
    const service = serviceTypes.find(s => s.id === serviceType);
    if (!service) return;

    const newItem: QuoteItem = {
      id: Date.now().toString(),
      type: service.id as QuoteItem['type'],
      description: service.name,
      quantity: 1,
      unitPrice: service.basePrice,
      total: service.basePrice
    };

    const updatedItems = [...currentQuote.items, newItem];
    const total = updatedItems.reduce((sum, item) => sum + item.total, 0);

    setCurrentQuote({
      ...currentQuote,
      items: updatedItems,
      total
    });
  };

  const updateQuoteItem = (itemId: string, field: keyof QuoteItem, value: any) => {
    const updatedItems = currentQuote.items.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });

    const total = updatedItems.reduce((sum, item) => sum + item.total, 0);

    setCurrentQuote({
      ...currentQuote,
      items: updatedItems,
      total
    });
  };

  const removeQuoteItem = (itemId: string) => {
    const updatedItems = currentQuote.items.filter(item => item.id !== itemId);
    const total = updatedItems.reduce((sum, item) => sum + item.total, 0);

    setCurrentQuote({
      ...currentQuote,
      items: updatedItems,
      total
    });
  };

  const saveQuote = () => {
    const quote = {
      ...currentQuote,
      id: currentQuote.id || Date.now().toString(),
      createdAt: currentQuote.id ? currentQuote.createdAt : new Date()
    };

    if (currentQuote.id) {
      setQuotes(quotes.map(q => q.id === quote.id ? quote : q));
    } else {
      setQuotes([...quotes, quote]);
    }

    // Reset form
    setCurrentQuote({
      id: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      company: '',
      items: [],
      total: 0,
      status: 'draft',
      createdAt: new Date(),
      notes: ''
    });
  };

  const generatePDF = () => {
    // Simulated PDF generation
    alert('PDF gerado com sucesso! (Funcionalidade seria implementada com bibliotecas como jsPDF)');
  };

  const sendQuote = () => {
    const updatedQuote = { ...currentQuote, status: 'sent' as const };
    setCurrentQuote(updatedQuote);
    saveQuote();
    alert(`Orçamento enviado para ${currentQuote.clientEmail} via WhatsApp e e-mail!`);
  };

  if (!isLoggedIn) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-custom max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <User size={24} />
                Painel do Vendedor
              </CardTitle>
              <CardDescription>
                Faça login para acessar o sistema de orçamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Painel do Vendedor</h2>
            <p className="text-muted-foreground">Bem-vindo, {sellerInfo.name}</p>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Sair
          </Button>
        </div>

        <Tabs defaultValue="quote" className="space-y-6">
          <TabsList>
            <TabsTrigger value="quote">Novo Orçamento</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="quote" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Client Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informações do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Nome</Label>
                      <Input
                        id="clientName"
                        value={currentQuote.clientName}
                        onChange={(e) => setCurrentQuote({ ...currentQuote, clientName: e.target.value })}
                        placeholder="Nome do cliente"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={currentQuote.company}
                        onChange={(e) => setCurrentQuote({ ...currentQuote, company: e.target.value })}
                        placeholder="Nome da empresa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">E-mail</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={currentQuote.clientEmail}
                        onChange={(e) => setCurrentQuote({ ...currentQuote, clientEmail: e.target.value })}
                        placeholder="email@cliente.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientPhone">Telefone</Label>
                      <Input
                        id="clientPhone"
                        value={currentQuote.clientPhone}
                        onChange={(e) => setCurrentQuote({ ...currentQuote, clientPhone: e.target.value })}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={currentQuote.notes}
                      onChange={(e) => setCurrentQuote({ ...currentQuote, notes: e.target.value })}
                      placeholder="Observações do projeto..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Add Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Serviços</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Button
                        key={service.id}
                        variant="outline"
                        size="sm"
                        onClick={() => addQuoteItem(service.id)}
                        className="w-full justify-start"
                      >
                        <Icon size={16} className="mr-2" />
                        {service.name}
                        <span className="ml-auto text-muted-foreground">
                          R$ {service.basePrice.toLocaleString()}
                        </span>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Quote Items */}
            <Card>
              <CardHeader>
                <CardTitle>Itens do Orçamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentQuote.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <Input
                          value={item.description}
                          onChange={(e) => updateQuoteItem(item.id, 'description', e.target.value)}
                          placeholder="Descrição do serviço"
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuoteItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          min="1"
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateQuoteItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                      <div className="w-32 font-semibold">
                        R$ {item.total.toLocaleString()}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuoteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}

                  {currentQuote.items.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Nenhum item adicionado</p>
                      <p className="text-sm">Use os botões ao lado para adicionar serviços</p>
                    </div>
                  )}
                </div>

                {currentQuote.items.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-primary">R$ {currentQuote.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={saveQuote} variant="outline">
                <FileText size={16} className="mr-2" />
                Salvar Rascunho
              </Button>
              <Button onClick={generatePDF} variant="outline">
                <Download size={16} className="mr-2" />
                Gerar PDF
              </Button>
              <Button onClick={sendQuote} disabled={!currentQuote.clientEmail}>
                <Send size={16} className="mr-2" />
                Enviar Orçamento
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Orçamentos</CardTitle>
              </CardHeader>
              <CardContent>
                {quotes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nenhum orçamento encontrado</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{quote.clientName}</h4>
                          <p className="text-sm text-muted-foreground">{quote.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={
                              quote.status === 'approved' ? 'default' :
                              quote.status === 'sent' ? 'secondary' :
                              quote.status === 'rejected' ? 'destructive' : 'outline'
                            }>
                              {quote.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {quote.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">R$ {quote.total.toLocaleString()}</div>
                          <Button variant="ghost" size="sm">Ver Detalhes</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Vendedor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sellerName">Nome</Label>
                    <Input
                      id="sellerName"
                      value={sellerInfo.name}
                      onChange={(e) => setSellerInfo({ ...sellerInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellerEmail">E-mail</Label>
                    <Input
                      id="sellerEmail"
                      value={sellerInfo.email}
                      onChange={(e) => setSellerInfo({ ...sellerInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellerCompany">Empresa</Label>
                    <Input
                      id="sellerCompany"
                      value={sellerInfo.company}
                      onChange={(e) => setSellerInfo({ ...sellerInfo, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellerLogo">Logo da Empresa (URL)</Label>
                    <Input
                      id="sellerLogo"
                      value={sellerInfo.logo}
                      onChange={(e) => setSellerInfo({ ...sellerInfo, logo: e.target.value })}
                      placeholder="https://exemplo.com/logo.png"
                    />
                  </div>
                </div>
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};