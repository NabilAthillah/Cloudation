import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    return(
        <nav id="NavbarHome" className="layout-navbar shadow-none py-0 fixed top-0 right-0 left-0 m-[auto] z-[999] px-[63.6px] pt-[16px] max-w-screen-2xl">
            <div className="flex justify-between items-center bg-white">

                {/* Navigation Bar Left */}
                <div className="flex justify-start gap-8 items-center">
                    <div className="pb-1">
                        <Image src="/assets/images/Logo.png" alt="Cloudnation"width={201.6} height={1}/>
                    </div>
                    <div>
                        <ul className="flex">
                            <li className="py-2 px-[15px]">
                                <a className="cursor-pointer text-sm font-medium" id="NavbarList">Home</a>
                            </li>
                            <li className="py-2 px-[15px]">
                                <a className="cursor-pointer text-sm font-medium" id="NavbarList">Features</a>
                            </li>
                            <li className="py-2 px-[15px]">
                                <a className="cursor-pointer text-sm font-medium" id="NavbarList">About Us</a>
                            </li>
                            <li className="py-2 px-[15px]">
                                <a className="cursor-pointer text-sm font-medium" id="NavbarList">FAQ</a>
                            </li>
                            <li className="py-2 px-[15px]">
                                <a className="cursor-pointer text-sm font-medium" id="NavbarList">Fee</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Navigation Bar Rigth */}
                <div className="flex justify-end items-center gap-3">
                    <Link href="/Login" className="px-5 py-2 border-[1px] border-[#1988db] rounded-2xl font-bold text-sm text-[#1988db] transition-all hover:bg-[#1988db] hover:text-white">Login</Link>
                    <Link href="/Register" className="px-5 py-2 border-[1px] border-[#1988db] rounded-2xl font-bold text-sm text-white bg-[#1988db] transition-all hover:text-[#1988db] hover:bg-white">Sign Up / Register</Link>
                </div>
            </div>
        </nav>
    )
}