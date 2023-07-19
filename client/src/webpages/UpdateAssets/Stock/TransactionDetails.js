import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

const TransactionDetails = () => {
  const initialValues = {
    price: "",
    shares: "",
    fees: "",
  };

  const transactionSchema = yup.object().shape({
    price: yup.number().required("Required"),
    shares: yup.number().required("Required"),
    fees: yup.number(),
  });

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/update-assets/stock/confirmation");
  };

  return (
    <Box>
      <Typography variant="h1">
        Almost there! Let us know more about your {state.transactionType.toLowerCase()} transaction
      </Typography>

      <Formik onSubmit={saveData} initialValues={initialValues} validationSchema={transactionSchema}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Stack>
              <TextField
                label="Price per share"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) => setFieldValue("price", event.target.value)}
                error={!!errors.price && !!touched.price}
                helperText={errors.price && touched.price ? "Please key in a number! Currency symbols need not be included." : undefined}
              />

              <TextField
                label="Number of shares"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) =>
                  setFieldValue("shares", event.target.value)
                }
                error = {!!errors.shares && !!touched.shares}
                helperText={errors.shares && touched.shares ? "Please key in a number!" : undefined}
              />

              <TextField
                label="Fees"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) => setFieldValue("fees", event.target.value)}
                error = {!!errors.fees && !!touched.fees}
                helperText={errors.fees && touched.fees ? "Please key in a number (or leave it blank)! Currency symbols need not be included." : undefined}
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

export default TransactionDetails;
