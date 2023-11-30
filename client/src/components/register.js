import React from 'react';
import axios from 'axios';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import _ from 'lodash';
import '../styles.css';

const validationStyle = {
    borderRadius: '25px',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    padding: '20px',
    height: 'auto',
    width: '15%',
    margin: 'auto',
    position: 'absolute',
    right: '300px',
    top: '400px',
    display: "none"
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
            firstName: '',
            lastName: '',
            lowerCase: false,
            upperCase: false,
            numbers: false,
            usernameErrorText: '',
            passwordErrorText: '',
            confirmPassErrorText: '',
            firstNameErrorText: '',
            lastNameErrorText: '',
        }
    }

    onChangeHandler = (value, field) => {
        this.setState({ [field]: value });
    }

    openDiv = () => {
        document.getElementById("message").style.display = "block";
    }

    closeDiv = () => {
        document.getElementById("message").style.display = "none";
    }


    submitValidationHandler = (userDetails) => {
        let isValid = true;
        if (_.values(this.state).slice(5, _.keys(this.state).length).some(field => {
            if (_.isBoolean(field)) {
                return field === false;
            } else {
                return field !== '';
            }
        })) {
            isValid = false;
        }
        _.keys(userDetails).map(field => {
            if (this.state[field] === '') {
                this.setState({ [`${field}ErrorText`]: 'Empty Field' });
                isValid = false;
            }
            return '';
        });

        if (userDetails.password !== userDetails.confirmPass &&
            this.state.confirmPassErrorText === '' && this.state.confirmPass !== '') {
            this.setState({ passwordErrorText: 'Passwords do not match!' });
            this.setState({ confirmPassErrorText: 'Passwords do not match!' });
            isValid = false;
        }
        return isValid;
    }

    onRegister = async () => {
        try {
            const filteredState = _.omit(this.state, _.keys(this.state).slice(5, _.keys(this.state).length));
            if (this.submitValidationHandler(filteredState)) {
                await axios.post('/register', filteredState)
                    .then(res => {
                        this.props.history.push('/login');
                    });
            }
        } catch {
            this.props.history.push('/register');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.username !== nextState.username ||
            this.state.password !== nextState.password ||
            this.state.confirmPass !== nextState.confirmPass ||
            this.state.firstName !== nextState.firstName ||
            this.state.lastName !== nextState.lastName ||
            this.state.usernameErrorText !== nextState.usernameErrorText ||
            this.state.passwordErrorText !== nextState.passwordErrorText ||
            this.state.confirmPassErrorText !== nextState.confirmPassErrorText ||
            this.state.firstNameErrorText !== nextState.firstNameErrorText ||
            this.state.lastNameErrorText !== nextState.lastNameErrorText ||
            this.state.lowerCase !== nextState.lowerCase ||
            this.state.upperCase !== nextState.upperCase ||
            this.state.numbers !== nextState.numbers) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        const { username, password, confirmPass, firstName, lastName } = this.state;
        if (prevState.username !== username) {
            if ((1 <= username.length && username.length < 4) || username.length > 24) {
                this.setState({ usernameErrorText: 'Must be between 4-24 characters!' });
            }
            else if (username !== '') {
                this.setState({ usernameErrorText: '' });
            } else {
                this.setState({ usernameErrorText: '' });
            }
        }
        if (prevState.password !== password ||
            prevState.confirmPass !== confirmPass) {
            if (1 === 0) {

            } else {
                if ((1 <= password.length && password.length < 8) || password.length > 30) {
                    this.setState({ passwordErrorText: 'Must be between 8-30 characters!' });
                }
                else {
                    this.setState({ passwordErrorText: '' });
                }
                const lowerCase = /[a-z]/g;
                const upperCase = /[A-Z]/g;
                const numbers = /[0-9]/g;
                if (lowerCase.test(this.state.password)) {
                    this.setState({ lowerCase: true })
                } else {
                    this.setState({ lowerCase: false })
                }
                if (upperCase.test(this.state.password)) {
                    this.setState({ upperCase: true })
                } else {
                    this.setState({ upperCase: false })
                }
                if (numbers.test(this.state.password)) {
                    this.setState({ numbers: true })
                } else {
                    this.setState({ numbers: false })
                }
                if ((1 <= confirmPass.length && confirmPass.length < 8) || confirmPass.length > 30) {
                    this.setState({ confirmPassErrorText: 'Must be between 8-30 characters!' });
                } else {
                    this.setState({ confirmPassErrorText: '' });
                }
            }
        }
        if (prevState.firstName !== firstName) {
            if (firstName !== '') {
                this.setState({ firstNameErrorText: '' });
            }
        }
        if (prevState.lastName !== lastName) {
            if (lastName !== '') {
                this.setState({ lastNameErrorText: '' });
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root && classes.container} autoComplete="off" align="center">
                <Typography variant="h4" style={{ marginBottom: '20px' }}>Register</Typography>
                <TextField
                    label="Username"
                    onChange={({ target: { value } }) => this.onChangeHandler(value, 'username')}
                    error={this.state.usernameErrorText !== ''}
                    helperText={this.state.usernameErrorText}
                /><br />
                <TextField
                    label="Password"
                    type="password"
                    onChange={({ target: { value } }) => this.onChangeHandler(value, 'password')}
                    onFocus={this.openDiv}
                    onBlur={this.closeDiv}
                    error={this.state.passwordErrorText !== ''}
                    helperText={this.state.passwordErrorText}
                /><br />
                <TextField
                    label="Confirm Password"
                    type="password"
                    onChange={({ target: { value } }) => this.onChangeHandler(value, 'confirmPass')}
                    error={this.state.confirmPassErrorText !== ''}
                    helperText={this.state.confirmPassErrorText}
                /><br />
                <TextField
                    label="First Name"
                    onChange={({ target: { value } }) => this.onChangeHandler(value, 'firstName')}
                    error={this.state.firstNameErrorText !== ''}
                    helperText={this.state.firstNameErrorText}
                /><br />
                <TextField
                    label="Last Name"
                    onChange={({ target: { value } }) => this.onChangeHandler(value, 'lastName')}
                    error={this.state.lastNameErrorText !== ''}
                    helperText={this.state.lastNameErrorText}
                /><br />

                <Button
                    style={{ marginTop: '20px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.onRegister(this.state)}
                >
                    Register
                </Button>
                <div id="message" style={validationStyle}>
                    <h3>Password must contain the following:</h3>
                    <p id="letter" className={this.state.lowerCase ? 'valid' : 'invalid'}>A <b>lowercase</b> letter</p>
                    <p id="capital" className={this.state.upperCase ? 'valid' : 'invalid'}>A <b>capital (uppercase)</b> letter</p>
                    <p id="number" className={this.state.numbers ? 'valid' : 'invalid'}>A <b>number</b></p>
                </div>
            </form>

        );
    }
}

const styles = createStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
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
    },
}));

export default withStyles(styles)(Register);