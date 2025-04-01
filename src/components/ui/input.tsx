import * as React from 'react';

import type { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  startIcon?: IconType;
  endIcon?: IconType;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
}

function Input({
  className,
  type,
  startIcon: StartIcon,
  endIcon: EndIcon,
  onStartIconClick,
  onEndIconClick,
  ...props
}: InputProps) {
  const iconClasses = 'h-4 w-4 text-muted-foreground/60';

  return (
    <div className="relative flex items-center">
      {StartIcon && (
        <span onClick={onStartIconClick} className="absolute left-3 flex items-center">
          <StartIcon className={iconClasses} />
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          StartIcon && 'pl-9',
          EndIcon && 'pr-9',
          className
        )}
        {...props}
      />
      {EndIcon && (
        <span onClick={onEndIconClick} className="absolute right-3 flex items-center">
          <EndIcon className={iconClasses} />
        </span>
      )}
    </div>
  );
}

export { Input };
