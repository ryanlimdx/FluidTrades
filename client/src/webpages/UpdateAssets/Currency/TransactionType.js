import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import {
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  useRadioGroup,
  Radio,
  Button,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { Form, Formik, Field } from "formik";

import { themeSettings } from "../../../theme";

const RadioButton = ({ label, value }) => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  

  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === value;
  }

  return (
    <FormControlLabel
      label={label}
      value={value}
      control={<Radio required={true} />}
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: themeColors.button.border,
        height: 50,
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 3,
        backgroundColor: checked ? themeColors.button.main : undefined,
        "&:hover": {
          borderColor: themeColors.button.borderHover,
        },
      }}
    />
  );
};

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
          <Form sx={{width: "100%"}}>
            <Field as={FormControl} sx={{ width: "100%" }} variant="standard">
              <RadioGroup
                name="transactionType"

                onChange={(event) =>
                  setFieldValue("transactionType", event.currentTarget.value)
                }
                sx={{width: "100%"}}
              >
                <RadioButton label="Deposit" value="Deposit" />
                <RadioButton label="Withdraw" value="Withdraw" />
                <RadioButton label="Convert" value="Convert" />
              </RadioGroup>
            </Field>

            <FormHelperText sx={{ marginTop: 3 }}> Select the transaction type. </FormHelperText>

            <Button sx={{ marginTop: 3 }} size="large" variant="contained" type="submit" fullWidth>
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CurrencyTransaction;
