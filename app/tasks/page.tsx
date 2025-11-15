"use client";

import { Card, Button, Input, Select, Textarea } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useMemo, useState } from 'react';

export default function TasksPage() {
  const tasks = useAppStore((s) => s.tasks);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'med' | 'high'>('med');

  function addTask() {
    if (!title.trim()) return;
    add('tasks', { id: uid('task'), title, description, status: 'todo', priority });
    setTitle(''); setDescription(''); setPriority('med');
  }

  const columns = useMemo(() => ({
    todo: tasks.filter((t) => t.status === 'todo'),
    doing: tasks.filter((t) => t.status === 'doing'),
    done: tasks.filter((t) => t.status === 'done'),
  }), [tasks]);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card className="p-5">
        <div className="font-semibold mb-3">Add task</div>
        <div className="space-y-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
            <option value="low">Low priority</option>
            <option value="med">Medium priority</option>
            <option value="high">High priority</option>
          </Select>
          <Button onClick={addTask}>Add</Button>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {(['todo','doing','done'] as const).map((col) => (
          <Card key={col} className="p-4">
            <div className="font-semibold capitalize mb-3">{col}</div>
            <div className="space-y-3 min-h-[200px]">
              {columns[col].map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-medium">{t.title}</div>
                  {t.description && <div className="text-sm text-muted mt-1">{t.description}</div>}
                  <div className="flex items-center gap-2 mt-2">
                    <Select value={t.status} onChange={(e) => update('tasks', t.id, { status: e.target.value as any })}>
                      <option value="todo">Todo</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </Select>
                    <Button variant="ghost" onClick={() => remove('tasks', t.id)}>Remove</Button>
                  </div>
                </div>
              ))}
              {columns[col].length === 0 && <div className="text-sm text-muted">No tasks</div>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
