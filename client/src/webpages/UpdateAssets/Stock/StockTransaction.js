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

const StockTransaction = () => {
  const initialValues = {
    transactionType: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/update-assets/stock/details");
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
                  value="Buy"
                  control={<Radio required={true} />}
                  label="Buy"
                />
                <FormControlLabel
                  value="Sell"
                  control={<Radio required={true} />}
                  label="Sell"
                />
                {/* Decided to remove Dividends for future implementation. */}
                {/* <FormControlLabel
                  value="Dividends"
                  control={<Radio />}
                  label="Dividends"
                /> */}
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

export default StockTransaction;
