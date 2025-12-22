import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & { asChild?: boolean }>(
  ({ variant = 'primary', size = 'md', isLoading, asChild = false, children, className, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
      primary: 'bg-amber-400 text-black hover:bg-amber-500 outline outline-[3px] outline-amber-400',
      secondary: 'bg-white text-black hover:bg-gray-100 outline outline-1 outline-black/20',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      icon: 'bg-transparent border-0 p-0',
    };

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2 text-base',
      lg: 'h-12 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    const loadingClasses = isLoading ? 'opacity-75 cursor-not-allowed' : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${className || ''}`;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classes,
        disabled: isLoading || (children.props as any).disabled,
      } as any);
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;