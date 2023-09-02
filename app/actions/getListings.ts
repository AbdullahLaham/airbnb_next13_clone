import prisma from '@/app/libs/prismadb'
import { list } from 'firebase/storage';

export default async function getListings() {
    try {
        const listings = await prisma?.listing.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: list?.createdAt?.toIsoString(),
        }));

        return safeListings;
    } catch (error) {
        throw new Error(error);
    }
}

