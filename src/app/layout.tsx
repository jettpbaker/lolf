import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

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
      <body
        className={`${pixel.className} antialiased h-screen mx-auto max-w-11/12 sm:max-w-10/12 md:max-w-9/12 lg:max-w-8/12`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
