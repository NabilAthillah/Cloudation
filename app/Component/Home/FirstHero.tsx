"use client"

import { useEffect, useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation";
import { serialize, parse } from "cookie";
import axios from "axios";


export default function FirstHero(){
const router = useRouter();

// DB INSERT
const [deskripsi, setDeskripsi] = useState("");
const [harga, setHarga] = useState("");
const [ongkosKirim, setOngkosKirim] = useState("");
const [Link, setLink] = useState("");

const [biayaAdmin, setBiayaAdmin] = useState("");
const [totalHarga, setTotalHarga] = useState("");

const [setRoles] = useState("");
const [setProducts] = useState("");

useEffect(() => {
if (harga !== "" && ongkosKirim !== "") {
const hargaNumerik = parseFloat(harga);
const ongkosKirimNumerik = parseFloat(ongkosKirim);

const biayaAdminNumerik:any = (hargaNumerik + ongkosKirimNumerik) * (10 / 100);
const totalHargaNumerik:any = (hargaNumerik + ongkosKirimNumerik + biayaAdminNumerik);
setBiayaAdmin(biayaAdminNumerik);
setTotalHarga(totalHargaNumerik);
} else {
setBiayaAdmin("");
setTotalHarga("");
}
}, [harga, ongkosKirim]);

const handleSubmit = async(e: SyntheticEvent) => {
e.preventDefault();
setIsLoading(true);
await axios.post("/api/transaction", {
deskripsi: deskripsi,
hargaProduk: Number(harga),
ongkosKirim: Number(ongkosKirim),
biayaAdmin: Number(biayaAdmin),
totalHarga: Number(totalHarga),
Link: Link,
jenisBarang: selectedProductText,
});
setDeskripsi("");
setHarga("");
setOngkosKirim("");
setBiayaAdmin("");
setTotalHarga("");
setLink("");
router.push("/Login")
}

const [isRoleVisible, setIsRoleVisible] = useState(false);
const [isProdukVisible, setIsProdukVisible] = useState(false);
const [isDetailVisible, setIsDetailVisible] = useState(false);
const [selectedRole, setSelectedRole] = useState("");
const [selectedProduct, setSelectedProduct] = useState("");
const [selectedRoleText, setSelectedRoleText] = useState("Apakah Anda Penjual / Pembeli ?");
const [selectedProductText, setSelectedProductText] = useState("Jenis Produk ?");

const role = ["Penjual", "Pembeli"];
function roleSelect(roles:any) {
setSelectedRole(roles);
setIsRoleVisible(false);
setSelectedRoleText(roles);

const roleCookie = serialize("Role", roles, {
    maxAge: 3600, // Max-age adalah waktu kadaluwarsa dalam detik (di sini: 1 tahun)
    path: '/',
  });

  // Store the roleCookie in the browser's cookies
  document.cookie = roleCookie;

  console.log(roleCookie);
}

const product = ["Fisik", "Digital"];
function productSelect(products:any) {
setSelectedProduct(products);
setIsProdukVisible(false);
setSelectedProductText(products);
}

function handleDropDown(){
setIsRoleVisible(!isRoleVisible);
}

function handleProduk(){
setIsProdukVisible(!isProdukVisible);
}

function handleDetails(){
setIsDetailVisible(!isDetailVisible);
}

const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }, 10000);
}, []);

