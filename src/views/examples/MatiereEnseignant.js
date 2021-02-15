
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import adminService from "../../_services/AdminService"
import CoursService from "../../_services/cours.service"
import axios from 'axios'


import { Card, CardBody, CardTitle, Container, Row, Col, Modal, ModalHeader, ModalBody, Form,ModalFooter,Button,Table,Input,FormGroup } from "reactstrap";

import Header from "components/Headers/Header.js";

class MatiereEnseignant extends React.Component {


    constructor(props) {
        super(props);
        this.CompListEtudiantNote = this.CompListEtudiantNote.bind(this);
        this.toggle = this.toggle.bind(this);
       // this.uploadHandler = this.uploadHandler(this);
        //this.fileChangedHandler = this.fileChangedHandler(this);


        this.state = {
            listeMatiere: [],
            pos :undefined, 
            modal: false,
            tmpNomMatiere : '',
            tmpListCours: [],
            selectedFile: null
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

    fileChangedHandler = (event) => {
        this.setState({
            selectedFile : event.target.files[0]
        }) 
      }

      uploadHandler = () => {
        const formData = new FormData();
        formData.append(
          'file',
          this.state.selectedFile
        )
        axios.post('http://localhost:7400/file/upload', formData, {
            onUploadProgress: progressEvent => {
              console.log(progressEvent.loaded / progressEvent.total)
            }
          })
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
                                    <Col lg="3" md="6" key={matiere.nom} responsive >
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
                                                                tmpNomMatiere : matiere.nom,
                                                                tmpListCours : matiere.listeCours
                                                            })}
                                                        >
                                                                <i className=" ni ni-bullet-list-67" /> {"  "} Liste des cours
                                                        </button>
                                                       
                                                       
                                                    </div>

                                                   
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
                                     <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                        
                                                <Input type="file" onChange={this.fileChangedHandler}/>

                                                </FormGroup>
                                            </Col>
                                        </Row>

                                     </div>

                                     
                                     <Button color='success' className="my-4" onClick={this.uploadHandler}>Enregister</Button>
                                        
                                    </Form>   
                                    <Table className="align-items-center table-flush"  >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nom du cours</th>
                                            <th scope="col">Date de création</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.tmpListCours.map(
                                                (cours,index) =>
                                                <tr key={cours.id}>
                                                    <td scope="col">{index}</td>
                                                    <td scope="col">{cours.nom}</td>
                                                    <td scope="col">{cours.dateCreation}</td>
                                                    <td scope="col">
                                                        <Button color='info' onClick={this.toggle}><i className=" ni ni-cloud-download-95" /></Button>
                                                        <Button color='danger' onClick={this.toggle}>Supprimer</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                    </Table>
   
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onClick={this.toggle}>Quitter</Button>
                            </ModalFooter>
                        </Modal>
                    




                </Container>
            </>
        );
    }
}

export default MatiereEnseignant;
