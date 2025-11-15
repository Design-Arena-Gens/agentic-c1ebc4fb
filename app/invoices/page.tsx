"use client";

import { Card, Button, Input } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useMemo, useState } from 'react';

export default function InvoicesPage() {
  const invoices = useAppStore((s) => s.invoices);
  const clients = useAppStore((s) => s.clients);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [itemName, setItemName] = useState('Service');
  const [itemAmount, setItemAmount] = useState(500);

  function addInvoice() {
    const items = [{ name: itemName, amount: itemAmount }];
    add('invoices', { id: uid('inv'), clientId, items, total: items.reduce((a,b)=>a+b.amount,0), status: 'draft' });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <Card className="p-5">
        <div className="font-semibold mb-3">Create invoice</div>
        <div className="space-y-3">
          <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" value={clientId ?? ''} onChange={(e)=>setClientId(e.target.value || undefined)}>
            <option value="">No client</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <Input placeholder="Item name" value={itemName} onChange={(e)=>setItemName(e.target.value)} />
          <Input type="number" placeholder="Amount" value={itemAmount} onChange={(e)=>setItemAmount(Number(e.target.value))} />
          <Button onClick={addInvoice}>Create</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Invoices</div>
        <div className="space-y-3">
          {invoices.length === 0 && <div className="text-muted">No invoices yet.</div>}
          {invoices.map((inv) => (
            <div key={inv.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">Invoice {inv.id}</div>
                <Button variant="ghost" onClick={() => remove('invoices', inv.id)}>Remove</Button>
              </div>
              <div className="text-sm text-muted mt-1">Client: {clients.find(c=>c.id===inv.clientId)?.name ?? '?'}</div>
              <ul className="text-sm text-muted list-disc ml-5">
                {inv.items.map((it, i)=> <li key={i}>{it.name} ? ${'{'}it.amount{'}'}</li>)}
              </ul>
              <div className="mt-2">Total: ${'{'}inv.total{'}'}</div>
              <div className="mt-2">
                <select className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-sm" value={inv.status} onChange={(e)=>update('invoices', inv.id, { status: e.target.value as any })}>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
