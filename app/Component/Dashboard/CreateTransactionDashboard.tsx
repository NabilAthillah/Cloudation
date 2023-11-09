import CreateTransaction from "./CreateTransaction";
import Sidebar from "./SidebarCT";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const CreateTransactionDashboard = async() => {
  const session = await getServerSession(authOptions)

  return (
    <main className="w-full flex">
      <Sidebar />
      <CreateTransaction id={session?.user.id}/>
    </main>
  );
};

export default CreateTransactionDashboard;
