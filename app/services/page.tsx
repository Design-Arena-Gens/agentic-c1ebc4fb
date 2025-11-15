"use client";

import { Card, Button, Input, Select, Textarea } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useMemo, useState } from 'react';

export default function ServicesPage() {
  const pipelines = useAppStore((s) => s.pipelines);
  const orders = useAppStore((s) => s.orders);
  const clients = useAppStore((s) => s.clients);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [serviceName, setServiceName] = useState(pipelines[0]?.name ?? 'Custom AI Engine');
  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState('');

  const activeStages = useMemo(() => {
    const match = pipelines.find((p) => p.name === serviceName) ?? pipelines[0];
    return match?.stages ?? ['Brief', 'Work', 'Deliver'];
  }, [pipelines, serviceName]);

  function startOrder() {
    const stage = activeStages[0] ?? 'Brief';
    add('orders', { id: uid('order'), clientId, serviceName, stage, notes });
    setNotes('');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <Card className="p-5">
        <div className="font-semibold mb-3">Start service order</div>
        <div className="space-y-3">
          <Select value={serviceName} onChange={(e) => setServiceName(e.target.value)}>
            {pipelines.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
            <option value="Custom AI Engine">Custom AI Engine</option>
          </Select>
          <Select value={clientId ?? ''} onChange={(e) => setClientId(e.target.value || undefined)}>
            <option value="">No client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
          <Textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <Button onClick={startOrder}>Create</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Orders</div>
        <div className="space-y-3">
          {orders.length === 0 && <div className="text-muted">No service orders yet.</div>}
          {orders.map((o) => {
            const stages = (pipelines.find((p) => p.name === o.serviceName)?.stages) ?? activeStages;
            const nextIdx = Math.min(stages.indexOf(o.stage) + 1, stages.length - 1);
            return (
              <div key={o.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{o.serviceName}</div>
                    <div className="text-xs text-muted">Stage: {o.stage} {o.clientId && `? Client: ${clients.find(c=>c.id===o.clientId)?.name ?? ''}`}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={o.stage} onChange={(e) => update('orders', o.id, { stage: e.target.value })}>
                      {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <Button onClick={() => update('orders', o.id, { stage: stages[nextIdx] })}>Advance</Button>
                    <Button variant="ghost" onClick={() => remove('orders', o.id)}>Remove</Button>
                  </div>
                </div>
                {o.notes && <div className="text-sm text-muted mt-2">{o.notes}</div>}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
