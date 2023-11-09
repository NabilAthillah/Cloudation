"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { signIn } from 'next-auth/react'
import Loading from '../Loading';

export default function LoginForm(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true)

        const signInData = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        })

        if(signInData?.error){
            setError(true);
        } else {
            setError(false)
                    
        await axios.post("/api/login", {
            email: email,
            password: password,
        });
        router.push("/user/MyTransaction")
        }
    
        setEmail("");
        setPassword("");
      };
    return(
        <form className="flex flex-col justify-center items-center border-2 border-transparent rounded-xl w-[30rem] py-14 bg-white z-50 shadow-2xl gap-10" onSubmit={handleSubmit}>
            {isLoading &&
            <Loading />
            }
            <div className="w-80 px-10">
                <img src="/assets/images/Logo.png" alt="Logo" />
            </div>
            <div className="w-full px-7 flex flex-col gap-5">
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="Email" className="font-semibold text-[#c1c1c1] pl-2">Email</label>
                    <input type="email" placeholder="Masukkan Email Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="Password" className="font-semibold text-[#c1c1c1] pl-2">Password</label>
                    <input type="password" placeholder="Masukkan Password Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                        <input type="checkbox" className="toggle  checked:border-[#1988db] checked:bg-[#1988db]" />
                        <p className="text-[#545454] text-[1rem] cursor-default">Remember Me?</p>
                    </div>
                    <div className="flex items-center justify-end">
                        <a href="/ForgotPassword" className="text-[#1988db] text-[1rem] font-[500]">Forgot Password?</a>
                    </div>
                </div>
            <button type="submit" className="px-2 py-3 border-[#1988db] bg-[#1988db] text-white font-semibold rounded-full">SUBMIT</button>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-sm text-[#545454] cursor-default">New on our platform? <a href="/Register" className="text-[#1988db]">Create an account</a></p>
            </div>
            {error &&            
            <div className="toast">
  <div className="alert alert-error">
    <span className='text-white'>Terjadi Kesalahan ! Coba Lagi</span>
  </div>
</div>
            }
        </form>
    )
}