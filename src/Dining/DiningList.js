import React from 'react';
import { connect } from 'react-redux';
import SubsectionList from '../List/SubsectionList';
import { diningNamespace } from '../Constants';

class DiningList extends React.Component {
    render() {
        const { restaurants } = this.props;
        return (
            <div
                className="section--bottom--animation"
                style={{ width: '100%', height: '100%' }}
            >
                <SubsectionList
                    numberOfEntries={4}
                    data={restaurants}
                    sideTitle="DINING"
                    mainTitle="LIST OF RESTAURANTS"
                    imageKey="logo"
                    isImageArray={false}
                    namespace={diningNamespace}
                    renderText={item => {
                        if (item.cuisine) {
                            return (
                                <div style={{ height: '100%' }}>
                                    <div
                                        style={{
                                            height: '33%',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingTop: 60,
                                            paddingLeft: 35,
                                            fontSize: '24px',
                                            letterSpacing: '3px'
                                        }}
                                    >
                                        {item.title.toUpperCase()}
                                    </div>
                                    <div
                                        style={{
                                            height: '33%',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            marginTop: 10,
                                            marginLeft: 35,
                                            fontSize: '24px',
                                            letterSpacing: '3px'
                                        }}
                                    >
                                        {item.cuisine}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <span
                                    style={{
                                        paddingLeft: 35,
                                        fontSize: '24px',
                                        letterSpacing: '3px'
                                    }}
                                >
                                    {item.title.toUpperCase()}
                                </span>
                            );
                        }
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ restaurantList }) => {
    const { restaurants } = restaurantList;
    return {
        restaurants
    };
};
export default connect(mapStateToProps, null)(DiningList);
