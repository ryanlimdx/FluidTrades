import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Heading, Text, Center, Button, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';


const Login = () => {
    const loginDetails = {

    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
    };

    return (
        <Center>
            <Stack boxShadow="md" bg="whiteAlpha.700" p="20" rounded="md">
                    <Heading as="h1">Log In</Heading>
                    <Text fontSize="lg">Please log in with your registered account.</Text>

                    <Formik
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                console.log(values);
                                setSubmitting(false);
                            }, 1000);
                        }}
                        initialValues={{email: "", password: ""}}          
                    >
                        <Form>
                            <Stack>
                                <Input name="email" type="email" placeholder="Email"/>
                                <Input name="password" type="password" placeholder="Password"/>
                                <Button                             
                                    isLoading={handleSubmit}
                                    loadingText="Hang on while we fight the demons."
                                    size="lg"
                                    colorScheme="teal"
                                    type="submit"
                                    >
                                    Login
                                </Button>
                            </Stack>

                        </Form>
                    </Formik>

                    
                    <Stack justify="center" spacing={10}>
                        <Text as="div" textAlign="center">
                            Don't have an an account?
                            <Button as={Link} to="/register" colorScheme="teal" variant="link"> Register here</Button>
                        </Text>
                    </Stack>
            </Stack>
        </Center>
    );
};

export default Login;