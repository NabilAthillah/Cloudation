import React from 'react'

const Navbar = () => {
  return (
    <div className='p-5 sticky top-0 right-0 z-10 bg-[#F8F7FA] w-full'>
    <p className='font-semibold text-2xl text-gray-700 cursor-default'>Transaksi Saya</p>
    <div>
        <ul className='flex gap-4 py-5'>
            <li className='font-medium text-lg cursor-pointer'>Aktif</li>
            <li className='font-medium text-lg cursor-pointer border-b-2'>Dibatalkan</li>
        </ul>
        <div></div>
    </div>
    <ul className='flex gap-4 py-2'>
        <li className='font-medium text-base cursor-pointer border-b-2 '>Semua</li>
        <li className='font-medium text-base cursor-pointer'>Membutuhkan Pembayaran</li>
        <li className='font-medium text-base cursor-pointer'>Membutuhkan Pengiriman</li>
        <li className='font-medium text-base cursor-pointer'>Dikirim</li>
        <li className='font-medium text-base cursor-pointer'>Selesai</li>
    </ul>
  </div>
  )
}

export default Navbar