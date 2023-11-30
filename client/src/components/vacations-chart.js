import React from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchVacations } from '../actions/fetch-vacations';


class VacationChart extends React.Component {
    options = (vacations, followedVacations) => {
        vacations = vacations.map(({ id, destination }) => {
            return {
                id,
                destination,
                likes: 0
            }
        });

        for (let i = 0; i < vacations.length; i++) {
            for (let x = 0; x < followedVacations.length; x++) {
                if (vacations[i].id === followedVacations[x].vacation_id) {
                    vacations[i].likes++;
                }
            }
        }

        return {
            title: {
                text: 'Vacation Follow Chart'
            },

            xAxis: {
                categories: vacations.map(vacation => vacation.destination)
            },

            series: [{
                type: 'column',
                colorByPoint: false,
                data: vacations.map(vacation => vacation.likes),
                showInLegend: false
            }]
        }
    }

    render() {
        let { vacations, followedVacations } = this.props.reduxStore;
        if (vacations.length > 0) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <HighchartsReact highcharts={Highcharts} options={this.options(vacations, followedVacations)} />
                </div>
            )
        } else {
            return (
                <div>Missing Data</div>
            )
        }
    }

    async componentDidMount() {
        await this.props.fetch();
        if (this.props.reduxStore.isAdmin === 0) {
            await this.props.history.push('/');
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

export default connect(mapStateToProps, mapDispatchToProps)(VacationChart);