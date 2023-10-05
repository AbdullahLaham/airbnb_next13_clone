import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";
import { safeUser } from "@/app/types";
import { User } from "@prisma/client";

interface IParams {
    listingId?: string,
}
export async function POST(request: Request, {params}: {params: IParams}) {
    const {listingId} = params;
    const currentUser: any = await getCurrentUser();
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

    const currentUser = await getCurrentUser();

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

