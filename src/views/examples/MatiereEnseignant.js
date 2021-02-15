
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import adminService from "../../_services/AdminService"
import CoursService from "../../_services/cours.service"

import { Card, CardBody, CardTitle, Container, Row, Col, Modal, ModalHeader, ModalBody, Form,ModalFooter,Button } from "reactstrap";

import Header from "components/Headers/Header.js";

class MatiereEnseignant extends React.Component {


    constructor(props) {
        super(props);
        this.CompListEtudiantNote = this.CompListEtudiantNote.bind(this);
        this.toggle = this.toggle.bind(this);


        this.state = {
            listeMatiere: [],
            pos :undefined, 
            modal: false,
            tmpNomMatiere : ''
            
        };
        this.currentuser = AuthService.getCurrentUser();
        if (this.currentuser == "") {
            this.props.history.push('/auth');
        }

        this.RecupMatieres();


    }

    RecupMatieres() {
        MatiereService.getMatiereProf(this.currentuser.id)
            .then(response => {
                response.forEach(element => {
                    adminService.getFiliereById(element.idFiliere).then(re => {
                        element.anneSco = re.data.anneeScolaire;
                        CoursService.geCoursByidMatiere(element.id).then(coursRes => {
                            element.listeCours = coursRes;
                            console.log("cours "+ JSON.stringify( element.listeCours));
                            this.setState(state => {
                                const listeMatiere = [...state.listeMatiere, element];
                                return {
                                    listeMatiere
                                }
                            });
                        })
                        
                    });
                });
                

            });

            

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    CompListEtudiantNote(id) {
        this.props.history.push(`/admin/etudiant-matiere/${id}`);
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
                                (matiere,index) =>
                                    <Col lg="3" md="6" key={matiere.nom} >
                                        <Card className="card-stats mb-4 mb-xl-0" >
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
                                                            <strong>{matiere.nom}</strong> 
                                                        </span>
                                                        <br/><br/>
                                                        <span className="h4 text-sm mb-0">
                                                            Année universitaire : {" "} {matiere.anneSco}
                                                        </span>

                                                       
                                                       
                                                       
                                                    </div>

                                                    <Col className="col-auto">
                                                        <button
                                                            className=" btn btn-info"
                                                            
                                                            onClick={() => this.CompListEtudiantNote(matiere.id)}
                                                        >
                                                            
                                                                <i className=" ni ni-bullet-list-67" /> {"  "} Liste des étudiants
                                                        </button>

                                                        <button
                                                            className=" btn btn-light"
                                                            
                                                            onClick={() => this.setState({
                                                                modal: !this.state.modal,
                                                                pos: index,
                                                                tmpNomMatiere : matiere.nom
                                                            })}
                                                        >
                                                                <i className=" ni ni-bullet-list-67" /> {"  "} Liste des cours
                                                        </button>
                                                       


                                                    </Col>
                                                </Row>
                                                <p className="mt-3 mb-0 text-muted text-sm">
                                                    <span className="text-nowrap">{this.currentuser.prenom}{" "}{this.currentuser.nom}</span>
                                                </p>
                                            </CardBody>
                                        </Card>
                                        <br />

                                    </Col>

                            )
                        }

                    </Row>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '1600px', width: '60%',margin: '310px auto'}}>
                            <ModalHeader  toggle={this.toggle} cssModule={{'modal-title': 'w-100 text-center'}}> <h1> Liste des Cours de la matière <strong> 
                                {this.state.tmpNomMatiere} </strong> </h1></ModalHeader>
                            <ModalBody>
                                     <Form role="form">
                                        
                                           
                                    </Form>                         
                                     </ModalBody>
                            <ModalFooter>
                                <Button color='danger' onClick={this.toggle}>Quitter</Button>
                            </ModalFooter>
                        </Modal>
                    




                </Container>
            </>
        );
    }
}

export default MatiereEnseignant;
