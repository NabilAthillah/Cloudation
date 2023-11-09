import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import BackToLogin from "@/app/Component/Dashboard/BackToLogin";
import MainDashboard from "@/app/Component/Dashboard/MainDashboard";
import MyTransactionDashboard from "@/app/Component/Dashboard/MyTransactionDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    return (
      <main className="bg-[#F8F7FA] flex">
        <MyTransactionDashboard />
      </main>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-10">
        <p className="font-extrabold text-3xl text-gray-500">
          Anda Harus Login Terlebih Dahulu
        </p>
        <BackToLogin />
      </div>
    );
  }
}
