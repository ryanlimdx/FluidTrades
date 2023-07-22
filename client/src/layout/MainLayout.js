import { React } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="app">
      <Sidebar/>
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
