import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Topbar from "../components/Topbar";
import { styled } from "@mui/system";

const AppContentWrapper = styled(Box)({
  flex: 1,
  justifyContent: "center",
  width: "100vw",
  backgroundColor: "white",
});

const MainLayout = () => {
  return (
    <>
      <Topbar />
      {/* Box that wraps the content below the nav bar */}
      <AppContentWrapper>
        <Outlet />
      </AppContentWrapper>
    </>
  );
};

export default MainLayout;
