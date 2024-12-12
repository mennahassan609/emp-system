import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => emailRegex.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleRegister = async () => {
        let valid = true;
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setErrorMessage('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        }

        if (!username) {
            setUsernameError('Username is required');
            valid = false;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }

        if (valid) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register/', { email, username, password });
                console.log(response.data);
                navigate('/login');
            } catch (error) {
                setErrorMessage('Registration failed. Please try again');
            }
        }
    };

    return (
        <div>
            <h2>Create your account</h2>
            <div style={{ marginTop: '20px', marginBottom: '16px' }}>
                <TextField
                    label="Enter your email"
                    variant="outlined"
                    style={{ marginRight: '16px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    label="Enter your username"
                    variant="outlined"
                    style={{ marginRight: '16px' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    error={!!usernameError}
                    helperText={usernameError}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Enter your password"
                    type="password"
                    variant="outlined"
                    style={{ marginRight: '16px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <TextField
                    label="Confirm your password"
                    type="password"
                    variant="outlined"
                    style={{ marginRight: '16px' }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                />
            </div>
            <Button onClick={handleRegister} variant="contained">Register</Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div style={{ marginTop: '16px' }}>
                <small><Link to="/login">Already have an account? Login</Link></small>
            </div>
        </div>
    );
};

export default Register;
