import RegisterSection from "../Component/Register/RegisterSection";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import HaveSession from "../Component/HaveSession";

const RegisterPage = async() => {
  const session = await getServerSession(authOptions);

  if (session) {
    return(
    <main className="max-w-screen bg-white min-h-screen">
      <HaveSession />
    </main>
    )
  } else {
    return (
      <main className="max-w-screen bg-white min-h-screen">
        <RegisterSection />
      </main>
    );
  }
};

export default RegisterPage;
