import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Currency = ({margin=undefined, height=undefined}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, getData] = useState([]);

  useEffect(() => {
    axios
      .get("portfolio/currencies")
      .then((response) => {
        console.log(response);
        getData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "currency", headerName: "CURRENCY", flex: 1 },
    {
      field: "balance",
      headerName: "BALANCE",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1, 
      renderCell: (params) => 
      <Typography> 
        ${
          params.row.balance 
            ? params.row.balance.toFixed(2)
            : 0.00
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
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} sx={{minHeight: "312px"}} />
      </Box>
  );
};

export default Currency;
