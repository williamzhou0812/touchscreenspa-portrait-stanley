import React from 'react'
import { connect } from "react-redux";
import { getServiceTypeListBasedLocation, DECIMAL_RADIX, getServiceTypeDetailBasedLocation, serviceNamespace } from '../Constants';
import ServiceTypesIcon from '../Dining/icons/RestaurantListIcon.png';
import ServiceBranch from './ServiceBranch';
import SubsectionList from "../List/SubsectionList";

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        const data = this.retrieveData();
        this.state = {
            serviceType: (data.serviceTypes && data.serviceType && data.status) ? data.serviceType : null,
            status: data.status,
        }
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
        return { serviceTypes, serviceType, status };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.serid !== this.props.match.params.serid) {
            const { serviceType, status } = this.retrieveData();
            this.setState({ serviceType, status });
        }   
    }
    render() {
        const { history, location } = this.props;
        const { serviceType, status } = this.state;
        const serviceTypeData = getServiceTypeDetailBasedLocation(location.pathname);
        const { listKey } = serviceTypeData;
        if (status !== 200) {
            return <div />
        }
        if (serviceType.isBranch) {
            return (
                //Render differently if service type is a branch type
                <ServiceBranch data={serviceType} serviceTypeData={serviceTypeData} />
            );
        } else if (serviceType[listKey].length === 1) {
            //Redirect if service list is only one
            history.replace(`${serviceTypeData.namespace}/${serviceType.id}/${serviceType[listKey][0].id}`);
            return <div />
        } else {
            return (
                //Return normal service list
                <SubsectionList
                    numberOfEntries={4}
                    data={serviceType[listKey]}
                    imageKey="logo"
                    isImageArray={false}
                    sideButtons={[
                        {title: "SERVICE TYPES", icon: ServiceTypesIcon, link: serviceNamespace, isLink: true},
                        {title: serviceTypeData.title, icon: serviceTypeData.icon, link: serviceTypeData.namespace, isLink: true},
                    ]}
                    sideTitle="SERVICES"
                    mainTitle={serviceType.title}
                    namespace={`${serviceTypeData.namespace}/${serviceType.id}`}
                />
            );
        }
    }
}

const mapStateToProps = ({ essentialServiceTypeList, miningServiceTypeList, retailServiceTypeList, transportServiceTypeList }) => {
    return {
        essentialServiceTypeList, miningServiceTypeList, retailServiceTypeList, transportServiceTypeList
    }
}
export default connect(mapStateToProps, null)(ServiceList);