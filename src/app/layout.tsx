import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WebWiz - AI Landing Page Generator',
  description: 'Create beautiful landing pages from natural language descriptions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
