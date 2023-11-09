import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Transaction } from "@prisma/client";
import { serialize, parse } from "cookie";
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

const generateUniqueLink = () => {
  return `${uuidv4()}`;
};

export const POST = async (request: Request) => {
  try {
    const body: Transaction = await request.json();
  
    const Link = generateUniqueLink();
  
    const transaction = await prisma.transaction.create(
      
      {
      data: {
        deskripsi: body.deskripsi,
        hargaProduk: body.hargaProduk,
        ongkosKirim: body.ongkosKirim,
        biayaAdmin: body.biayaAdmin,
        totalHarga: body.totalHarga,
        Link: Link,
        jenisBarang: body.jenisBarang,
        status: body.status,
        buyerId: body?.buyerId,
        sellerId: body?.sellerId,
      },
    });
  
    const response = NextResponse.json(transaction, { status: 201 })  
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
