import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

const ConvertTo = () => {
  const initialValues = {
    currency: "",
    amount: "",
    commissions: "",
  };

  const conversionSchema = yup.object().shape({
    currency: yup.string().required("Required").matches(/^[A-z]+$/),
    amount: yup.number().required("Required"),
    commissions: yup.number() ,
  })

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

      <Formik onSubmit={saveData} initialValues={initialValues} validationSchema={conversionSchema}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Stack margin={0}>
              <TextField
                label="Currency"
                id="outlined-helperText"
                required
                onChange={(event) => setFieldValue("currency", event.target.value)}
                error={!!errors.currency && !!touched.currency}
                helperText={errors.currency && touched.currency ? "Please input only alphabetic codes." : undefined }
              />

              <TextField
                label="Amount"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("amount", event.target.value)}
                error={!!errors.amount && !!touched.amount}
                helperText={errors.amount && touched.amount ? "Please key in a number! Currency symbols need not be included." : undefined }
              />

              <TextField
                label="Commissions"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("commissions", event.target.value)}
                error={!!errors.commissions && !!touched.commissions}
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

export default ConvertTo;
