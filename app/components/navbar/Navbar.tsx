import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import { safeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: safeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-10 '>
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />

                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar