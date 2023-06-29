import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../../../state";
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
  Select
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const CurrencyTransaction = () => {
  const initialValues = {
    transactionType: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    next();
  };

  const next = () => {
    console.log(initialValues.transactionType);
    navigate("/updateAssets/currency/base");
  }

  return (
    <Flex>
        <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Hmm, what type of transaction did you do today?</Heading>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel> Transaction type </FormLabel>
                    <RadioGroup name="transactionType">
                      <HStack spacing="24px">
                        <Radio name="transactionType" value="deposit" onChange= {() => setFieldValue("transactionType", "Deposit")}>Deposit</Radio>
                        <Radio name="transactionType" value="withdraw" onChange= {() => setFieldValue("transactionType", "Withdraw")}>Withdaw</Radio>
                        <Radio name="transactionType" value="convert" onChange= {() => setFieldValue("transactionType", "Convert")}>Convert</Radio>
                      </HStack>
                    </RadioGroup>
                    <FormHelperText>Select the transaction type.</FormHelperText>
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

export default CurrencyTransaction;
