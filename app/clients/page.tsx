"use client";

import { Card, Button, Input, Textarea, Select } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function ClientsPage() {
  const clients = useAppStore((s) => s.clients);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');

  function addClient() {
    if (!name.trim()) return;
    add('clients', { id: uid('client'), name, contact, notes, status: 'active' });
    setName(''); setContact(''); setNotes('');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card className="p-5">
        <div className="font-semibold mb-3">Add client</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Contact (email / phone)" value={contact} onChange={(e) => setContact(e.target.value)} />
          <Textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <Button onClick={addClient}>Add</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Clients</div>
        <div className="space-y-3">
          {clients.length === 0 && <div className="text-muted">No clients yet.</div>}
          {clients.map((c) => (
            <div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="font-medium flex-1">{c.name}</div>
                <Select value={c.status ?? 'active'} onChange={(e) => update('clients', c.id, { status: e.target.value as any })}>
                  <option value="lead">Lead</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                </Select>
              </div>
              {c.contact && <div className="text-sm text-muted mt-1">{c.contact}</div>}
              {c.notes && <div className="text-sm text-muted mt-1">{c.notes}</div>}
              <div className="mt-2">
                <Button variant="ghost" onClick={() => remove('clients', c.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
