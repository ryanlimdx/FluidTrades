import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField, Alert } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

const TransactionDetails = () => {
  const initialValues = {
    price: "",
    quantity: "",
    commissions: "",
  };

  const transactionSchema = yup.object().shape({
    price: yup.number().required("Required"),
    quantity: yup.number().required("Required"),
    commissions: yup.number(),
  });

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/update-assets/crypto/confirmation");
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
                label="Price"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) => setFieldValue("price", event.target.value)}
                error={!!errors.price && !!touched.price}
                helperText={errors.price && touched.price ? "Please key in a number! Currency symbols need not be included." : undefined}
              />

              <Alert severity="info" sx={{margin: "2px 0 2px 0"}}>For ALL cryptocurrency, please key in the price as denominated by USD</Alert>

              <TextField
                label="Number of tokens"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) =>
                  setFieldValue("quantity", event.target.value)
                }
                error = {!!errors.quantity && !!touched.quantity}
                helperText={errors.quantity && touched.quantity ? "Please key in a number!" : undefined}
              />

              <TextField
                label="Commissions"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) => setFieldValue("commissions", event.target.value)}
                error = {!!errors.commissions && !!touched.commissions}
                helperText={errors.commissions && touched.commissions ? "Please key in a number (or leave it blank)! Currency symbols need not be included." : undefined}
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