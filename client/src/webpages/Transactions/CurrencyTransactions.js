import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const CurrencyTransactions = ({margin=undefined, height=undefined}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, getData] = useState([]);

  useEffect(() => {
    axios
      .get("/currencytransactions")
      .then((response) => {
        console.log(response);
        getData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "date", headerName: "DATE", flex: 1 },
    { field: "transactionType", headerName: "TRANSACTION", flex: 1 },
    { field: "sellCurrency", headerName: "FROM", flex: 1 },
    {
      field: "sellAmount",
      headerName: "AMOUNT",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <Typography>{params.row.sellAmount.toFixed(2)}</Typography>,
    },
    { 
      field: "buyCurrency", 
      headerName: "TO", 
      flex: 1,
      renderCell: (params) => 
        <Typography> 
          {
            params.row.buyCurrency
              ? params.row.buyCurrency
              : params.row.sellCurrency
          }
        </Typography>
    },
    {
      field: "buyAmount",
      headerName: "AMOUNT",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => 
        <Typography> 
          {
            params.row.buyAmount 
              ? params.row.buyAmount.toFixed(2)
              : params.row.sellAmount.toFixed(2)
          }
        </Typography>
    },
    {
      field: "commissions",
      headerName: "COMMISSIONS",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => 
      <Typography> 
        ${
          params.row.commissions 
            ? params.row.commissions.toFixed(2)
            : 0.00
        }
      </Typography>
    },
    {
      field: "exchangeRate",
      headerName: "EXCHANGE RATE",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => 
        <Typography> 
          {
            params.row.exchangeRate
              ? params.row.exchangeRate.toFixed(2)
              : 1
          }
        </Typography>
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
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
      </Box>
  );
};

export default CurrencyTransactions;
