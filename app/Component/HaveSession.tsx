"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HaveSession = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/user/MyTransaction')
        }, 2000)
    })

    return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <p className="font-extrabold text-3xl text-gray-500">
        Anda Telah Login Dan Akan Diarahkan Ke Dashboard
      </p>
    </div>
  );
};

export default HaveSession;
