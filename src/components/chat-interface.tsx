"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, Mic, Loader2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { processUserQueryAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { languageAtom, Message, conversationsAtom, activeConversationIdAtom, createNewConversationAtom } from '@/lib/state';

const translations = {
  en: {
    welcome: "Welcome to AINBIDHI! I'm your AI legal assistant for Bangladesh. How can I assist you today?",
    placeholder: "Type your legal question here in English or Bengali...",
    quickActionsTitle: "Or try one of these common questions:",
    quickActions: [
      "My landlord wants to evict me",
      "How to file for divorce?",
      "My office is not paying my salary",
      "What are tenant rights?",
      "How to get a birth certificate?",
      "Process for land registration?",
      "How do I file a police complaint?",
      "What is the process for property mutation?",
      "How to deal with online harassment?",
    ],
    newChat: 'New Chat',
  },
  bn: {
    welcome: "আইনবিধি-তে স্বাগতম! আমি আপনাকে বাংলাদেশ আইন সম্পর্কে কীভাবে সহায়তা করতে পারি?",
    placeholder: "আপনার আইনি প্রশ্ন এখানে বাংলা বা ইংরেজিতে টাইপ করুন...",
    quickActionsTitle: "অথবা এই সাধারণ প্রশ্নগুলির মধ্যে একটি চেষ্টা করুন:",
    quickActions: [
      "আমার বাড়িওয়ালা আমাকে উচ্ছেদ করতে চায়",
      "ডিভোর্সের জন্য কিভাবে ফাইল করব?",
      "আমার অফিস আমার বেতন দিচ্ছে না",
      "ভাড়াটিয়াদের অধিকার কি কি?",
      "জন্ম সনদ কিভাবে পাব?",
      "জমি নিবন্ধনের প্রক্রিয়া কি?",
      "থানায় অভিযোগ করব কিভাবে?",
      "সম্পত্তি মিউটেশন প্রক্রিয়া কি?",
      "অনলাইন হয়রানির বিরুদ্ধে কিভাবে ব্যবস্থা নিব?",
    ],
    newChat: 'নতুন চ্যাট',
  }
};

export default function ChatInterface() {
  const [language] = useAtom(languageAtom);
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [activeConversationId, setActiveConversationId] = useAtom(activeConversationIdAtom);
  const [, createNewConversation] = useAtom(createNewConversationAtom);
  
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation ? activeConversation.messages : [];

  useEffect(() => {
    if (activeConversationId === null && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    } else if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations, activeConversationId, setActiveConversationId, createNewConversation]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const updateMessages = (newMessages: Message[]) => {
    if (!activeConversationId) return;
    setConversations(prev =>
      prev.map(c =>
        c.id === activeConversationId
          ? { ...c, messages: newMessages }
          : c
      )
    );
  };
  
  const updateConversationTitle = (id: string, newTitle: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  const handleSubmit = async (query?: string) => {
    const userQuery = query || input;
    if (!userQuery.trim() || !activeConversationId) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userQuery };
    const newMessages = [...messages, userMessage];
    updateMessages(newMessages);
    setInput('');
     if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    if (messages.length === 1) { // First user message
      const newTitle = userQuery.length > 30 ? userQuery.substring(0, 27) + "..." : userQuery;
      updateConversationTitle(activeConversationId, newTitle);
    }

    startTransition(async () => {
      const result = await processUserQueryAction({ query: userQuery, language });
      
      let assistantMessage: Message;
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        assistantMessage = { id: Date.now().toString() + '-error', role: 'assistant', content: "Sorry, I encountered an error. Please try again." };
      } else if (result.success) {
        assistantMessage = { id: Date.now().toString() + '-assist', role: 'assistant', content: result.success };
      } else {
        assistantMessage = { id: Date.now().toString() + '-error', role: 'assistant', content: "Sorry, I could not get a response. Please try again." };
      }
      updateMessages([...newMessages, assistantMessage]);
    });
  };
  
  const handleQuickAction = (action: string) => {
    setInput('');
    handleSubmit(action);
  };

  return (
    <div className="h-full flex flex-col bg-card border rounded-lg shadow-sm">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : 'justify-start')}>
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-xl p-3 text-sm shadow-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                )}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
               {message.role === 'user' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>
                    <User size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-start gap-4 justify-start">
               <Avatar className="w-8 h-8 border">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary text-secondary-foreground rounded-xl p-3 text-sm shadow-sm rounded-bl-none flex items-center space-x-2">
                   <Loader2 className="h-4 w-4 animate-spin" />
                   <span>Thinking...</span>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {messages.length <= 1 && !isPending && (
        <div className="hidden md:block px-4 pb-4 border-t">
            <p className="text-sm text-muted-foreground mb-2 mt-4">{translations[language].quickActionsTitle}</p>
            <div className="flex flex-wrap gap-2">
                {translations[language].quickActions.map((action) => (
                    <Button key={action} variant="outline" size="sm" onClick={() => handleQuickAction(action)}>
                        {action}
                    </Button>
                ))}
            </div>
        </div>
      )}

      <div className="p-4 bg-card border-t">
        <div className="relative flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            placeholder={translations[language].placeholder}
            className="pr-20 min-h-[48px] max-h-48 resize-none focus-visible:ring-1 overflow-y-auto"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={isPending}
          />
          <div className="flex flex-col gap-2">
            <Button type="button" size="icon" variant="ghost" className="text-muted-foreground h-10 w-10" onClick={() => toast({ title: "Voice input not implemented."})}>
              <Mic className="h-5 w-5" />
            </Button>
            <Button type="submit" size="icon" onClick={() => handleSubmit()} disabled={!input.trim() || isPending} className="h-10 w-10">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
