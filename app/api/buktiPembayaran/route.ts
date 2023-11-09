import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authorize, uploadFile } from '@/app/api/app';

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

    const authClient = await authorize();
    const uploadedFile = await uploadFile(authClient, body.buktiPembayaran);

    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        buktiPembayaran: uploadedFile,
        status: "Menunggu Penjual Melakukan Pengiriman",
      },
    });

    return NextResponse.json(
      { message: `Berhasil ${uploadedFile}`, link: uploadedFile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
