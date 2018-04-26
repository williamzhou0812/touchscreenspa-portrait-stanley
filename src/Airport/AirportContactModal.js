import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import './airportmodal.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { LightBlueButtonBackground } from '../Constants';
class AirportContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ showModal: true });
    }
    closeModal() {
        this.setState({ showModal: false });
    }
    render() {
        const { logo, contacts } = this.props;
        const { showModal } = this.state;
        return (
            <div>
                <div
                    onClick={this.openModal}
                    style={{
                        height: '70px',
                        width: '100%',
                        backgroundColor: LightBlueButtonBackground,
                        borderRadius: '5px',
                        fontSize: '24px',
                        fontWeight: 600,
                        boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '5px',
                        letterSpacing: '3px'
                    }}
                >
                    AIRPORT CONTACTS
                </div>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Body>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            <MuiThemeProvider>
                                <CloseIcon
                                    onClick={this.closeModal}
                                    color="rgb(128,130,132)"
                                    style={{
                                        padding: 0,
                                        height: 32,
                                        width: 32
                                    }}
                                />
                            </MuiThemeProvider>
                        </div>
                        <div
                            style={{
                                height: '350px',
                                backgroundImage: `url(${logo})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center'
                            }}
                        />
                        <div
                            style={{
                                height: '88px',
                                backgroundColor: 'rgb(13,109,121)',
                                letterSpacing: 5,
                                fontSize: '30pt',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            KEY AIRPORT CONTACTS
                        </div>
                        <div
                            style={{
                                backgroundColor: 'rgb(25,150,162)',
                                padding: 20,
                                display: 'flex',
                                flexWrap: 'wrap',
                                fontSize: '16px',
                                letterSpacing: '1px'
                            }}
                        >
                            <div
                                style={{ flexBasis: '50%', paddingBottom: 20 }}
                            >
                                <div style={{ fontWeight: 'bold' }}>
                                    PMIA Head Office
                                </div>
                                <div className="contact_type">ADDRESS</div>
                                <div>Domestic Terminal, Level 1</div>
                                <div>7 Mile Morea Tobo Road</div>
                                <div>Port Moresby, Papua New Guinea</div>
                                <div className="contact_type">
                                    POSTAL ADDRESS
                                </div>
                                <div>National Airports Corporation</div>
                                <div>PO BOX 684, BOROKO</div>
                                <div>National Capital District</div>
                                <div className="contact_type">
                                    PHONE{' '}
                                    <span style={{ color: 'white' }}>
                                        (675) 324 4762
                                    </span>
                                </div>
                                <div className="contact_type">
                                    PHONE (ALT){' '}
                                    <span style={{ color: 'white' }}>
                                        (675) 324 4735
                                    </span>
                                </div>
                                <div className="contact_type">
                                    FAX{' '}
                                    <span style={{ color: 'white' }}>
                                        (675) 325 0823
                                    </span>
                                </div>
                                <div className="contact_type">
                                    EMAIL{' '}
                                    <span style={{ color: 'white' }}>
                                        PMA_Apt@nac.com.pg
                                    </span>
                                </div>
                            </div>
                            {contacts.map(contact => {
                                return (
                                    <div
                                        key={contact.id}
                                        style={{
                                            flexBasis: '50%',
                                            paddingBottom: 20
                                        }}
                                    >
                                        {contact.title && (
                                            <div style={{ fontWeight: 'bold' }}>
                                                {contact.title.toUpperCase()}
                                            </div>
                                        )}
                                        {contact.phone && (
                                            <div className="contact_type">
                                                PHONE{' '}
                                                <span
                                                    style={{ color: 'white' }}
                                                >
                                                    {contact.phone}}
                                                </span>
                                            </div>
                                        )}
                                        {contact.fax && (
                                            <div className="contact_type">
                                                FAX{' '}
                                                <span
                                                    style={{ color: 'white' }}
                                                >
                                                    {contact.fax}}
                                                </span>
                                            </div>
                                        )}
                                        {contact.email && (
                                            <div className="contact_type">
                                                EMAIL{' '}
                                                <span
                                                    style={{ color: 'white' }}
                                                >
                                                    {contact.email}}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ airport: airportDetail }) => {
    const { airport } = airportDetail;
    const { logo, airportAirportContact: contacts } = airport;
    return {
        logo,
        contacts
    };
};
export default connect(mapStateToProps, null)(AirportContactModal);
