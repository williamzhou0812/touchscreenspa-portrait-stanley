import React from 'react'
import { removeHttp } from '../Constants';

class TourList extends React.Component {
    styles = {
        horizontalVerticalCenter: {display: "flex", alignItems: "center", justifyContent: "center"}
    }
    render() {
        const { data } = this.props;
        return (
            <div style={{height: "100%", overflowY: "auto"}}>
                {data.map((tour, index) => {
                    const isLastItem = index === data.length - 1;
                    return (
                        <div key={`${tour.id}-${index}`} style={{height: "50%", backgroundColor: "rgb(2,61,66)", borderBottom: isLastItem ? "none" : "2px solid rgb(105,194,209)", display: "flex"}}>
                            <div style={{flex: 1, ...this.styles.horizontalVerticalCenter}}>{tour.title}</div>
                            {(tour.phone || tour.website) && 
                                <div style={{flex: 1, ...this.styles.horizontalVerticalCenter, flexDirection: "column"}}>
                                    {tour.phone && <div>PH: {tour.phone}</div>}
                                    {tour.website && <div>W: {removeHttp(tour.website)}</div>}
                                </div>
                            }
                            {tour.email && 
                                <div style={{flex: 1, ...this.styles.horizontalVerticalCenter}}>E: {tour.email}</div>
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TourList;