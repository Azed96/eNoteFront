
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import {Card, CardBody, CardTitle,Table, Container, Row, Col, CardHeader} from "reactstrap";

import Header from "components/Headers/Header.js";

class ListeEtudiantByIdMatiere extends React.Component {
    

    constructor(props){
        super(props);
        this.currentuser = AuthService.getCurrentUser();
        if(this.currentuser == ""){
            this.props.history.push('/auth');
        }
        this.state ={
            listeEtudiantbyMatiereID : [],
            idProf: this.currentuser.id,
            idMatiere: this.props.match.params.id,
            infoMatiere: {}
        };
        this.getInfoMatiere();
       // this.getListeEtudiantMat();

    }
        
    getListeEtudiantMat(){
        let infoMatiere = {
            idMatiere: this.state.idMatiere,
            idProf: this.state.idProf
        };
        MatiereService.getNotesEtudiant(infoMatiere)
        .then(response =>{
            this.setState({
                listeEtudiantbyMatiereID : response
            });
            console.log("les Notes "+this.state.listeEtudiantbyMatiereID);
        });

    }

    getInfoMatiere(){
        MatiereService.getMatiereByid(this.state.idMatiere)
        .then(res =>{
            this.setState({
                infoMatiere : res
            });
        });
    }
       
  
    
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          <div className="col">
            <Card className="shadow">
                <CardHeader className="border-0">
                   <h3 className="mb-0 text-center"> Liste des étudiants de module <strong> {this.state.infoMatiere.nom}</strong> de la filiere <strong>{this.state.infoMatiere.nomFiliere}</strong> </h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Status</th>
                      <th scope="col">Users</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                </Table>
            </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ListeEtudiantByIdMatiere;
