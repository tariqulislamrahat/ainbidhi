import ChatInterface from '@/components/chat-interface';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col h-svh bg-background">
      <Header />
      <main className="flex-1 flex justify-center overflow-hidden p-2 sm:p-4">
        <div className="w-full max-w-5xl h-full">
            <ChatInterface />
        </div>
      </main>
    </div>
  );
}
