import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import theme and data

const Transactions = () => {
    const columns = [
        { field: "date", headerName: "DATE", flex: 1, cellClassName: "date-column-cell"},
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
        <Box m = "20px" >
            {/* <Header></Header> */}
            <Box m = "40px 0 0 0" height = "75vh">
                <DataGrid 
                    // rows = {data} 
                    columns = {columns}
                />
                    
            </Box>
        </Box>
    )
}

export default Transactions;
