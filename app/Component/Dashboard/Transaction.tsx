"use client";

import { useEffect, useState } from "react";
import InvitationModal from "./InvitationModal";
import PaymentModal from "./PaymentModal";
import Image from "next/image";
import ShippingModal from "./ShippingModal";
import axios from "axios";
import Loading from "../Loading";

const Transaction = ({ transaction, session }: { transaction: any, session:any }) => {
  const [details, showDetails] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const [payment, setPayment] = useState(false);
  const [shipping, setShipping] = useState(false);

  function openInvitation(){
    setInvitation(true);
  }

  function closeInvitation(){
    setInvitation(false);
  }

  function openPayment(){
    setPayment(true);
  }

  function closePayment(){
    setPayment(false);
  }

  function openShipping(){
    setShipping(true);
  }

  function closeShipping(){
    setShipping(false);
  }

  function openDetails() {
    showDetails(true);
  }

  function closeDetails() {
    showDetails(false);
  }

  const acceptOrder = async() => {
    await axios.post('/api/acceptOrder', {
      id: transaction.id,
      status: "Menunggu Penjual Menerima Uang"
    })

    setIsLoading(true);
    window.location.reload();
  }

  const completeOrder = async() => {
    await axios.post('/api/acceptOrder', {
      id: transaction.id,
      status: "Selesai"
    })
    setIsLoading(true);
    window.location.reload();
  }

  const [progressValue, setProgressValue] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonInvitationVisible, setButtonInvitationVisible] = useState(false);
  const [buttonPayVisible, setButtonPayVisible] = useState(false);
  const [buttonShippingVisible, setButtonShippingVisible] = useState(false);
  const [buttonAcceptVisible, setButtonAcceptVisible] = useState(false);
  const [buttonDoneVisible, setButtonDoneVisible] = useState(false);

    useEffect(() => {
      if (
        !transaction.seller || !transaction.buyer
      ) {
        setProgressValue("17");
        setButtonText("Undang Rekan Transaksi Anda")
        setButtonInvitationVisible(true);
        setButtonPayVisible(false);
        setButtonShippingVisible(false);
        setButtonAcceptVisible(false);
        setButtonDoneVisible(false);
      } else if (transaction.seller && transaction.buyer && !transaction.buktiPembayaran) {
        setProgressValue("34");
        if(session?.user.id === transaction.buyer.id){
          setButtonPayVisible(true);
        }else {
          setButtonPayVisible(false);
        }
        setButtonText("Tambahkan Bukti Pembayaran")
        setButtonInvitationVisible(false);
        setButtonShippingVisible(false);
        setButtonAcceptVisible(false);
        setButtonDoneVisible(false);
      } else if (transaction.buktiPembayaran && !transaction.buktiPengiriman) {
        setProgressValue("51");
        setButtonText("Tambahkan Bukti Pengiriman")
        setButtonInvitationVisible(false);
        setButtonPayVisible(false);
        if(session?.user.id === transaction.seller.id){
          setButtonShippingVisible(true);
        }else {
          setButtonShippingVisible(false);
        }
        setButtonAcceptVisible(false);
        setButtonDoneVisible(false);
      } else if (transaction.buktiPengiriman && transaction.status !== "Menunggu Penjual Menerima Uang" && transaction.status !== "Selesai") {
        setProgressValue("68");
        setButtonText("Pesanan Diterima")
        if(session?.user.id === transaction.buyer.id){
          setButtonAcceptVisible(true);
        }else {
          setButtonAcceptVisible(false);
        }
        setButtonInvitationVisible(false);
        setButtonPayVisible(false);
        setButtonShippingVisible(false);
        setButtonDoneVisible(false);
      } else if (transaction.status !== "Dikirim dan Menunggu Konfirmasi dari Pembeli" && transaction.status === "Menunggu Penjual Menerima Uang" && transaction.status !== "Selesai") {
        setProgressValue("85");
        setButtonText("Dana Diterima")
        setButtonInvitationVisible(false);
        setButtonPayVisible(false);
        setButtonShippingVisible(false);
        setButtonAcceptVisible(false);
        if(session?.user.id === transaction.seller.id){
          setButtonDoneVisible(true);
        }else {
          setButtonDoneVisible(false);
        }
      } else if (transaction.status === "Selesai") {
        setProgressValue("100");
        setButtonInvitationVisible(false);
        setButtonPayVisible(false);
        setButtonShippingVisible(false);
        setButtonAcceptVisible(false);
        setButtonDoneVisible(false);
      }      
    }, [setProgressValue])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);


  return (
    <div className="border-2 border-gray-100 shadow-md bg-white px-5 py-5 w-full flex flex-col gap-5">
      {isLoading &&
      <Loading />
      }
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="font-light text-sm text-gray-400 cursor-default">
            {transaction.deskripsi}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-light text-sm text-gray-400 cursor-default">
            {transaction.totalHarga}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between">
          <p className="font-light text-sm text-gray-400 cursor-default">
            {`${transaction.createdAt.toLocaleString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} jam ${transaction.createdAt.toLocaleString("id-ID", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}`}
          </p>

          <p className="font-light text-sm text-gray-400 cursor-default">
            {transaction.status}
          </p>
        </div>
        <progress
          className="progress progress-info w-full"
          value={progressValue}
          max="100"
        ></progress>
        {buttonInvitationVisible && 
        <button className="border-2 border-[#1988db] w-fit self-center px-10 py-1 rounded-full text-[#1988db] hover:text-white hover:bg-[#1988db] transition-colors" onClick={openInvitation}>{buttonText}</button>
        }
        {buttonPayVisible && 
        <button className="border-2 border-[#1988db] w-fit self-center px-10 py-1 rounded-full text-[#1988db] hover:text-white hover:bg-[#1988db] transition-colors" onClick={openPayment}>{buttonText}</button>
        }
        {buttonShippingVisible && 
        <button className="border-2 border-[#1988db] w-fit self-center px-10 py-1 rounded-full text-[#1988db] hover:text-white hover:bg-[#1988db] transition-colors" onClick={openShipping}>{buttonText}</button>
        }
        {buttonAcceptVisible && 
        <button className="border-2 border-[#1988db] w-fit self-center px-10 py-1 rounded-full text-[#1988db] hover:text-white hover:bg-[#1988db] transition-colors" onClick={acceptOrder}>{buttonText}</button>
        }
        {buttonDoneVisible && 
        <button className="border-2 border-[#1988db] w-fit self-center px-10 py-1 rounded-full text-[#1988db] hover:text-white hover:bg-[#1988db] transition-colors" onClick={completeOrder}>{buttonText}</button>
        }
      </div>
      {details && (
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg text-[#1988db]">Detail Transaksi</p>
          <div className="flex gap-5">
            <div className=" font-light text-sm text-gray-500 cursor-default">
              <p>Nama Penjual</p>
              <p>Nama Pembeli</p>
              <p>Jenis Produk</p>
              <p>Harga Produk</p>
              <p>Ongkos Kirim</p>
              <p>Biaya Admin</p>
              <p>Total Harga</p>
              <p>Bukti Pembayaran</p>
              <p>Bukti Pengiriman</p>
            </div>
            <div className=" font-light text-sm text-gray-500 cursor-default">
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div className=" font-light text-sm text-gray-500 cursor-default">
              <p>
                {transaction.seller
                  ? transaction.seller.namaDepan +
                    transaction.seller.namaBelakang
                  : `-`}
              </p>
              <p>
                {transaction.buyer
                  ? transaction.buyer.namaDepan + transaction.buyer.namaBelakang
                  : `-`}
              </p>
              <p>{transaction.jenisBarang}</p>
              <p>{transaction.hargaProduk}</p>
              <p>{transaction.ongkosKirim}</p>
              <p>{transaction.biayaAdmin}</p>
              <p>{transaction.totalHarga}</p>
              <p>
                <a href={transaction.buktiPembayaran ? transaction.buktiPembayaran : ""} className={transaction.buktiPembayaran ? "cursor-pointer hover:text-[#1988db]" : "cursor-default"}  target="_blank">{transaction.buktiPembayaran ? "Lihat Disini" : "Belum Ada Bukti Pembayaran"}</a>
              </p>
              <p>
                <a href={transaction.buktiPengiriman ? transaction.buktiPengiriman : ""} className={transaction.buktiPengiriman ? "cursor-pointer hover:text-[#1988db]" : "cursor-default"}  target="_blank">{transaction.buktiPengiriman ? "Lihat Disini" : "Belum Ada Bukti Pengiriman"}</a>
              </p>
            </div>
          </div>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-300 self-center hover:text-gray-500 cursor-pointer duration-75"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
            id="arrowUp"
            onClick={closeDetails}
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
            />
          </svg>
        </div>
      )}
      {!details && (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-300 self-center hover:text-gray-500 cursor-pointer duration-75"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
          id="arrowDown"
          onClick={openDetails}
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          />
        </svg>
      )}
      {invitation && 
      <InvitationModal transaction={transaction} closeInvitation={closeInvitation} />
      }
      {payment &&
      <PaymentModal transaction={transaction} closePayment={closePayment}/>
      }
      {shipping &&
      <ShippingModal transaction={transaction} closeShipping={closeShipping}/>
      }
    </div>
  );
};

export default Transaction;
