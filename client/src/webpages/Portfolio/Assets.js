import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Assets = ({ margin = undefined, height = undefined }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [assets, getAssets] = useState([]);

  useEffect(() => {
    axios
      .get("/assets")
      .then((response) => {
        getAssets(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "sector", headerName: "SECTOR", flex: 1 },
    { field: "equity", headerName: "EQUITY", flex: 1 },
    { field: "ticker", headerName: "TICKER", flex: 1 },
    { field: "currency", headerName: "CURRENCY", flex: 1 },
    {
      // to show current price (real time/ delayed data)
      field: "currPrice",
      headerName: "PRICE",
      flex: 1,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography>
          {params.row.currPrice === "API limit exceeded"
            ? "API limit exceeded"
            : "$" + parseFloat(params.row.currPrice).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "shares",
      headerName: "POSITION",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      // to show breakeven price
      field: "breakevenPrice",
      headerName: "BREAKEVEN",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography>
          ${parseFloat(params.row.breakevenPrice).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "investedCapital",
      headerName: "INVESTED CAPITAL",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          $
          {params.row.investedCapital
            ? params.row.investedCapital.toFixed(2)
            : 0.0}
        </Typography>
      ),
    },
    {
      field: "returns",
      headerName: "RETURNS",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {params.row.returns === "API limit exceeded"
            ? "API limit exceeded"
            : "$" + parseFloat(params.row.returns).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "returnsPCT",
      headerName: "RETURNS (%)",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {params.row.returnsPCT === "API limit exceeded"
            ? "API limit exceeded"
            : parseFloat(params.row.returnsPCT).toFixed(2) + "%"}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      margin={margin}
      height={height}
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          // borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid rows={assets} columns={columns} getRowId={(row) => row._id} />
    </Box>
  );
};

export default Assets;
