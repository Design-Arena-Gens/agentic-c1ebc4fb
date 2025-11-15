"use client";

import { Card, Button, Input, Select, Textarea } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function AssetsPage() {
  const assets = useAppStore((s) => s.assets);
  const add = useAppStore((s) => s.add);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('');
  const [kind, setKind] = useState<'doc'|'image'|'prompt'|'model'|'other'>('doc');
  const [content, setContent] = useState('');
  const [fileDataUrl, setFileDataUrl] = useState<string | undefined>();

  function addAsset() {
    if (!name.trim()) return;
    add('assets', { id: uid('asset'), name, kind, content: fileDataUrl ?? content, tags: [] });
    setName(''); setContent(''); setFileDataUrl(undefined);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFileDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <Card className="p-5">
        <div className="font-semibold mb-3">Add asset</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Select value={kind} onChange={(e) => setKind(e.target.value as any)}>
            <option value="doc">Document</option>
            <option value="image">Image</option>
            <option value="prompt">Prompt</option>
            <option value="model">Model</option>
            <option value="other">Other</option>
          </Select>
          <label className="text-sm">Upload file</label>
          <input type="file" onChange={onFile} />
          <Textarea placeholder="Or paste content" value={content} onChange={(e) => setContent(e.target.value)} />
          <Button onClick={addAsset}>Add</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Library</div>
        <div className="grid md:grid-cols-2 gap-3">
          {assets.length === 0 && <div className="text-muted">No assets yet.</div>}
          {assets.map((a) => (
            <div key={a.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-muted">{a.kind}</div>
              </div>
              {a.content && a.kind !== 'image' && (
                <pre className="text-xs text-muted mt-2 whitespace-pre-wrap max-h-40 overflow-auto">{a.content}</pre>
              )}
              {a.content && a.kind === 'image' && (
                <img src={a.content} alt={a.name} className="mt-2 rounded-lg max-h-48 object-contain" />
              )}
              <div className="mt-2">
                <Button variant="ghost" onClick={() => remove('assets', a.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
