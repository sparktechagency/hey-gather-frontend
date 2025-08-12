'use client'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { Provider } from 'react-redux'
import { store } from '@/redux/main/store'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between  `}
      >
        <Provider store={store}>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Toaster />
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
