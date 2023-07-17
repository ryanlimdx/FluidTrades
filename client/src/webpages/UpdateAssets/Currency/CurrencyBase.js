import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import {
  Typography,
  Box,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";

const CurrencyBase = () => {
  const initialValues = {
    baseCurrency: "",
    baseAmount: "",
    fees: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });

    if (
      state.transactionType === "Deposit" ||
      state.transactionType === "Withdraw"
    ) {
      navigate("/update-assets/currency/confirmation");
    } else {
      navigate("/update-assets/currency/convertTo");
    }
  };

  return (
    <Box variant="outlined">
      <Typography variant="h1">
        What are you {state.transactionType}ing today?{" "}
      </Typography>

      <Formik onSubmit={saveData} initialValues={initialValues}>
        {({ setFieldValue }) => (
          <Form>
            <Stack margin={0}>
              <TextField
                label="Base Currency"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("baseCurrency", event.target.value)}
              />

              <TextField
                label="Amount"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("baseAmount", event.target.value)}
              />

              {/* include field for fees if it is a deposit/ withdraw transactionType */}
              {(state.transactionType === "Deposit" ||
                state.transactionType === "Withdraw") && (
                <>
                  <TextField
                    label="Fees"
                    id="outlined-helperText"
                    required
                    margin="normal"
                    onChange={(event) => setFieldValue("fees", event.target.value)}
                  />
                </>
              )}

              <Button size="large" variant="contained" type="submit" fullWidth sx={{marginTop: 2}}>
                Next
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CurrencyBase;
