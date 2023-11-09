import Navbar from './Navbar'
import Transaction from './Transaction'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const prisma = new PrismaClient()

const getTransaction = async() => {
  const session = await getServerSession(authOptions)

  const res = await prisma.transaction.findMany({
    select: {
      id: true,
      jenisBarang: true,
      totalHarga: true,
      biayaAdmin: true,
      buktiPembayaran: true,
      buktiPengiriman: true,
      buyer: true,
      buyerId: true,
      hargaProduk: true,
      Link: true,
      nomorResi: true,
      ongkosKirim: true,
      seller: true,
      sellerId: true,
      status: true,
      deskripsi: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      OR: [
        { buyerId: session?.user.id },
        { sellerId: session?.user.id },
      ]
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return res;  
}

const MyTransaction = async() => {
  const transaction = await getTransaction();

  const session = await getServerSession(authOptions)

  return (
    <main className='px-10 py-5 w-full'>
        <Navbar />
        <div className='flex flex-col gap-4'>
          {transaction.map((transaction, index) => (
            <Transaction key={transaction.id} transaction={transaction} session={session}/>
          ))}
        </div>
    </main>
  )
}

export default MyTransaction