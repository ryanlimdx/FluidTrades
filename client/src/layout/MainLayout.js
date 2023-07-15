import { React, useState} from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  
  return (
    
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSideBar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
