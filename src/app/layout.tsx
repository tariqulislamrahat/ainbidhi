import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12" /><path d="M2 7l10-5 10 5-10 5z" /><path d="M2 7v10l10 5 10-5V7" /><path d="M12 12L22 7" /><path d="M9.5 9a2.5 2.5 0 1 1 5 0" /><path d="M12 11.5v-5" /></svg>`;
const iconUrl = `data:image/svg+xml,${encodeURIComponent(svgIcon)}`;

export const metadata: Metadata = {
  title: 'AINBIDHI - AI Legal Assistant',
  description: 'Your AI legal assistant for Bangladesh.',
  icons: {
    icon: iconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-secondary font-sans antialiased',
          inter.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
