"use client";

import { Card, Button, Input } from '@/components/ui';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [name, setName] = useState('Solo Founder');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">Appearance</div>
        <div className="space-y-3">
          <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" value={theme} onChange={(e)=>setTheme(e.target.value as any)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Profile</div>
        <div className="space-y-3">
          <Input placeholder="Display name" value={name} onChange={(e)=>setName(e.target.value)} />
          <Button>Save</Button>
        </div>
      </Card>
    </div>
  );
}
