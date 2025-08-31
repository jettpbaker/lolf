'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunDimIcon } from 'raster-react';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      type='button'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant='ghost'
      size='icon'
      className={cn('h-10 w-10', className)}
      aria-label='Toggle theme'
      suppressHydrationWarning
    >
      {theme === 'dark' ? (
        <SunDimIcon
          size={24}
          color=''
          strokeWidth={5}
          radius={1}
          suppressHydrationWarning
        />
      ) : (
        <MoonIcon
          size={24}
          color=''
          strokeWidth={5}
          radius={1}
          suppressHydrationWarning
        />
      )}
    </Button>
  );
}
