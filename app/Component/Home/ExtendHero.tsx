import React from 'react'

const ExtendHero = () => {
  return (
    <div className='min-h-screen max-w-screen relative flex'>
        <div className='w-1/2 p-16 sticky'>
            <img src="/assets/images/HowTo.png" alt="How To" />
        </div>
        <div className='w-1/2 flex flex-col flex-wrap justify-center items-start min-h-screen gap-4 px-10'>
            <p className='font-bold text-[#1988db] text-2xl mb-8'>Cara Penggunaan</p>
            <div className='flex items-center gap-3'>
                <p className='px-3 py-1 border-[1px] border-[#1988db] rounded-full text-[#1988db]'>1</p>
                <p className='text-base font-semibold text-[#2f2b3dad]'>Buat transaksi Baru</p>
            </div>
            <div className='flex items-center gap-3'>
                <p className='px-3 py-1 border-[1px] border-[#1988db] rounded-full text-[#1988db]'>2</p>
                <p className='text-base font-semibold text-[#2f2b3dad]'>Kirim Cloudation room ke user yang bersangkutan</p>
            </div>
            <div className='flex items-center gap-3'>
                <p className='px-3 py-1 border-[1px] border-[#1988db] rounded-full text-[#1988db]'>3</p>
                <p className='text-base font-semibold text-[#2f2b3dad]'>Melakukan pembayaran ke admin</p>
            </div>
            <div className='flex items-center gap-3'>
                <p className='px-3 py-1 border-[1px] border-[#1988db] rounded-full text-[#1988db]'>4</p>
                <p className='text-base font-semibold text-[#2f2b3dad]'>Penjual menyelesaikan pengiriman </p>
            </div>
            <div className='flex items-center gap-3'>
                <p className='px-3 py-1 border-[1px] border-[#1988db] rounded-full text-[#1988db]'>5</p>
                <p className='text-base font-semibold text-[#2f2b3dad]'>Pembeli konfirmasi penerimaan</p>
            </div>
            <div className='flex items-center gap-3'>
                <p className='px-3 py-1 border-[1px] border-[#1988db] rounded-full text-[#1988db]'>6</p>
                <p className='text-base font-semibold text-[#2f2b3dad]'>Admin Melakukan transfer ke penjual </p>
            </div>
        </div>
    </div>
  )
}

export default ExtendHero