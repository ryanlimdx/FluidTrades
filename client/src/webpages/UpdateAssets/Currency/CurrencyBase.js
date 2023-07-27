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
import * as yup from "yup";

const CurrencyBase = () => {
  const initialValues = {
    baseCurrency: "",
    baseAmount: "",
    commissions: "",
  };

  const baseCurrencySchema = yup.object().shape({
    baseCurrency: yup.string().required("Required").matches(/^[A-z]+$/),
    baseAmount: yup.number().required("Required"),
    commissions: yup.number(),
  });

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
        What are you {state.transactionType.toLowerCase()}ing today?{" "}
      </Typography>

      <Formik onSubmit={saveData} initialValues={initialValues} validationSchema={baseCurrencySchema}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Stack>
              <TextField
                label="Base Currency"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) => setFieldValue("baseCurrency", event.target.value)}
                error={!!errors.baseCurrency && !!touched.baseCurrency}
                helperText={errors.baseCurrency && touched.baseCurrency ? "Please input only alphabetic codes." : undefined }
              />

              <TextField
                label="Amount"
                id="outlined-helperText"
                margin="normal"
                onChange={(event) => setFieldValue("baseAmount", event.target.value)}
                error={!!errors.baseAmount && !!touched.baseAmount}
                helperText={errors.baseAmount && touched.baseAmount ? "Please key in a number! Currency symbols need not be included." : undefined }
              />

              {/* include field for commissions if it is a deposit/ withdraw transactionType */}
              {(state.transactionType === "Deposit" ||
                state.transactionType === "Withdraw") && (
                <>
                  <TextField
                    label="Commissions"
                    id="outlined-helperText"
                    margin="normal"
                    onChange={(event) => setFieldValue("commissions", event.target.value)}
                    error={!!errors.commissions && !!touched.commissions}
                    helperText={errors.commissions && touched.commissions ? "Please key in a number (or leave it blank)! Currency symbols need not be included." : undefined}
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
