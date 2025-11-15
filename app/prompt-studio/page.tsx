"use client";

import { Card, Button, Input, Textarea, Select } from '@/components/ui';
import { useAppStore, uid } from '@/lib/store';
import { useState } from 'react';

const VAR_SAMPLE = ['company', 'audience', 'goal'];

export default function PromptStudioPage() {
  const prompts = useAppStore((s) => s.prompts);
  const engines = useAppStore((s) => s.engines);
  const add = useAppStore((s) => s.add);
  const update = useAppStore((s) => s.update);
  const remove = useAppStore((s) => s.remove);

  const [name, setName] = useState('');
  const [system, setSystem] = useState('You are a helpful AI.');
  const [user, setUser] = useState('Write a plan for {{goal}} at {{company}} for {{audience}}.');
  const [variables, setVariables] = useState(VAR_SAMPLE.join(','));
  const [engine, setEngine] = useState(engines[0]?.id ?? 'openai-gpt4o');
  const [testVars, setTestVars] = useState<Record<string,string>>({ company: 'DesignArena', audience: 'Founders', goal: 'increasing productivity' });

  function addPrompt() {
    if (!name.trim()) return;
    const vars = variables.split(',').map((v) => v.trim()).filter(Boolean);
    add('prompts', { id: uid('prompt'), name, system, user, variables: vars, notes: `engine:${engine}` });
    setName('');
  }

  function renderTemplate(tmpl: string, vars: Record<string,string>) {
    return tmpl.replace(/{{\s*(\w+)\s*}}/g, (_, v) => vars[v] ?? `{{${v}}}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <div className="font-semibold mb-3">Create prompt</div>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea placeholder="System" value={system} onChange={(e) => setSystem(e.target.value)} />
          <Textarea placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
          <Input placeholder="Variables (comma-separated)" value={variables} onChange={(e) => setVariables(e.target.value)} />
          <Select value={engine} onChange={(e) => setEngine(e.target.value)}>
            {engines.map((en) => (
              <option key={en.id} value={en.id}>{en.name}</option>
            ))}
          </Select>
          <Button onClick={addPrompt}>Save</Button>
        </div>
      </Card>
      <Card className="p-5">
        <div className="font-semibold mb-3">Library & Test</div>
        <div className="space-y-4">
          {prompts.length === 0 && <div className="text-muted">No prompts yet.</div>}
          {prompts.map((p) => (
            <div key={p.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="font-medium">{p.name}</div>
                <Button variant="ghost" onClick={() => remove('prompts', p.id)}>Remove</Button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {p.variables?.map((v) => (
                  <Input key={v} placeholder={v} value={testVars[v] ?? ''} onChange={(e) => setTestVars({ ...testVars, [v]: e.target.value })} />
                ))}
              </div>
              <div className="mt-2 text-xs text-muted">Preview</div>
              <pre className="text-xs whitespace-pre-wrap bg-black/20 p-2 rounded-lg border border-white/10">{renderTemplate(p.user ?? '', testVars)}</pre>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
