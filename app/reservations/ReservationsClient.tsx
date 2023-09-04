'use client'

import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { safeReservation, safeUser } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'
interface ReservationsClientProps {
  reservations: safeReservation[];
  currentUser?: safeUser | null;
} 
const ReservationsClient: React.FC<ReservationsClientProps> = ({reservations, currentUser}) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();
  const onCancel = useCallback((id: string) => {
      setDeletingId(id);
      axios.delete(`/api/reservations/${id}`)
      .then(() => {
          toast.success('Reservation Cancelled');
          router.refresh();
      })
      .catch((error) => {
          toast.error('something went wrong');
      })
      .finally(() => {
          setDeletingId('')
      });


  }, [deletingId, router])
  return (
    <Container>
      <Heading title='Reservation' subtitle='Bookings in your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
          {reservations?.map((reservation: safeReservation) => {
              return (
                  <ListingCard key={reservation?.id} data={reservation?.listing} reservation={reservation} actionId={reservation?.id} onAction={onCancel} disabled={deletingId == reservation?.id} actionLabel='Cancel Reservation'  />
              )
          })}
      </div>
    </Container>
  )
}

export default ReservationsClient