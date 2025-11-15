import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { cn } from '@/components/utils';

export const metadata: Metadata = {
  title: 'DesignArena Command Console',
  description: 'Solo founder productivity engine for AI services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={cn('min-h-screen antialiased')}>        
        <div className="grid grid-cols-[280px_1fr] min-h-screen">
          <Sidebar />
          <div className="flex flex-col min-h-screen">
            <Topbar />
            <main className="flex-1 container-responsive py-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
