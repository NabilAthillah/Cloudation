import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body: User = await request.json();
  
    const existingEmail = await prisma.user.findUnique({
      where: { email: body.email },
    })
  
    if(existingEmail){
      return NextResponse.json({
        user: null, message: "Email Ini Sudah Terdaftar !"
      }, {status: 409})
    }
  
    const hashedPassword = await hash(body.password, 10)
  
    const newUser = await prisma.user.create(
      {
      data: {
          namaDepan: body.namaDepan,
          namaBelakang: body.namaBelakang,
          email: body.email,
          password: hashedPassword,
      },
    });
  
    const { password: newUserPassword, ...rest } = newUser;
  
    return NextResponse.json({user: rest, message: "Registrasi Berhasil"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({message: "Ada Kesalahan !"}, { status: 500 })
  }
};
