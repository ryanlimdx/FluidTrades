import { Stack, Heading, Button, Center } from "@chakra-ui/react";
import { useAppState } from "../../../context/state";
import axios from "../../../api/axios";
import { Form, Formik } from "formik";
import { Section, SectionRow } from "../../../components/forms/Section";
import { useNavigate } from "react-router-dom";

const StockConfirmation = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();
  const initialValues = {
    transactionType: state.transactionType,
    sector: state.sector,
    equity: state.equity,
    ticker: state.ticker.toUpperCase(),
    currency: state.currency,

    price: state.price,
    shares: state.shares,
    fees: state.fees,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(values);
      // Make POST request
      await axios
        .post("/updateAssets/stock/confirmation", values, config)
        .then(() => navigate("/"));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
    <Center>
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">
          Woohoo! Now, confirm your {state.transactionType} transaction!
        </Heading>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <Stack>
                <Section title="Stock Details" url="/updateAssets/Stock">
                  <SectionRow>
                    <div>Sector</div>
                    <div>{state.sector}</div>
                  </SectionRow>

                  <SectionRow>
                    <div>Equity</div>
                    <div>{state.equity}</div>
                  </SectionRow>

                  <SectionRow>
                    <div>Ticker</div>
                    <div>{state.ticker}</div>
                  </SectionRow>

                  <SectionRow>
                    <div>Currency</div>
                    <div>{state.currency}</div>
                  </SectionRow>
                </Section>

                <Section title="Position Details">
                  <SectionRow>
                    <div>Price</div>
                    <div>{state.price}</div>
                  </SectionRow>

                  <SectionRow>
                    <div>Shares</div>
                    <div>{state.shares}</div>
                  </SectionRow>

                  <SectionRow>
                    <div>Fees</div>
                    <div>{state.fees}</div>
                  </SectionRow>
                </Section>

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

export default StockConfirmation;
