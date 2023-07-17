import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

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
    navigate("/update-assets/currency/confirmation");
  };

  return (
    <Box>
      <Typography variant="h1">
        Almost there! Tell us about the currency you converted to.
      </Typography>

      <Formik onSubmit={saveData} initialValues={initialValues}>
        {({ setFieldValue }) => (
          <Form>
            <Stack margin={0}>
              <Typography marginTop={1} variant="h5">I converted to:</Typography>
              <TextField
                label="Currency"
                id="outlined-helperText"
                required
                onChange={(event) => setFieldValue("currency", event.target.value)}
                helperText="Currency Symbol need not be included!"
              />

              <TextField
                label="Amount"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("amount", event.target.value)}
              />

              <TextField
                label="Fees"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("fees", event.target.value)}
                helperText="Commissions paid for the transaction."
              />

              <Button
                size="large"
                variant="contained"
                type="submit"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Next
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ConvertTo;
