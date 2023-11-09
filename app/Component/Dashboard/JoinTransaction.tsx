'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { useRouter } from 'next/navigation'

const JoinTransaction = () => {

  const router = useRouter();
  const [link, setLink] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/joinTransaction', {
        Link: link
      })

      setLink("")
      router.push('/user/MyTransaction')
    } catch (error) {
      return null
    }
  }

  return (
    <form className='px-[3.75rem] py-5 w-full' onSubmit={handleSubmit}>
      {isLoading &&
      <Loading />
      }
        <p className='py-5 font-semibold text-2xl text-gray-700 cursor-default'>Masuk ke Transaksi</p>
        <p className=' py-2 font-light text-sm text-gray-400 cursor-default'>Masukkan kode transaksi yang anda dapatkan dari orang yang ingin bertransaksi dengan anda !</p>
        <input type="text" className='my-4 w-full bg-[#F8F7FA] border-b-2 px-3 active:outline-none focus:outline-none active:border-b-[#1988db] focus:border-b-[#1988db] transition-colors duration-300' value={link} onChange={(e)=>setLink(e.target.value)} required/>
        <button type='submit' className='px-12 py-2 my-5 border-2 rounded-full border-[#1988db] text-[#1988db] shadow-md hover:bg-[#1988db] hover:text-[#F8F7FA] font-bold uppercase transition-colors'>
          {loading ? <span className="loading loading-dots loading-sm bg-[#1988db]"></span>
          : "Konfirmasi"}
        </button>
    </form>
  )
}

export default JoinTransaction