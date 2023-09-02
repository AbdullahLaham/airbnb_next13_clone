import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { type } from "os";
interface IParams {
    listingId?: string,
}
export async function POST(request: Request, {params}: {params: IParams}) {
    const {listingId} = params;
    const currentUser: any = request.json();
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          favoriteIds
        }
      });

      
    return NextResponse.json(user);
}



export async function DELETE(request: Request, {params}: {params: IParams}) {
    
    const {listingId} = params;

    const {currentUser}: any = request.json();

    if (!currentUser) {
        return NextResponse.error();
    }

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }
    let favoriteIds = [...(currentUser.favoriteIds) || []];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        }
    });
    return NextResponse.json(user);
}

