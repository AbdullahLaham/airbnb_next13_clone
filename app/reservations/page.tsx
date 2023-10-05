import React from 'react'
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import { safeReservation, safeUser } from '../types';
import { User } from '@prisma/client';
import ReservationsClient from './ReservationsClient';
import useAuthStore from '../hooks/useAuthStore';
const page = async () => {
    const currentUser = await getCurrentUser();

    console.log(currentUser, 'qqqqqqqqqqqqqqqq');
  
    const reservations: any = await getReservations({authorId: currentUser?.id});

    if (!currentUser?.email) {
        return (
          <ClientOnly>
            <EmptyState title='Unauthorized' subtitle="please Login" />
          </ClientOnly>
            
        ) 
      }
    
      if (reservations?.length === 0) {
          return (
              <ClientOnly>
                <EmptyState title='No trips found' subtitle="Looks like you have not reserved any trips !" />
              </ClientOnly>
          ) 
      }
  return (
    <ClientOnly>
        <ReservationsClient reservations={reservations} currentUser={currentUser}  />
    </ClientOnly>
  )
}

export default page ;