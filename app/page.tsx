import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
// import { Container } from 'postcss'
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import { safeListing } from './types';
import getCurrentUser from './actions/getCurrentUser';

interface HomeProps {
  searchParams: IListingsParams,
}

const Home = async ({ searchParams }: HomeProps) => {
  const isEmpty = true;
  const listings: safeListing[] = await getListings(searchParams); 
  const currentUser = await getCurrentUser();
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
            listings?.map((listing: safeListing) => {
              return (
                <ListingCard key={listing?.id} data={listing} currentUser={currentUser} />
              )
            })
          }
        </div>

      </Container>
    </ClientOnly>
  )
}
export default Home;