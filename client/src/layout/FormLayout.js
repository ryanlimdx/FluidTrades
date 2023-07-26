import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const AppContentWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "75vh",
  width: "100%",
  margin: "20px"
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