import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return [];
    }
    try {
        const favorites= await prisma.listing.findMany({
            where: {
                id: {in: [...(currentUser.favoriteIds || []) ]}
            }
        });
        const safeFavorites = favorites.map((fav) => ({
            ...fav,
            createdAt: fav?.createdAt?.toISOString(),
        }))
        return safeFavorites;
    } catch (error) {
        throw new Error(error);
    }

}