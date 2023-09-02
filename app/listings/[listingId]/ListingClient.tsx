'use client'
import { eachDayOfInterval } from 'date-fns'
import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/components/navbar/Categories'
import useAuthStore from '@/app/hooks/useAuthStore'
import useLoginModal from '@/app/hooks/useLoginModal'
import { safeListing, safeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

const initialDateRange = {
  startDate: new Date() ,
  endDate: new Date(),
  key: 'select'
}

interface ListingClientProps {
  reservations?: Reservation,
  listing: safeListing & {
    user: safeUser
  },
}

const ListingClient: React.FC<ListingClientProps> = ({listing, reservations = []}) => {
  const {user: currentUser} = useAuthStore();
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    const dates: Date[] = [];
    
  }, [])
  const category = useMemo(() => {
    return categories.find((item) => item?.label == listing?.category);
  }, [listing, categories]);


  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
          <div className='flex flex-col gap-6'>
            {listing?.category}
            <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id}  />
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6 '>
              <ListingInfo user={listing?.user} category={category} description={listing?.description} roomCount={listing?.roomCount} guestCount={listing?.guestCount} bathroomCount={listing?.bathroomCount} locationValue={listing?.locationValue}   />
            </div>
          </div>
        </div>
    </Container>
  )
}

export default ListingClient