'use client'
import { Range } from 'react-date-range'
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns'
import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/components/navbar/Categories'
import useAuthStore from '@/app/hooks/useAuthStore'
import useLoginModal from '@/app/hooks/useLoginModal'
import { safeListing, safeReservation, safeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { redirect } from 'next/dist/server/api-utils'
import axios from 'axios'
import ListingReservation from '@/app/components/listings/ListingReservation'

const initialDateRange = {
  startDate: new Date() ,
  endDate: new Date(),
  key: 'select'
}

interface ListingClientProps {
  reservations?: safeReservation[],
  listing: safeListing & {
    user: safeUser
  },
}

const ListingClient: React.FC<ListingClientProps> = ({listing, reservations = []}) => {
  const {user: currentUser} = useAuthStore();
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation?.startDate),
        end: new Date(reservation?.endDate)
      })
      dates = [...dates, ...range];
    });
   return dates;
  }, [reservations]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate,
      listingId: listing?.id,
      currentUser
    }).then((data) => {
      console.log(data)
      toast.success('Listing Reserved'!);
      setDateRange(initialDateRange);
      router.push('/trips');
      // redirect to /trips
      router.refresh();
    }).catch((error: any) => {
      console.log(error);
      toast.error('something went wrong')
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(dateRange?.endDate, dateRange?.startDate);
      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [totalPrice, dateRange, listing?.price])
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
              <div className='order-first mb-10 md:order-last md:col-span-3 '>
                <ListingReservation price={listing?.price} totalPrice={totalPrice} onChangeDate={(value: any) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
              </div>
            </div>
          </div>
        </div>
    </Container>
  )
}

export default ListingClient