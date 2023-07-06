import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../state";
import {
  Stack,
  Heading,
  Button,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const StockDetails = () => {
  const initialValues = {
    sector: "",
    equity: "",
    ticker: "",
    currency: ""
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
      navigate("/updateAssets/stock/dividends");
    }
    
  };

  return (
    <Flex>
        <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Tell us more about the company</Heading>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Sector</FormLabel>
                    <Input
                      name="sector"
                      type="text"
                      placeholder="Technology"
                      required={true}
                    />
                  </FormControl>
                </Field>

                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Equity</FormLabel>
                    <Input
                      name="equity"
                      type="text"
                      placeholder="Apple"
                      required={true}
                    />
                  </FormControl>
                </Field>

                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Ticker</FormLabel>
                    <Input
                      name="ticker"
                      type="text"
                      placeholder="AAPL"
                      required={true}
                    />
                  </FormControl>
                </Field>

                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Currency</FormLabel>
                    <Input
                      name="currency"
                      type="text"
                      placeholder="USD"
                      required={true}
                    />
                  </FormControl>
                </Field>

                <Button
                  isLoading={isSubmitting}
                  loadingText="Hang on while we fight the demons."
                  size="lg"
                  colorScheme="teal"
                  type="submit"
                >
                  Next
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
      
  );
};

export default StockDetails;
