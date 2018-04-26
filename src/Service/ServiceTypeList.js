import React from 'react'
import { connect } from "react-redux";
import { retailNamespace, getServiceTypeListBasedLocation, getServiceTypeDetailBasedLocation, serviceNamespace } from '../Constants';
import SubsectionList from '../List/SubsectionList';
import ServiceTypesIcon from '../Dining/icons/RestaurantListIcon.png';

class ServiceTypeList extends React.Component {
    constructor(props) {
        super(props);
        const data = this.retrieveData();
        this.state = {
            serviceTypes: (data.serviceTypes && data.status) ? data.serviceTypes : null,
            status: (data.serviceTypes && data.status) ? data.status : null,
        }
    }
    retrieveData() {
        const { pathname } = this.props.location;
        const { essentialServiceTypeList : essential, miningServiceTypeList : mining, retailServiceTypeList : retail, transportServiceTypeList : transport } = this.props;
        return getServiceTypeListBasedLocation(pathname, { essential, mining, retail, transport });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const data = this.retrieveData();
            this.setState({
                serviceTypes: (data.serviceTypes && data.status) ? data.serviceTypes : null,
            });
        }
    }
    render() {
        const { title, namespace } = getServiceTypeDetailBasedLocation(this.props.location.pathname);
        const { serviceTypes, status } = this.state;
        if (this.props.location.pathname.includes(retailNamespace)) {
            //Custom Rule for Retail Service Type List since the image for the list is using the retail logo
            return (
                <div style={{height: "100%"}}>
                    {status === 200 && 
                        <SubsectionList
                            numberOfEntries={4}
                            data={serviceTypes}
                            imageKey="imageServiceType"
                            isImageArray={true}
                            sideButtons={[
                                {title: "SERVICE TYPES", icon: ServiceTypesIcon, isLink: true, link: serviceNamespace }
                            ]}
                            sideTitle="SERVICES"
                            mainTitle={title}
                            namespace={namespace}
                        />
                    }
                </div>
            );
        } else {
            return (
                <div style={{height: "100%"}}>
                    {status === 200 && 
                        <SubsectionList
                            numberOfEntries={4}
                            data={serviceTypes}
                            imageKey="icon"
                            isImageArray={false}
                            sideButtons={[
                                {title: "SERVICE TYPES", icon: ServiceTypesIcon, isLink: true, link: serviceNamespace }
                            ]}
                            sideTitle="SERVICES"
                            mainTitle={title}
                            namespace={namespace}
                            useBackgroundImage={false}
                            imgStyle={{width: "50%"}}
                        />
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
export default connect(mapStateToProps, null)(ServiceTypeList);