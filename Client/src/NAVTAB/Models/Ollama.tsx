import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import { 
  Send, 
  Paperclip, 
  Camera, 
  Mic, 
  MicOff, 
  Plus, 
  Trash2, 
  X,
  User
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: FileAttachment[];
  isStreaming?: boolean;
}

interface FileAttachment {
  name: string;
  size: number;
  type: string;
  url: string;
  preview?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const Ollama: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<FileAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Load conversations from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('ollama-conversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        const conversationsWithDates = parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setConversations(conversationsWithDates);
        
        if (conversationsWithDates.length > 0) {
          const latestConv = conversationsWithDates[0];
          setCurrentConversationId(latestConv.id);
          setMessages(latestConv.messages);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
        localStorage.removeItem('ollama-conversations');
        createNewConversation();
      }
    } else {
      createNewConversation();
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('ollama-conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setMessages([]);
  };

  const deleteConversation = (convId: string) => {
    setConversations(prev => {
      const filtered = prev.filter(conv => conv.id !== convId);
      if (convId === currentConversationId) {
        if (filtered.length > 0) {
          setCurrentConversationId(filtered[0].id);
          setMessages(filtered[0].messages);
        } else {
          createNewConversation();
        }
      }
      return filtered;
    });
  };

  const updateConversationTitle = (convId: string, firstMessage: string) => {
    const title = firstMessage.substring(0, 30) + (firstMessage.length > 30 ? '...' : '');
    setConversations(prev => 
      prev.map(conv => 
        conv.id === convId 
          ? { ...conv, title, updatedAt: new Date() }
          : conv
      )
    );
  };

  const selectConversation = (convId: string) => {
    const conversation = conversations.find(conv => conv.id === convId);
    if (conversation) {
      setCurrentConversationId(convId);
      setMessages(conversation.messages);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Generate previews
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews(prev => [...prev, {
            name: file.name,
            size: file.size,
            type: file.type,
            url: e.target?.result as string,
            preview: e.target?.result as string
          }]);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews(prev => [...prev, {
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        }]);
      }
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
        setSelectedFiles(prev => [...prev, audioFile]);
        setFilePreviews(prev => [...prev, {
          name: audioFile.name,
          size: audioFile.size,
          type: audioFile.type,
          url: URL.createObjectURL(audioFile)
        }]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error opening camera:', error);
      setError('Could not access camera');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const imageFile = new File([blob], `photo-${crypto.randomUUID()}.jpg`, { type: 'image/jpeg' });
          setSelectedFiles(prev => [...prev, imageFile]);
          setFilePreviews(prev => [...prev, {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type,
            url: URL.createObjectURL(imageFile),
            preview: URL.createObjectURL(imageFile)
          }]);
        }
      }, 'image/jpeg');
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && selectedFiles.length === 0) return;
    if (isLoading) return; // Prevent duplicate sends

    const messageContent = inputMessage.trim();
    const attachments = [...filePreviews];
    const filesToSend = [...selectedFiles]; // Save files before clearing

    // Create conversation only if none exists
    let convId = currentConversationId;
    if (!convId && conversations.length === 0) {
      const newConv: Conversation = {
        id: crypto.randomUUID(),
        title: messageContent.slice(0, 30) + (messageContent.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      convId = newConv.id;
      setConversations([newConv]);
      setCurrentConversationId(convId);
    } else if (!convId && conversations.length > 0) {
      convId = conversations[0].id;
      setCurrentConversationId(convId);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: messageContent,
      timestamp: new Date(),
      files: attachments.length > 0 ? attachments : undefined
    };

    // Clear inputs immediately
    setInputMessage('');
    setSelectedFiles([]);
    setFilePreviews([]);
    setError(null);

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Update conversation title if it's the first message
    if (updatedMessages.length === 1) {
      updateConversationTitle(convId, messageContent);
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', messageContent);
      formData.append('conversationId', convId);
      
      // Add files that were selected before clearing
      filesToSend.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`${baseURL}/api/ollama/chat`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Create assistant message ONCE with unique ID
      const assistantId = crypto.randomUUID();
      const assistantMessage: Message = {
        id: assistantId,
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      };

      // Add the assistant message to state ONCE
      setMessages(prev => [...prev, assistantMessage]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.replace('data: ', ''));
            
            if (data.type === 'token' && data.token) {
              fullContent += data.token;
              
              // Update ONLY the content of the existing message
              setMessages(prev => prev.map(msg => 
                msg.id === assistantId 
                  ? { ...msg, content: fullContent, isStreaming: true }
                  : msg
              ));
            } else if (data.type === 'done') {
              // Mark streaming as complete
              setMessages(prev => prev.map(msg => 
                msg.id === assistantId 
                  ? { ...msg, content: fullContent, isStreaming: false }
                  : msg
              ));
              break;
            } else if (data.type === 'error') {
              throw new Error(data.message);
            }
          } catch (parseError) {
            console.error('Error parsing stream data:', parseError);
          }
        }
      }

      // Update conversation with final messages
      const finalMessages = [...updatedMessages, {
        id: assistantId,
        type: 'assistant' as const,
        content: fullContent,
        timestamp: new Date(),
        isStreaming: false
      }];

      setConversations(prev => 
        prev.map(conv => 
          conv.id === convId 
            ? { ...conv, messages: finalMessages, updatedAt: new Date() }
            : conv
        )
      );

    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Make sure Ollama is running.');
      
      // Remove the user message if there was an error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-screen pt-20 bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 lg:w-80 md:w-64 sm:w-56 bg-gray-900/50 border-r border-white/10 flex flex-col h-full">
        <div className="p-4 border-b border-white/10">
          <button
            onClick={createNewConversation}
            className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg hover:scale-105 transition-transform"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "flex items-center gap-3 p-3 mx-2 my-1 rounded-lg cursor-pointer hover:bg-white/5 transition-colors",
                currentConversationId === conv.id && "bg-gradient-to-r from-sky-500/20 to-sky-600/20 border border-sky-500/30"
              )}
              onClick={() => selectConversation(conv.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{conv.title}</div>
                <div className="text-xs text-gray-400">
                  {conv.messages.length} messages
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-black/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 to-sky-600 p-0.5">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <img 
                  src="/Gemini_Generated_Image_z4em0xz4em0xz4em-removebg-preview.png" 
                  alt="Vedya Logo" 
                  className="w-8 h-8 object-contain rounded-full" 
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-sky-300 to-sky-400 bg-clip-text text-transparent">Vedya</h1>
              <p className="text-xs text-gray-400">Ally of Knowledge</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-sky-400">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-8 max-w-xl mx-auto">
                <div className="border border-sky-400/30 rounded-2xl p-1">
                  <GlowingEffect 
                    spread={60} 
                    glow={true} 
                    disabled={false} 
                    proximity={800} 
                    inactiveZone={0.2} 
                    borderWidth={2} 
                  />
                  <div className="relative rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 to-sky-600 p-0.5">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <img 
                          src="/Gemini_Generated_Image_z4em0xz4em0xz4em-removebg-preview.png" 
                          alt="Vedya" 
                          className="w-8 h-8 object-contain rounded-full" 
                        />
                      </div>
                    </div>
                    <h2 className="text-2xl font-light mb-4 bg-gradient-to-r from-white via-sky-300 to-sky-400 bg-clip-text text-transparent">
                      Welcome to Vedya
                    </h2>
                    <p className="text-gray-300 mb-6 text-base leading-relaxed">
                      Your AI assistant that can understand text, images, and audio. Start a conversation below.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        <span>Text conversations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🖼️</span>
                        <span>Image analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🎤</span>
                        <span>Audio processing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📷</span>
                        <span>Real-time camera</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-3xl",
                message.type === 'user' ? "justify-end ml-auto" : "justify-start"
              )}
            >
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 to-sky-600 p-0.5 flex-shrink-0">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <img 
                      src="/Gemini_Generated_Image_z4em0xz4em0xz4em-removebg-preview.png" 
                      alt="Vedya" 
                      className="w-5 h-5 object-contain rounded-full" 
                    />
                  </div>
                </div>
              )}
              
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 shadow-lg",
                message.type === 'user' 
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sky-500/25" 
                  : "bg-gradient-to-br from-gray-800/80 to-gray-700/60 border border-white/10 backdrop-blur-sm"
              )}>
                {message.files && message.files.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {message.files.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm bg-black/20 rounded-lg p-2">
                        {file.type.startsWith('image/') ? (
                          <img src={file.preview} alt={file.name} className="w-12 h-12 object-cover rounded-lg" />
                        ) : (
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-lg">
                            {file.type.startsWith('audio/') ? '🎵' : '📄'}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-white text-xs">{file.name}</div>
                          <div className="text-xs text-gray-400">{formatFileSize(file.size)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="whitespace-pre-wrap leading-relaxed text-white text-sm">{message.content}</div>
                
                {/* Show typing indicator only for streaming messages */}
                {message.isStreaming && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <div className="text-xs text-gray-400">Vedya is typing...</div>
                  </div>
                )}
                
                <div className="text-xs text-gray-400 mt-2 opacity-60">
                  {formatTime(message.timestamp)}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User size={14} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && messages.length > 0 && !messages[messages.length - 1]?.isStreaming && (
            <div className="flex gap-3 justify-start max-w-3xl">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 to-sky-600 p-0.5 flex-shrink-0">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <img 
                    src="/Gemini_Generated_Image_z4em0xz4em0xz4em-removebg-preview.png" 
                    alt="Vedya" 
                    className="w-5 h-5 object-contain rounded-full" 
                  />
                </div>
              </div>
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gradient-to-br from-gray-800/80 to-gray-700/60 border border-white/10 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-300">Vedya is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* File Previews */}
        {filePreviews.length > 0 && (
          <div className="p-3 border-t border-white/10 bg-black/50 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {filePreviews.map((file, idx) => (
                <div key={idx} className="relative group">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">
                        {file.type.startsWith('audio/') ? '🎵' : '📄'}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Camera Modal */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Take Photo</h3>
                <button onClick={closeCamera} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <video ref={videoRef} autoPlay className="w-full rounded-lg mb-4" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex gap-2">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-transform"
                >
                  Capture
                </button>
                <button
                  onClick={closeCamera}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 border-t border-white/10 bg-black backdrop-blur-sm flex-shrink-0">
          <div className="relative max-w-3xl mx-auto">
            <div className="border border-sky-400/40 rounded-xl p-0.5 bg-sky-400/5">
              <GlowingEffect 
                spread={30} 
                glow={true} 
                disabled={false} 
                proximity={40} 
                inactiveZone={0.01} 
                borderWidth={1} 
              />
              <div className="relative rounded-lg bg-black backdrop-blur-sm">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message Vedya..."
                  className="w-full bg-black text-white placeholder-gray-400 p-3 pr-36 resize-none border-none outline-none min-h-[44px] max-h-28 text-sm leading-relaxed rounded-lg"
                  disabled={isLoading}
                />
                
                <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all duration-200"
                    title="Attach files"
                  >
                    <Paperclip size={18} />
                  </button>
                  
                  <button
                    onClick={openCamera}
                    className="p-1.5 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all duration-200"
                    title="Take photo"
                  >
                    <Camera size={18} />
                  </button>
                  
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={cn(
                      "p-1.5 rounded-lg transition-all duration-200",
                      isRecording 
                        ? "text-red-400 bg-red-500/10 hover:bg-red-500/20" 
                        : "text-gray-400 hover:text-sky-400 hover:bg-sky-500/10"
                    )}
                    title={isRecording ? "Stop recording" : "Record audio"}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={(!inputMessage.trim() && selectedFiles.length === 0) || isLoading}
                    className={cn(
                      "p-1.5 rounded-lg transition-all duration-200 shadow-lg",
                      (inputMessage.trim() || selectedFiles.length > 0) && !isLoading
                        ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 hover:scale-105 shadow-sky-500/25"
                        : "text-gray-500 cursor-not-allowed bg-gray-800/50"
                    )}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Toast */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4 max-w-sm">
            <div className="flex justify-between items-start gap-2">
              <p className="text-red-300 text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ollama;