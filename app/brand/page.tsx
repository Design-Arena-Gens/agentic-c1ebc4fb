"use client";

import { Card, Button, Input, Textarea } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function BrandPage() {
  const brands = useAppStore((s) => s.brands);
  const add = useAppStore((s) => s.add);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('Brand Persona');
  const [tone, setTone] = useState('Confident, empathetic, precise');
  const [style, setStyle] = useState('Short, actionable, modern');
  const [guidelines, setGuidelines] = useState('Use second person, focus on outcomes.');

  function addBrand() {
    if (!name.trim()) return;
    add('brands', { id: uid('brand'), name, tone, style, guidelines });
    setName('Brand Persona');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">Create brand persona</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Tone" value={tone} onChange={(e) => setTone(e.target.value)} />
          <Input placeholder="Style" value={style} onChange={(e) => setStyle(e.target.value)} />
          <Textarea placeholder="Guidelines" value={guidelines} onChange={(e) => setGuidelines(e.target.value)} />
          <Button onClick={addBrand}>Save</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Personas</div>
        <div className="space-y-3">
          {brands.length === 0 && <div className="text-muted">No personas yet.</div>}
          {brands.map((b) => (
            <div key={b.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{b.name}</div>
                <Button variant="ghost" onClick={() => remove('brands', b.id)}>Remove</Button>
              </div>
              <div className="text-sm text-muted mt-2">Tone: {b.tone}</div>
              <div className="text-sm text-muted">Style: {b.style}</div>
              {b.guidelines && <div className="text-sm text-muted">Guidelines: {b.guidelines}</div>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
