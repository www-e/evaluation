
interface AuthLayoutProps {
  children: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 lg:p-0">
      <div className="flex w-full max-w-[1200px] overflow-hidden rounded-2xl bg-card shadow-2xl glass lg:grid lg:grid-cols-2 lg:min-h-[600px]">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 decoration-slice">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </div>

        {/* Right Side: Illustration/Image */}
        <div className="hidden bg-primary/10 lg:flex items-center justify-center p-12 relative overflow-hidden">
             {/* Abstract background blobs for premium feel */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
             
             <div className="relative z-10 text-center">
                 <h2 className="text-2xl font-bold text-white mb-4">Restaurant & Market</h2>
                 <p className="text-white/70">The best food and groceries delivered to your doorstep.</p>
                 {/* Placeholder for the illustration from the design */}
                 <div className="mt-8 w-64 h-64 bg-white/5 rounded-full mx-auto backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <span className="text-6xl">🛍️</span>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
