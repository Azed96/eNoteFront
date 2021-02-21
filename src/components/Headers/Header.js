
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import AdminService from "../../_services/AdminService"




class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nomberEtudiant : 0,
      nomberProf : 0,
      nomberFiliere : 0,
      nomberMatiere : 0
      }

      
    }

    componentDidMount() {
      AdminService.getCountEtudiant().then(res =>{
        this.state.nomberEtudiant = res.data;
      });
      AdminService.getCountAllProf().then(res =>{
        this.state.nomberProf = res.data;
      });
      AdminService.getCountAllMatiere().then(res =>{
        this.state.nomberMatiere = res.data;
      });
      AdminService.getCountAllFiliere().then(res =>{
        this.state.nomberFiliere = res.data;
      });

    }



  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Etudiant Inscrit cette année
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.nomberEtudiant}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 100%
                        </span>{" "}
                        <span className="text-nowrap">depuis l'année dernière</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                             Enseignants
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.state.nomberProf}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 100%
                        </span>{" "}
                        <span className="text-nowrap">depuis l'année dernière</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                           Nombre de Matière
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.nomberMatiere}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 100%
                        </span>{" "}
                        <span className="text-nowrap">depuis l'année dernière</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Nombre de Filière
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.state.nomberFiliere}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 100%
                        </span>{" "}
                        <span className="text-nowrap">depuis l'année dernière</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
