
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Trash2, Mic, MicOff, Volume2, VolumeX, StopCircle, MessageSquare, Copy, Check, Share2 } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "Apa keutamaan Sholat Tahajud?",
  "Tips agar khusyuk dalam sholat",
  "Kisah singkat keteladanan Nabi Muhammad",
  "Doa agar hati tenang dan tidak gelisah",
  "Penjelasan tentang zakat penghasilan"
];

const TanyaAiView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'ai', 
      text: "Assalamualaikum, Saudaraku. Saya adalah Asisten Muslim Daily. Ada yang bisa saya bantu diskusikan seputar ajaran Islam, ibadah, atau nasihat bijak hari ini?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
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

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'id-ID';

        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript && transcript.trim().length > 0) {
                setInputText(transcript);
                handleSend(transcript);
            }
        };

        recognitionRef.current.onend = () => { if (isMounted.current) setIsListening(false); };
        recognitionRef.current.onerror = () => { if (isMounted.current) setIsListening(false); };
    } else {
        setSpeechSupported(false);
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
    utterance.onstart = () => { if(isMounted.current) setIsSpeaking(true); };
    utterance.onend = () => { if(isMounted.current) setIsSpeaking(false); };
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
  };

  const toggleListening = () => {
      if (!speechSupported || isLoading) return;
      if (isListening) {
          recognitionRef.current?.stop();
          setIsListening(false);
      } else {
          stopSpeaking();
          try {
            recognitionRef.current?.start();
            setIsListening(true);
          } catch (e) {
            setIsListening(false);
          }
      }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now(), role: 'user', text: textToSend, timestamp };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    stopSpeaking();

    const aiMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { 
        id: aiMsgId, 
        role: 'ai', 
        text: '', 
        isStreaming: true, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: textToSend,
        config: {
            systemInstruction: "Anda adalah 'Ustadz Digital' di aplikasi Muslim Daily. Jawablah setiap pertanyaan dengan bijaksana, ramah, dan berdasarkan nilai-ini Islami (Al-Qur'an dan Hadits jika relevan). Gunakan sapaan hangat seperti 'Saudaraku' atau 'Ananda'. Berikan jawaban yang ringkas namun padat ilmu. Gunakan bahasa Indonesia yang baku namun tetap luwes. Jangan gunakan format markdown yang rumit, cukup teks bersih yang mudah dibaca.",
            temperature: 0.8,
        }
      });

      let fullText = '';
      for await (const chunk of result) {
        if (!isMounted.current) break;
        const c = chunk as GenerateContentResponse;
        fullText += c.text || '';
        setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: fullText } : msg
        ));
      }

      if (isMounted.current) {
        setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
        ));
        if (autoRead) speakText(fullText);
      }
    } catch (error) {
      if (isMounted.current) {
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: "Afwan, sepertinya ada gangguan koneksi. Mari kita coba lagi sebentar lagi.", isStreaming: false } : msg
          ));
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-full animate-fade-in relative bg-transparent overflow-hidden">
      
      {/* Header Status */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex justify-between items-center bg-white/10 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3">
              <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center shadow-lg border border-white/20">
                      <Sparkles size={20} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#3B5998] rounded-full"></div>
              </div>
              <div>
                  <h3 className="text-[#EFFACD] text-sm font-bold leading-none">Asisten Muslim AI</h3>
                  <span className="text-green-300 text-[10px] uppercase font-bold tracking-tighter">Siap Membantu</span>
              </div>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={() => setAutoRead(!autoRead)}
                className={`p-2 rounded-xl transition-all ${autoRead ? 'bg-[#EFFACD] text-[#3B5998]' : 'bg-white/10 text-[#EFFACD]'}`}
                title="Baca Otomatis"
            >
                {autoRead ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button 
                onClick={() => setMessages([{ id: Date.now(), role: 'ai', text: "Chat telah dibersihkan. Apa yang ingin Anda tanyakan kembali?", timestamp: '--:--' }])}
                className="p-2 bg-white/10 rounded-xl text-[#EFFACD] hover:bg-red-500/20"
                title="Hapus Chat"
            >
                <Trash2 size={18} />
            </button>
          </div>
      </div>

      {/* Chat Space */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pt-20 pb-28 custom-scrollbar">
        {messages.map((msg) => {
           const isUser = msg.role === 'user';
           return (
             <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                    
                    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end group`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-md border
                            ${isUser ? 'bg-[#EFFACD] text-[#3B5998] border-white/20' : 'bg-white text-blue-600 border-blue-100'}
                        `}>
                            {isUser ? <User size={16} /> : <Sparkles size={16} />}
                        </div>
                        
                        <div className={`relative p-4 shadow-2xl text-sm leading-relaxed transition-all
                            ${isUser 
                                ? 'bg-gradient-to-br from-[#EFFACD] to-[#d9e8a8] text-[#3B5998] rounded-2xl rounded-tr-none' 
                                : 'bg-white/95 text-slate-800 rounded-2xl rounded-tl-none border border-white/50'}
                        `}>
                            {msg.text || (msg.isStreaming && <div className="flex gap-1 h-4 items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span><span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span></div>)}
                            
                            {/* Action Tools for AI Message */}
                            {!isUser && !msg.isStreaming && (
                                <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => speakText(msg.text)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <Volume2 size={14} />
                                    </button>
                                    <button onClick={() => handleCopy(msg.text, msg.id)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        {copiedId === msg.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    </button>
                                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <Share2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-[10px] text-[#EFFACD]/40 mt-1 font-mono px-1">{msg.timestamp}</span>
                </div>
             </div>
           );
        })}
        
        {messages.length === 1 && (
            <div className="mt-8 space-y-3 animate-fade-in-up">
                <p className="text-[#EFFACD]/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare size={14} /> Pertanyaan Sering Diajukan:
                </p>
                <div className="flex flex-col gap-2">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleSend(prompt)}
                            className="bg-white/10 hover:bg-[#EFFACD] hover:text-[#3B5998] text-[#EFFACD] border border-white/20 rounded-xl px-4 py-3 text-xs text-left transition-all active:scale-95 flex items-center justify-between"
                        >
                            <span>{prompt}</span>
                            <Send size={12} className="opacity-40" />
                        </button>
                    ))}
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Input Dock */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#3B5998] via-[#3B5998]/90 to-transparent">
        <div className="bg-white/10 backdrop-blur-2xl rounded-[24px] flex items-center p-2 border border-white/20 focus-within:border-[#EFFACD] focus-within:ring-2 focus-within:ring-[#EFFACD]/20 transition-all shadow-2xl">
            <button 
                onClick={toggleListening}
                className={`p-4 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg' : 'text-[#EFFACD] hover:bg-white/10'}`}
            >
                {isListening ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Silakan bicara..." : "Ketik pesan Anda di sini..."}
                className="flex-1 bg-transparent px-3 py-3 text-[#EFFACD] placeholder-[#EFFACD]/40 focus:outline-none text-sm font-medium"
            />
            <button 
                onClick={() => isSpeaking ? stopSpeaking() : handleSend()}
                disabled={isLoading || (!inputText.trim() && !isSpeaking)}
                className={`p-4 rounded-full transition-all ${isSpeaking ? 'bg-orange-500 text-white' : (inputText.trim() ? 'bg-[#EFFACD] text-[#3B5998] shadow-lg hover:bg-white' : 'text-[#EFFACD]/20')}`}
            >
                {isSpeaking ? <StopCircle size={22} /> : <Send size={22} />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default TanyaAiView;
