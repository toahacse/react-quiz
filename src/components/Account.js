import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/Account.module.css'
import {useAuth} from "../contexts/AuthContext"

const Account = () => {
    const {currentUser, logout} = useAuth()
    return (
        <div className={classes.account}>
            {currentUser ? (
                <>
                    <span className="material-icons-outlined" title="Account">
                    account_circle
                    </span>
                    <span>{currentUser.displayName}</span>
                    <span class="material-icons-outlined" onClick={logout} title="Logout"> logout </span>
                </>
            ) : (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </>
            )
        
        }

        </div>
    );
};

export default Account;