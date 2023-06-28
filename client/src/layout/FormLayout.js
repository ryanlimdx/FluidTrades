import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const AppContentWrapper = styled(Box)({
  // flex: 1,
  // alignContent: "flex-start",
  // justifyContent: "center",
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
