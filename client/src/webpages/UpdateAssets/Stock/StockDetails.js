import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

const StockDetails = () => {
  const initialValues = {
    sector: "",
    equity: "",
    ticker: "",
    currency: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    if (state.transactionType === "Buy") {
      navigate("/updateAssets/stock/openingPosition");
    } else if (state.transactionType === "Sell") {
      navigate("/updateAssets/stock/closingPosition");
    } else {
      // dividends is not in use anymore
      // navigate("/updateAssets/stock/dividends");
    }
  };

  return (
    <Box>
      <Typography variant="h1">Tell us more about the company!</Typography>

      <Formik onSubmit={saveData} initialValues={initialValues}>
        {({ setFieldValue }) => (
          <Form>
            <Stack margin={0}>
              <TextField
                label="Sector"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("sector", event.target.value)
                }
              />
              <TextField
                label="Equity"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("equity", event.target.value)
                }
              />
              <TextField
                label="Ticker"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("ticker", event.target.value)
                }
              />
              <TextField
                label="Currency"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("currency", event.target.value)
                }
              />

              <Button
                size="large"
                variant="contained"
                type="submit"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Next
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default StockDetails;
