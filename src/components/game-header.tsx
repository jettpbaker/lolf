import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '@/components/theme-switcher';

function NavItem({ href, label }: { href: string; label: string }) {
  //   const pathname = usePathname();
  //   const isActive = pathname === href;
  const isActive = false;

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={
        `px-4 h-10 grid place-items-center text-sm md:text-base transition-colors rainbow-border-hover rounded-sm border bg-card text-card-foreground overflow-hidden` +
        (isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted')
      }
    >
      {label}
    </Link>
  );
}

export default function GameHeader() {
  return (
    <header className='w-fit mx-auto mt-4'>
      <nav
        className='rounded-sm border bg-card text-card-foreground shadow-sm '
        aria-label='Main'
      >
        <div className='flex items-stretch divide-x'>
          {/* Theme toggle as the leftmost square segment (replaces colorful block) */}
          <ThemeSwitcher className='hover:bg-muted' />

          {/* Nav items */}
          <NavItem href='/p' label='Play' />
          <NavItem href='/l' label='Leaderboard' />
          <NavItem href='/profile' label='Profile' />
        </div>
      </nav>
    </header>
  );
}
