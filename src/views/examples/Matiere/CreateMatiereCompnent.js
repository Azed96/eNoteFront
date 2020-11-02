import React, { Component } from 'react';
import adminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody, Button
} from "reactstrap";
class CreateMatiereComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            filiere: [{
                id: '--',
                nom: '--',
                anneeScolaire:''
            }],
            profs: [{
                nom: '--',
                role: '--',

            }],
            nom: '',
            idProf: '',
            ineProf: '',
            nomProf: '',
            idFiliere: '',
            nomFiliere: ''
        }
        this.changerNomFiliereHandler = this.changerNomFiliereHandler.bind(this);
        this.changerNomMatiereHandler = this.changerNomMatiereHandler.bind(this);
        this.changerNomProfeHandler = this.changerNomProfeHandler.bind(this);
    }
    componentDidMount() {
        adminService.getAllFiliere().then(res => {
            res.map(item => {
                this.setState(state => {
                    const filiere = [...state.filiere, item];

                    return {
                        filiere,
                    };

                })
            })
        });


        adminService.getAllProf().then(res => {

            res.data.map(item => {
                this.setState(state => {
                    const profs = [...state.profs, item];
                    return {
                        profs,
                    };

                })
            })

        });
        if (this.state.id === '-addMatiere') {
            return
        } else {
            adminService.getMatiereById(this.state.id).then((res) => {
                let matiere = res;
                this.setState({
                    nom: matiere.nom,
                    idProf: matiere.idProf,
                    ineProf: matiere.ineProf,
                    nomProf: matiere.nomProf,
                    idFiliere: matiere.idFiliere,
                    nomFiliere: matiere.nomFiliere
                })

            })
        }

    }

    reset = () =>{
        this.setState({
            nom: ''
        });
    }

    changerNomFiliereHandler(event) {
        this.setState({ nomFiliere: event.target.value });
    }

    changerNomMatiereHandler(event) {
        this.setState({ nom: event.target.value });

    }

    changerNomProfeHandler(event) {
        this.setState({ idProf: event.target.value });
    }

    saveAndUpdateProf = (e) => {
        e.preventDefault();
        let matiere = { nom: this.state.nom, nomFiliere: this.state.nomFiliere, idProf: this.state.idProf }
        if (this.state.id === '-addMatiere') {
            adminService.addMatiere(matiere).then(response => {
                this.props.history.push('/administrateur/allMatiere');
            })
        } else {
            console.log("dans save ine prof = " + this.state.ineProf);
            adminService.updateMatiere(this.state.id, matiere).then(response => {
                this.props.history.push('/administrateur/allMatiere');
            })
        }
    }



    cancel() {
        return this.props.history.push('/allMatiere')
    }

    getTitle() {
        if (this.state.id === -1) {
            return <h3 className="texte-center">Ajouter Matiere</h3>

        } else {
            return <h3 className="texte-center">Update Matiere</h3>
        }
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <h3 className="mb-0 text-center"> Création d'une matiére </h3>
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
                                                        >
                                                            Intitulé de nouveau module
                                                   </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Intitulé"
                                                            type="text"
                                                            value={this.state.nom} onChange={this.changerNomMatiereHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-nom"
                                                        >
                                                            Filière d'appartenance
                                                    </label>
                                                        <Input type="select" onChange={this.changerNomFiliereHandler} value={this.state.nomFiliere}>
                                                            {this.state.filiere.map((f) =>
                                                                  <option key={f.id} value={f.nom}> {f.nom + " "+ f.anneeScolaire} </option>
                                                              
                                                            )};
                                                    </Input>
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            
                                            <div className="text-center">
                                                
                                                    
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note DS"
                                                        >
                                                            Nom de Professeur Responsable
                                                    </label>
                                                    <Input type="select"  onChange={this.changerNomProfeHandler} value={this.state.idProf}>
                                                    {this.state.profs.map((prof) =>
                                                                  <option key={prof.id} value={prof.nom}> {prof.nom} </option>
                                                              
                                                            )};
                                                    </Input>
                                                    
                                                   
                                                
                                                </div>
                                            
                                           
                                        </div>
                                        <div className="text-center">
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
                                                Liste des Modules
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
export default CreateMatiereComponent