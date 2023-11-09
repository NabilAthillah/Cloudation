import Footer from "./Component/Footer";
import HomeSection from "./Component/Home/HomeSection";
import Navbar from "./Component/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white max-w-screen">
      <Navbar />
      <HomeSection />
      <Footer />
    </main>
  );
}
