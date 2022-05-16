import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@material-ui/core';


import Icon from '../icon';
import useStyles from './styles';


const GoogleButton = () => {
    const classes = useStyles();
    const login = useGoogleLogin({
        onSuccess:tokenResponse=>googleSuccess(tokenResponse),
        onError:error=>console.log(error)
    })

const googleSuccess = async (res) => {
    console.log(res);
}
    
  return (
    <Button 
        className={classes.googleButton} 
        color='primary' 
        fullWidth 
        startIcon={<Icon />} 
        variant='contained'
        onClick={() => login()}
    >
        Google Sign In
    </Button>
  )
}

export default GoogleButton