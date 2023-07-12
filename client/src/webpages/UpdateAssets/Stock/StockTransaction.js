import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import {
  Stack,
  Heading,
  Button,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const StockTransaction = () => {
  const initialValues = {
    transactionType: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/updateAssets/stock/details");
  };

  return (
    <Flex>
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">
          Hmm, what type of transaction did you do today?
        </Heading>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel> Transaction type </FormLabel>
                    <RadioGroup name="transactionType">
                      <HStack spacing="24px">
                        <Radio
                          name="transactionType"
                          value="Buy"
                          onChange={() =>
                            setFieldValue("transactionType", "Buy")
                          }
                        >
                          Buy
                        </Radio>
                        <Radio
                          name="transactionType"
                          value="Sell"
                          onChange={() =>
                            setFieldValue("transactionType", "Sell")
                          }
                        >
                          Sell
                        </Radio>
                        <Radio
                          name="transactionType"
                          value="Dividends"
                          onChange={() =>
                            setFieldValue("transactionType", "Dividends")
                          }
                        >
                          Dividends
                        </Radio>
                      </HStack>
                    </RadioGroup>
                    <FormHelperText>
                      Select the transaction type.
                    </FormHelperText>
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

export default StockTransaction;
