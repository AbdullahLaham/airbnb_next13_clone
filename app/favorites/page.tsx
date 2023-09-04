import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from '../actions/getReservations'
import React from 'react'
import useAuthStore from "../hooks/useAuthStore";
import TripsClient from "./TripsClient";
import getCurrentUser from "../actions/getCurrentUser";
import { Reservation } from "@prisma/client";

const FavoritesPage =  async () => {
  const currentUser = getCurrentUser();
  console.log(currentUser, 'qqqqqqqqqqqqqqqq');

  const reservations: Reservation[] = await getReservations({userId: currentUser?.id});
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle="please Login" />
      </ClientOnly>
        
    ) 
  }

  if (reservations?.length === 0) {
      return (
          <ClientOnly>
            <EmptyState title='No favorites found' subtitle="Looks like you have no favorite listings !" />
          </ClientOnly>
      ) 
  }
  return (
    <ClientOnly>
        <TripsClient reservations={reservations}/>
    </ClientOnly>
  )
}

export default FavoritesPage