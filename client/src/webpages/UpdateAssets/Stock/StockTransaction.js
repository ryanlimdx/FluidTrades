import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { useState } from "react";
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
  Stack,
} from "@mui/material";
import { Form, Formik, Field } from "formik";
import { tokens, themeSettings } from "../../../theme";
import { border } from "@mui/system";
import { background } from "@chakra-ui/react";

const RadioButton = ({ label, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        borderColor: themeColors.radioButton.border,
        height: 40,
        width: 1000,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 2,
        backgroundColor: checked ? themeColors.radioButton.main : undefined,

        "&:hover": {
          borderColor: themeColors.radioButton.borderHover,
        },
        // "& .Mui-checked": {
        //   backgroundColor: "red",
        // }
      }}
    />
  );
};

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
            <Stack>
              <Field as={FormControl} variant="standard">
                <RadioGroup
                  name="transactionType"
                  onChange={(event) =>
                    setFieldValue("transactionType", event.currentTarget.value)
                  }
                >
                  <RadioButton label="Buy" value="Buy" />
                  <RadioButton label="Sell" value="Sell" />
                </RadioGroup>
              </Field>

              <FormHelperText> Select the transaction type. </FormHelperText>
              
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

export default StockTransaction;
