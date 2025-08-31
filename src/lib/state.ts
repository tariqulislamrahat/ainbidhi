import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const languageAtom = atom<'en' | 'bn'>('bn');

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};

const storage = createJSONStorage<Conversation[]>(() => localStorage);

export const conversationsAtom = atomWithStorage<Conversation[]>('chatHistory', [], storage);
export const activeConversationIdAtom = atom<string | null>(null);

const welcomeMessages = {
    en: "Welcome to AINBIDHI! I'm your AI legal assistant for Bangladesh. How can I assist you today?",
    bn: "আইনবিধি-তে স্বাগতম! আমি আপনাকে বাংলাদেশ আইন সম্পর্কে কীভাবে সহায়তা করতে পারি?",
}

export const createNewConversationAtom = atom(
  null,
  (get, set) => {
    const language = get(languageAtom);
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [{ id: 'init', role: 'assistant', content: welcomeMessages[language] }],
      createdAt: Date.now(),
    };
    set(conversationsAtom, prev => [newConversation, ...prev]);
    set(activeConversationIdAtom, newConversation.id);
  }
);
