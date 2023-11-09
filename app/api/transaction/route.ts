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
      },
    });
  
    const serializedTransactionId = transaction.id.toString();
    const transactionCookie = serialize("transactionId", serializedTransactionId, {
      httpOnly: true,
      maxAge: 60*60*24,
      sameSite: "lax",
      path: "/",
    });
  
    const response = NextResponse.json(transaction, { status: 201 });
    response.headers.set("Set-Cookie", transactionCookie);
  
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
