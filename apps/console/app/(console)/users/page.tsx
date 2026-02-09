export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage platform users across all tenants
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <h2 className="font-semibold">User List</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            No users found. Users will appear here once they sign up.
          </p>
        </div>
      </div>
    </div>
  );
}
