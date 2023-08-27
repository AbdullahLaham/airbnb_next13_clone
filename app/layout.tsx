'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
// import {ToasterProvider} from './providers/ToasterProvider'
import { Toaster } from 'react-hot-toast'
import LoginModal from './components/modals/LoginModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <Navbar />
          {/* <Modal isOpen={true} title={'Hellw World'} actionLabel={'Submit'} /> */}
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
