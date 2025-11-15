"use client";

import { useEffect, useState } from 'react';
import { Search, Upload, Download } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from './utils';

export function Topbar() {
  const [query, setQuery] = useState('');
  const exportData = useAppStore((s) => s.exportData);
  const importData = useAppStore((s) => s.importData);

  function handleExport() {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `designarena-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        importData(data);
        alert('Data imported successfully.');
      } catch (err) {
        alert('Invalid backup file.');
      }
    };
    reader.readAsText(file);
  }

  useEffect(() => {
    // Reserved: global search wiring using query
  }, [query]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-card/60 backdrop-blur-lg card-surface">
      <div className="container-responsive py-3 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, tasks, assets..."
            className={cn(
              'w-full pl-10 pr-3 py-2 bg-white/5 rounded-lg outline-none text-sm placeholder:text-muted border border-white/10 focus:border-accent'
            )}
          />
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-accent/20 hover:bg-accent/30 border border-accent/30">
          <Download size={16} /> Backup
        </button>
        <label className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-accent2/20 hover:bg-accent2/30 border border-accent2/30 cursor-pointer">
          <Upload size={16} /> Restore
          <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </label>
      </div>
    </header>
  );
}
