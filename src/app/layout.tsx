import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeSwitcher } from '@/components/theme-switcher'

const pixel = localFont({
  src: '../fonts/pixel-font.woff2',
  variable: '--font-pixel',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'lolf',
  description: 'lolf guessing game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className='max-h-screen max-w-screen'
    >
      <body className={`${pixel.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {/* <div>
            <ThemeSwitcher />
          </div> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
