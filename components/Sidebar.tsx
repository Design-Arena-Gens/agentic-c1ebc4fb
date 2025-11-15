"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from './utils';
import {
  LayoutDashboard,
  CalendarCheck,
  ListTodo,
  Users,
  Workflow,
  Boxes,
  FileCode2,
  Cpu,
  ClipboardCheck,
  BadgeCheck,
  Layers,
  ReceiptText,
  Settings
} from 'lucide-react';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/planner', label: 'Planner', icon: CalendarCheck },
  { href: '/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/services', label: 'Services', icon: Workflow },
  { href: '/assets', label: 'Assets', icon: Boxes },
  { href: '/prompt-studio', label: 'Prompt Studio', icon: FileCode2 },
  { href: '/ai-engines', label: 'AI Engines', icon: Cpu },
  { href: '/audits', label: 'Workflow Audits', icon: ClipboardCheck },
  { href: '/brand', label: 'Brand Persona', icon: BadgeCheck },
  { href: '/subscriptions', label: 'Subscriptions', icon: Layers },
  { href: '/invoices', label: 'Invoices', icon: ReceiptText },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col bg-card/60 border-r border-white/5 backdrop-blur-lg card-surface">
      <div className="px-6 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent/80 to-accent2/80 shadow-glow" />
          <div>
            <div className="text-sm uppercase tracking-widest text-muted">DesignArena</div>
            <div className="font-semibold">Command Console</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-white/5 transition',
                active && 'bg-white/10 text-foreground shadow-glow'
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5 text-xs text-muted">
        Solo Founder Mode
      </div>
    </aside>
  );
}
