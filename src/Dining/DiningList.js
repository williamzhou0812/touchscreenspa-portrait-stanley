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
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        {item.title.toUpperCase()}
                                    </div>
                                    <div
                                        style={{
                                            height: '33%',
                                            display: 'flex',
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        {item.cuisine}
                                    </div>
                                </div>
                            );
                        } else {
                            return item.title.toUpperCase();
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
