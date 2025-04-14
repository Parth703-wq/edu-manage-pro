
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! 👋 How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Simple bot response logic based on keywords
  const getBotResponse = (userMessage: string) => {
    const normalizedMessage = userMessage.toLowerCase();
    
    if (normalizedMessage.includes('timetable') || normalizedMessage.includes('schedule')) {
      return 'You can view your timetable in the Timetable section. Click on the Timetable link in the sidebar.';
    }
    
    if (normalizedMessage.includes('fee') || normalizedMessage.includes('payment')) {
      return 'Fee details and payment options are available in the Fees section. You can also check your payment history there.';
    }
    
    if (normalizedMessage.includes('exam') || normalizedMessage.includes('result')) {
      return 'You can find exam schedules and results in the Examinations section. Past papers are also available there for reference.';
    }
    
    if (normalizedMessage.includes('attendance')) {
      return 'Your attendance records can be checked in the Attendance section. Make sure to maintain at least 75% attendance to be eligible for exams.';
    }
    
    if (normalizedMessage.includes('course') || normalizedMessage.includes('subject')) {
      return 'Course details are available in the Courses section. You can see your enrolled subjects and course materials there.';
    }
    
    if (normalizedMessage.includes('faculty') || normalizedMessage.includes('teacher') || normalizedMessage.includes('professor')) {
      return 'Faculty information is available in the Faculty section. You can find contact details and office hours for all professors.';
    }
    
    if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
      return `Hello ${user?.name || 'there'}! How can I help you today?`;
    }
    
    if (normalizedMessage.includes('thank')) {
      return "You're welcome! Is there anything else you need help with?";
    }
    
    if (normalizedMessage.includes('bye') || normalizedMessage.includes('goodbye')) {
      return "Goodbye! Feel free to come back if you have more questions.";
    }
    
    return "I'm not sure I understand. Could you please rephrase your question? You can ask about timetables, fees, exams, courses, attendance, and faculty.";
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-college-purple text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all z-40"
        aria-label="Chat with us"
      >
        <MessageSquare size={24} />
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed right-6 bottom-20 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-[500px]'
          } flex flex-col`}
        >
          {/* Chat Header */}
          <div className="bg-college-purple text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare size={18} />
              <h3 className="font-semibold">GECBHaruch Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleMinimize} 
                className="p-1 hover:bg-college-purple-dark rounded"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button 
                onClick={toggleChat} 
                className="p-1 hover:bg-college-purple-dark rounded"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-college-purple text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`text-xs ${
                          msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                        } block text-right mt-1`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center space-x-1 text-gray-500 mb-3">
                    <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none inline-block">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <div className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-college-purple focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-college-purple text-white p-2 rounded-full hover:bg-purple-700"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
