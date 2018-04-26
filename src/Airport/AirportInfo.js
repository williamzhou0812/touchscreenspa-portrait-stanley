import React from 'react';
import { connect } from 'react-redux';
import { HeavyOrange, ExtraHeavyBlueGreen } from '../Constants';
import AirportInfoModal from './AirportInfoModal';
import AirportContactModal from './AirportContactModal';

class AirportInfo extends React.Component {
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
    render() {
        const { mainImage, airport } = this.props;
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    color: 'white'
                }}
                className="section--bottom--animation"
            >
                <div
                    style={{
                        backgroundColor: HeavyOrange,
                        width: '14%',
                        boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)',
                        zIndex: 1,
                        display: 'flex'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            width: '100%',
                            fontSize: '40pt',
                            ...this.styles.horizontalVerticalCenter,
                            fontWeight: 500,
                            letterSpacing: '10px'
                        }}
                    >
                        <span
                            style={{
                                transform: 'rotate(-90deg)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            AIRPORT INFO
                        </span>
                    </div>
                </div>
                <div style={{ width: '86%' }}>
                    <div
                        style={{
                            height: '42%',
                            backgroundImage: `url(${mainImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div
                        style={{
                            height: '18%',
                            ...this.styles.horizontalVerticalCenter,
                            backgroundColor: 'rgb(224,172,68)',
                            flexDirection: 'column',
                            position: 'relative',
                            boxShadow: '0px 7px 5px 0px rgba(0,0,0,0.6)'
                        }}
                    >
                        <div
                            style={{
                                fontSize: '28px',
                                letterSpacing: '3px',
                                position: 'absolute',
                                transform: 'translateY(-50px)'
                            }}
                        >
                            WELCOME TO
                        </div>
                        <div
                            style={{
                                fontFamily: 'The Braggest',
                                fontSize: '70pt',
                                position: 'absolute',
                                transform: 'translateY(15px)'
                            }}
                        >
                            PORT MORESBY AIRPORT
                        </div>
                    </div>
                    <div
                        style={{
                            height: '40%',
                            backgroundColor: ExtraHeavyBlueGreen
                        }}
                    >
                        <div
                            style={{
                                height: '75%',
                                display: 'flex',
                                paddingTop: '25px',
                                paddingLeft: '35px'
                            }}
                        >
                            <div style={{ flexBasis: '66%' }}>
                                <div
                                    style={{
                                        textAlign: 'left',
                                        fontSize: '28px',
                                        letterSpacing: '3px'
                                    }}
                                >
                                    GREETINGS {'&'} WELCOME
                                </div>
                                <div
                                    style={{
                                        textAlign: 'left',
                                        fontSize: '16px',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    On behalf of the Minister of Civil Aviation
                                    and the Board of Directors I welcome you to
                                    the National Airports Corporation. We are
                                    grateful that you have taken time to read
                                    about who we are, what we are doing and what
                                    we plan to do. NAC owns and operate 22
                                    Airports across Papua New Guinea. We are
                                    committed to providing you a seamless travel
                                    experience through our airports. Like any
                                    other industry, this is a critical time for
                                    NAC given the challenges posed by technology
                                    and increased customer expectations. Our job
                                    is to ensure that NAC thrives despite those
                                    challenges, and deliver expectations held by
                                    our stakeholders.
                                </div>
                            </div>
                            <div
                                style={{
                                    flexBasis: '34%',
                                    ...this.styles.horizontalVerticalCenter,
                                    flexDirection: 'column'
                                }}
                            >
                                <div
                                    style={{
                                        border: '1px solid white',
                                        boxShadow:
                                            '5px 5px 5px 0px rgba(0,0,0,0.6)'
                                    }}
                                >
                                    <img
                                        src={airport.directorImage}
                                        style={{ height: '60%' }}
                                        alt="Airport Director"
                                    />
                                </div>
                                <div
                                    style={{
                                        fontSize: '20px',
                                        letterSpacing: '3px',
                                        paddingTop: '10px'
                                    }}
                                >
                                    {airport.directorName}
                                </div>
                                <div
                                    style={{
                                        fontSize: '16px',
                                        letterSpacing: '3px'
                                    }}
                                >
                                    Managing Director {'&'} CEO
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                height: '25%',
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    paddingLeft: '35px',
                                    paddingRight: '17px'
                                }}
                            >
                                <AirportInfoModal />
                            </div>

                            <div
                                style={{
                                    width: '100%',
                                    paddingRight: '35px',
                                    paddingLeft: '17px',
                                    paddingBottom: '35px'
                                }}
                            >
                                <AirportContactModal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ airport: airportInfo }) => {
    const { airport, mainImage } = airportInfo;
    return {
        airport,
        mainImage
    };
};
export default connect(mapStateToProps, null)(AirportInfo);