return(
<div id="HomeFirstHero" className="min-h-screen max-w-screen flex flex-col items-center gap-10">
    <div className="flex flex-col items-center gap-6 z-10">
        <p id="FirstHero" className="font-medium text-5xl flex gap-2">Bayar Mudah<span className="text-[#1988db]">Tanpa
                Resah</span></p>
        <p id="FirstHero" className="font-light text-lg text-center">Cloudation membantu kamu untuk transaksi dengan
            jauh lebih aman<br /><strong className="text-[#fbb110]">#CloudationAlwaysON</strong></p>
    </div>
    <div className="relative">
        <div className="absolute left-0 right-0 top-0 bottom-0 m-[auto] z-0">
            <img id="FirstHero" src="/assets/images/graph.png" alt="Background"
                className="absolute left-0 right-[-17rem] top-[-7rem] bottom-0 m-[auto] w-[550px]" />
            <img id="FirstHero" src="/assets/images/graph1.png" alt="Background"
                className="absolute left-0 right-[-27rem] top-[7.5rem] bottom-0 m-[auto] w-[650px]" />
        </div>
        <form id="FormFirstHero" onSubmit={handleSubmit}
            className="w-[35rem] min-h-[23rem] px-10 py-8 flex flex-col gap-6 rounded-[32px] z-50 relative">
            <div className="relative">
                <div id="FormInput" onClick={handleDropDown}
                    className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center cursor-pointer">
                    <p className="text-[#1988db] font-semibold text-lg cursor-pointer">{selectedRoleText}</p>
                    <svg className="w-4 h-4 text-gray-800 dark:text-[#1988db]" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                </div>
                {isRoleVisible &&
                <ul id="DropDownHome"
                    className="absolute w-full px-3 py-4 bg-white left-0 top-[4.5rem] border-2 outline-2 border-[#ffffff] rounded-2xl z-50">
                    {role.map((roles) => (
                    <li key={roles}
                        className="text-xl font-medium text-[#1988db] w-full hover:bg-slate-200 px-2 py-2 rounded-md cursor-pointer"
                        onClick={()=> roleSelect(roles)}>
                        {roles}</li>
                    ))}
                </ul>
                }
            </div>
            <div className="relative z-10">
                <div id="FormInput" onClick={handleProduk}
                    className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center cursor-pointer">
                    <p className="text-[#1988db] font-semibold text-lg cursor-pointer">{selectedProductText}</p>
                    <svg className="w-4 h-4 text-gray-800 dark:text-[#1988db]" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                    <input type="text" hidden value={selectedProductText}/>
                </div>
                {isProdukVisible &&
                <ul id="DropDownHome"
                    className="absolute w-full px-3 py-4 bg-white left-0 top-[4.5rem] border-2 outline-2 border-[#ffffff] rounded-2xl">
                    {product.map((products) => (
                    <li key={products}
                        className="text-xl font-medium text-[#1988db] w-full hover:bg-slate-200 px-2 py-2 rounded-md cursor-pointer"
                        onClick={()=> productSelect(products)}>
                        {products}</li>
                    ))}
                </ul>
                }
            </div>
            <div className="relative flex flex-col gap-6">
                <div id="FormInput" onClick={handleDetails}
                    className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center cursor-pointer">
                    <p className="text-[#1988db] font-semibold text-lg cursor-pointer">Deskripsi / Harga</p>
                    <svg className="w-4 h-4 text-gray-800 dark:text-[#1988db]" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 1v16M1 9h16" />
                    </svg>
                </div>
                {isDetailVisible &&
                <div className="flex flex-col gap-6">
                    <input type="text" placeholder="Deskripsi" id="FormInput"
                        className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center placeholder-[#1988db] font-semibold text-lg"
                        value={deskripsi} onChange={(e)=> setDeskripsi(e.target.value)}
                        required
                    />
                    <input type="number" placeholder="Harga Produk" id="FormInput"
                        className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center placeholder-[#1988db] font-semibold text-lg"
                        value={harga} onChange={(e)=> setHarga(e.target.value)}
                        required
                    />
                    <input type="number" placeholder="Ongkos Kirim" id="FormInput"
                        className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center placeholder-[#1988db] font-semibold text-lg"
                        value={ongkosKirim} onChange={(e)=> setOngkosKirim(e.target.value)}
                        required
                    />
                    <input type="text" placeholder="Biaya Admin" id="FormInput"
                        className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center placeholder-[#1988db] font-semibold text-lg cursor-default"
                        readOnly value={biayaAdmin} onChange={(e)=> setBiayaAdmin(e.target.value)}
                    />
                    <input type="text" placeholder="Total Harga" id="FormInput"
                        className="w-full border-2 border-[#1988db] rounded-[15px] px-3 py-4 flex justify-between items-center placeholder-[#1988db] font-semibold text-lg cursor-default"
                        readOnly value={totalHarga} onChange={(e)=> setTotalHarga(e.target.value)}
                    />
                </div>
                }
            </div>
            <button id="FormInput" type="submit" disabled={selectedRole==="Apakah Anda Penjual / Pembeli ?" || selectedProduct==="Jenis Produk ?" }
                className={`rounded-full py-4 font-bold text-lg border-[1px] ${ selectedRole==="" ||
                selectedProduct==="" ? "disabled-button" : "bg-[#1988db] text-white border-[#1988db]" }`}>
                    {isLoading ?
                    <span className="loading loading-dots loading-md"></span>
                    : "Mulai Transaksi" 
                    }
            </button>
        </form>
    </div>
</div>
)
}