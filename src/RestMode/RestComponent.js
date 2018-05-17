import React from 'react';
import RestVideo from './RestVideo';
import RestStaticAds from './RestStaticAds';
import RestInternalAds from './RestInternalAds';

export const RestComponent = props => {
    return (
        <div style={{ height: '100%' }} className="section--rotate--animation">
            <div style={{ height: '12%' }}>
                <RestInternalAds />
            </div>
            <div style={{ height: '43%' }}>
                <RestVideo />
            </div>
            <div style={{ height: '45%' }}>
                <RestStaticAds />
            </div>
        </div>
    );
};

export default RestComponent;
