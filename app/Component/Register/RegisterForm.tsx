"use client"

import { useEffect, useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation";
import { serialize, parse } from "cookie";
import axios from "axios";
import Loading from "../Loading";

export default function RegisterForm(){
    const router = useRouter();

    const [namaDepan, setNamaDepan] = useState("");
    const [namaBelakang, setNamaBelakang] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        if(confirmPassword === password){
            setValidPassword(false)
            const response = await axios.post("/api/register", {
                namaDepan: namaDepan,
                namaBelakang: namaBelakang,
                email: email,
                password: password,
            });
            setNamaDepan("");
            setNamaBelakang("");
            setEmail("");
            setPassword("");

            if(response.status === 201 || response.status === 200){
                router.push("/Login");
            } else {
                alert(response.status)
            }
        } else {
            setValidPassword(true);
        }
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e:any) => {
      setIsChecked(e.target.checked);
    }

    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

    return(
        <form className="flex flex-col justify-center items-center border-2 border-transparent rounded-xl w-[30rem] py-5 bg-white z-50 shadow-2xl gap-10" onSubmit={handleSubmit}>
            {isLoading &&
            <Loading />
            }
            <div className="w-80 px-10">
                <img src="/assets/images/Logo.png" alt="Logo" />
            </div>
            <div className="w-full px-7 flex flex-col gap-5">
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="NamaDepan" className="font-semibold text-[#c1c1c1] pl-2">Nama Depan</label>
                    <input type="text" placeholder="Masukkan Nama Depan Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={namaDepan} onChange={(e)=>setNamaDepan(e.target.value)} required/>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="NamaBelakang" className="font-semibold text-[#c1c1c1] pl-2">Nama Belakang</label>
                    <input type="text" placeholder="Masukkan Nama Belakang Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={namaBelakang} onChange={(e)=>setNamaBelakang(e.target.value)} required/>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="Email" className="font-semibold text-[#c1c1c1] pl-2">Email</label>
                    <input type="email" placeholder="Masukkan Email Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="Password" className="font-semibold text-[#c1c1c1] pl-2">Password</label>
                    <input type="password" placeholder="Masukkan Password Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="Password" className="font-semibold text-[#c1c1c1] pl-2">Konfirmasi Password</label>
                    <input type="password" placeholder="Konfirmasi Password Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                    {validPassword && <p className="text-sm font-bold text-red-500">Password dan Konfirmasi Password Berbeda !</p>}
                </div>
                <div className="flex justify-start">
                    <div className="flex gap-3 items-center">
                        <input type="checkbox" id="CheckBoxRegister" className="toggle  checked:border-[#1988db] checked:bg-[#1988db]" onChange={handleCheckboxChange}/>
                        <p className="text-[#545454] text-[1rem]">I agree to the <a href="#" className="underline">Cloudation Terms of Service</a></p>
                    </div>
                </div>
            <button type="submit" className={`px-2 py-3 ${isChecked === false ? "disabled-button" : "border-[#1988db] bg-[#1988db] text-white" } font-semibold rounded-full`} disabled={!isChecked}>{
                loading ? <span className="loading loading-dots loading-sm"></span>
                : "SUBMIT"
            }</button>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-sm text-[#545454]">Sudah memiliki akun? <a href="/Login" className="text-[#1988db]">Login</a></p>
            </div>
        </form>
    )
}