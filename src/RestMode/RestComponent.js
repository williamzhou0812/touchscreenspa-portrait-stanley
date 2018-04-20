import React from 'react';
import RestVideo from './RestVideo';
import RestStaticAds from './RestStaticAds';

export const RestComponent = (props) => {
    return(
        <div style={{height: "100%"}}>
            <div style={{height: "12%"}}>INTERNAL PROMOTION SPACE</div>
            <div style={{height: "43%"}}><RestVideo /></div>
            <div style={{height: "55%"}}><RestStaticAds /></div>
        </div>
    )
}

export default RestComponent;