import React from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Table, Container, Row, CardHeader,
    Button, ModalBody, Modal, ModalHeader, ModalFooter,Input,Col
} from "reactstrap";
import MatiereService from "_services/matiere.service";
import ImportService from '../../../_services/ImportService';


class ListeEtudiantComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            etudiants: [],
            modal: false,
            modalImport:null,
            pos: undefined
        }
        this.addEtudiant = this.addEtudiant.bind(this);
        this.editEtudiant = this.editEtudiant.bind(this);
        this.deleteEtudiant = this.deleteEtudiant.bind(this);
        this.viewEtudiant = this.viewEtudiant.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fileChangedHandler= this.fileChangedHandler.bind(this);
        this.importerEtudiant = this.importerEtudiant.bind(this);
        this.refresh=this.refresh.bind(this);
        

    }
   

    componentDidMount() {
        this.setState({
            etudiants:[]
        })
        AdminService.getAllEtudiant().then((response) => {
            response.data.forEach(etudiant => {
                AdminService.getFiliereById(etudiant.idFiliere).then(filiere => {
                    etudiant.nomFiliere = filiere.data.nom;
                    this.setState(state => {
                        const etudiants = [...state.etudiants, etudiant];
                        return {
                            etudiants,
                        }
                    });
                });
            });
        });
    }


    addEtudiant() {
        this.props.history.push('/administrateur/add-update-Etudiant/:id');
    }

    editEtudiant(id) {
        this.props.history.push(`/administrateur/add-update-Etudiant/${id}`);
    }
    deleteEtudiant(id) {
        AdminService.deleteEtudiant(id).then(res => {
            this.setState({
                etudiants: this.state.etudiants.filter(etudiant => etudiant.id !== id),
                pos: undefined,
                modal: !this.state.modal
            });
        });
        MatiereService.getNotesByIdEtudiant(id)
            .then(resNotes => {
                resNotes.forEach(note => {
                    MatiereService.deleteNoteId(note.id);
                });
            });
    }

    viewEtudiant(id) {
        this.props.history.push(`/administrateur/ViewEtudiant/${id}`);
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


    importerEtudiant = ()=>{
        
        
           console.log("rentre dans le import")
           
                const formData = new FormData();
                formData.append(
                    'file',
                    this.state.selectedFile
                )
                console.log("form DATA"+formData);
                
                ImportService.uploadEtudiant(formData).then(res=>{
                    this.componentDidMount();

                });

                this.state.modalImport=false;




    }

    refresh(){
        this.state.etudiants=[];
        this.state.modalImport=false;
        this.componentDidMount();

    }

    //jsx de js 
    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}> <h3>Êtes vous sûr de supprimer cet étudiant ?</h3></ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            <Button className="my-4 " color="danger" type="button"
                                onClick={() => this.deleteEtudiant(this.state.etudiants[this.state.pos].id)}
                            >
                                Oui
                               </Button>
                            <Button color='info' onClick={this.toggle}>Non</Button>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={this.state.modalImport} >
                         <ModalHeader >
                            <div className="text-center">
                            <h3 >Import des étudiants</h3>
                            </div>
                        </ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            
                        {this.state.selectedFile ? null : <span style={{ color: "red" }}>*</span>}

                        <Input type="file" color='info' className="form-control" onChange={this.fileChangedHandler} />


                        <Button color='success' className="my-4" onClick={this.importerEtudiant}>Importer </Button>

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
                                    <Col lg="2">
                                        </Col>
                                        <Col lg="8">
                                        <h3 className="mb-0 text-center"> Liste des étudiants  </h3>
                                        </Col>
                                       
                                        <Col lg="2">

                                       
                                        <Button color="success" onClick={()=> {
                                                                 this.setState({
            
                                                                    modalImport: true,
                                                                   
                                                        
                                                                });
                                                            }}> <i className=" ni ni-folder-17" />{" "} Importer Etudiants
                                                             </Button>
                                        </Col>
                                    </Row>
                                   
                                </CardHeader>
                                
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="coll">numéro</th>
                                            <th scope="col">INE</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Pernom</th>
                                            <th scope="col">Date de Naissace</th>
                                            <th scope="col">Tél</th>
                                            <th scope="col">Adresse eMail</th>
                                            <th scope="col">Filière</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                            this.state.etudiants.map(
                                                (etudiant,index) =>
                                                    <tr key={etudiant.id}>
                                                        <td>{index+1}</td>
                                                        <td>{etudiant.ine}</td>
                                                        <td>{etudiant.nom}</td>
                                                        <td>{etudiant.prenom}</td>
                                                        <td>{etudiant.dateNaissance}</td>
                                                        <td>{etudiant.num}</td>
                                                        <td>{etudiant.mail}</td>
                                                        <td>{etudiant.nomFiliere}</td>


                                                        <td>
                                                            <Button
                                                                color="info"
                                                                onClick={() => this.editEtudiant(etudiant.id)}
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
                                                                onClick={() => this.viewEtudiant(etudiant.id)}                                                                >
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

export default ListeEtudiantComponent