import React, { useState } from 'react';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    const {login} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError("")
            setLoading(true)
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError("Failed to login")
        }

    }


    return (
        <Form onSubmit={handleSubmit} style={{ height: "330px" }}>
            <TextInput
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                required
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
            />

            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock"
                required
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
            />
            {error && <p className='error'>{error}</p>}

            <Button disabled={loading} type="submit" >
                <span>Submit Now</span>
            </Button>


            <div class="info">Don't have an account? <Link to={'/signup'}>Signup</Link> instead.</div>
        </Form>
    );
};

export default LoginForm;