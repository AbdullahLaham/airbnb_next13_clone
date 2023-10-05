'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import {useState, useCallback, useEffect} from 'react'
import MenuItem from './MenuItem'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import RegisterModal from '../modals/RegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useAuthStore from '@/app/hooks/useAuthStore'
import useRentModal from '@/app/hooks/useRentModal'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface UserMenuProps {
  currentUser?: any
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const [isOpen, setIsOpen] = useState(false);  
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const {logout} = useAuthStore();

  const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    },[]
  )
  const onRent = useCallback(() => {
    if (!currentUser?.email) {
      return loginModal.onOpen();
    }

    return rentModal.onOpen();
    
  }, [currentUser, loginModal, rentModal]);
  useEffect(() => {
    console?.log(registerModal?.isOpen);
  }, [registerModal?.isOpen]);

  const router = useRouter();

  // current user
  
  
  return (
    <div className='relative '>
        <div className='flex flex-row items-center gap-3 '>
            <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                Airbnb your home

            </div>
            <div 
                onClick={toggleOpen}
                className="
                select-none
                p-4
                md:py-1
                md:px-2
                border-[1px] 
                border-neutral-200 
                flex 
                flex-row 
                items-center 
                gap-3 
                rounded-full 
                cursor-pointer 
                hover:shadow-md 
                transition
                "
                >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src=''
                    // src={currentUser?.image}
                     />
                </div>
                </div>

        </div>
        {isOpen && (
        <div 
          className="
            absolute 
            bg-white
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-red 
            overflow-hidden 
            right-0 
            top-[4rem]
            text-sm
            min-h-[100vh]
          "
        >
            
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => logout()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
            {/* // <div>
            // <>
            //    <MenuItem 
            //      label="Login" 
            //      onClick={loginModal.onOpen}
            //    />
            //    <MenuItem 
            //      label="Sign up" 
            //      onClick={registerModal.onOpen}
            //    />
            //  </>
            // </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu