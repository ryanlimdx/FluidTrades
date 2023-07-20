import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import * as yup from "yup";

import coinStack from "../assets/coin-stack.gif";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  const initialValues = {
    name: name,
    email: email,
  };

  const userSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(values);
      // Make POST request
      await axios
        .post("/profile", values, config)
        .then(() => alert("Data successfully sent to database. (◕‿◕)"))
        .then(() => navigate("/"));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    } finally {
      setSubmitting = false;
    }
  };

  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        console.log(response);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1">Hi {name}!</Typography>
      {/* User profile icon */}
      <Box mt="20px">
        <img
          alt="profile icon"
          width="80vw"
          height="80vh"
          src={coinStack}
          style={{ borderRadius: "50%" }}
        />
      </Box>

      {/* Title */}
      <Box display="flex" mt="20px">
        <Typography variant="h2">Info</Typography>

        <IconButton
          size="large"
          onClick={() => {
            setEditMode(!editMode);
            console.log(editMode);
          }}
        >
          {editMode ? <CloseIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      {editMode ? (
        <Box>
          {/* Form */}
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
          >
            {({ errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <Stack>
                  <TextField
                    label="Name"
                    id="name"
                    margin="normal"
                    onChange={(event) =>
                      setFieldValue("name", event.target.value)
                    }
                    error={!!errors.name && !!touched.name}
                    helperText={
                      errors.name && touched.name
                        ? "Please key in a username!"
                        : undefined
                    }
                  />

                  <TextField
                    label="Email"
                    id="email"
                    margin="normal"
                    onChange={(event) =>
                      setFieldValue("email", event.target.value)
                    }
                    error={!!errors.email && !!touched.email}
                    helperText={
                      errors.email && touched.email
                        ? "Please key in a valid email!"
                        : undefined
                    }
                    sx={{
                      color: editMode ? "undefined" : "transparent",
                    }}
                  />

                  <Button
                    size="large"
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      ) : (
        <Box>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h3">{email}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
