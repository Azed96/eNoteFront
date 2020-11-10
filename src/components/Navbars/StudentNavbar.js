import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ServiceAuth from "_services/auth.service"
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
    NavbarBrand,
    Row,
    Col
} from "reactstrap";

class StudentNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.currentUser = JSON.parse(localStorage.getItem('userStudent'));
        if ((this.currentUser == "") || (this.currentUser == null)){
            this.props.history.push('/auth/login');
        }
    }

    logout(){
        this.props.history.push('/auth');

    }


    render() {
        return (
            <>
                <Navbar className="navbar-top  navbar-dark" expand="md" id="navbar-main">
                    <Container className="px-4" >
                        <NavbarBrand  to="/" tag={Link} >
                            <img alt="..." height={ 100 }
                                            width={ 100 }
                                src={require("assets/img/brand/evry.png")} className={"img-fluid"} />
                        </NavbarBrand>
                        <button className="navbar-toggler" id="navbar-collapse-main">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link to="/">
                                        <img
                                            alt="eNote"
                                            sizes="100px"
                                            src={require("assets/img/brand/evry.png")}
                                        />
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button
                                        className="navbar-toggler"
                                        id="navbar-collapse-main"
                                    >
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                            <FormGroup className="mb-0">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fas fa-search" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Search" type="text" />
                                </InputGroup>
                            </FormGroup>
                        </Form>
                        <Nav className="align-items-center d-none d-md-flex" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img
                                                alt="..."
                                                src={require("assets/img/theme/etudiant.jpg")}
                                            />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm font-weight-bold">
                                                {this.currentUser && this.currentUser.prenom}{" "}{this.currentUser && this.currentUser.nom}
                                            </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem className="noti-title" header tag="div">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-single-02" />
                                        <span>My profile</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-settings-gear-65" />
                                        <span>Settings</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-calendar-grid-58" />
                                        <span>Activity</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/user-profile" tag={Link}>
                                        <i className="ni ni-support-16" />
                                        <span>Support</span>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <i className="ni ni-user-run" />
                                        <span onClick={() => {
                                            ServiceAuth.logout();
                                            this.logout();
                                        }
                                        }>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default withRouter (StudentNavbar);
