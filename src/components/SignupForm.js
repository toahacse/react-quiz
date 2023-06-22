import React, { useState } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Button from './Button';
import Form from './Form';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");
    
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    const {signup} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        if(password !== confirmPassword){
            return setError("Password don't match!")
        }

        try {
            setError("")
            setLoading(true)
            await signup(email, password, username);
            navigate('/');
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError("Failed to create an account")
        }

    }


    return (
        <Form onSubmit={handleSubmit} style={{ height: "500px" }} className={`form`}>
            <TextInput required type="text" placeholder="Enter name" icon="person" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <TextInput required type="text" placeholder="Enter email" icon="alternate_email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextInput required type="password" placeholder="Enter password" icon="lock" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <TextInput required type="password" placeholder="Confirm password" icon="lock_clock" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            {error && <p className='error'>{error}</p>}
            <Checkbox  required text="I agree to the Terms & Conditions" value={agree} onChange={(e)=>setAgree(e.target.value)}/>
            <Button disabled={loading} type="submit"><span>Submit now</span></Button>
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
};

export default SignupForm;