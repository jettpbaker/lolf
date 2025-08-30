'use client';

import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      type='button'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
