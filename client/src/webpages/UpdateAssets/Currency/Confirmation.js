import { Stack, Heading, Button, Center } from "@chakra-ui/react";
import { useAppState } from "../../../context/state";
import axios from "../../../api/axios";
import { Form, Formik } from "formik";
import { SectionRow } from "../../../components/forms/Section";
import { useNavigate } from "react-router-dom";

const CurrencyConfirmation = () => {
  const [state] = useAppState();
  const navigate = useNavigate();

  const exchangeRate = state.amount / state.baseAmount

  const initialValues = {
    transactionType: state.transactionType,
    sellCurrency: state.baseCurrency.toUpperCase(),
    sellAmount: state.baseAmount,
    buyCurrency: state.currency.toUpperCase(),
    buyAmount: state.amount,
    fees: state.fees,
    exchangeRate: exchangeRate
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(values);
      // Make POST request
      await axios
        .post("/updateAssets/currency/confirmation", values, config)
        .then(() => navigate("/"));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error!");
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
    }
  };

  return (
    <Center>
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">
          Woohoo! Now, confirm your
          {state.transactionType === "Deposit" && " deposit "}
          {state.transactionType === "Withdraw" && " withdrawal "}
          {state.transactionType === "Convert" && " conversion "}
          details!
        </Heading>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <Stack>
                <SectionRow>
                  <div>
                    Currency
                    {state.transactionType === "Deposit" && " deposited"}
                    {state.transactionType === "Withdraw" && " withdrawn"}
                    {state.transactionType === "Convert" && " converted from"}
                  </div>
                  <div>{state.baseCurrency}</div>
                </SectionRow>

                <SectionRow>
                  <div>Amount</div>
                  <div>{state.baseAmount}</div>
                </SectionRow>

                {state.transactionType === "Convert" && (
                  <Stack>
                    <SectionRow>
                      <div>Converted to</div>
                      <div>{state.currency}</div>
                    </SectionRow>

                    <SectionRow>
                      <div>Amount received</div>
                      <div>{state.amount}</div>
                    </SectionRow>

                    <SectionRow>
                      <div>
                        {state.baseCurrency}
                        {state.currency}
                      </div>
                      <div>
                        Exchange rate at conversion:{" "}
                        {state.amount / state.baseAmount}
                      </div>
                    </SectionRow>
                  </Stack>
                )}

                <SectionRow>
                  <div>Fees</div>
                  <div>{state.fees}</div>
                </SectionRow>

                <Button
                  isLoading={isSubmitting}
                  loadingText="Hang on while we fight the demons."
                  size="lg"
                  colorScheme="teal"
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Center>
  );
};

export default CurrencyConfirmation;
