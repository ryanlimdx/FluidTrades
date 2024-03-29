import { Link, useNavigate } from "react-router-dom";
import {
  Stack,
  Heading,
  Text,
  Center,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import axios from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      // Make POST request
      await axios
        .post("/register", values, config)
        .then(() => alert("Account successfully created. You can login now."))
        .then(() => navigate("/login"));
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
        alert("Server Error.")
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Server Error.")
        console.log("Error", error.message);
      }
    } finally {
      setSubmitting = false;
    }
  };

  return (
    <Center className="register">
      <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
        <Heading as="h1">Register</Heading>
        <Text fontSize="lg">
          Please register for an account with your name and email.
        </Text>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <Stack>
                <Field as={InputGroup}>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required={true}
                  />
                  <InputLeftElement pointerEvents="none">
                    <ChevronRightIcon color="teal" />
                  </InputLeftElement>
                </Field>

                <Field as={InputGroup}>
                  <Input name="email" type="email" placeholder="Email" />
                  <InputLeftElement pointerEvents="none">
                    <AtSignIcon color="teal" />
                  </InputLeftElement>
                </Field>

                <Field as={InputGroup}>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                  />
                  <InputLeftElement pointerEvents="none">
                    <LockIcon color="teal" />
                  </InputLeftElement>
                </Field>

                <Button
                  isLoading={isSubmitting}
                  loadingText="Hang on while we fight the demons."
                  size="lg"
                  colorScheme="teal"
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        <Stack justify="center">
          <Text as="div" textAlign="center">
            Already have an an account?
          </Text>
          <Button as={Link} to="/login" colorScheme="teal" variant="link">
            Login here
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Register;