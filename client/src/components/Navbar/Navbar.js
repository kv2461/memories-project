import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; //points back to homepage
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import decode from 'jwt-decode';

import useStyles from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

       navigate('/')
    };

    useEffect(()=> {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime())//exp = expire * 1000 ms is lower current time, log out
            logout(); 
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link  to='/' className= {classes.brandContainer}>
                <img src={memoriesText} alt='icon' height='45px' />
                 <img className={classes.image} src={memoriesLogo} alt='icon' height='40px'></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt ={user.result.name} src ={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary' onClick={()=>navigate('/auth')}>Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;