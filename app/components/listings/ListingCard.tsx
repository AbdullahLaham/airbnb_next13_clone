import { Listing, Reservation, User } from '@prisma/client'
import React from 'react'

interface ListingCardProps {
    data: Listing,
    reservation?: Reservation,
    onAction: (id: string) => void,
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
    currentUser?: User | null,
}
const ListingCard = () => {
  return (
    <div>
        
    </div>
  )
}

export default ListingCard