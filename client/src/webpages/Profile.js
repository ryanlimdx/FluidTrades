import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { Form, Formik } from "formik";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import { ProfileContext } from "../context/nameContext";

import coinStack from "../assets/coin-stack.gif";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const { name, email } = useContext(ProfileContext);
  const [nameValue, setName] = name;
  const [emailValue, setEmail] = email;
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const initialValues = {};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      let path;

      if (editName) {
        path = "profile/change_name";
      } else if (editEmail) {
        path = "profile/change_email";
      }

      await axios.patch(path, values, config).then((response) => {
        if (response.status !== 200) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
          setEditMode(false);
          setIsUpdated(true);
        }
      });
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
    setIsUpdated(false);
    axios
      .get("/profile")
      .then((response) => {
        console.log(response);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((err) => console.log(err));
  }, [isUpdated, setName, setEmail]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {editMode ? (
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h1">
              Edit your {editName ? "username" : "email"}
            </Typography>

            <IconButton
              size="large"
              onClick={() => {
                setEditMode(!editMode);
                setEditEmail(false);
                setEditName(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Form */}
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <Stack>
                  {editName && (
                    <TextField
                      label="Name"
                      id="name"
                      margin="normal"
                      onChange={(event) =>
                        setFieldValue("name", event.target.value)
                      }
                    />
                  )}

                  {editEmail && (
                    <TextField
                      label="Email"
                      id="email"
                      type="email"
                      margin="normal"
                      onChange={(event) =>
                        setFieldValue("email", event.target.value)
                      }
                    />
                  )}

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

          <Typography variant="h2" mt="20px">Info</Typography>

          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3">{nameValue}</Typography>

              <IconButton
                size="small"
                onClick={() => {
                  setEditMode(!editMode);
                  setEditName(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3">{emailValue}</Typography>
              <IconButton
                size="small"
                onClick={() => {
                  setEditMode(!editMode);
                  setEditEmail(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;