import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from '../actions/getReservations'
import React from 'react'
import useAuthStore from "../hooks/useAuthStore";
import TripsClient from "./TripsClient";
import getCurrentUser from "../actions/getCurrentUser";
import { Reservation } from "@prisma/client";

const TripsPage =  async () => {
  const {user: currentUser} = getCurrentUser();
  console.log(currentUser, 'qqqqqqqqqqqqqqqq');

  const reservations: Reservation[] = await getReservations({userId: currentUser?.id});

  return (
    <ClientOnly>
        <TripsClient reservations={reservations}/>
    </ClientOnly>
  )
}

export default TripsPage