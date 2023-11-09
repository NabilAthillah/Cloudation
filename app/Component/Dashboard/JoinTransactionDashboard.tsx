import JoinTransaction from "./JoinTransaction";
import MyTransaction from "./MyTransaction";
import Sidebar from "./SidebarJT";

const MyTransactionDashboard = () => {
  return (
    <main className="w-full flex">
      <Sidebar />
      <JoinTransaction />
    </main>
  );
};

export default MyTransactionDashboard;
