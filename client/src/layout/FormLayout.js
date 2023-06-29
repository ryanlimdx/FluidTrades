import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const AppContentWrapper = styled(Box)({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  backgroundColor: "white",
});

const FormLayout = () => {
  return (
    <>
      <AppContentWrapper>
        <Outlet />
      </AppContentWrapper>
    </>
  );
};

export default FormLayout;
