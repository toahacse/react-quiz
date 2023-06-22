import React from 'react';
import classes from '../styles/Illustration.module.css'
import signUpImage from '../assets/images/signup.svg'

const Illustration = () => {
    return (
        <div className={classes.illustration}>
            <img src={signUpImage} alt="Signup" />
        </div>
    );
};

export default Illustration;