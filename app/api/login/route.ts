import bcrypt from 'bcrypt';
import  prisma  from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';


export async function POST (request: Request) {
    const body = await request.json();
    const {email, password} = body;
    const user = await prisma.user.findUnique({ where: { email } });

  if (user?.hashedPassword) {
    const passwordMatch = await bcrypt.compare(password, user?.hashedPassword);
    if (passwordMatch) {
        return NextResponse.json(user);
    } else {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
  
}
