import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
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
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Name" id="name" name="name" />
                <label htmlFor="email">Email</label>
                <input value = {email} onChange ={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value = {password} onChange ={(e) => setPassword(e.target.value)} type="Password" placeholder="Password" id="password" name="password"/>
                <button>Log In</button>
            </form>
            <p>Already have an account?<Link to ="/login">Log in here.</Link></p>
        </>
    );
}

export default Register;