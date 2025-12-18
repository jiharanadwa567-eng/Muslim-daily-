
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Trash2, Mic, MicOff, Volume2, VolumeX, StopCircle, MessageSquare, Copy, Check, Share2, CornerDownRight } from 'lucide-react';
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
  "Kisah singkat Nabi Muhammad SAW"
];

const TanyaAiView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'ai', 
      text: "Assalamualaikum warahmatullah. Saya Asisten Muslim AI. Ada yang bisa saya bantu diskusikan seputar Islam, ibadah, atau nasihat bijak hari ini?",
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
        recognitionRef.current.onerror = () => setIsListening(false);
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
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) synthRef.current.cancel();
    setIsSpeaking(false);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
        recognitionRef.current.stop();
    } else {
        stopSpeaking();
        recognitionRef.current.start();
        setIsListening(true);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const query = textOverride || inputText;
    if (!query.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: query, timestamp }]);
    setInputText('');
    setIsLoading(true);
    stopSpeaking();

    const aiMsgId = userMsgId + 1;
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true, timestamp }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
            systemInstruction: "Anda adalah 'Ustadz Digital' yang bijaksana, edukatif, dan ramah di aplikasi Muslim Daily. Jawablah setiap pertanyaan dengan nilai-nilai Islami yang moderat dan menyejukkan. Gunakan sapaan hangat seperti 'Saudaraku' atau 'Ananda'. Berikan dalil jika relevan namun tetap ringkas. Gunakan bahasa Indonesia yang santun dan mudah dipahami. Jangan gunakan format markdown yang rumit, berikan teks bersih.",
            temperature: 0.8,
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
      if (isMounted.current) {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: "Afwan, terjadi gangguan koneksi. Mari kita coba lagi sebentar lagi.", isStreaming: false } : m));
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-transparent">
      {/* Dynamic Glass Header */}
      <div className="absolute top-0 left-0 right-0 z-40 p-3 bg-white/10 backdrop-blur-xl border-b border-white/10 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
              <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center shadow-md border border-white/20">
                      <Sparkles size={18} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#3B5998] rounded-full"></div>
              </div>
              <div className="flex flex-col">
                  <h4 className="text-[#EFFACD] text-sm font-bold leading-tight tracking-wide">Ustadz AI</h4>
                  <span className="text-green-300 text-[10px] uppercase font-bold tracking-tighter opacity-80">Siap Menjawab</span>
              </div>
          </div>
          <div className="flex gap-1.5">
              <button 
                onClick={() => setAutoRead(!autoRead)} 
                className={`p-2.5 rounded-xl transition-all ${autoRead ? 'bg-[#EFFACD] text-[#3B5998]' : 'text-[#EFFACD] bg-white/5 hover:bg-white/10'}`}
                title="Baca Otomatis"
              >
                  {autoRead ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button 
                onClick={() => setMessages([messages[0]])} 
                className="p-2.5 text-[#EFFACD] bg-white/5 rounded-xl hover:bg-red-500/20 transition-all"
                title="Hapus Riwayat"
              >
                  <Trash2 size={18} />
              </button>
          </div>
      </div>

      {/* Messages Scrolling Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-20 pb-28 space-y-6">
          {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                      <div className={`flex flex-col max-w-[88%] ${isUser ? 'items-end' : 'items-start'}`}>
                          <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end group`}>
                              {/* Avatar Icon */}
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg border
                                  ${isUser ? 'bg-[#EFFACD] text-[#3B5998] border-white/20' : 'bg-white text-blue-600 border-blue-100'}
                              `}>
                                  {isUser ? <User size={16} /> : <Sparkles size={16} />}
                              </div>
                              
                              {/* Bubble */}
                              <div className={`p-4 rounded-2xl shadow-xl text-sm relative transition-all duration-300
                                  ${isUser 
                                    ? 'bg-gradient-to-br from-[#EFFACD] to-[#dce8b3] text-[#3B5998] rounded-tr-none' 
                                    : 'bg-white/95 text-slate-800 rounded-tl-none border border-white/50 backdrop-blur-sm'}
                              `}>
                                  {msg.text || (msg.isStreaming && (
                                    <div className="dot-typing px-1 py-1">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                  ))}
                                  
                                  {/* Message Tools for AI */}
                                  {!isUser && !msg.isStreaming && (
                                      <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <button onClick={() => speakText(msg.text)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Dengarkan">
                                              <Volume2 size={14} />
                                          </button>
                                          <button onClick={() => handleCopy(msg.text, msg.id)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Salin">
                                              {copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                          </button>
                                          <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Bagikan">
                                              <Share2 size={14} />
                                          </button>
                                      </div>
                                  )}
                              </div>
                          </div>
                          <span className="text-[10px] text-[#EFFACD]/40 mt-1.5 font-medium px-1 flex items-center gap-1">
                            {msg.timestamp} {isUser && <Check size={10} />}
                          </span>
                      </div>
                  </div>
              );
          })}
          
          {/* Quick Prompts UI */}
          {messages.length === 1 && !isLoading && (
              <div className="mt-8 space-y-3 animate-fade-in px-2">
                  <p className="text-[#EFFACD]/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                      <MessageSquare size={12} /> Topik Sering Ditanyakan
                  </p>
                  <div className="flex flex-col gap-2.5">
                      {QUICK_PROMPTS.map((p, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleSend(p)} 
                            className="bg-white/10 border border-white/10 hover:bg-[#EFFACD] hover:text-[#3B5998] text-[#EFFACD] rounded-xl px-4 py-3 text-xs text-left transition-all active:scale-95 flex items-center justify-between group shadow-sm"
                          >
                              <span className="font-medium">{p}</span>
                              <CornerDownRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                          </button>
                      ))}
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Premium Input Dock */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#3B5998] via-[#3B5998]/90 to-transparent">
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl flex items-center p-2 border border-white/25 focus-within:border-[#EFFACD] focus-within:ring-2 focus-within:ring-[#EFFACD]/20 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <button 
                  onClick={toggleListening}
                  className={`p-4 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg' : 'text-[#EFFACD] hover:bg-white/10'}`}
              >
                  {isListening ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
              
              <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Mendengarkan ucapan Anda..." : "Tanya seputar Islam..."}
                  className="flex-1 bg-transparent px-3 py-3 text-white placeholder-[#EFFACD]/40 focus:outline-none text-sm font-medium"
              />
              
              <button 
                  onClick={() => isSpeaking ? stopSpeaking() : handleSend()}
                  disabled={isLoading || (!inputText.trim() && !isSpeaking)}
                  className={`p-4 rounded-2xl transition-all ${isSpeaking ? 'bg-orange-500 text-white animate-pulse' : (inputText.trim() ? 'bg-[#EFFACD] text-[#3B5998] shadow-lg' : 'text-[#EFFACD]/20')}`}
              >
                  {isSpeaking ? <StopCircle size={22} /> : <Send size={22} />}
              </button>
          </div>
          {isListening && <div className="text-center mt-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">Tekan icon microphone untuk berhenti</div>}
      </div>
    </div>
  );
};

export default TanyaAiView;
