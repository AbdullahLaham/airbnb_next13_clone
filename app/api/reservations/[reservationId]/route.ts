import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string,
}

export async function DELETE(
  request: Request, {params}: {params: IParams}
) {
    // const currentUser = getCurrentUser();
    const {reservationId} = params;

//   if (!currentUser) {
//     return NextResponse.error();
//   }
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('invalid ID');
  }



  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
    },
    // OR: [
    //     { userId: currentUser?.id },
    //     {listing: { userID: currentUser?.id }}
    // ]
  });

  return NextResponse.json(reservation);
}

