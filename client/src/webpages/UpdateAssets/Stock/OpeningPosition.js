import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/state";
import { Typography, Box, Stack, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

const OpeningPosition = () => {
  const initialValues = {
    price: "",
    shares: "",
    fees: "",
  };

  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setState({ ...state, ...data });
    navigate("/updateAssets/stock/confirmation");
  };

  return (
    <Box>
      <Typography variant="h1">
        Almost there! Position details left...
      </Typography>

      <Formik onSubmit={saveData} initialValues={initialValues}>
        {({ setFieldValue }) => (
          <Form>
            <Stack>
              <TextField
                label="Price per share"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) => setFieldValue("price", event.target.value)}
                helperText="Currency Symbol need not be included!"
              />

              <TextField
                label="Number of shares"
                id="outlined-helperText"
                required
                margin="normal"
                onChange={(event) =>
                  setFieldValue("shares", event.target.value)
                }
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

export default OpeningPosition;
