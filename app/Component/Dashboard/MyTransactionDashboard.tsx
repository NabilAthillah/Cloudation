import MyTransaction from "./MyTransaction";
import Sidebar from "./SidebarMT";

const MyTransactionDashboard = () => {
  return (
    <main className="w-full flex">
      <Sidebar />
      <MyTransaction />
    </main>
  );
};

export default MyTransactionDashboard;
