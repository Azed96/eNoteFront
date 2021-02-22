import React from'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import ImportService from '../../../_services/ImportService';

import {
    Card, Table, Container, Row, CardHeader,
    Button, ModalBody, Modal, ModalHeader, Col, ModalFooter,Input
} from "reactstrap"; 

class ListeProfComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            profs:[],
            modal: false,
            modalImport:null,
            pos: undefined
        }
        this.addProf=this.addProf.bind(this);
        this.editProf=this.editProf.bind(this);
        this.deletProf=this.deleteProf.bind(this);
        this.viewProf=this.viewProf.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fileChangedHandler= this.fileChangedHandler.bind(this);
        this.importerProf = this.importerProf.bind(this);

    }

    componentDidMount(){
        this.setState({
            profs:[]
        })
        AdminService.getAllProf().then((respone)=>{
            this.setState({profs: respone.data})
        });
    }
    addProf(){
        this.props.history.push(`/administrateur/add-update-prof/:id`)
    }
    editProf(id){
        this.props.history.push(`/administrateur/add-update-prof/${id}`);
    }
    deleteProf(id){
        AdminService.deleteProf(id).then((respone)=>{
            this.setState({
                profs: this.state.profs.filter(prof=>prof.id!=id),
                pos : undefined,
                modal: !this.state.modal
            })
        })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    viewProf(id){
        this.props.history.push(`/administrateur/ViewProf/${id}`);
    }

    fileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }


    importerProf = ()=>{
        
        
           console.log("rentre dans le import")
           
                const formData = new FormData();
                formData.append(
                    'file',
                    this.state.selectedFile
                )
                console.log("form DATA"+formData);
                
                ImportService.uploadprof(formData).then(res=>{
                    this.componentDidMount();

                });

                this.state.modalImport=false;   
    
    }

     //jsx de js 
     render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                            <ModalHeader  toggle={this.toggle} cssModule={{'modal-title': 'w-100 text-center'}}> <h3>Êtes vous sûr de supprimer cet enseignant ?</h3></ModalHeader>
                            <ModalBody cssModule={{'modal-body': 'w-100 text-center'}}>
                               <Button className="my-4 " color="danger" type="button"
                                                onClick={()=> this.deleteProf(this.state.profs[this.state.pos].id)}
                                            >
                                                Oui
                               </Button>
                            <Button color='info' onClick={this.toggle}>Non</Button>
                            </ModalBody>
                            
                        </Modal>

                        <Modal isOpen={this.state.modalImport} >
                         <ModalHeader >
                            <div className="text-center">
                            <h3 >Import les profs</h3>
                            </div>
                        </ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            
                        {this.state.selectedFile ? null : <span style={{ color: "red" }}>*</span>}

                        <Input type="file" color='info' className="form-control" onChange={this.fileChangedHandler} />


                        <Button color='success' className="my-4" onClick={this.importerProf}>Importer </Button>

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
                                        <h3 className="mb-0 text-center"> Liste des Enseignants </h3>
                                        </Col>
                                       
                                        <Col lg="2">

                                       
                                        <Button color="success" onClick={()=> {
                                                                 this.setState({
            
                                                                    modalImport: true,
                                                                   
                                                        
                                                                });
                                                            }}> <i className=" ni ni-folder-17" />{" "} Importer Enseignants
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
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                           this.state.profs.map(
                                            (prof,index)=>
                                                    <tr key={prof.id}>
                                                        <td>{index+1}</td>
                                                        <td>{prof.ine}</td>
                                                        <td>{prof.nom}</td>
                                                        <td>{prof.prenom}</td>
                                                        <td>{prof.dateNaissance}</td>
                                                        <td>{prof.num}</td>
                                                        <td>{prof.mail}</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                onClick ={()=> this.editProf(prof.id)}
                                                            >
                                                                Mettre à jour
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                onClick ={() => this.setState({
                                                                    pos: index,
                                                                    modal: !this.state.modal
                                                                })
                                                            }        
                                                                >                                                    
                                                                Supprimer
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick ={()=> this.viewProf(prof.id)}                                                               >                                                    
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

export default ListeProfComponent