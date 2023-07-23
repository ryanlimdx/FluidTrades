import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

const CryptoDetails = () => {
  const initialValues = {
    security: "",
    ticker: "",
  };

  const detailsSchema = yup.object().shape({
    security: yup.string().required("Required"),
    ticker: yup.string().required("Required"),
  })

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/update-assets/crypto/transaction-details");
  };

  return (
    <Box>
      <Typography variant="h1">Tell us more about the cryptocurrency!</Typography>

      <Formik onSubmit={saveData} initialValues={initialValues} validationSchema={detailsSchema}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Stack margin={0}>

              <TextField
                label="Security"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) =>
                  setFieldValue("security", event.target.value)
                }
                error={!!errors.security && !!touched.security}
                helperText={errors.security && touched.security ? "Required" : undefined}
              />
              <TextField
                label="Ticker"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) =>
                  setFieldValue("ticker", event.target.value)
                }
                error={!!errors.ticker && !!touched.ticker}
                helperText={errors.ticker && touched.ticker ? "Required" : undefined}
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

export default CryptoDetails;