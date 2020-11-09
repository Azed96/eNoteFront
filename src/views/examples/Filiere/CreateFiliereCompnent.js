import React ,{Component} from 'react';
import adminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button,Alert
} from "reactstrap";

class CreateFiliereComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            nom: '',
            anneeScolaire: '',
            visible: false
        }
        this.changerNomFiliereHandler=this.changerNomFiliereHandler.bind(this);
        this.changerAnneeScolaireHandler=this.changerAnneeScolaireHandler.bind(this);
    }

    componentDidMount(){          
                if(this.state.id===':id'){
                    return 
                }else{
                    adminService.getFiliereById(this.state.id).then((res)=>{
                    let  filiere=res.data;
                    this.setState({
                         nom:  filiere.nom,
                         anneeScolaire: filiere.anneeScolaire
                     })
                })
                }
    }

    reset = () =>{
        this.setState({
            nom: '',
            anneeScolaire: ''
        });
    }

    changerNomFiliereHandler(event){
        this.setState({nom: event.target.value});
    }
    changerAnneeScolaireHandler(event){
        this.setState({anneeScolaire:event.target.value});
    }

    saveAndUpdateProf = (e)=>{
        e.preventDefault();
        let filiere= {nom: this.state.nom, anneeScolaire: this.state.anneeScolaire}
        if(this.state.id===':id'){
            if (filiere.nom === '' || filiere.anneeScolaire === '') {
                this.setState({ visible: true });
            }else{
                // console.log("id dans  if "+ this.state.id);
            adminService.addFiliere(filiere).then(response=>{
                this.props.history.push('/administrateur/allFiliere');
            })
            }
           
        }else{
            adminService.updateFiliere(this.state.id,filiere).then(response=>{
                this.props.history.push('/administrateur/allFiliere');
             })
          }
    }
    cancel(){
        return this.props.history.push('/administrateur/allFiliere')
    }
    
getTitle(){
    if(this.state.id===':id'){
        return <h3 className="texte-center">Ajouter Filiere</h3>

    }else {
        return <h3 className="texte-center">Update Filiere</h3>
    }
}

    render(){
        return(
            <>
            <Header />

            <Container className="mt--7" fluid>
                <Row>
                        <div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                 <h3 className="mb-0 text-center"> Création d'une Filière </h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form">
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-Prenom"
                                                        >{this.state.nom ? '' : <span style={{ color: "red" }}>*</span>}
                                                            Nom de la Filiere
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Nom de la filière"
                                                            type="text"
                                                            value={this.state.nom} onChange={this.changerNomFiliereHandler}                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-nom"
                                                        >{this.state.anneeScolaire ? '' : <span style={{ color: "red" }}>*</span>}
                                                            Année Scolaire
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            //placeholder="2020/2021"
                                                            type="text"
                                                            value={this.state.anneeScolaire} onChange={this.changerAnneeScolaireHandler}  />
                                                    </FormGroup>
                                                </Col>
                                               
                                            </Row>
                                           
                                           
                                        </div>
                                        <div className="text-center">
                                           <Alert color="danger" isOpen={this.state.visible}>
                                            Merci de renseigner les champs obligatoires
                                            </Alert>
                                        <Button className="my-4" color="purpel" type="button"
                                                onClick={this.reset}
                                            >
                                                réinitialiser 
                                               </Button>
                                            <Button className="my-4" color="success" type="button"
                                                onClick={this.saveAndUpdateProf}
                                            >
                                                Enregistrer
                                               </Button>
                                               <Button className="my-4" color="danger" type="button"
                                                onClick={this.cancel.bind(this)}
                                            >
                                                Liste des filières
                                               </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                        
                    </Row>
                    

                </Container>
                           
        </>
    )
}
}
export default CreateFiliereComponent