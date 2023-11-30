import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles, createStyles } from '@material-ui/core';
import { TextField, Button, Typography } from '@material-ui/core';
import { fetchVacations } from '../actions/fetch-vacations';


class AddVacationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            destination: '',
            image: '',
            start_date: '',
            end_date: '',
            price: null,
            descriptionErrorText: '',
            destinationErrorText: '',
            imageErrorText: '',
            start_dateErrorText: '',
            end_dateErrorText: '',
            priceErrorText: ''

        }
    }

    onChangeHandler = (value, field) => {
        if (field !== 'price') {
            this.setState({ [field]: value });
        } else {
            this.setState({ [field]: Number(value) });
            if (_.isNaN(Number(value))) {
                this.setState({ priceErrorText: 'Not a Number' });
            }
            else if (Number(value) !== null || Number(value) !== 0) {
                this.setState({ priceErrorText: '' });
            }
        }
    }

    submitValidationHandler = (vacationDetails) => {
        let isValid = true;
        if (_.values(this.state).slice(6, _.keys(this.state).length).some(field => field !== '')) {
            isValid = false;
        }
        _.keys(vacationDetails).map(field => {
            if (this.state[field] === '' || this.state[field] === null) {
                this.setState({ [`${field}ErrorText`]: 'Empty Field' });
                isValid = false;
            }
            return '';
        });
        return isValid;
    }

    onAdd = async () => {
        try {
            const filteredState = _.omit(this.state, _.keys(this.state).slice(6, _.keys(this.state).length));
            if (this.submitValidationHandler(filteredState)) {
                await axios.post('/add-vacation', filteredState)
                    .then(res => {
                        this.props.history.push('/');
                    });
            }
        } catch {
            this.props.history.push('/add-vacation');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.description !== nextState.description ||
            this.state.destination !== nextState.destination ||
            this.state.image !== nextState.image ||
            this.state.start_date !== nextState.start_date ||
            this.state.end_date !== nextState.end_date ||
            this.state.price !== nextState.price ||
            this.state.descriptionErrorText !== nextState.descriptionErrorText ||
            this.state.destinationErrorText !== nextState.destinationErrorText ||
            this.state.imageErrorText !== nextState.imageErrorText ||
            this.state.start_dateErrorText !== nextState.start_dateErrorText ||
            this.state.end_dateErrorText !== nextState.end_dateErrorText ||
            this.state.priceErrorText !== nextState.priceErrorText) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        const { description, destination, image, start_date, end_date } = this.state;
        if (prevState.description !== description) {
            if (description.length > 200) {
                this.setState({ descriptionErrorText: 'Must be up to 200 characters!' });
            }
            else if (description !== '') {
                this.setState({ descriptionErrorText: '' });
            }
        }
        if (prevState.destination !== destination) {
            if (destination.length > 50) {
                this.setState({ destinationErrorText: 'Must be up to 50 characters!' });
            }
            else if (destination !== '') {
                this.setState({ destinationErrorText: '' });
            }
        }
        if (prevState.image !== image) {
            this.setState({ imageErrorText: '' });
        }
        if (prevState.start_date !== start_date || prevState.end_date !== end_date) {
            if (Date.parse(new Date(start_date)) >= Date.parse(new Date(end_date))) {
                this.setState({ start_dateErrorText: "Dates range isn't valid" });
                this.setState({ end_dateErrorText: "Dates range isn't valid" });
            }
            else {
                if (start_date !== '') {
                    this.setState({ start_dateErrorText: "" });
                }
                if (end_date !== '') {
                    this.setState({ end_dateErrorText: "" });
                }
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root && classes.container} autoComplete="off" align="center" >
                <Typography variant="h4" style={{ marginBottom: '20px' }}>Add Vacation</Typography>
                <div className={classes.align}>
                    <div style={{ float: 'left' }}>
                        <TextField
                            label="Description"
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'description')}
                            error={this.state.descriptionErrorText !== ''}
                            helperText={this.state.descriptionErrorText}
                        /><br /><br />
                        <TextField
                            label="Start Date"
                            type="date"
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'start_date')}
                            error={this.state.start_dateErrorText !== ''}
                            helperText={this.state.start_dateErrorText}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /><br /><br />

                        <TextField
                            label="Image"
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'image')}
                            error={this.state.imageErrorText !== ''}
                            helperText={this.state.imageErrorText}
                        /><br /><br />
                    </div>
                    <div style={{ float: 'left', marginLeft: '50px' }}>
                        <TextField
                            label="Destination"
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'destination')}
                            error={this.state.destinationErrorText !== ''}
                            helperText={this.state.destinationErrorText}
                        /><br /><br />
                        <TextField
                            label="End Date"
                            type="date"
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'end_date')}
                            error={this.state.end_dateErrorText !== ''}
                            helperText={this.state.end_dateErrorText}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /><br /><br />
                        <TextField
                            label="Price"
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'price')}
                            error={this.state.priceErrorText !== ''}
                            helperText={this.state.priceErrorText}
                        /><br /><br />
                    </div><br />
                </div>
                <div className={classes.align}>
                    <Button
                        style={{ marginTop: '20px' }}
                        variant="contained"
                        color="primary"
                        onClick={() => this.onAdd()}
                    >
                        Add
                    </Button>
                </div>
            </form>
        );
    }

    async componentDidMount() {
        await this.props.fetch();
        if (this.props.reduxStore.isAdmin === 0) {
            this.props.history.push('/');
        }
    }
}

const mapStateToProps = state => {
    return {
        reduxStore: state.vacations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch: value => dispatch(fetchVacations(value))
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
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        borderRadius: '25px',
        backgroundColor: 'rgba(255,255,255, 0.8)',
        padding: '20px',
        width: '30%',
        margin: 'auto',
    },
    align: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(AddVacationComponent);