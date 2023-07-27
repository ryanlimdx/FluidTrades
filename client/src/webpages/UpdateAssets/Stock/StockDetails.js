import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

const StockDetails = () => {
  const initialValues = {
    sector: "",
    security: "",
    ticker: "",
    currency: "",
  };

  const detailsSchema = yup.object().shape({
    sector: yup.string().required("Required"),
    security: yup.string().required("Required"),
    ticker: yup.string().required("Required"),
    currency: yup.string().required("Required").matches(/^[A-z]+$/),
  })

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/update-assets/stock/transaction-details");
  };

  return (
    <Box>
      <Typography variant="h1">Tell us more about the company!</Typography>

      <Formik onSubmit={saveData} initialValues={initialValues} validationSchema={detailsSchema}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Stack margin={0}>
              <TextField
                label="Sector"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("sector", event.target.value)
                }
                error={!!errors.sector && !!touched.sector}
                helperText={errors.sector && touched.sector ? "Required" : undefined}
              />
              <TextField
                label="Equity"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("security", event.target.value)
                }
                error={!!errors.security && !!touched.security}
                helperText={errors.security && touched.security ? "Required" : undefined }
              />
              <TextField
                label="Ticker"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("ticker", event.target.value)
                }
                error={!!errors.ticker && !!touched.ticker}
                helperText={errors.ticker && touched.ticker ? "Required" : undefined}
              />
              <TextField
                label="Currency"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("currency", event.target.value)
                }
                error={!!errors.currency && !!touched.currency}
                helperText={errors.currency && touched.currency ? "Please input only alphabetic codes." : undefined}
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

export default StockDetails;
