export default function ThirdHero(){
return(
<div id="HomeThirdHero" className="carousel w-full">
    <div id="slide1" className="carousel-item relative w-full flex justify-center min-h-[25rem] items-center">
        <div className="flex flex-col items-center w-3/5 flex-wrap text-center gap-4">
            <p className="text-black text-3xl font-medium">Clodudation ini layanan apa? <strong className="text-[#1988db]">Keamanan Transaksi</strong></p>
            <p className="text-xl">Cloudation merupakan salah satu layanan keamanan transaksi namun memiliki fitur yang lebih canggih yang mempermudah dalam memantau selama proses transaksi</p>
        </div>
        <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-1 gap-8">
            <a href="#slide4" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❮</a>
            <a href="#slide2" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❯</a>
        </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full flex justify-center min-h-[25rem] items-center">
        <div className="flex flex-col items-center w-3/5 flex-wrap text-center gap-4">
            <p className="text-black text-3xl font-medium">Kapan saya bisa menggunakan Cloudation? <strong className="text-[#1988db]">Setiap Hari</strong></p>
            <p className="text-xl">Tim Cloudation siap membantu kamu kapan saja, selama kamu membutuhkan keamanan dalam bertransaksi</p>
        </div>
        <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-1 gap-8">
            <a href="#slide1" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❮</a>
            <a href="#slide3" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❯</a>
        </div>
    </div>
    <div id="slide3" className="carousel-item relative w-full flex justify-center min-h-[25rem] items-center">
        <div className="flex flex-col items-center w-3/5 flex-wrap text-center gap-4">
            <p className="text-black text-3xl font-medium">Bagaimana cara menggunakan Cloudation? <strong className="text-[#1988db]">Mudah!</strong></p>
            <p className="text-xl">Cloudation dirancang dengan fitur yang memupuni namun mudah dipahami dan digunakan dengan hanya beberapa langkah, kamu berhasil menghindari penipuan.</p>
        </div>
        <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-1 gap-8">
            <a href="#slide2" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❮</a>
            <a href="#slide4" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❯</a>
        </div>
    </div>
    <div id="slide4" className="carousel-item relative w-full flex justify-center min-h-[25rem] items-center">
        <div className="flex flex-col items-center w-3/5 flex-wrap text-center gap-4">
            <p className="text-black text-3xl font-medium">Apakah Cloudation aman? <strong className="text-[#1988db]">Tentu</strong></p>
            <p className="text-xl">Cloudation berkomitmen untuk menjaga segala bentuk keamanan dan rahasia dan bertanggung jawab jika ada kesalahan yang terjadi.</p>
        </div>
        <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-1 gap-8">
            <a href="#slide3" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❮</a>
            <a href="#slide1" className="btn btn-circle bg-transparent border-none hover:bg-transparent hover:border-none">❯</a>
        </div>
    </div>
</div>
)
}