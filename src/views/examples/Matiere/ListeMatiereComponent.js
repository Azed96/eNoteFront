import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import MatiereService from "_services/matiere.service";
import ImportService from '../../../_services/ImportService';

import {
    Card, Container, Row, CardHeader, Table, Col, Input, FormGroup, CardBody, Button, ModalBody, Modal, ModalHeader,ModalFooter
} from "reactstrap";

class ListeMatiereComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matieres: [],
            modal: false,
            modalImport:null,
            pos: undefined,
            erreurfichier : false
        }
        this.addMatiere = this.addMatiere.bind(this);
        this.editMatiere = this.editMatiere.bind(this);
        this.deleteMatiere = this.deleteMatiere.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fileChangedHandler= this.fileChangedHandler.bind(this);
        this.importerMatiere = this.importerMatiere.bind(this);

    }

    componentDidMount() {
        this.setState({
            matieres:[]
        })
        AdminService.getAllMatiere().then((response) => {
            response.data.forEach(element => {
                AdminService.getProfById(element.idProf).then(a => {
                    element.nomProf = a.data.nom;
                    element.ineProf = a.data.ine;
                    this.setState(state => {
                        const matieres = [...state.matieres, element];

                        return {
                            matieres,
                        };
                    });
                })
            });
        });


    }

    addMatiere() {
        this.props.history.push(`/administrateur/add-update-matiere/:id`);
    }
    editMatiere(id) {
        this.props.history.push(`/administrateur/add-update-matiere/${id}`);
    }
    viewMatiere(id) {
        this.props.history.push(`/administrateur/ViewMatiereComponent/${id}`);
    }

    deleteMatiere(id) {
        AdminService.deleteMatiere(id).then(reponse => {
            this.setState({
                matieres: this.state.matieres.filter(matiere => matiere.id != id),
                pos: undefined,
                modal: !this.state.modal
            });
        });
        MatiereService.getNotesByIdMatiere(id)
            .then(resNotes => {
                resNotes.forEach(note => {
                    MatiereService.deleteNoteId(note.id);
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
            selectedFile: event.target.files[0]
        })
    }


    importerMatiere = ()=>{
        
        
           console.log("rentre dans le import")
           
                const formData = new FormData();
                formData.append(
                    'file',
                    this.state.selectedFile
                )
                console.log("form DATA"+formData);
                
                ImportService.uploadMatiere(formData).then(res=>{
                    if (res === "Request failed with status code 500") {
                        this.setState({
                            erreurfichier: true
                        })
                    } else {
                        this.state.modalImport = false;
                        this.componentDidMount();
                    }

                });

    
    }
 

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}> <h3>Êtes vous sûr de supprimer ce module ?</h3></ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            <Button className="my-4 " color="danger" type="button"
                                onClick={() => this.deleteMatiere(this.state.matieres[this.state.pos].id)}
                            >
                                Oui
                               </Button>
                            <Button color='info' onClick={this.toggle}>Non</Button>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={this.state.modalImport} >
                        <ModalHeader >
                            <div className="text-center">
                            <h3 >Import des matières</h3>
                            </div>
                        </ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            
                        

                        <Input type="file" color='info' className="form-control" onChange={this.fileChangedHandler} />


                        <Button color='success' className="my-4" onClick={this.importerMatiere}>Importer </Button>
                        {this.state.erreurfichier && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        Erreur d'insertion, Veuillez refaire votre requête SVP
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            
                        <Button color="danger" onClick={()=> {
                                                                 this.setState({

                                                                    modalImport: false,

                                                                });
                                                            }}> Fermer
                                                             </Button>

                        </ModalFooter>

                    </Modal>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                            <CardHeader className="border-0">
                                    <Row>
                                    <Col lg="1">
                                        </Col>
                                        <Col lg="7">
                                        <h3 className="mb-0 text-center"> Liste des Matiéres  </h3>
                                        </Col>
                                       
                                        <Col lg="1">

                                       
                                          <Button color="success" onClick={()=> {
                                                                 this.setState({
            
                                                                    modalImport: true,
                                                                   
                                                        
                                                                });
                                                            }}> <i className=" ni ni-folder-17" />{" "} Importer Matières
                                                             </Button>
                                        </Col>
                                    </Row>
                                   
                             </CardHeader>
                                
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="coll">numéro</th>
                                            <th scope="col">Intitulé</th>
                                            <th scope="col">INE de Professeur Responsable</th>
                                            <th scope="col">Nom de Professeur Responsable</th>
                                            <th scope="col">Filière</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                            this.state.matieres.map(
                                                (matiere, index) =>
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{matiere.nom}</td>
                                                        <td>{matiere.ineProf}</td>
                                                        <td>{matiere.nomProf}</td>
                                                        <td>{matiere.nomFiliere}</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                onClick={() => this.editMatiere(matiere.id)}
                                                            >
                                                                Mettre à jour
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                onClick={() => this.setState({
                                                                    pos: index,
                                                                    modal: !this.state.modal
                                                                })}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick={() => this.viewMatiere(matiere.id)}                                                               >
                                                                Consulter
                                                            </Button>
                                                        </td>


                                                    </tr>
                                            )
                                        }

                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </Row>


                </Container>


            </>
        )
    }
}
export default ListeMatiereComponent