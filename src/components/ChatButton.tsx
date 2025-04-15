
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get('message');
    
    if (message && message.toString().trim() !== '') {
      toast.success('Mensagem enviada!', {
        description: 'Responderemos em breve. Obrigado pelo contato.',
      });
      setIsOpen(false);
      // Reset the form
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button 
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-primary p-4 text-white">
            <h3 className="font-bold text-lg">Chat com Suporte</h3>
            <p className="text-sm text-white/80">Estamos aqui para ajudar</p>
          </div>
          
          <div className="p-4 max-h-96 overflow-auto bg-gray-50">
            <div className="bg-primary/10 p-3 rounded-lg inline-block max-w-[80%] mb-2">
              <p className="text-sm">Olá! Como podemos ajudar você hoje?</p>
              <span className="text-xs text-gray-500 block mt-1">Suporte JimmyDev • Agora</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                name="message"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Digite sua mensagem..."
                required
              />
              <Button type="submit" size="sm">Enviar</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatButton;
