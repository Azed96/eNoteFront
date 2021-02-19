import React,{Component} from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import EmailSender from "../../../_services/EmailSender.service";

import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button,Alert
} from "reactstrap";

class CreateProfComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            nom: '',
            prenom: '',
            role:'',
            num: '',
            ine:'',
            dateNaissance:'',
            mail:'',
            visible: false
        }
        this.changerFirstNameHandler=this.changerFirstNameHandler.bind(this);
        this.changerLastNameHandler= this.changerLastNameHandler.bind(this);
        this.changerRoleHandler= this.changerRoleHandler.bind(this);
        this.changerNumHandler= this.changerNumHandler.bind(this);
        this.changerIneHandler= this.changerIneHandler.bind(this);
        this.changerDateNaissanceHandler= this.changerDateNaissanceHandler.bind(this);
        this.changerMailHandler= this.changerMailHandler.bind(this);

        this.saveAndUpdateProf=this.saveAndUpdateProf.bind(this);
    }

    //à l'arrivé à cette page soit : on récupére les infos du prof si c'est update via son id 
    componentDidMount(){
        if(this.state.id===':id'){
            return
        }else {
            //récupération info prof
            AdminService.getProfById(this.state.id).then((res)=>{
                let prof= res.data;
                this.setState({
                    nom:prof.nom,
                    prenom: prof.prenom,
                    role: prof.role, 
                    num: prof.num,
                    ine: prof.ine,
                    dateNaissance: prof.dateNaissance,
                    mail: prof.mail
                });
            });
        }
    }

    saveAndUpdateProf = (e)=>{
        e.preventDefault();
        let prof ={nom:this.state.nom, prenom: this.state.prenom, role: this.state.role, num: this.state.num, ine: this.state.ine, dateNaissance: this.state.dateNaissance, mail: this.state.mail};

        //création Prof
        if(this.state.id===':id'){
            if (prof.nom === '' || prof.prenom === '' || prof.ine === ''  || prof.dateNaissance === '' || prof.mail === '') {
                this.setState({ visible: true });
            }else{
                AdminService.addProf(prof).then((response)=>{
                    EmailSender.notifCreationProf(response).then(res => {
                        console.log("Status: "+JSON.stringify(JSON.stringify(res)));
                    });
                });
               
            }
            
        }else{
            if (prof.nom === '' || prof.prenom === '' || prof.ine === ''  || prof.dateNaissance === '' || prof.mail === '') {
                this.setState({ visible: true });
            }else{
            AdminService.updateProf(this.state.id,prof).then((response)=>{
                this.props.history.push('/administrateur/allProf');
            })
        }

        }
       
    }

    cancel(){
        this.props.history.push('/administrateur/allProf');
    }
    changerFirstNameHandler(event){
        this.setState({prenom: event.target.value});
    }
 
    changerLastNameHandler(event){
        this.setState({nom: event.target.value});
    }
    changerRoleHandler(event){
        this.setState({role: event.target.value});
    }
    changerNumHandler(event){
        this.setState({num: event.target.value});
    }
    changerIneHandler(event){
        this.setState({ine: event.target.value});
    }
    changerDateNaissanceHandler(event){
        this.setState({dateNaissance: event.target.value});
    }
    changerMailHandler(event){
        this.setState({mail: event.target.value});
    }
    getTitle(){
        if(this.state.id===':id'){
            return <h3 className="texte-center">Ajouter Prof</h3>

        }
        else{
            return <h3 className="texte-center">Mise à jour Prof</h3>
        }
    }

    reset = () =>{
        this.setState({
            nom: '',
            prenom: '',
            role:'',
            num: '',
            ine:'',
            dateNaissance:'',
            mail:''
        });
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
                                 <h3 className="mb-0 text-center"> Création d'un enseignant </h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form">
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-Prenom"
                                                        >
                                                            Prenom
                                                   </label>{this.state.nom ? '' : <span style={{ color: "red" }}>*</span>}
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Pernom"
                                                            type="text"
                                                            value={this.state.nom} onChange={this.changerLastNameHandler}
                                                            />

                                                        
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-nom"
                                                        >
                                                            Nom
                                                    </label>{this.state.prenom ? '' : <span style={{ color: "red" }}>*</span>}
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Nom"
                                                            type="text"
                                                            value={this.state.prenom} onChange={this.changerFirstNameHandler}                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-INE"
                                                        >
                                                            INE
                                                    </label>{this.state.ine ? '' : <span style={{ color: "red" }}>*</span>}
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="INE"
                                                            type="number"
                                                            value={this.state.ine} onChange={this.changerIneHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note DS"
                                                        >
                                                            Numéro de Télephone
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-first-name"
                                                            placeholder="Tél"
                                                            type="number"
                                                            value={this.state.num} onChange={this.changerNumHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >{this.state.dateNaissance ? '' : <span style={{ color: "red" }}>*</span>}
                                                            Date de Naissance
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-last-name"
                                                            placeholder="jjmmaaaa"
                                                            type="number"
                                                            value={this.state.dateNaissance} onChange={this.changerDateNaissanceHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <div className="text-center">
                                                
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note DS"
                                                        >{this.state.mail ? '' : <span style={{ color: "red" }}>*</span>}
                                                            Adresse eMail
                                                    </label>
                                                        <Input 
                                                            className="form-control-alternative"
                                                            id="input-first-name"
                                                            placeholder="email"
                                                            type="text"
                                                            value={this.state.mail} onChange={this.changerMailHandler}
                                                        />
                                                    </FormGroup>
                                                
                                                    </div>
                                            
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
                                                Liste des Enseignants
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
export default CreateProfComponent