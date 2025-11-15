"use client";

import { Card, Button, Input, Textarea, Select } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function EnginesPage() {
  const engines = useAppStore((s) => s.engines);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('');
  const [provider, setProvider] = useState('OpenAI');
  const [model, setModel] = useState('gpt-4o-mini');
  const [temperature, setTemperature] = useState(0.7);

  function addEngine() {
    if (!name.trim()) return;
    add('engines', { id: uid('engine'), name, provider, model, temperature });
    setName('');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">Add engine</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option>OpenAI</option>
            <option>Anthropic</option>
            <option>Google</option>
            <option>Meta</option>
            <option>Local</option>
          </Select>
          <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
          <Input type="number" step="0.1" min="0" max="2" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
          <Button onClick={addEngine}>Save</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Engines</div>
        <div className="space-y-3">
          {engines.length === 0 && <div className="text-muted">No engines yet.</div>}
          {engines.map((en) => (
            <div key={en.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{en.name}</div>
                <Button variant="ghost" onClick={() => remove('engines', en.id)}>Remove</Button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>Provider: {en.provider}</div>
                <div>Model: {en.model}</div>
                <div>Temperature: {en.temperature}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
