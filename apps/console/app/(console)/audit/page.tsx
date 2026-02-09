export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Log</h1>
        <p className="text-muted-foreground">
          Track all administrative actions
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <h2 className="font-semibold">Recent Actions</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            No audit logs found. Actions will be recorded here.
          </p>
        </div>
      </div>
    </div>
  );
}
