import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            color: 'white'
        },
    },
    container: {
        marginTop: '40px',
        borderRadius: '25px',
        backgroundColor: 'rgba(255,255,255, 0.8)',
        padding: '20px',
        height: 'auto',
        width: '15%',
        margin: 'auto',
    }
}));



function Login(props) {
    const classes = useStyles();
    const userDetails = {
        username: '',
        password: ''
    }

    const onChangeHandler = (value, field) => {
        userDetails[field] = value;
    }

    const onlogin = async (details) => {
        try {
            await axios.post('/login', details)
                .then(res => {
                    props.history.push('/');
                });
        } catch {
            props.history.push('/login');
        }
    }

    return (
        <form className={classes.root && classes.container} autoComplete="off" align="center">
            <Typography variant="h4" align="center" style={{ marginBottom: '20px' }} >Login</Typography>
            <TextField
                label="Username"
                autoFocus
                onChange={({ target: { value } }) => onChangeHandler(value, 'username')}
                required={true}

            /><br />
            <TextField
                md={3}
                sm={6}
                label="Password"
                type="password"
                onChange={({ target: { value } }) => onChangeHandler(value, 'password')}
                required={true}
            /><br />
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '20px', marginTop: '20px' }}
                onClick={() => onlogin(userDetails, props)}
            >
                Login
            </Button>
            <Divider />
            <div align="center" style={{ marginTop: '20px' }}>
                Not register yet? <a href="/register">Click here!</a>
            </div>
        </form>
    );
}

export default Login;