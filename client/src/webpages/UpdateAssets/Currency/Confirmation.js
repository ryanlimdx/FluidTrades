import { Card, CardHeader, CardBody, CardFooter, Stack,
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
    Flex
} from '@chakra-ui/react'
import { useAppState } from "../../../state";
import axios from "../../../api/axios";
import { Form, Formik, Field } from "formik";
import { Section, SectionRow } from '../../../components/forms/Section';


const CurrencyConfirmation = () => {
    const [state] = useAppState();
   
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
          const config = { headers: { "Content-Type": "application/json" } };
          console.log(values);
          // Make POST request
          const response = await axios.post("/register", values, config);
          console.log(response.data);
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
        }
      };
   
    return (
        <Flex>
            <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
            <Heading as="h1">
                Woohoo! Now, confirm your 
                {state.transactionType === "deposit" && " deposit "}
                {state.transactionType === "withdraw" && " withdrawal "}
                {state.transactionType === "convert" && " conversion "}
                details!
            </Heading>

            <Formik onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                <Form>
                <Stack>
                    <SectionRow>
                        <div>
                            Currency 
                            {state.transactionType === "deposit" && " deposited"}
                            {state.transactionType === "withdraw" && " withdrawn"}
                            {state.transactionType === "convert" && " converted from"}
                        </div>
                        <div>{state.baseCurrency}</div>
                    </SectionRow>

                    <SectionRow>
                        <div>Amount</div>
                        <div>{state.baseAmount}</div>
                    </SectionRow>

                    {(state.transactionType === "convert") &&
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
                                <div>{state.baseCurrency}{state.currency}</div>
                                <div>Exchange rate at conversion: {state.baseAmount / state.amount}</div>
                            </SectionRow>

                        </Stack>
                    }
                    
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
        </Flex>
    )
};

export default CurrencyConfirmation;
