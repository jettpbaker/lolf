'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <button
      type='button'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn('h-10 w-10 grid place-items-center', className)}
      aria-label='Toggle theme'
      suppressHydrationWarning
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
