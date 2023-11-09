export default function ForgotPasswordForm(){
    return(
        <form className="flex flex-col justify-center items-center border-2 border-transparent rounded-xl w-[30rem] py-14 bg-white z-50 shadow-2xl gap-10">
            <div className="w-80 px-10">
                <img src="/assets/images/Logo.png" alt="Logo" />
            </div>
            <div className="w-full px-7 flex flex-col gap-5">
                <p className="cursor-default px-4 flex text-center flex-wrap text-sm text-[#999999]">Masukkan email anda dan kami akan mengirimkan instruksi bagaimana caranya untuk membuat password baru</p>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="Email" className="font-semibold text-[#c1c1c1] pl-2">Email</label>
                    <input type="text" placeholder="Masukkan Email Anda" className="input input-bordered border-[#c1c1c1] w-full bg-transparent h-8 pl-2 rounded-md transition-all duration-300 focus:border-[#1988db] focus-within:border-[#1988db]" />
                </div>
                <div className="flex justify-start">
                    <div className="flex items-center justify-end">
                        <a href="/Login" className="text-[#1988db] text-[1rem] font-[500]">Kembali ke login</a>
                    </div>
                </div>
                <button type="submit" className="px-2 py-3 border-[#1988db] bg-[#1988db] text-white font-semibold rounded-full">SUBMIT</button>
            </div>
        </form>
    )
}