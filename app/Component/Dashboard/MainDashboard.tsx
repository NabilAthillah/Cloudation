import JoinTransaction from "./JoinTransaction";
import Sidebar from "./SidebarMT";

const MainDashboard = () => {
  return (
    <main className="w-full flex">
      <Sidebar />
      {/* <MyTransaction /> */}
      <JoinTransaction />
    </main>
  );
};

export default MainDashboard;
