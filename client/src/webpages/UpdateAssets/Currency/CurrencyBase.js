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
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const CurrencyBase = () => {
  const initialValues = {
    baseCurrency: "",
    baseAmount: "",
    fees: ""
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    
    if (state.transactionType === "deposit" || state.transactionType === "withdraw") {
      navigate("/updateAssets/currency/confirmation");
    } else {
      navigate("/updateAssets/currency/convertTo");
    }
    
  };

  return (
    <Flex>
        <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">What are you {state.transactionType}ing today? </Heading>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Base Currency</FormLabel>
                    <Input
                      name="baseCurrency"
                      type="text"
                      placeholder="SGD"
                      required={true}
                    />
                  </FormControl>
                </Field>

                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      name="baseAmount"
                      type="text"
                      placeholder="1000"
                      required={true}
                    />
                  </FormControl>
                </Field>

                // include field for fees if it is a deposit/ withdraw transactionType
                {(state.transactionType === "deposit" || state.transactionType === "withdraw") &&
                  <Field as={InputGroup}>
                    <FormControl>
                      <FormLabel>Fees</FormLabel>
                      <Input
                        name="fees"
                        type="text"
                        placeholder="0.40"
                      />
                    </FormControl>
                  </Field>
                }
                
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

export default CurrencyBase;
