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
    HStack,} from '@chakra-ui/react'
import { useAppState } from "../../state";
import axios from "../../api/axios";
import { Form, Formik, Field } from "formik";
import { Section, SectionRow } from '../../components/forms/Section';


const Confirmation = () => {
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
        <Formik onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
            <Form>
              <Stack>
                <Section title= "Transaction Detail" url="/updateAssets">
                    <SectionRow>
                        <div>Sector</div>
                        <div>{state.sector}</div>
                    </SectionRow>

                    <SectionRow>
                        <div>Equity</div>
                        <div>{state.equity}</div>
                    </SectionRow>

                    <SectionRow>
                        <div>Ticker</div>
                        <div>{state.ticker}</div>
                    </SectionRow>
                    
                    <SectionRow>
                        <div>Currency</div>
                        <div>{state.currency}</div>
                    </SectionRow>

                    <SectionRow>
                        <div>Transaction Type</div>
                        <div>{state.transactionType}</div>
                    </SectionRow>
                </Section>

                <Section title= "Position to be opened" url="/UpdateAssets/OpeningPosition">
                    <SectionRow>
                        <div>Price</div>
                        <div>{state.price}</div>
                    </SectionRow>

                    <SectionRow>
                        <div>Shares</div>
                        <div>{state.shares}</div>
                    </SectionRow>

                    <SectionRow>
                        <div>Fees</div>
                        <div>{state.fees}</div>
                    </SectionRow>
                </Section>
                

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
    )
};

export default Confirmation;
