import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        namaDepan: String,
        namaBelakang: String
    }
    interface Session {
        user: User & {
            namaDepan: String,
            namaBelakang: String
        }
        token: {
            namaDepan: String,
            namaBelakang: String
        }
    }
}