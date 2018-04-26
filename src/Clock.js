import React from 'react';
import moment from 'moment-timezone';
import { timezone } from './Constants';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            date: ''
        };
        this.setDateTime = this.setDateTime.bind(this);
    }
    intervalID;
    setDateTime() {
        this.setState({
            time: moment()
                .tz(timezone)
                .format('hh:mmA'),
            date: moment()
                .tz(timezone)
                .format('DD MMMM YYYY')
                .toUpperCase()
        });
    }
    componentDidMount() {
        this.setDateTime();
        this.intervalID = setInterval(this.setDateTime, 1000);
    }
    componentWillUnmount() {
        window.clearInterval(this.intervalID);
    }
    render() {
        const { date, time } = this.state;
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'solid solid solid none',
                    borderWidth: '1px',
                    borderColor: 'rgb(104,199,197)',
                    backgroundColor: 'rgb(25,151,164)',
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    paddingTop: '10px'
                }}
            >
                <div style={{ flex: 1, marginLeft: 15 }}>{time}</div>
                <div>|</div>
                <div style={{ flex: 1 }}>{date}</div>
            </div>
        );
    }
}

export default Clock;
