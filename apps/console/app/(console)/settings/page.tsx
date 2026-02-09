export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure platform settings
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">General Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure general platform settings
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Authentication</h2>
          <p className="text-sm text-muted-foreground">
            Manage authentication providers
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Billing</h2>
          <p className="text-sm text-muted-foreground">
            Configure billing and subscription settings
          </p>
        </div>
      </div>
    </div>
  );
}
