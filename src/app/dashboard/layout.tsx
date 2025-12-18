"use client"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ShoppingBag, Layers, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const { logout, user, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center text-primary">Loading...</div>;
  
  // Protect Route
  if (!user) {
    router.push('/login');
    return null; 
  } 

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/categories', label: 'Categories', icon: Layers },
    { href: '/dashboard/products', label: 'Products', icon: ShoppingBag },
  ];

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary tracking-tighter">Buzzer Admin</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
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
                    : "text-muted-foreground hover:bg-secondary hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
             )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-black/50 p-8">
        {children}
      </main>
    </div>
  );
}
