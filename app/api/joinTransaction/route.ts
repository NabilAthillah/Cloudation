import { authOptions } from "@/app/lib/auth";
import type { Transaction } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request): Promise<void | NextResponse<unknown>> => {
  const session = await getServerSession(authOptions);
  try {
    const body: Transaction = await request.json();

    const transaction = await prisma.transaction.findFirst({
      where: {
        Link: body.Link,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaksi Tidak Ditemukan" },
        { status: 404 }
      );
    }

    console.log(transaction);

    if (!session) {
      return NextResponse.json(
        { message: "Tidak ada Session" },
        { status: 404 }
      );
    }

    if (
      transaction.buyerId !== null &&
      transaction.sellerId === null &&
      transaction.sellerId !== session?.user.id
    ) {
      await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          seller: {
            connect: {
              id: session?.user.id,
            },
          },
          status: "Menunggu Pembeli Melakukan Pembayaran",
        },
      });
    } else if (
      transaction.buyerId === null &&
      transaction.sellerId !== null &&
      transaction.buyerId !== session?.user.id
    ) {
      await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          buyer: {
            connect: {
              id: session?.user.id,
            },
          },
          status: "Menunggu Pembeli Melakukan Pembayaran",
        },
      });
    } else {
      return;
    }

    return NextResponse.json(
      { message: "Anda Berhasil Masuk Ke Transaksi" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
