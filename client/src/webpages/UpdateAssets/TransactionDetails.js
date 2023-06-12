import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../../state";
import {
  Stack,
  Heading,
  Text,
  Center,
  Button,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Radio,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const UpdateAssets = () => {
  const initialValues = {
    sector: "",
    equity: "",
    ticker: "",
    currency: "",
    transactionType: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    console.log(state.transactionType);
    if (initialValues.transactionType === "Buy") { // testing alternative methods to retrieve form data
      navigate("/UpdateAssets/OpeningPosition");
    } else if (state.transactionType === "Sell") {
      navigate("/UpdateAssets/ClosingPosition");
    } else {
      navigate("/UpdateAssets/Dividends");
    }
  };

  return (
    <Flex>
        <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Track your equities</Heading>
        <Text fontSize="lg">
          This form is for the tracking of transactions related to equities, and
          may include of Cryptocurrency. The form is to be filled out in TITLE
          CASE.
        </Text>

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

                <FormControl as="fieldset">
                  <FormLabel> Transaction type </FormLabel>
                  <RadioGroup name="transactionType">
                    <HStack spacing="24px">
                      <Radio value="Buy" onChange= {() => setFieldValue("transactionType", "Buy")}>Buy</Radio>
                      <Radio value="Sell" onChange= {() => setFieldValue("transactionType", "Sell")}>Sell</Radio>
                      <Radio value="Dividends" onChange= {() => setFieldValue("transactionType", "Dividends")}>Dividends</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText>Select the transaction type.</FormHelperText>
                </FormControl>

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

export default UpdateAssets;
