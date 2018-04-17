import React from 'react'
import { essentialNamespace, transportNamespace, miningNamespace, retailNamespace } from '../Constants';
// import EssentialIcon from './icons/ESSENTIAL_ICON.png';
// import MiningIcon from './icons/MINING_ICON.png';
// import RetailIcon from './icons/RETAIL_ICON.png';
// import TransportIcon from './icons/TRANSPORT_ICON.png';
import EssentialServiceHeader from './images/EssentialServices.jpg';
import MinesHeader from './images/MinesResources.jpg';
import RetailHeader from './images/RetailServices.jpg';
import TransportHeader from './images/CarHireTransport.jpg';
import SectionList from "../List/SectionList";

class ServiceInitialList extends React.Component {
    services = [
        {id: 1, title: 'ESSENTIAL SERVICES', url: essentialNamespace,},
        {id: 2, title: 'CAR HIRE & TRANSPORT', url: transportNamespace},
        {id: 3, title: 'MINING & RESOURCES', url: miningNamespace},
        {id: 4, title: 'RETAIL & SERVICES', url: retailNamespace}
    ];
    images = [
        EssentialServiceHeader,
        TransportHeader,
        MinesHeader,
        RetailHeader
    ]
    render() {
        return (
            <SectionList
                data={this.services}
                images={this.images}
                title="SERVICES"
                namespace=""
                linkFunction={(_, item) => {
                    return item.url;
                }}
                backgroundPositionValue="top"
            />
        );
    }
}

export default ServiceInitialList;