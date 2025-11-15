import { Card } from '@/components/ui';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <KPI />
      <QuickActions />
      <PipelineOverview />
      <TasksOverview />
      <ClientsOverview />
      <AssetsOverview />
    </div>
  );
}

function KPI() {
  const tasks = useAppStore((s) => s.tasks);
  const clients = useAppStore((s) => s.clients);
  const orders = useAppStore((s) => s.orders);
  const shipped = orders.filter((o) => o.stage.toLowerCase().includes('deliver')).length;
  return (
    <Card className="p-5 col-span-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat label="Active Clients" value={clients.length} />
        <Stat label="Open Tasks" value={tasks.filter((t) => t.status !== 'done').length} />
        <Stat label="Orders In Flight" value={orders.length} />
        <Stat label="Shipped This Cycle" value={shipped} />
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-muted text-xs uppercase tracking-wider">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}

function QuickActions() {
  return (
    <Card className="p-5">
      <div className="font-semibold mb-3">Quick actions</div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Link className="px-3 py-2 rounded-lg bg-accent/20 border border-accent/30" href="/tasks">Add task</Link>
        <Link className="px-3 py-2 rounded-lg bg-accent/20 border border-accent/30" href="/clients">New client</Link>
        <Link className="px-3 py-2 rounded-lg bg-accent/20 border border-accent/30" href="/services">Start service order</Link>
        <Link className="px-3 py-2 rounded-lg bg-accent/20 border border-accent/30" href="/prompt-studio">Create prompt</Link>
      </div>
    </Card>
  );
}

function PipelineOverview() {
  const orders = useAppStore((s) => s.orders);
  const grouped = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.stage] = (acc[o.stage] || 0) + 1;
    return acc;
  }, {});
  return (
    <Card className="p-5">
      <div className="font-semibold mb-3">Service pipeline</div>
      <div className="space-y-2 text-sm">
        {Object.keys(grouped).length === 0 && <div className="text-muted">No orders yet.</div>}
        {Object.entries(grouped).map(([stage, count]) => (
          <div key={stage} className="flex items-center justify-between">
            <div>{stage}</div>
            <div className="text-muted">{count}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TasksOverview() {
  const tasks = useAppStore((s) => s.tasks);
  return (
    <Card className="p-5">
      <div className="font-semibold mb-3">Recently added tasks</div>
      <div className="space-y-2 text-sm">
        {tasks.slice(-5).reverse().map((t) => (
          <div key={t.id} className="flex items-center justify-between">
            <div className="truncate mr-3">{t.title}</div>
            <div className="text-muted">{t.status}</div>
          </div>
        ))}
        {tasks.length === 0 && <div className="text-muted">No tasks yet.</div>}
      </div>
    </Card>
  );
}

function ClientsOverview() {
  const clients = useAppStore((s) => s.clients);
  return (
    <Card className="p-5">
      <div className="font-semibold mb-3">Clients</div>
      <div className="space-y-2 text-sm">
        {clients.slice(-5).reverse().map((c) => (
          <div key={c.id} className="flex items-center justify-between">
            <div className="truncate mr-3">{c.name}</div>
            <div className="text-muted">{c.status ?? 'active'}</div>
          </div>
        ))}
        {clients.length === 0 && <div className="text-muted">No clients yet.</div>}
      </div>
    </Card>
  );
}

function AssetsOverview() {
  const assets = useAppStore((s) => s.assets);
  return (
    <Card className="p-5">
      <div className="font-semibold mb-3">Assets</div>
      <div className="space-y-2 text-sm">
        {assets.slice(-5).reverse().map((a) => (
          <div key={a.id} className="flex items-center justify-between">
            <div className="truncate mr-3">{a.name}</div>
            <div className="text-muted">{a.kind}</div>
          </div>
        ))}
        {assets.length === 0 && <div className="text-muted">No assets yet.</div>}
      </div>
    </Card>
  );
}
