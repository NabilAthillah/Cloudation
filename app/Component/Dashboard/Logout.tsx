"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Logout = () => {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  return (
    <a className="flex items-center gap-2 justify-center py-4 cursor-pointer w-fit self-center" onClick={() => {
      setLoading(true),
      signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/Login`
      });
    }}>
      <svg
        className="h-6 w-6 text-[#1988db]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M7 12h14l-3 -3m0 6l3 -3" />
      </svg>
        {loading ? <span className="loading loading-dots loading-sm bg-[#1988db]"></span>
        : <p className="font-bold text-sm text-[#1988db]">Logout</p>
    }
    </a>
  );
};

export default Logout;
