import { useAppState } from "../../../context/state";
import axios from "../../../api/axios";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

const CurrencyConfirmation = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const exchangeRate = state.amount / state.baseAmount;
  
  let buyCurrency = state.currency;
  if (state.currency) {
    buyCurrency = state.currency.toUpperCase();
  }

  const initialValues = {
    transactionType: state.transactionType,
    sellCurrency: state.baseCurrency.toUpperCase(),
    sellAmount: state.baseAmount,
    buyCurrency: buyCurrency,
    buyAmount: state.amount,
    fees: state.fees,
    exchangeRate: exchangeRate,
  };

  const handleSubmit = async (values , {setSubmitting}) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(values);
      // Make POST request
      await axios
        .post("/update-assets/currency/confirmation", values, config)
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
        console.log("Error:", error.message);
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
        Woohoo! Now, confirm your
        {state.transactionType === "Deposit" && " deposit "}
        {state.transactionType === "Withdraw" && " withdrawal "}
        {state.transactionType === "Convert" && " conversion "}
        details!
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>
            <Typography component="div" marginTop={1} variant="h5">
              <Box component="span" fontWeight="bold">
                Currency
                {state.transactionType === "Deposit" && " deposited"}
                {state.transactionType === "Withdraw" && " withdrawn"}
                {state.transactionType === "Convert" && " converted from"}:{" "}
              </Box>
              {state.baseCurrency}
            </Typography>

            <Typography component="div" marginTop={1} variant="h5">
              <Box component="span" fontWeight="bold">
                Amount:{" "}
              </Box>
              {state.baseAmount}
            </Typography>

            {state.transactionType === "Convert" && (
              <Stack>
                <Typography component="div" marginTop={1} variant="h5">
                  <Box component="span" fontWeight="bold">
                    Converted to:{" "}
                  </Box>
                  {state.currency}
                </Typography>
                <Typography component="div" marginTop={1} variant="h5">
                  <Box component="span" fontWeight="bold">
                    Amount received:{" "}
                  </Box>
                  {state.amount}
                </Typography>

                <Typography fontWeight="bold" component="div" marginTop={1} variant="h5">
                  <div>
                    {state.baseCurrency}
                    {state.currency}
                  </div>
                  <Typography component="div" marginTop={1} variant="h5">
                    <Box component="span" fontWeight="bold">
                      Exchange rate at conversion:{" "}
                    </Box>
                    {state.amount / state.baseAmount}
                  </Typography>
                </Typography>
              </Stack>
            )}

            <Typography component="div" marginTop={1} variant="h5">
              <Box component="span" fontWeight="bold">
                Fees:{" "}
              </Box>
              {state.fees ? state.fees : 0.00}
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
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CurrencyConfirmation;
