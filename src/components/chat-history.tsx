"use client";

import { useAtom } from 'jotai';
import { History, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { conversationsAtom, activeConversationIdAtom } from '@/lib/state';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export function ChatHistory() {
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [activeConversationId, setActiveConversationId] = useAtom(activeConversationIdAtom);

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };
  
  const handleClearHistory = () => {
    setConversations([]);
    setActiveConversationId(null);
  };

  const timeAgo = (timestamp: number) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <History className="h-4 w-4" />
          <span className="sr-only">Chat History</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Chat History</SheetTitle>
          <SheetDescription>
            Here are your saved conversations.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {conversations.length > 0 ? (
                conversations.map(convo => (
                    <SheetClose asChild key={convo.id}>
                        <button
                            onClick={() => handleSelectConversation(convo.id)}
                            className={cn(
                                "w-full text-left p-3 rounded-md transition-colors",
                                activeConversationId === convo.id 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-secondary"
                            )}
                        >
                            <p className="font-semibold text-sm truncate">{convo.title}</p>
                            <p className={cn(
                                "text-xs", 
                                activeConversationId === convo.id ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}>
                                {timeAgo(convo.createdAt)}
                            </p>
                        </button>
                    </SheetClose>
                ))
            ) : (
                <div className="text-center text-sm text-muted-foreground py-10">
                    <p>No chat history found.</p>
                </div>
            )}
          </div>
        </ScrollArea>
        {conversations.length > 0 && (
            <SheetFooter className="p-4 border-t bg-background">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" /> Clear History
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            entire chat history.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearHistory}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
