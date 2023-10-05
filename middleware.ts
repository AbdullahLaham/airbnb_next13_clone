export {default} from 'next-auth/middleware';

export const config = {
    matcher: [
        '/trips',
        '/reservations',
        '/properties',
        '/favorites',
    ],
    externals: [
        {
          'nock': 'commonjs2 nock',
          'mock-aws-s3': 'commonjs2 mock-aws-s3'
        }
      ],
}

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//     provider = "prisma-client-js"
//     previewFeatures = ["mongodb"]
//   }
  
//   datasource db {
//     provider = "mongodb"
//     url      = env("DATABASE_URL")
    
//   }
  
  
  
//   // mongodb+srv://abed26194:bJBGKjT6k00iIVRu@cluster0.t62tpuh.mongodb.net/mydb?ssl=true&connectTimeoutMS=5000&maxPoolSize=50
  
  
  
  
  
  
  
  
  
  
//   model User {
//     id String @id @default(auto()) @map("_id") @db.ObjectId // @id means that it is a primary key
//     name String?
//     email String? @unique
//     emailVerified DateTime?
//     image String?
//     hashedPassword String?
//     favoriteIds String[] @db.ObjectId
//     accounts Account[]
//     listings Listing[]
//     reservations Reservation[]
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
  
//   }
  
//   model Account {
//     id String @id @default(auto()) @map("_id") @db.ObjectId
//     userId String   @db.ObjectId
//     type String
//     provider String
//     providerAccountId String
//     refresh_token String? @db.String
//     access_token String? @db.String
//     expires_at Int?
//     token_type String?
//     scope String?
//     id_token String? @db.String
//     session_state String?
  
//     user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
  
//     @@unique([provider, providerAccountId])
//   }
  
//   model Listing {
//     id String @id @default(auto()) @map("_id") @db.ObjectId
//     title String
//     description String
//     imageSrc String
//     category  String
//     roomCount Int
//     bathroomCount Int
//     guestCount Int
//     locationValue String
//     userId String @db.ObjectId
//     price Int
  
//     user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//     reservations Reservation[]
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }
  
  
  
//   model Reservation {
//     id String @id @default(auto()) @map("_id") @db.ObjectId
//     userId String @db.ObjectId
//     listingId String @db.ObjectId  
//     startDate DateTime
//     endDate DateTime
//     totalPrice Int
//     user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//     listing Listing @relation(fields: [listingId], references: [id], onDelete: Cascade)
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }
  
  