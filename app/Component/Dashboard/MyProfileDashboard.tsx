import MyProfile from "./MyProfile";
import Sidebar from "./SidebarMP";

const MyProfileDashboard = () => {
  return (
    <main className="w-full flex">
      <Sidebar />
      <MyProfile />
    </main>
  );
};

export default MyProfileDashboard;
