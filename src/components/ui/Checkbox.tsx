import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          {...props}
        />
        <div className={`relative size-7 flex items-center justify-center bg-white rounded-sm border border-black/20 ${
          props.checked ? 'bg-amber-400 border-amber-400' : ''
        } ${className || ''}`}>
          {props.checked && (
            <svg 
              className="w-4 h-4 text-black absolute" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M5 13l4 4L19 7" 
              ></path>
            </svg>
          )}
        </div>
        {label && (
          <span className="text-base font-normal font-['Cyntho_Next'] leading-6 text-black">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export default Checkbox;