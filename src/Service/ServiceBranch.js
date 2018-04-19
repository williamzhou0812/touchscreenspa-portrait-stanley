import React from 'react'
import { imageGallery, HeavyOrange, ExtraHeavyBlueGreen, LightBlueButtonBackground, removeHttp, serviceNamespace } from '../Constants';
import { Link } from "react-router-dom";
import ServiceTypesIcon from '../Dining/icons/RestaurantListIcon.png';

class ServiceBranch extends React.Component {
    constructor(props) {
        super(props);
        const { data, serviceTypeData, id } = this.props;
        const branches = data[serviceTypeData.listKey];
        let branchIndex = 0;
        if (id) {
            branchIndex = branches.findIndex(branch => {
                return branch.id === id;
            });
        }
        this.state = {
            branches,
            branchIndex: branchIndex !== -1 ? branchIndex : 0,
            map: false
        }
        this.openMap = this.openMap.bind(this);
        this.closeMap = this.closeMap.bind(this);
        this.prevBranch = this.prevBranch.bind(this);
        this.nextBranch = this.nextBranch.bind(this);
    }
    openMap() {
        this.setState({ map: true });
    }

    closeMap() {
        this.setState({ map: false });
    }
    prevBranch() {
        const { branches, branchIndex } = this.state;
        if (branchIndex === 0) {
            this.setState({ branchIndex: branches.length - 1 });
        } else {
            this.setState({ branchIndex: branchIndex - 1 });
        }
    }
    nextBranch() {
        const { branches, branchIndex } = this.state;
        if (branchIndex === (branches.length - 1)) {
            this.setState({ branchIndex: 0 });
        } else {
            this.setState({ branchIndex: branchIndex + 1 });
        }
    }
    styles = {
        horizontalVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
    renderImages() {
        const { serviceTypeData } = this.props;
        const { branches, branchIndex } = this.state;
        const { imageKey } = serviceTypeData;
        const images = branches[branchIndex][imageKey];
        if (images.length > 1) {
            return imageGallery(images, "100%", "22.68vh");
        } else if (images.length === 1) {
            return (
                <div style={{ height: '42%', backgroundImage: `url(${images[0].imageFile})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
            );
        } else {
            return (
                <div style={{ height: '42%', backgroundColor: HeavyOrange, ...this.styles.horizontalVerticalCenter}}>
                    <h1>NO IMAGE FOR {branches[branchIndex].title.toUpperCase()}</h1>
                </div>
            );
        }
    }
    render() {
        const { data, serviceTypeData } = this.props;
        const { branches, branchIndex } = this.state;
        const branch = branches[branchIndex];
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', color: 'white'}}>
                <div style={{ backgroundColor: HeavyOrange, width: '14%', boxShadow: '9.899px 0px 7px 0px rgba(0,0,0,0.6)', zIndex: 1}}> 
                    <Link style={{ height: '14%' }} to={serviceNamespace}>
                        <img src={ServiceTypesIcon} style={{ width: '33%' }} />
                        <div style={{ color: 'white' }}>SERVICE TYPES</div>
                    </Link>
                    <Link style={{ height: '14%' }} to={serviceTypeData.namespace}>
                        <img src={serviceTypeData.icon} style={{ width: '33%' }} />
                        <div style={{ color: 'white' }}>{serviceTypeData.title}</div>
                    </Link>
                    <div style={{ fontSize: '28pt', transform: 'rotate(-90deg)', color: 'white', height: '86%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40pt', fontWeight: 500, letterSpacing: '10px'}}>
                        SERVICES
                    </div>
                </div>
                <div style={{width: "86%"}}>
                    {this.renderImages()}
                    <div style={{height: "58%"}}>
                        <div style={{ height: '26%', display: 'flex' }}>
                            <div style={{ flexBasis: '33%', backgroundImage: `url(${branch.logo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderWidth: "1px", borderStyle: "solid solid solid none", borderColor: "rgb(8,152,163)"}} />
                            <div style={{flex: 1, backgroundColor: LightBlueButtonBackground, ...this.styles.horizontalVerticalCenter, borderWidth: "1px", borderStyle: "solid none solid solid", borderColor: "rgb(183,223,228)"}}>{data.title.toUpperCase()}</div>
                        </div>
                        <div style={{height: "74%", display: "flex"}}>
                            <div style={{width: "50%", backgroundColor: ExtraHeavyBlueGreen, borderRight: '2px solid rgb(103,195,209)'}}>{branch.description}</div>
                            <div style={{width: "50%"}}>
                                <div style={{height: "28%"}}>
                                    <div style={{height: "50%", display: "flex"}}>
                                        <div style={{flex: 1, ...this.styles.horizontalVerticalCenter, backgroundColor: LightBlueButtonBackground}} onClick={this.prevBranch}>PREVIOUS</div>
                                        <div style={{flex: 1, ...this.styles.horizontalVerticalCenter, backgroundColor: "rgb(75,175,188)", color: "rgb(0,109,121)"}}>LOCATION</div>
                                        <div style={{flex: 1, ...this.styles.horizontalVerticalCenter, backgroundColor: LightBlueButtonBackground}} onClick={this.nextBranch}>NEXT</div>
                                    </div>
                                    <div style={{height: "50%", ...this.styles.horizontalVerticalCenter, backgroundColor: "rgb(183,223,228)", color: "rgb(0,109,121)"}}>{branch.title.toUpperCase()}</div>
                                </div>
                                <div style={{height: "72%", backgroundColor: ExtraHeavyBlueGreen}}>
                                    <div style={{height: "69%", ...this.styles.horizontalVerticalCenter, flexDirection: "column"}}>
                                        {branch.phone && <div>CALL TODAY: {branch.phone}</div>}
                                        {branch.website && <div>WEB: {removeHttp(branch.website)}</div>}
                                        {branch.email && <div>EMAIL: {branch.email}</div>}
                                        {branch.address && <div>{branch.address}</div>}
                                    </div>
                                    <div style={{height: "31%", ...this.styles.horizontalVerticalCenter}}>
                                        {branch[serviceTypeData.mapKey].length > 0 && <div>SEE MAP</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceBranch;