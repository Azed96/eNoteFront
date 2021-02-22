import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import ImportService from '../../../_services/ImportService'
import {
    Card, Table, Container, Row, CardHeader,ModalBody, Modal, ModalHeader,
    Button, Col,Input,
} from "reactstrap";
import ModalFooter from 'reactstrap/lib/ModalFooter';

class ListeFiliereComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filieres: [],
            modal: false,
            modalImport:false,
            pos: undefined
        }
        this.addFiliere = this.addFiliere.bind(this);
        this.editFiliere = this.editFiliere.bind(this);
        this.deleteFiliere = this.deleteFiliere.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fileChangedHandler= this.fileChangedHandler.bind(this);
        this.importerFiliere = this.importerFiliere.bind(this);
        this.refresh= this.refresh.bind(this);

    }

    componentDidMount() {
        this.setState({
            filieres:[]
        })
        AdminService.getAllFiliere().then((response) => {
            this.setState({ filieres: response });
        });
    }

    addFiliere() {
        this.props.history.push('/administrateur/add-update-filiere/:id');
    }
    editFiliere(id) {
        this.props.history.push(`/administrateur/add-update-filiere/${id}`);
    }
    viewFiliere(id) {
        this.props.history.push(`/administrateur/ViewFiliereComponent/${id}`);
    }

    deleteFiliere(id) {
        AdminService.deleteFiliere(id).then(reponse => {
            this.setState({
                filieres: this.state.filieres.filter(filiere => filiere.id != id),
                pos: undefined,
                modal: !this.state.modal
            });
        })
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


    importerFiliere = ()=>{
        
        
           console.log("rentre dans le import")
           
                const formData = new FormData();
                formData.append(
                    'file',
                    this.state.selectedFile
                )
                ImportService.uploadFiliere(formData).then(res=>{
                    this.componentDidMount();

                });

                this.state.modalImport=false;
    
     }

     refresh(){
        this.componentDidMount();
        this.setState({
            filieres:[]
        })

    }

    

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}> <h3>Êtes vous sûr de supprimer cette filière ?</h3></ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            <Button className="my-4 " color="danger" type="button"
                                onClick={() => this.deleteFiliere(this.state.filieres[this.state.pos].id)}
                            >
                                Oui
                               </Button>
                            <Button color='info' onClick={this.toggle}>Non</Button>
                        </ModalBody>

                    </Modal>
                   
                    <Modal isOpen={this.state.modalImport} >
                         <ModalHeader >
                            <div className="text-center">
                            <h3 >Import des Filieres</h3>
                            </div>
                        </ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            
                        {this.state.selectedFile ? null : <span style={{ color: "red" }}>*</span>}

                        <Input type="file" color='info' className="form-control" onChange={this.fileChangedHandler} />


                        <Button color='success' className="my-4" onClick={this.importerFiliere}>Importer </Button>

                        </ModalBody>
                        <ModalFooter>
                            
                        <Button color="danger" onClick={()=> {
                                                                 this.setState({

                                                                    modalImport: false,

                                                                });
                                                                                this.refresh();

                                                                
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
                                        <h3 className="mb-0 text-center"> Liste des Filières  </h3>
                                        </Col>
                                       
                                        <Col lg="2">

                                       
                                        <Button color="success" onClick={()=> {
                                                                 this.setState({
            
                                                                    modalImport: true,
                                                                   
                                                        
                                                                });
                                                            }}> <i className=" ni ni-folder-17" />{" "} Importer Filieres
                                                             </Button>
                                        </Col>
                                    </Row>
                                   
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Année Universitaire</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                            

                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                            this.state.filieres.map(
                                                (filiere, index) =>
                                                    <tr key={filiere.id}>
                                                        <td>{filiere.nom}</td>
                                                        <td>{filiere.anneeScolaire}</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                className="text-center"
                                                                onClick={() => this.editFiliere(filiere.id)}
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
                                                                onClick={() => this.viewFiliere(filiere.id)}                                                                >
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
export default ListeFiliereComponent