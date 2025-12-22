"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ShoppingBag, Layers } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/categories', label: 'Categories', icon: Layers },
    { href: '/dashboard/products', label: 'Products', icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background">
      {/* Mobile Header */}
      <header className="md:hidden bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Buzzer Admin</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col shrink-0">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary tracking-tight">Buzzer Admin</h1>
            <p className="text-xs text-muted-foreground mt-1">Dashboard</p>
          </div>

          <nav className="flex-1 px-4 space-y-1 pt-6">
            {navItems.map((item) => {
               const Icon = item.icon
               return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-secondary/30 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
               )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
