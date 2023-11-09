import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request, res: Response) => {
  try {
    const body = await request.json();
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaksi Tidak Ditemukan" },
        { status: 404 }
      );
    }

    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: body.status, // Simpan link yang dikirimkan
      },
    });

    return NextResponse.json(
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
