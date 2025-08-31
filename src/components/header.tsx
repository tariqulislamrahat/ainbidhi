"use client";

import Link from 'next/link';
import { User, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LegalAidDirectory } from './legal-aid-directory';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAtom } from 'jotai';
import { languageAtom, createNewConversationAtom } from '@/lib/state';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ChatHistory } from './chat-history';
import React from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [, createNewConversation] = useAtom(createNewConversationAtom);

  const translations = {
    en: { newChat: 'New Chat' },
    bn: { newChat: 'নতুন চ্যাট' }
  };
  
  const handleNewChat = () => {
    createNewConversation();
  }

  const navLinks = (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
       <SheetClose asChild>
        <Button variant="outline" size="sm" onClick={handleNewChat} className="w-full justify-start md:w-auto border-primary/50 hover:border-primary">
            <Plus className="mr-2 h-4 w-4" />
            {translations[language].newChat}
        </Button>
      </SheetClose>
      
      <div className="flex items-center gap-2">
        <ToggleGroup 
          type="single" 
          defaultValue="bn" 
          aria-label="Language" 
          value={language}
          onValueChange={(value) => { if (value) setLanguage(value as 'en' | 'bn')}}
        >
          <ToggleGroupItem value="en" aria-label="English" className="h-9 px-4">
            EN
          </ToggleGroupItem>
          <ToggleGroupItem value="bn" aria-label="Bengali" className="h-9 px-4">
            BN
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='flex items-center'>
        <ChatHistory />
        <LegalAidDirectory />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-4 w-4" />
            <span className="sr-only">User Profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Case History</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex flex-col">
            <span className="font-bold text-xl text-primary">AINBIDHI</span>
            <span className="text-xs text-muted-foreground">Developed by KINGSMEN</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleNewChat} className="border-primary/50 hover:border-primary">
                <Plus className="mr-2 h-4 w-4" />
                {translations[language].newChat}
            </Button>
            <div className="flex items-center gap-2">
                <ToggleGroup 
                type="single" 
                defaultValue="bn" 
                aria-label="Language" 
                value={language}
                onValueChange={(value) => { if (value) setLanguage(value as 'en' | 'bn')}}
                >
                <ToggleGroupItem value="en" aria-label="English" className="h-9 px-4">
                    EN
                </ToggleGroupItem>
                <ToggleGroupItem value="bn" aria-label="Bengali" className="h-9 px-4">
                    BN
                </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className='flex items-center'>
                <ChatHistory />
                <LegalAidDirectory />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User Profile</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Case History</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0">
               <SheetHeader className="p-4 border-b">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through the application.
                </SheetDescription>
              </SheetHeader>
              <div className="p-4">
                {navLinks}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
