
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import {Card, CardBody, CardTitle, Container, Row, Col} from "reactstrap";

import Header from "components/Headers/Header.js";

class Icons extends React.Component {
    

    constructor(props){
        super(props);
        this.state ={
            listeMatiere : []
        };
        this.currentuser = AuthService.getCurrentUser();
        if(this.currentuser == ""){
            this.props.history.push('/auth');
        }
        
        this.RecupMatieres();

       
    }
  
    RecupMatieres(){
        MatiereService.getMatiereProf(this.currentuser.id)
        .then(response =>{
            this.setState({listeMatiere : response}); 
            console.log("matiers"+this.state.listeMatiere);
            });
    }
    
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container fluid>
        <Row >

          {/* Table */}
          {
              this.state.listeMatiere.map(
                  matiere =>
                  <Col lg="3" md="6">
                  <Card className="card-stats mb-4 mb-xl-0" key={matiere.nom}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {matiere.nomFiliere}
                          </CardTitle>
                          <span className="h4 text-sm mb-0">
                            Module:
                          </span> {" "}
                          <span className="h3 font-weight-bold mb-0">
                          {matiere.nom}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-nowrap">{this.currentuser.prenom}{" "}{this.currentuser.nom}</span>
                      </p>
                    </CardBody>
                  </Card>
                  <br/>
                </Col>
                  
              )
          }
           
           </Row>
          
           

        
        </Container>
      </>
    );
  }
}

export default Icons;
