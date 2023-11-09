"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import Loading from "../Loading";

interface ResponseData {
  Link: string; 
}

const CreateTransaction = ({id}:{id:any}) => {
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [buyerId, setBuyerId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [jenisBarang, setJenisBarang] = useState("");

  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [ongkosKirim, setOngkosKirim] = useState("");
  const [Link, setLink] = useState("");

  const [biayaAdmin, setBiayaAdmin] = useState("");
  const [totalHarga, setTotalHarga] = useState("");

  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (harga !== "" && ongkosKirim !== "") {
      const hargaNumerik = parseFloat(harga);
      const ongkosKirimNumerik = parseFloat(ongkosKirim);

      const biayaAdminNumerik: any =
        (hargaNumerik + ongkosKirimNumerik) * (10 / 100);
      const totalHargaNumerik: any =
        hargaNumerik + ongkosKirimNumerik + biayaAdminNumerik;
      setBiayaAdmin(biayaAdminNumerik);
      setTotalHarga(totalHargaNumerik);
    } else {
      setBiayaAdmin("");
      setTotalHarga("");
    }
  }, [harga, ongkosKirim]);

  const handleCheckBox1Change = () => {
    setCheckBox1(true);
    setCheckBox2(false);
    try {
      setBuyerId(id);
      setSellerId("");
    } catch (error) {
      console.error("Error setting buyerId and sellerId:", error);
    }    
  };

  const handleCheckBox2Change = () => {
    setCheckBox1(false);
    setCheckBox2(true);
    try {
      setBuyerId("");
      setSellerId(id);
    } catch (error) {
      console.error("Error setting buyerId and sellerId:", error);
    }
  };

  const handleCheckBox3Change = () => {
    setCheckBox3(true);
    setCheckBox4(false);
    try {
      setJenisBarang("Fisik");
    } catch (error) {
      console.error("Error setting buyerId and sellerId:", error);
    }
  };

  const handleCheckBox4Change = () => {
    setCheckBox3(false);
    setCheckBox4(true);
    try {
      setJenisBarang("Digital");
    } catch (error) {
      console.error("Error setting buyerId and sellerId:", error);
    }
  };

  const goToStep1 = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setStep4(false);
  };

  const goToStep2 = () => {
    setStep2(true);
    setStep1(false);
    setStep3(false);
    setStep4(false);
  };

  console.log("Buyer : ",buyerId,"Seller : ", sellerId)

  const goToStep4 = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (buyerId) {
      try {
        const response = await axios.post("/api/dashboardTransaction", {
          deskripsi: deskripsi,
          hargaProduk: Number(harga),
          ongkosKirim: Number(ongkosKirim),
          biayaAdmin: Number(biayaAdmin),
          totalHarga: Number(totalHarga),
          jenisBarang: jenisBarang,
          status: "Penjual Belum Masuk Ke Transaksi Ini",
          buyerId: buyerId,
        });
  
        const data = response.data;
        setResponseData(data);
      } catch (error) {
        console.error("Error saat melakukan POST:", error);
      }
    } else if (sellerId) {
      try {
        const response = await axios.post("/api/dashboardTransaction", {
          deskripsi: deskripsi,
          hargaProduk: Number(harga),
          ongkosKirim: Number(ongkosKirim),
          biayaAdmin: Number(biayaAdmin),
          totalHarga: Number(totalHarga),
          jenisBarang: jenisBarang,
          status: "Pembeli Belum Masuk Ke Transaksi Ini",
          sellerId: sellerId,
        });
  
        const data = response.data;
        setResponseData(data);
      } catch (error) {
        console.error("Error saat melakukan POST:", error);
      }
    }
  
    // Setelah permintaan POST selesai, Anda dapat melakukan apa yang perlu Anda lakukan.
    setDeskripsi("");
    setHarga("");
    setOngkosKirim("");
    setBiayaAdmin("");
    setTotalHarga("");
    setJenisBarang("");
    setStep2(false);
    setStep1(false);
    setStep3(false);
    setStep4(true);
  };

  console.log("Data : ",responseData)

  const goToStep3 = () => {
    setStep2(false);
    setStep1(false);
    setStep3(true);
    setStep4(false);
  };

  const selesai = () => {
    setStep2(false);
    setStep1(false);
    setStep3(false);
    setStep4(false);
    router.push("/user/MyTransaction");
  };

  return (
    <form className="px-[3.75rem] py-5 w-full" onSubmit={goToStep4}>
      {isLoading &&
      <Loading />
      }
      <p className="py-5 font-semibold text-2xl text-gray-700 cursor-default">
        Buat Transaksi
      </p>
      <div className="w-full flex justify-center py-5">
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-info">Keterangan User</li>
          <li className={step2 || step3 || step4 ? "step step-info" : "step"}>
            Jenis Barang
          </li>
          <li className={step3 || step4 ? "step step-info" : "step"}>
            Detail Barang
          </li>
          <li className={step4 ? "step step-info" : "step"}>Mengundang</li>
        </ul>
      </div>
      {step1 && (
        <div className="w-full flex flex-col">
          <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))] text-center py-10">
            Saya Adalah
          </p>
          <div className="flex justify-center items-center py-10 gap-10">
            <div className="form-control border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] rounded-xl">
              <label className="cursor-pointer label  flex gap-4 px-4 py-8">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info rounded-full"
                  checked={checkBox1}
                  onChange={handleCheckBox1Change}
                />
                <svg
                  className="w-14 h-14 text-gray-800 dark:text-[hsl(var(--in)/var(--tw-bg-opacity))]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
                  />
                </svg>
                <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))]">
                  Pembeli
                </p>
              </label>
            </div>
            <div className="form-control border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] rounded-xl">
              <label className="cursor-pointer label  flex gap-4 px-4 py-8">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info rounded-full"
                  checked={checkBox2}
                  onChange={handleCheckBox2Change}
                />
                <svg
                  className="w-14 h-14 text-gray-800 dark:text-[hsl(var(--in)/var(--tw-bg-opacity))]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  fill="none"
                  viewBox="0 0 21 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.308 9a2.257 2.257 0 0 0 2.25-2.264 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 1 0 4.5 0C19.058 5.471 16.956 1 16.956 1H3.045S1.058 5.654 1.058 6.736A2.373 2.373 0 0 0 3.308 9Zm0 0a2.243 2.243 0 0 0 1.866-1h.767a2.242 2.242 0 0 0 3.733 0h.767a2.242 2.242 0 0 0 3.733 0h.767a2.247 2.247 0 0 0 1.867 1A2.22 2.22 0 0 0 18 8.649V19H9v-7H5v7H2V8.524c.37.301.83.469 1.308.476ZM12 12h3v3h-3v-3Z"
                  />
                </svg>
                <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))]">
                  Penjual
                </p>
              </label>
            </div>
          </div>
          <button
            className="self-center border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] text-white bg-[hsl(var(--in)/var(--tw-bg-opacity))] font-bold text-lg px-16 py-2 rounded-full my-10 hover:text-[hsl(var(--in)/var(--tw-bg-opacity))] hover:bg-white transition-colors"
            onClick={goToStep2}
          >
            Selanjutnya
          </button>
        </div>
      )}
      {step2 && (
        <div className="w-full flex flex-col">
          <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))] text-center py-10">
            Jenis Barang
          </p>
          <div className="flex justify-center items-center py-10 gap-10">
            <div className="form-control border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] rounded-xl">
              <label className="cursor-pointer label  flex gap-4 px-4 py-8">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info rounded-full"
                  checked={checkBox3}
                  onChange={handleCheckBox3Change}
                />
                <svg
                  className="w-14 h-14 text-gray-800 dark:text-[hsl(var(--in)/var(--tw-bg-opacity))]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 10a28.076 28.076 0 0 1-1.091 9M6.231 2.37a8.994 8.994 0 0 1 12.88 3.73M1.958 13S2 12.577 2 10a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088c.281.706.426 1.46.425 2.22a30 30 0 0 1-.464 6.231M5 10a6 6 0 0 1 9.352-4.974M3 19a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M6.5 17.336C8 15.092 8 12.846 8 10a3 3 0 1 1 6 0c0 .75 0 1.521-.031 2.311M11 10.001c0 3 0 6-2 9"
                  />
                </svg>
                <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))]">
                  Fisik
                </p>
              </label>
            </div>
            <div className="form-control border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] rounded-xl">
              <label className="cursor-pointer label  flex gap-4 px-4 py-8">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info rounded-full"
                  checked={checkBox4}
                  onChange={handleCheckBox4Change}
                />
                <svg
                  className="w-14 h-14 text-gray-800 dark:text-[hsl(var(--in)/var(--tw-bg-opacity))]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  />
                </svg>
                <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))]">
                  Digital
                </p>
              </label>
            </div>
          </div>
          <div className="flex justify-around">
            <button
              className="self-center border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] bg-white text-[hsl(var(--in)/var(--tw-bg-opacity))] font-bold text-lg px-16 py-2 rounded-full my-10 hover:text-[hsl(var(--in)/var(--tw-bg-opacity))] hover:bg-white transition-colors"
              onClick={goToStep1}
            >
              Kembali
            </button>
            <button
              className="self-center border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] text-white bg-[hsl(var(--in)/var(--tw-bg-opacity))] font-bold text-lg px-16 py-2 rounded-full my-10 hover:text-[hsl(var(--in)/var(--tw-bg-opacity))] hover:bg-white transition-colors"
              onClick={goToStep3}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
      {step3 && (
        <div className="w-full flex flex-col">
          <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))] text-center py-5">
            Detail Barang
          </p>
          <div className="flex justify-center items-center py-5 gap-10">
            <div className="form-control border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] rounded-xl px-10 py-5 flex flex-col gap-5">
              <input
                type="text"
                placeholder="Deskripsi"
                className="input input-bordered input-info w-[400px] max-w-full border-gray-300 hover:border-[var(--in)/var(--tw-bg-opacity))] w-"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
              <input
                type="number"
                placeholder="Harga Produk"
                className="input input-bordered input-info w-[400px] max-w-full border-gray-300 hover:border-[var(--in)/var(--tw-bg-opacity))] w-"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ongkos Kirim (0 jika tidak ada pengiriman)"
                className="input input-bordered input-info w-[400px] max-w-full border-gray-300 hover:border-[var(--in)/var(--tw-bg-opacity))] w-"
                value={ongkosKirim}
                onChange={(e) => setOngkosKirim(e.target.value)}
              />
              <input
                type="text"
                placeholder="Biaya Admin"
                className="input input-bordered input-info w-[400px] max-w-full border-gray-300 hover:border-[var(--in)/var(--tw-bg-opacity))] w-"
                value={biayaAdmin}
                onChange={(e) => setBiayaAdmin(e.target.value)}
                readOnly
              />
              <input
                type="text"
                placeholder="Total Harga"
                className="input input-bordered input-info w-[400px] max-w-full border-gray-300 hover:border-[var(--in)/var(--tw-bg-opacity))] w-"
                value={totalHarga}
                onChange={(e) => setTotalHarga(e.target.value)}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-around">
            <button
              className="self-center border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] bg-white text-[hsl(var(--in)/var(--tw-bg-opacity))] font-bold text-lg px-16 py-2 rounded-full my-10 hover:text-[hsl(var(--in)/var(--tw-bg-opacity))] hover:bg-white transition-colors"
              onClick={goToStep2}
            >
              Kembali
            </button>
            <button
              className="self-center border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] text-white bg-[hsl(var(--in)/var(--tw-bg-opacity))] font-bold text-lg px-16 py-2 rounded-full my-10 hover:text-[hsl(var(--in)/var(--tw-bg-opacity))] hover:bg-white transition-colors"
              type="submit"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
      {step4 && (
        <div className="w-full flex flex-col">
          <p className="font-extrabold text-2xl text-[hsl(var(--in)/var(--tw-bg-opacity))] text-center py-5">
            Ajak Temanmu untuk masuk transaksi dengan memasukkan kode ini di
            dashboard
          </p>
          <div className="flex justify-center items-center py-5 gap-10">
            <div className="border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] px-10 py-2 rounded-full">
              <p>{responseData?.Link}</p>
            </div>
          </div>
          <div className="flex justify-around">
            <button
              className="self-center border-2 border-[hsl(var(--in)/var(--tw-bg-opacity))] text-white bg-[hsl(var(--in)/var(--tw-bg-opacity))] font-bold text-lg px-16 py-2 rounded-full my-10 hover:text-[hsl(var(--in)/var(--tw-bg-opacity))] hover:bg-white transition-colors"
              onClick={selesai}
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateTransaction;
