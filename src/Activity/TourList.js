import React from 'react';
import { removeHttp } from '../Constants';

class TourList extends React.Component {
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
    render() {
        const { data } = this.props;
        return (
            <div
                style={{
                    height: '100%',
                    overflowY: data.length > 2 ? 'auto' : 'hidden'
                }}
            >
                {data.map((tour, index) => {
                    const isLastItem = index === data.length - 1;
                    return (
                        <div
                            key={`${tour.id}-${index}`}
                            style={{
                                height: '50%',
                                backgroundColor: 'rgb(2,61,66)',
                                borderBottom: isLastItem
                                    ? 'none'
                                    : '2px solid rgb(105,194,209)',
                                display: 'flex'
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    ...this.styles.horizontalVerticalCenter,
                                    fontSize: '22px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    paddingTop: '10px'
                                }}
                            >
                                {tour.title}
                            </div>
                            {(tour.phone || tour.website) && (
                                <div
                                    style={{
                                        flex: 1,
                                        ...this.styles.horizontalVerticalCenter,
                                        flexDirection: 'column',
                                        fontSize: '18px',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    {tour.phone && <div>PH: {tour.phone}</div>}
                                    {tour.website && (
                                        <div>W: {removeHttp(tour.website)}</div>
                                    )}
                                </div>
                            )}
                            {tour.email && (
                                <div
                                    style={{
                                        flex: 1,
                                        ...this.styles.horizontalVerticalCenter,
                                        fontSize: '18px',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    E: {tour.email}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TourList;
