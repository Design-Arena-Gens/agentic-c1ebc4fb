"use client";

import { Card, Button, Input, Textarea } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

export default function PlannerPage() {
  const goals = useAppStore((s) => s.goals);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  function addGoal() {
    if (!title.trim()) return;
    add('goals', { id: uid('goal'), title, description, dueDate, status: 'planned' });
    setTitle('');
    setDescription('');
    setDueDate('');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">Add goal</div>
        <div className="space-y-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <Button onClick={addGoal}>Add</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Goals</div>
        <div className="space-y-3">
          {goals.length === 0 && <div className="text-muted">No goals yet.</div>}
          {goals.map((g) => (
            <div key={g.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{g.title}</div>
                <select
                  className="bg-white/5 border border-white/10 rounded-md text-sm px-2 py-1"
                  value={g.status}
                  onChange={(e) => update('goals', g.id, { status: e.target.value as any })}
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              {g.description && <div className="text-sm text-muted mt-1">{g.description}</div>}
              {g.dueDate && <div className="text-xs text-muted mt-2">Due {g.dueDate}</div>}
              <div className="mt-2">
                <Button variant="ghost" onClick={() => remove('goals', g.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
