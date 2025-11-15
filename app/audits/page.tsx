"use client";

import { Card, Button, Input } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function AuditsPage() {
  const audits = useAppStore((s) => s.audits);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('Workflow Audit');
  const [item, setItem] = useState('Define goals');

  function addAudit() {
    if (!name.trim()) return;
    add('audits', { id: uid('audit'), name, checklist: [{ id: uid('chk'), text: item, done: false }] });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">New audit template</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="First checklist item" value={item} onChange={(e) => setItem(e.target.value)} />
          <Button onClick={addAudit}>Create</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Audits</div>
        <div className="space-y-3">
          {audits.length === 0 && <div className="text-muted">No audits yet.</div>}
          {audits.map((a) => (
            <div key={a.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{a.name}</div>
                <Button variant="ghost" onClick={() => remove('audits', a.id)}>Remove</Button>
              </div>
              <div className="space-y-2 mt-2 text-sm">
                {a.checklist.map((c) => (
                  <label key={c.id} className="flex items-center gap-2">
                    <input type="checkbox" checked={c.done} onChange={(e) => update('audits', a.id, { checklist: a.checklist.map(ci => ci.id===c.id? { ...ci, done: e.target.checked }: ci) })} />
                    <span className={c.done ? 'line-through text-muted' : ''}>{c.text}</span>
                  </label>
                ))}
                <AddItem auditId={a.id} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AddItem({ auditId }: { auditId: string }) {
  const update = useAppStore((s) => s.update);
  const audits = useAppStore((s) => s.audits);
  const [text, setText] = useState('');

  function addItem() {
    const a = audits.find((x) => x.id === auditId);
    if (!a || !text.trim()) return;
    update('audits', auditId, { checklist: [...a.checklist, { id: uid('chk'), text, done: false }] });
    setText('');
  }

  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Add item" value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={addItem}>Add</Button>
    </div>
  );
}
