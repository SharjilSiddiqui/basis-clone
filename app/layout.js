import './globals.css'

export const metadata = {
  title: 'Basis — Studio (Clone)',
  description: 'Inspired clone built with Next.js + Tailwind'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
