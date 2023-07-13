import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <>
      <Topbar />
      <main className="content">
            <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
