'use client'

import React, { useCallback, useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState';
import useAuthStore from '../hooks/useAuthStore';
import getReservations from '../actions/getReservations';
import { safeReservation } from '../types';
import { Reservation } from '@prisma/client';
import Heading from '../components/Heading';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface TripsClientProps {
    reservations?: safeReservation[],
}

const TripsClient: React.FC<TripsClientProps> = ({reservations}) => {
    const {user: currentUser} = useAuthStore();
    // const [reservations, setReservations] = useState<any>([]);
    const [deletingId, setDeletingId] = useState("");
    const router = useRouter();
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`, )
        .then(() => {
            toast.success('Reservation Cancelled');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('')
        });


    }, [deletingId, router])
    
    if (!currentUser?.email) {
        return (
            <EmptyState title='Unauthorized' subtitle="please Login" />
        ) 
    }
    
    if (reservations?.length === 0) {
        return (
            <EmptyState title='No trips found' subtitle="Looks like you have not reserved any trips !" />
        ) 
    }
    // const getCurrentReservations = async () => {
    //     try {
    //         const reservations: Reservation[] = await getReservations({userId: currentUser?.id});
    //         console.log(reservations, 'tttteeeeeeeeeeeeeeee');
    //         setReservations(reservations);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // getCurrentReservations();
   


    

    console.log(reservations, 'rrrrrrrrrrr');

  return (
    <Container>
        <Heading title='Trips' subtitle='where you have been and where you are going ! ' />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
            {reservations?.map((reservation: Reservation) => {
                return (
                    <ListingCard key={reservation?.id} data={reservation?.listing} reservation={reservation} actionId={reservation?.id} onAction={onCancel} disabled={deletingId == reservation?.id} actionLabel='Cancel Reservation'  />
                )
            })}
        </div>
    </Container>
  )
}

export default TripsClient