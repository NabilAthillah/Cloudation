import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Logout from "./Logout";

const Sidebar = async() => {
  const session = await getServerSession(authOptions)

return (
<div
  className='h-screen w-[260px] bg-white shadow-[0_2px_6px_0px_rgba(47,43,61,0.14)] px-[14px] flex flex-col justify-between sticky left-0 top-0'>
  <div>
    <div className='w-full flex justify-center items-center py-5'>
      <div className='flex items-center gap-[6px]'>
        <img src="/assets/images/Logo2.png" alt="Logo" className='w-[50px]' />
        <p className='text-[18px] font-black font-logo text-[#1988db]'>Cloudation</p>
      </div>
    </div>
    <div className='py-7 flex flex-wrap justify-center items-center'>
      <p className='capitalize font-bold text-[#2f2b3dad] text-center'>Selamat Datang !<br/>{session?.user.namaDepan} {session?.user.namaBelakang}</p>
    </div>
    <div className='w-full'>
      <a href="/user/CreateTransaction"
        className='flex items-center gap-[10px] px-4 py-2 flex-wrap rounded-[6px] bg-gradient-to-r from-[#1988db_22.6%] to-[rgba(25,136,219,0.7)_76.47%]'>
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <span className='text-white text-[15px]'>Buat Transaksi</span>
      </a>
      <a href="/user/JoinTransaction" className='group flex items-center gap-[10px] px-4 py-2 flex-wrap'>
        <svg className="h-5 w-5 text-[#2f2b3dad] group-hover:text-[#1988db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
        </svg>
        <span className='text-[#2f2b3dad] text-[15px] group-hover:text-[#1988db]'>Masuk Transaksi</span>
      </a>
      <a href="/user/MyTransaction" className='group flex items-center gap-[10px] px-4 py-2 flex-wrap'>
        <svg className="h-5 w-5 text-[#2f2b3dad] group-hover:text-[#1988db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span className='text-[#2f2b3dad] text-[15px] group-hover:text-[#1988db]'>Transaksi Saya</span>
      </a>
      <a href="/user/MyProfile" className='group flex items-center gap-[10px] px-4 py-2 flex-wrap'>
        <svg className="h-5 w-5 text-[#2f2b3dad] group-hover:text-[#1988db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className='text-[#2f2b3dad] text-[15px] group-hover:text-[#1988db]'>Profile Saya</span>
      </a>
    </div>
  </div>
  <Logout />
</div>
)
}

export default Sidebar