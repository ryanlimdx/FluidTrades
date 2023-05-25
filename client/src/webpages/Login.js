import React, { useState } from 'react';


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
                <label for="email">email</label>
                <input value = {email} onChange ={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
                <label for="password">password</label>
                <input value = {password} onChange ={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                <button>Log In</button>
            </form>
            <button>Do not have an account? Register here.</button>
        </>
    );
};

export default Login;