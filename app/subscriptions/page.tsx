"use client";

import { Card, Button, Input, Textarea } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function SubscriptionsPage() {
  const tiers = useAppStore((s) => s.tiers);
  const add = useAppStore((s) => s.add);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('Pro');
  const [price, setPrice] = useState(149);
  const [features, setFeatures] = useState('Unlimited prompts, Priority support');

  function addTier() {
    if (!name.trim()) return;
    add('tiers', { id: uid('tier'), name, price, features: features.split(',').map(f => f.trim()).filter(Boolean) });
    setName('');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">Add subscription tier</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <Textarea placeholder="Features (comma-separated)" value={features} onChange={(e) => setFeatures(e.target.value)} />
          <Button onClick={addTier}>Save</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Tiers</div>
        <div className="space-y-3">
          {tiers.length === 0 && <div className="text-muted">No tiers yet.</div>}
          {tiers.map((t) => (
            <div key={t.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{t.name}</div>
                <Button variant="ghost" onClick={() => remove('tiers', t.id)}>Remove</Button>
              </div>
              <div className="text-sm text-muted mt-2">${'{'}t.price{'}'} / mo</div>
              <ul className="text-sm text-muted list-disc ml-5">
                {t.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
