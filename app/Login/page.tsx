import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import HaveSession from "../Component/HaveSession";
import LoginSection from "../Component/Login/LoginSection";

const LoginPage = async () => {
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
        <LoginSection />
      </main>
    );
  }
};

export default LoginPage;
