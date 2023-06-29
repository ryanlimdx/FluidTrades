import { 
    Stack,
    Heading,
    Button,
    Center
} from '@chakra-ui/react'
import { useAppState } from "../../../state";
import axios from "../../../api/axios";
import { Form, Formik} from "formik";
import { SectionRow } from '../../../components/forms/Section';
import { useNavigate } from 'react-router-dom';


const CurrencyConfirmation = () => {
    const [state] = useAppState();
    const navigate = useNavigate();
    const initialValues = {
        transactionType: state.transactionType,
        sellCurrency: state.baseCurrency,
        sellAmount: state.baseAmount,
        buyCurrency: state.currency,
        buyAmount: state.amount,
        fees: state.fees
    }
   
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
          console.log(initialValues.sellAmount);
          const config = { headers: { "Content-Type": "application/json" } };
          console.log(values);
          console.log("values end");
          // Make POST request
          const response = await axios
          .post("/updateAssets/Currency/Confirmation", values, config)
          .then(() => navigate("/dashboard"));
          console.log(response.data);
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error!");
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
        <Center>
            <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
            <Heading as="h1">
                Woohoo! Now, confirm your 
                {state.transactionType === "deposit" && " deposit "}
                {state.transactionType === "withdraw" && " withdrawal "}
                {state.transactionType === "convert" && " conversion "}
                details!
            </Heading>

            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
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
                                    <div>Exchange rate at conversion: { state.amount /state.baseAmount }</div>
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
        </Center>
    )
};

export default CurrencyConfirmation;
