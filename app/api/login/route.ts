import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { serialize, parse } from "cookie";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: User = await request.json();

  // Cari pengguna berdasarkan alamat email
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  
  if (!user) {
    return NextResponse.json({ message: "Email tidak ditemukan." }, { status: 401 });
  }

  const userPassword = await bcrypt.compare(body.password, user.password);

  // Periksa kata sandi
  if (!userPassword) {
    return NextResponse.json({ message: "Password salah." }, { status: 401 });
  }  

  // Dapatkan userTransactionId dari cookie
  const cookies = parse(request.headers.get("cookie") || ''); // Gunakan default string kosong jika tidak ada cookie
  const transactionId = cookies.transactionId;
  const Roles = cookies.Role;

  if (transactionId) {
    // Update data UserTransaction dengan userTransactionId yang ditemukan
    if (Roles === "Pembeli") {
      await prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          // Tambahkan user.id ke dalam userTransactions
          buyer: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } else if (Roles === "Penjual") {
      await prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          // Tambahkan user.id ke dalam userTransactions
          seller: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }
  
    // Setel cookie untuk kedaluwarsa
    const transactionCookie = serialize("transactionId", "", {
      httpOnly: true,
      maxAge: 0, // Ini akan membuat cookie kadaluwarsa dan dihapus segera
      sameSite: "lax",
      path: "/",
    });
  
    const roleCookie = serialize("Role", "", {
      httpOnly: true,
      maxAge: 0, // Ini akan membuat cookie kadaluwarsa dan dihapus segera
      sameSite: "lax",
      path: "/",
    });
  
    // Mengatur cookie di header respons
    const response = NextResponse.json({ message: "Login berhasil." }, { status: 200 });
    response.headers.append("Set-Cookie", transactionCookie);
    response.headers.append("Set-Cookie", roleCookie);
  
    return response; // Kembalikan respons yang mengandung cookie yang akan dihapus
  }
  
  // Kembalikan respons jika tidak ada cookie yang dihapus
  return NextResponse.json({ message: "Login berhasil." }, { status: 200 });
}