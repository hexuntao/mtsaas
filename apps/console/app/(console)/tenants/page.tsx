import Link from "next/link";

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenants</h1>
          <p className="text-muted-foreground">
            Manage your multi-tenant customers
          </p>
        </div>
        <Link
          href="/tenants/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create Tenant
        </Link>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <h2 className="font-semibold">Tenant List</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            No tenants found. Create your first tenant to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
