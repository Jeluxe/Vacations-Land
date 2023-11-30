import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles, createStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { fetchVacations } from '../actions/fetch-vacations';
import CardComponent from './card-component';


class Home extends React.Component {

    deleteHandle = (id) => {
        axios.get(`/remove-vacation/${id}`).then(res => {
            if (res.status === 200) {
                this.fetchData();
            }
        });
    }

    editHandle = (data) => {
        axios.post('/update-vacation', data)
            .then(res => {
                this.fetchData();
            });
    }

    followHandle = (value) => {
        axios.get(`/toggle-follow/${value}`)
            .then(res => {
                if (res.status === 200) {
                    this.fetchData();
                }
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.reduxStore !== nextProps.reduxStore) {
            return true;
        }
        return false;
    }

    render() {
        const { classes } = this.props;
        const { vacations } = this.props.reduxStore;
        if (vacations) {
            return (
                <div className={classes.root && classes.container}>
                    <Grid container alignItems="center" justifyContent="center" style={{ paddingLeft: '4%' }}>
                        {vacations.map((vacation, idx) => {
                            return <Grid item xs={10} sm={6} md={4} lg={3} xl={2} key={idx}>
                                <CardComponent
                                    props={this.props}
                                    vacation={vacation}
                                    onDelete={value => this.deleteHandle(value)}
                                    onEdit={value => this.editHandle(value)}
                                    onFollow={value => this.followHandle(value)}
                                />
                            </Grid>
                        })}
                    </Grid>
                </div>
            )
        } else {
            return <div>missing data</div>
        }
    }

    async fetchData() {
        try {
            await this.props.fetch();
        } catch {
            this.props.history.push('/login');
        }
    }

    componentDidMount() {
        this.fetchData();
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

const styles = createStyles({
    root: {
        width: 'auto',
        height: '100%'
    },
    container: {
        marginTop: '40px',
        borderRadius: '25px',
        backgroundColor: 'rgba(255,255,255, 0.4)',
        height: '100%',
        width: 'auto',
        margin: 'auto'
    }
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Home);