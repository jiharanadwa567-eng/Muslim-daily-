
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Trash2, Mic, MicOff, Volume2, VolumeX, StopCircle, Copy, Check, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
  timestamp: string;
}

const TanyaAiView: React.FC = () => {
  // Ambil nama pengguna dari localStorage untuk sapaan awal
  const userName = localStorage.getItem('muslim_daily_user_name') || 'Saudaraku';

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'ai', 
      text: `Assalamualaikum warahmatullah, ${userName}. Saya Asisten Muslim AI. Ada yang bisa saya bantu diskusikan seputar Islam, ibadah, atau nasihat bijak hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

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

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitCompassHeading;
    if ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRec();
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

    setConnectionError(null);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = Date.now();
    
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: query, timestamp }]);
    setInputText('');
    setIsLoading(true);
    stopSpeaking();

    const aiMsgId = userMsgId + 1;
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true, timestamp }]);

    try {
      // Inisialisasi GoogleGenAI tepat sebelum pemanggilan untuk memastikan API Key terbaru digunakan
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
            systemInstruction: `Anda adalah 'Ustadz Digital' yang bijaksana dan ramah di aplikasi Muslim Daily. Jawablah setiap pertanyaan dengan nilai-nilai Islami yang moderat. Sapa pengguna dengan nama '${userName}'. Berikan dalil Al-Qur'an atau Hadits jika relevan secara ringkas. Gunakan bahasa Indonesia yang santun. Hindari format markdown yang berlebihan.`,
            temperature: 0.7,
            topP: 0.95,
            topK: 40
        }
      });

      let fullResponse = '';
      for await (const chunk of responseStream) {
        if (!isMounted.current) break;
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
      }
      
      if (isMounted.current) {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
        if (autoRead) speakText(fullResponse);
      }
    } catch (e: any) {
      console.error("Gemini API Error:", e);
      
      if (isMounted.current) {
        const errorMessage = e.message || "";
        
        // Penanganan error 404 (Requested entity was not found)
        if (errorMessage.includes("Requested entity was not found")) {
            setConnectionError("Layanan AI tidak ditemukan atau API Key tidak valid. Mohon pilih proyek API Key yang aktif.");
            // Pemicu dialog pemilihan kunci sesuai pedoman
            if (window.aistudio?.openSelectKey) {
                window.aistudio.openSelectKey();
            }
        } else {
            setConnectionError("Gagal terhubung ke layanan AI. Pastikan API Key Anda valid dan aktif.");
        }

        setMessages(prev => prev.map(m => m.id === aiMsgId ? { 
            ...m, 
            text: "Afwan, sepertinya ada kendala teknis saat menghubungi layanan AI kami. Mohon periksa koneksi atau pengaturan API Key Anda.", 
            isStreaming: false 
        } : m));
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-transparent">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 p-3 bg-white/10 backdrop-blur-xl border-b border-white/10 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
              <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center shadow-md border border-white/20">
                      <Sparkles size={18} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#3B5998] rounded-full"></div>
              </div>
              <div className="flex flex-col">
                  <h4 className="text-[#EFFACD] text-sm font-bold leading-tight tracking-wide">Asisten AI (Gemini 3)</h4>
                  <span className="text-green-300 text-[10px] uppercase font-bold tracking-tighter opacity-80">Online & Siap Membantu</span>
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
                title="Bersihkan Chat"
              >
                  <Trash2 size={18} />
              </button>
          </div>
      </div>

      {/* Area Pesan */}
      <div className="flex-1 overflow-y-auto p-4 pt-20 pb-28 space-y-6 custom-scrollbar">
          {connectionError && (
              <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-xl flex items-center gap-3 text-red-100 text-xs animate-fade-in">
                  <AlertCircle size={16} />
                  <span>{connectionError}</span>
              </div>
          )}

          {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                      <div className={`flex flex-col max-w-[88%] ${isUser ? 'items-end' : 'items-start'}`}>
                          <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end group`}>
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg border
                                  ${isUser ? 'bg-[#EFFACD] text-[#3B5998] border-white/20' : 'bg-white text-blue-600 border-blue-100'}
                              `}>
                                  {isUser ? <User size={16} /> : <Sparkles size={16} />}
                              </div>
                              <div className={`p-4 rounded-2xl shadow-xl text-sm relative
                                  ${isUser 
                                    ? 'bg-gradient-to-br from-[#EFFACD] to-[#dce8b3] text-[#3B5998] rounded-tr-none' 
                                    : 'bg-white/95 text-slate-800 rounded-tl-none border border-white/50 backdrop-blur-sm'}
                              `}>
                                  {msg.text || (msg.isStreaming && <div className="animate-pulse">Mengetik...</div>)}
                                  {!isUser && !msg.isStreaming && (
                                      <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button onClick={() => speakText(msg.text)} className="text-slate-400 hover:text-blue-600">
                                              <Volume2 size={14} />
                                          </button>
                                          <button onClick={() => handleCopy(msg.text, msg.id)} className="text-slate-400 hover:text-blue-600">
                                              {copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                          </button>
                                      </div>
                                  )}
                              </div>
                          </div>
                          <span className="text-[10px] text-[#EFFACD]/40 mt-1.5 font-medium px-1">{msg.timestamp}</span>
                      </div>
                  </div>
              );
          })}
          
          <div ref={messagesEndRef} />
      </div>

      {/* Dock Input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#3B5998] via-[#3B5998]/90 to-transparent">
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl flex items-center p-2 border border-white/25 shadow-2xl">
              <button 
                  onClick={toggleListening}
                  className={`p-4 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-[#EFFACD] hover:bg-white/10'}`}
              >
                  {isListening ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
              <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Mendengarkan..." : "Tanya seputar Islam..."}
                  className="flex-1 bg-transparent px-3 py-3 text-white placeholder-[#EFFACD]/40 focus:outline-none text-sm font-medium"
              />
              <button 
                  onClick={() => isSpeaking ? stopSpeaking() : handleSend()}
                  disabled={isLoading || (!inputText.trim() && !isSpeaking)}
                  className={`p-4 rounded-2xl transition-all ${isSpeaking ? 'bg-orange-500 text-white animate-pulse' : (inputText.trim() ? 'bg-[#EFFACD] text-[#3B5998]' : 'text-[#EFFACD]/20')}`}
              >
                  {isSpeaking ? <StopCircle size={22} /> : <Send size={22} />}
              </button>
          </div>
      </div>
    </div>
  );
};

export default TanyaAiView;
