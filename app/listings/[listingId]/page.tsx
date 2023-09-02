
import React from 'react'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from './ListingClient'
import useAuthStore from '@/app/hooks/useAuthStore'
interface IParams {
  listingId?: string,
}
const ListingPage = async ({ params }: {params: IParams}) => {
  console.log(params, 'rr')
  const listing = await getListingById(params);
  // const {user: currentUser} = useAuthStore();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
        <ListingClient listing={listing} />
    </ClientOnly>
  )
}

export default ListingPage;

