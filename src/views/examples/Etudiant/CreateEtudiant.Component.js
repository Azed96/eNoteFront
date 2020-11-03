import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';
import MatiereService from '../../../_services/matiere.service'
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button
} from "reactstrap";

class CreateEtudiantComponent extends Component{
    constructor(props){
        super(props)
        this.state= {
            filieres:[ {
                nom:'--',
                anneeScolaire:''
            }],
            id:this.props.match.params.id,
            nom: '',
            prenom: '',
            role:'',
            num: '',
            ine:'',
            idFiliere:'',
            dateNaissance:'',
            mail:''
        }
        this.changerFirstNameHandler= this.changerFirstNameHandler.bind(this);
        this.changerLastNameHandler= this.changerLastNameHandler.bind(this);
        this.changerRoleHandler= this.changerRoleHandler.bind(this);
        this.changerNumHandler= this.changerNumHandler.bind(this);
        this.changerIneHandler= this.changerIneHandler.bind(this);
        this.changerDateNaissanceHandler= this.changerDateNaissanceHandler.bind(this);
        this.changerMailHandler= this.changerMailHandler.bind(this);
        this.changerIdFiliereHandler= this.changerIdFiliereHandler.bind(this);


        this.saveAndUpdateEtudiant = this.saveAndUpdateEtudiant.bind(this);
    }

    componentDidMount(){

        AdminService.getAllFiliere().then(res=>{
            res.map(f=>{
                this.setState(state=>{
                    const filieres= [...state.filieres,f];
                    return {
                        filieres,
                    }
                })
             })
        });


        if(this.state.id===':id'){
            return
        }else {
            AdminService.getEtudiantById(this.state.id).then((res)=>{
                let etudiant= res.data;
                this.setState({
                    nom:etudiant.nom,
                    prenom: etudiant.prenom,
                    role: etudiant.role, 
                    num: etudiant.num,
                    ine: etudiant.ine,
                    idFiliere: etudiant.idFiliere,
                    dateNaissance: etudiant.dateNaissance,
                    mail: etudiant.mail
                });
            });
        }
    }

    saveAndUpdateEtudiant = (e) =>{
        e.preventDefault();

        let etudiant = { nom:this.state.nom,prenom: this.state.prenom, role: this.state.role, num: this.state.num, ine: this.state.ine, idFiliere: this.state.idFiliere, dateNaissance: this.state.dateNaissance, mail: this.state.mail};

        let noteData ={
            idEtudaint: '',
            idMatiere:'',
            idProf: '',
            hasDs:'',
            noteDs:'',
            coef: '',
            coefDs: '',
            coefPartiel : '',
            notePartiel : '',
        }
        //création étudiant
         if(this.state.id===':id'){
                    AdminService.addEtudiant(etudiant).then(res =>{
                        console.log("etudiantadd"+JSON.stringify(res.data.idFiliere));
                        MatiereService.getMatieresByidFiliere(res.data.idFiliere)
                        .then(modules =>{
                            console.log("module"+JSON.stringify(module));
                            modules.forEach((module) =>{
                            noteData.idEtudaint = res.data.id;
                            noteData.idMatiere = module.id;
                            noteData.idProf = module.idProf;
                            noteData.hasDs = module.hasDs;
                            noteData.coefPartiel = module.coefPartiel;
                            noteData.coefDs = module.coefDs;

                            MatiereService.addNoteEtudiant(noteData);

                            })
                                    
                        });
                       // this.props.history.push('/administrateur/allEtudiant');
                    });




                
        }else{ //update étudiant
            AdminService.updateEtudiant(this.state.id,etudiant).then(res =>{
                this.props.history.push('/administrateur/allEtudiant');
            });
        }
       
    }

    cancel(){
        this.props.history.push('/administrateur/allEtudiant');
    }

    reset = () =>{
        this.setState({
            nom:'',
            prenom: '',
            role: '', 
            num: '',
            ine: '',
            idFiliere: '',
            dateNaissance: '',
            mail: ''
        });
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

    changerIdFiliereHandler(event){
        this.setState({idFiliere:event.target.value})
    }
    getTitle(){
        if(this.state.id===':id'){
            return <h3 className="texte-center">Ajouter étudiant</h3>
        }else{
            return <h3 className="texte-center">Mise à jour Etudiant</h3>
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
                                 <h3 className="mb-0 text-center"> Création d'un étudiant </h3>
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
                                                   </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Pernom"
                                                            type="text"
                                                            value={this.state.prenom} onChange={this.changerFirstNameHandler}
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
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Nom"
                                                            type="text"
                                                            value={this.state.nom} onChange={this.changerLastNameHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-INE"
                                                        >
                                                            INE
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="INE"
                                                            type="text"
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
                                                            type="text"
                                                            value={this.state.num} onChange={this.changerNumHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >
                                                            Date de Naissance
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-last-name"
                                                            placeholder="Date de Naissance"
                                                            type="text"
                                                            value={this.state.dateNaissance} onChange={this.changerDateNaissanceHandler}
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
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >
                                                            Filière
                                                    </label>
                                                    <Input type="select" onChange={this.changerIdFiliereHandler} value={this.state.idFiliere} >
                                                                {this.state.filieres.map((f) => 
                                                                <option key={f.id} value={f.id} >{f.nom +" "+ f.anneeScolaire}</option>
                                                                )}; 
                                                  </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="text-center">

                                        <Button className="my-4" color="purpel" type="button"
                                                onClick={this.reset}
                                            >
                                                réinitialiser 
                                               </Button>
                                            <Button className="my-4" color="success" type="button"
                                                onClick={this.saveAndUpdateEtudiant}
                                            >
                                                Enregistrer
                                               </Button>
                                               <Button className="my-4" color="danger" type="button"
                                                onClick={this.cancel.bind(this)}
                                            >
                                                Liste des étudiants
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

export default CreateEtudiantComponent 