import React from 'react'
import { connect } from "react-redux";
import { getServiceTypeListBasedLocation, DECIMAL_RADIX, getServiceTypeDetailBasedLocation, imageGallery, HeavyOrange, serviceNamespace, LightBlueButtonBackground, ExtraHeavyBlueGreen, removeHttp } from '../Constants';
import ServiceBranch from './ServiceBranch';
import ServiceTypesIcon from '../Dining/icons/RestaurantListIcon.png';
import { Link } from "react-router-dom";

class ServiceDetail extends React.Component {
    constructor(props) {
        super(props);
        const data = this.retrieveData();
        this.state = {
            serviceType: (data.serviceTypes && data.serviceType && data.status) ? data.serviceType : null,
            service: (data.serviceTypes && data.serviceType && data.service && data.status) ? data.service : null,
            status: data.status,
            map: false
        }
        this.openMap = this.openMap.bind(this);
        this.closeMap = this.closeMap.bind(this);
    }
    retrieveData() {
        const { pathname } = this.props.location;
        const { essentialServiceTypeList : essential, miningServiceTypeList : mining, retailServiceTypeList : retail, transportServiceTypeList : transport } = this.props;
        const serviceTypesAndStatus = getServiceTypeListBasedLocation(pathname, { essential, mining, retail, transport });
        const { serviceTypes, status } = serviceTypesAndStatus;
        const serid = parseInt(this.props.match.params.serid, DECIMAL_RADIX);
        const serviceType =  (serviceTypes && serviceTypes.length > 0 && status) && serviceTypes.find(item => {
            return item.id === serid;
        });
        const { listKey } = getServiceTypeDetailBasedLocation(pathname);
        const serid2 = parseInt(this.props.match.params.serid2, DECIMAL_RADIX);
        const service = (serviceType && serviceType[listKey] && serviceType[listKey].length > 0) && serviceType[listKey].find(item => {
            return item.id === serid2;
        });
        return { serviceTypes, serviceType, service, status };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.serid2 !== this.props.match.params.serid2) {
            const { service, status } = this.retrieveData();
            this.setState({ service, status });
        }   
    }
    openMap() {
        this.setState({ map: true });
    }

    closeMap() {
        this.setState({ map: false });
    }
    renderImages() {
        const { service } = this.state;
        const { pathname } = this.props.location;
        const { imageKey } = getServiceTypeDetailBasedLocation(pathname);
        const images = service[imageKey];
        if (images.length > 1) {
            return imageGallery(images, "100%", "22.68vh");
        } else if (images.length === 1) {
            return (
                <div style={{ height: '42%', backgroundImage: `url(${images[0].imageFile})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
            );
        } else {
            return (
                <div style={{ height: '42%', backgroundColor: HeavyOrange, ...this.styles.horizontalVerticalCenter}}>
                    <h1>NO IMAGE FOR {service.title.toUpperCase()}</h1>
                </div>
            );
        }
    }
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
    render() {
        const { pathname } = this.props.location;
        const serviceTypeData = getServiceTypeDetailBasedLocation(pathname);
        const { serviceType, service, status } = this.state;
        if (serviceType && serviceType.isBranch) {
            return (
                <div style={{ height: '100%' }}>
                    {status === 200 && 
                        <ServiceBranch data={serviceType} serviceTypeData={serviceTypeData} id={service.id} />
                    }
                </div>
            );
        } else {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', color: 'white'}}>
                    <div style={{ backgroundColor: HeavyOrange, width: '14%', boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)', zIndex: 1}}> 
                        <Link style={{ height: '14%' }} to={serviceNamespace}>
                            <img src={ServiceTypesIcon} style={{ width: '33%' }} alt="Service Types Icon" />
                            <div style={{ color: 'white' }}>SERVICE TYPES</div>
                        </Link>
                        <Link style={{ height: '14%' }} to={serviceTypeData.namespace}>
                            <img src={serviceTypeData.icon} style={{ width: '33%' }} alt="Service Type Icon" />
                            <div style={{ color: 'white' }}>{serviceTypeData.title}</div>
                        </Link>
                        {status === 200 && 
                            <Link style={{ height: '14%' }} to={`${serviceTypeData.namespace}/${serviceType.id}`}>
                                <img src={serviceType.icon} style={{ width: '33%' }} alt="Service List Icon" />
                                <div style={{ color: 'white' }}>{serviceType.title.toUpperCase()}</div>
                            </Link>
                        } 
                        <div style={{ color: 'white', height: '86%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40pt', fontWeight: 500, letterSpacing: '10px'}}>
                            <span style={{transform: 'rotate(-90deg)'}}>SERVICES</span>
                        </div>
                    </div>
                    {status === 200 && 
                        <div style={{width: "86%"}}>
                            {this.renderImages()}
                            <div style={{ height: '58%' }}>
                                <div style={{ height: '26%', display: 'flex' }}>
                                    <div style={{ flexBasis: '33%', backgroundImage: `url(${service.logo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderWidth: "1px", borderStyle: "solid solid solid none", borderColor: "rgb(8,152,163)"}} />
                                    <div style={{flex: 1, backgroundColor: LightBlueButtonBackground, ...this.styles.horizontalVerticalCenter, borderWidth: "1px", borderStyle: "solid none solid solid", borderColor: "rgb(183,223,228)"}}>{service.title.toUpperCase()}</div>
                                </div>
                                <div style={{height: "74%", backgroundColor: ExtraHeavyBlueGreen, display: "flex"}}>
                                    <div style={{width: "50%", borderRight: '2px solid rgb(103,195,209)'}}>{service.description}</div>
                                    <div style={{width: "50%"}}>
                                        <div style={{height: "50%"}}>
                                            {service.phone && <div>CALL TODAY: {service.phone}</div>}
                                            {service.website && <div>WEB: {removeHttp(service.website)}</div>}
                                            {service.email && <div>EMAIL: {service.email}</div>}
                                            {service.address && <div>{service.address}</div>}
                                        </div>
                                        <div style={{height: "50%"}}>
                                            {service[serviceTypeData.mapKey].length > 0 && <div>SEE MAP</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            );
        }
    }
}

const mapStateToProps = ({ essentialServiceTypeList, miningServiceTypeList, retailServiceTypeList, transportServiceTypeList }) => {
    return {
        essentialServiceTypeList, miningServiceTypeList, retailServiceTypeList, transportServiceTypeList
    }
}
export default connect(mapStateToProps, null)(ServiceDetail);