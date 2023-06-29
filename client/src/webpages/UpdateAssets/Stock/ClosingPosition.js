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

const ClosingPosition = () => {
  const initialValues = {
    price: "",
    shares: "",
    fees: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    console.log("Closing Position: ");
    console.log(state.transactionType);
    navigate("/updateAssets/stock/confirmation");
  };

  return (
    <Center>
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Almost there! Position details left...</Heading>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <FormControl>
                    <FormLabel>Price per share</FormLabel>
                    <Input
                      name="price"
                      type="text"
                      placeholder="24"
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
                    <FormLabel>Number of shares</FormLabel>
                    <Input
                      name="shares"
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
                      required={true}
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

export default ClosingPosition;
