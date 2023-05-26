import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value = {email} onChange ={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value = {password} onChange ={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                <button>Log In</button>
            </form>

            <p>Don't have an account? <Link to ="/register">Register here.</Link></p>
        </>
    );
};

export default Login;