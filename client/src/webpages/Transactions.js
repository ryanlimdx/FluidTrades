import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const Transactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, getData] = useState("");
          
    useEffect(() => {
        axios
            .get("/transactions")
            .then((response) => {
                console.log(response);
                getData(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const columns = [
        { field: "date", headerName: "DATE", flex: 1},
        { field: "transactionType", headerName: "TRANSACTION", flex: 1 },
        { field: "sector", headerName: "SECTOR", flex: 1 },
        { field: "equity", headerName: "EQUITY", flex: 1 },
        { field: "ticker", headerName: "TICKER", flex: 1 },
        { field: "currency", headerName: "CURRENCY", flex: 1 },
        { 
            field: "price", 
            headerName: "PRICE", 
            type: "number", 
            headerAlign: "center", 
            align: "center",
            renderCell: (params) => (
                <Typography>
                    ${params.row.price}
                </Typography>
            )  
        },
        { field: "shares", headerName: "SHARES", type: "number", headerAlign: "center", align: "center" },
        { 
            field: "fees", 
            headerName: "FEES", 
            type: "number", 
            headerAlign: "center", 
            align: "center",
            renderCell: (params) => (
                <Typography>
                    ${params.row.fees}
                </Typography>
            ) 
         }
    ]

    return (
        <Box margin = "20px" >
            <Header title="TRANSACTIONS" subtitle="Stock"/>
            <Box 
                margin = "40px 0 0 0" 
                height = "75vh"
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
                <DataGrid 
                    rows = {data} 
                    columns = {columns}
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
    );
}

export default Transactions;