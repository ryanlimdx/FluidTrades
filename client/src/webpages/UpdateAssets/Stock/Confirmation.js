import { useAppState } from "../../../context/state";
import axios from "../../../api/axios";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

const StockConfirmation = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();
  const initialValues = {
    transactionType: state.transactionType,
    sector: state.sector,
    security: state.security,
    ticker: state.ticker.toUpperCase(),
    currency: state.currency,

    price: state.price,
    quantity: state.quantity,
    commissions: state.commissions ? state.commissions : 0.00,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(values);
      // Make POST request
      await axios
        .post("/update-assets/stock/confirmation", values, config)
        .then(() => alert("Data successfully sent to database. (◕‿◕)"))
        .then(() => navigate("/"));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    } finally {
      setSubmitting = false;
      setState({});
    }
  };

  return (
    <Box>
      <Typography variant="h1">
        Woohoo! Now, confirm your transaction!
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>
            <Stack>
              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Transaction Type:{" "}
                </Box>
                {state.transactionType}
              </Typography>

              <Typography variant="h3" marginTop={1}> Stock Details </Typography>

              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Sector:{" "}
                </Box>
                {state.sector}
              </Typography>

              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  security:{" "}
                </Box>
                {state.security}
              </Typography>

              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Ticker:{" "}
                </Box>
                {state.ticker}
              </Typography>

              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Currency:{" "}
                </Box>
                {state.currency}
              </Typography>

              <Typography variant="h3" marginTop={1}> Position Details </Typography>
              
              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Price:{" "}
                </Box>
                {state.price}
              </Typography>

              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Quantity:{" "}
                </Box>
                {state.quantity}
              </Typography>

              <Typography component="div" marginTop={1} variant="h5">
                <Box component="span" fontWeight="bold">
                  Commissions:{" "}
                </Box>
                {state.commissions ? state.commissions : 0.00}
              </Typography>

              <Button
                size="large"
                variant="contained"
                type="submit"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default StockConfirmation;