import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import {
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormHelperText,
} from "@mui/material";
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
    navigate("/update-assets/currency/base");
  };

  return (
    <Box>
      <Typography variant="h1">
        Hmm, what type of transaction did you do today?
      </Typography>

      <Formik onSubmit={saveData} initialValues={initialValues}>
        {({ setFieldValue }) => (
          <Form>
            <Field as={FormControl} sx={{ m: 0 }} variant="standard">
              <Typography id="transaction type">Transaction type</Typography>
              <RadioGroup
                row
                name="transactionType"
                onChange={(event) =>
                  setFieldValue("transactionType", event.currentTarget.value)
                }
              >
                <FormControlLabel
                  value="Deposit"
                  control={<Radio />}
                  label="Deposit"
                />
                <FormControlLabel
                  value="Withdraw"
                  control={<Radio />}
                  label="Withdraw"
                />
                <FormControlLabel
                  value="Convert"
                  control={<Radio />}
                  label="Convert"
                />
              </RadioGroup>
            </Field>

            <FormHelperText> Select the transaction type. </FormHelperText>

            <Button size="large" variant="contained" type="submit" fullWidth>
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CurrencyTransaction;
