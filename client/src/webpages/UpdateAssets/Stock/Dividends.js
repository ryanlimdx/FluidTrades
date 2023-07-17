// This page will remain here but in development phase as we decided to move Dividends into
// a future implementation, past Orbital.

/*
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
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
  FormHelperText,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";

const Dividends = () => {
  const initialValues = {
    shares: "",
    dividends: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/updateAssets/stock/confirmation");
  };

  return (
    <Center>
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Almost there! Position details left...</Heading>
        <Text fontSize="lg">
          Dividends can be in the form of monetary distribution from Companies,
          or Staking rewards for Cryptocurrencies!
        </Text>

        <Formik onSubmit={saveData} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <Stack>
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
                    <FormLabel>Dividends issued</FormLabel>
                    <Input
                      name="dividends"
                      type="text"
                      placeholder="0.60"
                      required={true}
                    />
                    <FormHelperText>Dividends issued per share.</FormHelperText>
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

export default Dividends;
*/