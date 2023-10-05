'use client'

import React, { useCallback, useState } from 'react'
import { safeListing, safeUser } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
    listings?: safeListing[],
    currentUser?: any,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({listings, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listings Deleted');
            router.refresh();
        })
        .catch((error) => {
            toast.error('something went wrong');
        })
        .finally(() => {
            setDeletingId('')
        });


    }, [deletingId, router])
    

    console.log(listings, 'rrrrrrrrrrr');

  return (
    <Container>
        <Heading title='Properties' subtitle='List of your properties!' />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
          {listings?.map((listing: safeListing) => {
              return (
                <ListingCard key={listing?.id} data={listing} actionId={listing?.id} onAction={onCancel} disabled={deletingId == listing?.id} actionLabel='Delete Property' currentUser={currentUser}  />
              )
          })}
      </div>
    </Container>
  )
}

export default PropertiesClient