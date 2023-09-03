import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string,
}

export default async function getCurrentUser() {
   const user = JSON.parse(localStorage.getItem('user'));
   return user;
}