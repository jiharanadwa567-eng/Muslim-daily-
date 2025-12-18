
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Trash2, Mic, MicOff, Volume2, VolumeX, StopCircle, MessageSquare, Copy, Check, Share2, Info } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Apa hikmah Sholat Tahajud?",
  "Cara meningkatkan khusyuk sholat",
  "Doa agar dimudahkan urusan",
  "Tips istiqomah baca Al-Qur'an",
  "Kisah Nabi Muhammad SAW singkat"
];

const TanyaAiView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'ai', 
      text: "Assalamualaikum warahmatullah. Saya Asisten Muslim AI. Ada yang bisa saya bantu diskusikan seputar Islam, ibadah, atau nasihat hari ini?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const isMounted = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    isMounted.current = true;
    scrollToBottom();
    return () => { isMounted.current = false; };
  }, [messages, isLoading]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = 'id-ID';
        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
                setInputText(transcript);
                handleSend(transcript);
            }
        };
        recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakText = (text: string) => {
    if (!text || !synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
        recognitionRef.current?.stop();
    } else {
        recognitionRef.current?.start();
        setIsListening(true);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const query = textOverride || inputText;
    if (!query.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: query, timestamp }]);
    setInputText('');
    setIsLoading(true);

    const aiMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true, timestamp }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
            systemInstruction: "Anda adalah 'Ustadz Digital' yang bijaksana. Berikan jawaban Islami yang menenangkan, berdasar dalil Al-Qur'an/Hadits jika memungkinkan, dan ramah. Gunakan bahasa Indonesia yang santun. Maksimal 3-4 paragraf per jawaban.",
            temperature: 0.7,
        }
      });

      let fullResponse = '';
      for await (const chunk of result) {
        if (!isMounted.current) break;
        const text = chunk.text;
        fullResponse += text;
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
      }
      
      if (isMounted.current) {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
        if (autoRead) speakText(fullResponse);
      }
    } catch (e) {
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: "Maaf, terjadi gangguan koneksi. Silakan coba lagi.", isStreaming: false } : m));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-transparent">
      {/* Dynamic Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 bg-white/10 backdrop-blur-md border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EFFACD] flex items-center justify-center text-[#3B5998]">
                  <Sparkles size={16} />
              </div>
              <div>
                  <h4 className="text-[#EFFACD] text-xs font-bold leading-none">Asisten Muslim AI</h4>
                  <span className="text-green-300 text-[10px] animate-pulse">Online</span>
              </div>
          </div>
          <div className="flex gap-2">
              <button onClick={() => setAutoRead(!autoRead)} className={`p-2 rounded-lg ${autoRead ? 'bg-[#EFFACD] text-[#3B5998]' : 'text-[#EFFACD] bg-white/5'}`}>
                  {autoRead ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button onClick={() => setMessages([messages[0]])} className="p-2 text-[#EFFACD] bg-white/5 rounded-lg hover:bg-red-500/20">
                  <Trash2 size={16} />
              </button>
          </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-16 pb-28 space-y-6">
          {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                          <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end group`}>
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm
                                  ${isUser ? 'bg-[#EFFACD] text-[#3B5998]' : 'bg-white text-blue-600'}
                              `}>
                                  {isUser ? <User size={14} /> : <Sparkles size={14} />}
                              </div>
                              <div className={`p-4 rounded-2xl shadow-xl text-sm relative transition-all
                                  ${isUser ? 'bg-[#EFFACD] text-[#3B5998] rounded-tr-none' : 'bg-white/95 text-slate-800 rounded-tl-none border border-white/50'}
                              `}>
                                  {msg.text || (msg.isStreaming && <div className="flex gap-1 py-1"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div></div>)}
                                  
                                  {!isUser && !msg.isStreaming && (
                                      <div className="flex gap-3 mt-3 pt-2 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button onClick={() => speakText(msg.text)} className="text-slate-400 hover:text-blue-600"><Volume2 size={14} /></button>
                                          <button onClick={() => handleCopy(msg.text, msg.id)} className="text-slate-400 hover:text-blue-600">{copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}</button>
                                          <button className="text-slate-400 hover:text-blue-600"><Share2 size={14} /></button>
                                      </div>
                                  )}
                              </div>
                          </div>
                          <span className="text-[10px] text-[#EFFACD]/30 mt-1 font-mono">{msg.timestamp}</span>
                      </div>
                  </div>
              );
          })}
          
          {messages.length === 1 && (
              <div className="mt-4 space-y-2 animate-fade-in">
                  <p className="text-[#EFFACD]/50 text-[10px] font-bold uppercase tracking-widest px-2 flex items-center gap-2"><MessageSquare size={12}/> Pertanyaan Populer</p>
                  <div className="flex flex-wrap gap-2">
                      {QUICK_PROMPTS.map((p, i) => (
                          <button key={i} onClick={() => handleSend(p)} className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-xs text-[#EFFACD] hover:bg-[#EFFACD] hover:text-[#3B5998] transition-all active:scale-95">
                              {p}
                          </button>
                      ))}
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Dock */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#3B5998] to-transparent">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center p-2 border border-white/20 focus-within:ring-2 focus-within:ring-[#EFFACD]/30 transition-all shadow-2xl">
              <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-[#EFFACD] hover:bg-white/10'}`}
              >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Mendengarkan..." : "Ketik pesan..."}
                  className="flex-1 bg-transparent px-3 py-2 text-[#EFFACD] placeholder-[#EFFACD]/40 focus:outline-none text-sm font-medium"
              />
              <button 
                  onClick={() => isSpeaking ? synthRef.current?.cancel() : handleSend()}
                  disabled={isLoading || (!inputText.trim() && !isSpeaking)}
                  className={`p-3 rounded-xl transition-all ${inputText.trim() || isSpeaking ? 'bg-[#EFFACD] text-[#3B5998] shadow-lg' : 'text-[#EFFACD]/20'}`}
              >
                  {isSpeaking ? <StopCircle size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
          </div>
      </div>
    </div>
  );
};

export default TanyaAiView;
