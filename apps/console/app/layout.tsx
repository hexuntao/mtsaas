"use client";

import { useState } from "react";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } border-r bg-card transition-all duration-200`}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="font-semibold">mtsaas Console</span>
        </div>
        <nav className="space-y-1 p-2">
          <a
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Dashboard
          </a>
          <a
            href="/tenants"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Tenants
          </a>
          <a
            href="/users"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Users
          </a>
          <a
            href="/audit"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Audit Log
          </a>
          <a
            href="/settings"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b bg-card px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ☰
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
