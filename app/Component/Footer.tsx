import Link from "next/link";

export default function Footer() {
    return(
        <div className="outline-none border-none">
            <img src="/assets/images/bg.png" alt="bg" />
            <div className="max-w-screen bg-[#1988db] flex py-6">
                <div className="w-1/12">
                    <img src="/assets/images/Cloudation-12.png" alt="Cloudation" className="w-1/2 pl-4"/>
                </div>
                <div className="w-9/12 flex flex-col items-center">
                    <div className="flex justify-evenly w-full py-14">
                        <div className="flex flex-col gap-4 text-white">
                            <p className="font-bold mb-2">Product</p>
                            <Link href="#" className="text-sm">Home</Link>
                            <Link href="#" className="text-sm">Benefits</Link>
                            <Link href="#" className="text-sm">Developers</Link>
                            <Link href="#" className="text-sm">Partners</Link>
                        </div>
                        <div className="flex flex-col gap-4 text-white">
                            <p className="font-bold mb-2">Product</p>
                            <Link href="#" className="text-sm">Home</Link>
                            <Link href="#" className="text-sm">Benefits</Link>
                            <Link href="#" className="text-sm">Developers</Link>
                            <Link href="#" className="text-sm">Partners</Link>
                        </div>
                        <div className="flex flex-col gap-4 text-white">
                            <p className="font-bold mb-2">Product</p>
                            <Link href="#" className="text-sm">Home</Link>
                            <Link href="#" className="text-sm">Benefits</Link>
                            <Link href="#" className="text-sm">Developers</Link>
                            <Link href="#" className="text-sm">Partners</Link>
                        </div>
                        <div className="flex flex-col gap-4 text-white">
                            <p className="font-bold mb-2">Product</p>
                            <Link href="#" className="text-sm">Home</Link>
                            <Link href="#" className="text-sm">Benefits</Link>
                            <Link href="#" className="text-sm">Developers</Link>
                            <Link href="#" className="text-sm">Partners</Link>
                        </div>
                    </div>
                    <div className="text-sm font-light text-slate-300">Copyright @2023 Cloudation</div>
                </div>
                <div className="w-2/12 flex items-end justify-center">
                    <Link href="#" className="py-2 text-base px-5 flex items-center justify-center rounded-full text-[#1988db] bg-white border-[1px] border-[#1988db]">Mulai Transaksi</Link>
                </div>
            </div>
        </div>
    )
}