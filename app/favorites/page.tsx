import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from '../actions/getReservations'
import React from 'react'
import useAuthStore from "../hooks/useAuthStore";
import getCurrentUser from "../actions/getCurrentUser";
import { Reservation } from "@prisma/client";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../actions/getFavoriteListings";

const FavoritesPage =  async () => {
  const currentUser = await getCurrentUser();
  console.log(currentUser, 'qqqqqqqqqqqqqqqq');

  const favorites = await getFavoriteListings();
  
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle="please Login" />
      </ClientOnly>
        
    ) 
  }

  if (favorites?.length === 0) {
      return (
          <ClientOnly>
            <EmptyState title='No favorites found' subtitle="Looks like you have no favorite listings !" />
          </ClientOnly>
      ) 
  }
  return (
    <ClientOnly>
        <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritesPage