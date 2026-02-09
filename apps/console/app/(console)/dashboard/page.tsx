export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the mtsaas Admin Console
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">Total Tenants</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">API Calls Today</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">Errors</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <h2 className="font-semibold">Recent Activity</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}
