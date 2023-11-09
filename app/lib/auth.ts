import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/Login',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "john@mail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null
            }
            
            const existingUser = await prisma.user.findUnique({
                where: {email: credentials?.email}
            })
            if(!existingUser){
                return null
            }

            const passwordMatch = await compare(credentials.password, existingUser.password)

            if(!passwordMatch){
                return null
            }

            return {
                id: existingUser.id,
                namaDepan: existingUser.namaDepan,
                namaBelakang: existingUser.namaBelakang,
                email: existingUser.email,
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }){
            if(user){
                return {
                    ...token,
                    id: user.id,
                    namaDepan: user.namaDepan,
                    namaBelakang: user.namaBelakang,
                }
            }
            return token
        },
        async session({ session, user, token }){
            return{
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    namaDepan: token.namaDepan,
                    namaBelakang: token.namaBelakang
                }
            }
        }
      }
}