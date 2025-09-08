'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from '@/components/theme-switcher'

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={
        `px-4 h-10 grid place-items-center text-sm md:text-base transition-colors rounded-sm bg-card hover:bg-muted text-card-foreground overflow-hidden ` +
        (isActive ? 'bg-primary-foreground' : '')
      }
    >
      {label}
    </Link>
  )
}

export default function GameHeader() {
  return (
    <header className='w-fit'>
      <nav
        className='border-y-2 border-zinc-500 dark:border-zinc-700'
        aria-label='Main'
      >
        <div className='flex items-stretch divide-x divide-zinc-300 dark:divide-zinc-800'>
          <ThemeSwitcher className='bg-card hover:bg-muted' />
          <NavItem href='/p' label='Play' />
          <NavItem href='/g' label='My Games' />
          <NavItem href='/l' label='Leaderboard' />
          <NavItem href='/profile' label='Profile' />
        </div>
      </nav>
    </header>
  )
}
