import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from '../actions/getReservations'
import React, { useEffect, useState } from 'react'
import useAuthStore from "../hooks/useAuthStore";
import TripsClient from "./TripsClient";
import { Reservation } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";
import { AnyMxRecord } from "dns";

const TripsPage =  async () => {

  const currentUser = await getCurrentUser();

  // const [currentUser, setCurrentUser] = useState({});

  // useEffect(() => {
  //   const storedData = localStorage.getItem('user');
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     setCurrentUser(parsedData);
  //   }
  // }, []);

  console.log(currentUser, 'qqqqqqqqqqqqqqqq');


  const reservations: any = await getReservations({userId: currentUser?.id});
  
  return (
      <TripsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default TripsPage