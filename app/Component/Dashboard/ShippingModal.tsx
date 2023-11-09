"use client"

import axios from "axios";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import Loading from "../Loading";

const ShippingModal = ({
  closeShipping,
  transaction,
}: {
  closeShipping: any;
  transaction: any;
}) => {
  const [id, setId] = useState(transaction.id);
  const [images, setImages] = useState<File[]>([]);
  const [imageName, setImageName] = useState("")
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);
  
      const renamedFiles = _files.map((file, index) => {
        const originalFileName = file.name;
        const newFileName = `buktiPengiriman_${id}_${originalFileName}`;
        
        setImageName(newFileName)
        return new File([file], newFileName, { type: file.type });
      });
  
      setImages(renamedFiles);
    }
  };
  

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    images.forEach((image, i) => {
      formData.append(image.name, image)
    })
    await axios.post("/api/upload", formData);
        await axios.post('/api/buktiPengiriman', {
        id: id,
        buktiPengiriman: imageName,
      });

      closeShipping();
      window.location.reload();
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
  }

  console.log("Data : ",imageName)

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen fixed flex justify-center items-center z-[9999] bg-black bg-opacity-10 backdrop-blur-[2px] top-0 bottom-0 left-0 right-0 m-[auto]"
    >
      {isLoading &&
      <Loading />
      }
      <div className="min-h-[250px] min-w-[500px] bg-white shadow-2xl rounded-xl p-5 flex flex-col items-center justify-around gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-bold text-2xl text-[#1988db]">
            Bukti Pengiriman
          </p>
          <p className="font-light text-sm px-4">
            Kirim Barang Yang Telah Disetujui dan Unggah Buktinya Disini !
          </p>
          <p className="font-light text-xs px-4 text-red-600">Periksa Kembali Foto Anda Karena Foto Tersebut Tidak Dapat Diedit</p>
        </div>
        <div className="border-2 border-[#1988db] px-5 py-5 rounded-lg w-full flex">
        <input
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleFileChange}
          id="fileInput"
        />
        {images.map((image) => {
          const src = URL.createObjectURL(image );
          return (
            <Image key={image.name} src={src} alt="" width={200} height={100}/>
          )
        })}
        </div>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} id="idTransaksi" hidden />
        <div className="flex gap-5">
          <button
            className="border-2 border-[#1988db] py-2 px-10 rounded-xl font-semibold text-lg text-[#1988db] hover:bg-[#1988db] hover:text-white transition-colors duration-75"
            onClick={closeShipping}
          >
            Tutup
          </button>
          <button
            type="submit"
            className="border-2 border-[#1988db] py-2 px-10 rounded-xl font-semibold text-lg text-[#1988db] hover:bg-[#1988db] hover:text-white transition-colors duration-75"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShippingModal;
