import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to mtsaas Platform</h1>
        <p className="text-lg text-muted-foreground">
          Multi-tenant SaaS Boilerplate with Next.js 16
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/hexuntao/mtsaas"
            className="px-6 py-3 border border-input bg-background rounded-md"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
