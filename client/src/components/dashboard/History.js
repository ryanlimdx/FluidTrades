import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  useTheme,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { themeSettings } from "../../theme";
import axios from "../../api/axios";

const History = () => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [data, getData] = useState([]);

  useEffect(() => {
    axios
      .get("/transactions/asset")
      .then((response) => {
        let data = response.data;
        data = data.slice(-5).reverse();
        data.forEach((element) => {
          const date = new Date(element.date);
          const d = date.getDate();
          const y = date.getFullYear();
          const m = date.getMonth();
          date.setMonth(m - 1);
          const month = date.toLocaleString("en-US", { month: "short" });
          element.date = d + " " + month + " " + y;
          element.paid = element.price * element.quantity + element.commissions;
          element.instrument = element.ticker + "." + element.currency;
        });
        getData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "date", flex: 1 },
    { field: "transactionType", flex: 1 },
    { field: "instrument", flex: 1 },
    {
      field: "price",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography>${params.row.price.toFixed(2)}</Typography>
      ),
    },
    {
      field: "quantity",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paid",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography>${params.row.paid.toFixed(2)}</Typography>
      ),
    },
  ];

  return (
    <Card
      sx={{
        width: "100%",
        height: "27vh",
        padding: "20px",
        backgroundColor: cardColors.background,
      }}
    >
      <CardContent sx={{ width: "100%", height: "100%" }}>
        <Typography sx={{ fontWeight: "bold" }} marginLeft="10px">
          HISTORY
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="20px"
          sx={{ width: "100%", height: "90%" }}
        >
          {data.length !== 0 ? (
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
              hideFooter
              sx={{
                height: "100%",
                width: "100%",
                border: 0,
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": { display: "none" },
              }}
            />
          ) : (
            <Typography>You currently have no assets</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default History;
