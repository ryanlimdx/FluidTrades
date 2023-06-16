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
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const ConvertTo = () => {
  const initialValues = {
    currency: "",
    amount: "",
    fees: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/UpdateAssets/Currency/Confirmation");
  };

  return (
    <Center>
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Almost there! Tell us about the currency you converted to.</Heading>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>I converted to:</FormLabel>
                    <Input
                      name="currency"
                      type="text"
                      placeholder="USD"
                      required={true}
                    />
                    <FormHelperText>
                      {" "}
                      Currency need not be included!{" "}
                    </FormHelperText>
                  </FormControl>
                </Field>

                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      name="amount"
                      type="text"
                      placeholder="10"
                      required={true}
                    />
                  </FormControl>
                </Field>

                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Fees</FormLabel>
                    <Input
                      name="fees"
                      type="text"
                      placeholder="0.40"
                    />
                    <FormHelperText>
                      {" "}
                      Commissions paid for the transaction.{" "}
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
    </Center>
  );
};

export default ConvertTo;
