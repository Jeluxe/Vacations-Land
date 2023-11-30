import React from 'react';
import axios from 'axios';
import { makeStyles, createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { sendUserStatus } from '../actions/send-status';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    root1: {
        color: '#ffff'
    }
}));

let theme = createTheme();

theme = responsiveFontSizes(theme);

const Header = props => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let { username, isAdmin } = props.reduxStore;

    const onClick = ({ history }) => {
        history.push('/login');
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleHome = () => {
        setAnchorEl(null);
        props.history.push('/');
    };

    const handleAddVacation = () => {
        setAnchorEl(null);
        props.history.push('/add-vacation');
    };

    const handleVacationChart = () => {
        setAnchorEl(null);
        props.history.push('/vacations-chart');
    };

    const onLogout = ({ history }) => {
        axios.get('/logout').then(res => {
            props.sendingStatus({ isAdmin: 0, username: 'Guest' });
            history.push('/login');
        });
    }

    return (
        < div className={classes.root} >
            <AppBar position="relative" color="inherit">
                <Toolbar>
                    {isAdmin === 1 ? <IconButton
                        edge="start"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton> : ''}
                    <Typography variant="h6" className={classes.title}>
                        Hello {username}
                    </Typography>
                    {username !== 'Guest' ? <Button variant="contained" color="secondary" onClick={() => onLogout(props)}>Logout</Button> :
                        <Button variant="outlined" color="inherit" onClick={() => onClick(props)}>login</Button>}
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={theme} >
                <Typography variant="h1" align="center" style={{ marginTop: '50px', fontFamily: "'Oleo Script Swash Caps', cursive" }}>Vacations Land</Typography><br />
                <Typography variant="h4" align="center" style={{ fontFamily: 'Trade Winds, cursive' }}>Welcome to the place that will make your dreams come true</Typography>
            </ThemeProvider>
            <Menu
                style={{ marginTop: '40px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleHome}>Home</MenuItem>
                <MenuItem onClick={handleAddVacation}>Add Vacation</MenuItem>
                <MenuItem onClick={handleVacationChart}>Vacations Chart</MenuItem>
            </Menu>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        reduxStore: state.vacations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendingStatus: value => dispatch(sendUserStatus(value))
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);