import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Stocks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, getData] = useState([]);

  useEffect(() => {
    axios
      .get("/stocks")
      .then((response) => {
        console.log(response);
        getData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "sector", headerName: "SECTOR", flex: 1 },
    { field: "equity", headerName: "EQUITY", flex: 1 },
    { field: "ticker", headerName: "TICKER", flex: 1 },
    { field: "currency", headerName: "CURRENCY", flex: 1 },
    // { // to show current price (real time/ delayed data)
    //   field: "price",
    //   headerName: "PRICE",
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => <Typography>${params.row.price.toFixed(2)}</Typography>,
    // },
    // { // to show breakeven price
    //   field: "price",
    //   headerName: "PRICE",
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => <Typography>${params.row.price.toFixed(2)}</Typography>,
    // },
    {
      field: "shares",
      headerName: "SHARES",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    {
      field: "investedCapital",
      headerName: "INVESTED CAPITAL",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1, 
      renderCell: (params) => 
      <Typography> 
        ${
          params.row.investedCapital 
            ? params.row.investedCapital.toFixed(2)
            : 0.00
        }
      </Typography>
    },
  ];

  return (
      <Box
        margin="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
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
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
      </Box>
  );
};

export default Stocks;
