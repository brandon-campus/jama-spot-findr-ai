
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

const ChatAssistant = ({ onClose, onSearch }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy tu asistente de Jama. Cuéntame qué tipo de lugar estás buscando y te ayudo a encontrarlo. Por ejemplo: "Busco una cafetería tranquila para trabajar" o "Quiero un restaurante romántico para una cita".',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('trabajo') || lowerMessage.includes('trabajar') || lowerMessage.includes('oficina') || lowerMessage.includes('wifi')) {
      return "¡Perfecto! Veo que buscas un lugar para trabajar. ¿Necesitas algo específico como wifi, enchufes, ambiente silencioso? ¿En qué zona te gustaría? Te puedo sugerir cafeterías y coworkings ideales.";
    }
    
    if (lowerMessage.includes('familia') || lowerMessage.includes('niños') || lowerMessage.includes('hijos') || lowerMessage.includes('parque')) {
      return "¡Genial! Para salidas familiares tengo varias opciones. ¿Prefieres actividades al aire libre como parques, o lugares cerrados como centros comerciales? ¿Qué edades tienen los niños?";
    }
    
    if (lowerMessage.includes('pareja') || lowerMessage.includes('cita') || lowerMessage.includes('romántico') || lowerMessage.includes('novio') || lowerMessage.includes('novia')) {
      return "¡Qué lindo! Para una cita romántica puedo recomendarte desde restaurantes íntimos hasta bares con terraza. ¿Prefieres algo más formal o casual? ¿Interior o al aire libre?";
    }
    
    if (lowerMessage.includes('cafetería') || lowerMessage.includes('café')) {
      return "¡Excelente elección! ¿La cafetería es para trabajar, reunirte con amigos o relajarte? ¿Prefieres ambiente más animado o tranquilo? ¿En qué barrio?";
    }
    
    if (lowerMessage.includes('restaurante') || lowerMessage.includes('comer') || lowerMessage.includes('comida')) {
      return "¡Perfecto! ¿Qué tipo de comida te gusta? ¿Es para una ocasión especial o algo casual? ¿Cuál es tu presupuesto aproximado?";
    }
    
    if (lowerMessage.includes('cerca') || lowerMessage.includes('barrio') || lowerMessage.includes('zona')) {
      return "Entiendo que buscas algo cerca. ¿Me puedes decir en qué barrio o zona estás? Así te puedo dar recomendaciones más precisas.";
    }
    
    // Respuesta genérica
    return "Entiendo que buscas un lugar especial. ¿Podrías darme más detalles? Por ejemplo: ¿es para trabajar, familia o pareja? ¿En qué zona? ¿Tienes alguna preferencia específica?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const response = generateResponse(input);
    simulateTyping(response);
    
    // Si el mensaje del usuario parece una búsqueda específica, ofrecer buscar
    if (input.length > 10 && (input.includes('busco') || input.includes('quiero') || input.includes('necesito'))) {
      setTimeout(() => {
        const searchMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `¿Te parece si busco lugares que coincidan con "${input}"? Puedes hacer clic en el botón de abajo para ver los resultados.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, searchMessage]);
      }, 2000);
    }
    
    setInput("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="border-b bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>Asistente Jama</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Botón de búsqueda si la conversación sugiere buscar */}
            {messages.length > 2 && messages[messages.length - 1].type === 'bot' && 
             messages[messages.length - 1].content.includes('busco lugares') && (
              <div className="flex justify-center">
                <Button
                  onClick={() => onSearch(input)}
                  className="bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600"
                >
                  Ver resultados de búsqueda
                </Button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
              />
              <Button 
                onClick={handleSend}
                className="bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;
