const InvitationModal = ({ closeInvitation, transaction }:{closeInvitation:any, transaction:any}) => {
  return (
    <div className="w-screen h-screen fixed flex justify-center items-center z-[9999] bg-black bg-opacity-10 backdrop-blur-[2px] top-0 bottom-0 left-0 right-0 m-[auto]">
      <div className="h-[250px] min-w-[500px] bg-white shadow-2xl rounded-xl p-5 flex flex-col items-center justify-around">
        <div className="flex flex-col justify-center items-center gap-2">
        <p className="font-bold text-2xl text-[#1988db]">Kode Undangan</p>
        <p className="font-light text-sm px-4">Berikan kode undangan dibawah ini dan berikan kepada orang yang ingin bertransaksi dengan anda !</p>
        </div>
        <div className="border-2 border-[#1988db] px-5 py-2 rounded-lg w-full">
              <p>{transaction.Link}</p>
        </div>
        <button className="border-2 border-[#1988db] py-2 px-10 rounded-xl font-semibold text-lg text-[#1988db] hover:bg-[#1988db] hover:text-white transition-colors duration-75" onClick={closeInvitation}>Tutup</button>
      </div>
    </div>
  );
};

export default InvitationModal;
