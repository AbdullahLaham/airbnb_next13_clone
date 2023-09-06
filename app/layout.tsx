


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
import RentModal from './components/modals/RentModal'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <SearchModal />
          <RentModal currentUser={currentUser} />
          <Navbar currentUser={currentUser} />
          {/* <Modal isOpen={true} title={'Hellw World'} actionLabel={'Submit'} /> */}
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>

        
      </body>
    </html>
  )
}
