
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import ChatButton from './ChatButton';

export const FloatingForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Solicitação enviada com sucesso! Entraremos em contato em breve.', {
      duration: 5000,
    });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating buttons container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
        {/* Schedule consultation button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full shadow-lg p-4 flex items-center gap-2 animate-bounce-light"
        >
          <span>Agendar consultoria grátis</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
      
      {/* Chat Button positioned separately above the consultation button */}
      <div className="fixed bottom-24 right-6 z-40">
        <ChatButton />
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">Agendar consultoria gratuita</h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral/70 hover:text-neutral">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral mb-1">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral mb-1">
                    E-mail profissional
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral mb-1">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral mb-1">
                    Como podemos ajudar?
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Descreva brevemente seu projeto ou necessidade"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button type="submit" className="w-full btn-primary">
                  Solicitar consultoria
                </button>
              </div>
              
              <p className="mt-4 text-sm text-neutral/60 text-center">
                Ao enviar, você concorda com nossa política de privacidade 
                e termos de uso.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
