import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
const body = await request.json();
  const { 
    listingId,
    startDate,
    endDate,
    totalPrice,
    currentUser
   } = body;
  if (!currentUser) {
    return NextResponse.error();
  }

  

   if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation);
}