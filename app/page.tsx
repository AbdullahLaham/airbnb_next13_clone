import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
// import { Container } from 'postcss'
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';
import ListingCard from './components/listings/ListingCard';

export default async function Home() {
  const isEmpty = true;
  const listings = await getListings(); 
  console.log(listings, 'rrrrrrrrr')
  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showRest />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>

          {
            listings?.map((listing: any) => {
              return (
                <ListingCard key={listing?.id} data={listing} />
              )
            })
          }
        </div>

      </Container>
    </ClientOnly>
  )
}
