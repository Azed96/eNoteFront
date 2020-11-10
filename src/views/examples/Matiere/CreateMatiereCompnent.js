import React, { Component } from 'react';
import adminService from '../../../_services/AdminService';
import MatiereService from '../../../_services/matiere.service';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody, Button,Alert
} from "reactstrap";
class CreateMatiereComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            filiere: [{
                id: '--',
                nom: '--',
                anneeScolaire: ''
            }],
            profs: [{
                nom: '--',
                prenom:'',
                role: '--',

            }],
            nom: '',
            idProf: '',
            ineProf: '',
            nomProf: '',
            idFiliere: '',
            nomFiliere: '',
            coefDS: null,
            coefPartiel: null,
            coefModule: null,
            hasDS: true,
            visible: false
        }
        this.changerIdFiliereHandler = this.changerIdFiliereHandler.bind(this);
        this.changerNomMatiereHandler = this.changerNomMatiereHandler.bind(this);
        this.changerIdProfeHandler = this.changerIdProfeHandler.bind(this);
        this.changerCoefPartielSHandler = this.changerCoefPartielSHandler.bind(this);
        this.changerCoefModuleSHandler = this.changerCoefModuleSHandler.bind(this);
        this.changerCoefDSHandler = this.changerCoefDSHandler.bind(this);
        this.changerHASDSHandler = this.changerHASDSHandler.bind(this);


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
        if (this.state.id === ':id') {
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
                    nomFiliere: matiere.nomFiliere,
                    coefDS: matiere.coefDS,
                    coefPartiel: matiere.coefPartiel,
                    coefModule: matiere.coefModule,
                    hasDS: matiere.hasDS
                })

            })
        }

    }

    reset = () => {
        this.setState({
            nom: '',
            coefDS: 0,
            coefPartiel: 0,
            coefModule: 0,
            hasDS: false

        });
    }

    changerIdFiliereHandler(event) {
        this.setState({ idFiliere: event.target.value });
        adminService.getFiliereById(event.target.value).then(res => {
            this.setState({ nomFiliere: res.data.nom })

        });
    }

    changerNomMatiereHandler(event) {
        this.setState({ nom: event.target.value });

    }

    changerCoefDSHandler(event) {
        this.setState({ coefDS: event.target.value });

    }

    changerCoefPartielSHandler(event) {
        this.setState({ coefPartiel: event.target.value });

    }

    changerCoefModuleSHandler(event) {
        this.setState({ coefModule: event.target.value });

    }

    changerIdProfeHandler(event) {
        this.setState({ idProf: event.target.value });
    }

    changerHASDSHandler() {
        console.log("checkbox1 " + this.state.hasDS);
        this.setState({ hasDS: !this.state.hasDS });
    }

    saveAndUpdateProf = (e) => {
        e.preventDefault();


        let matiere = {
            nom: this.state.nom,
            idProf: this.state.idProf,
            idFiliere: this.state.idFiliere,
            nomFiliere: this.state.nomFiliere,
            coefDS: this.state.coefDS,
            coefPartiel: this.state.coefPartiel,
            coefModule: this.state.coefModule,
            hasDS: this.state.hasDS
        };

        let noteData ={
            idEtudaint: '',
            idMatiere:'',
            idProf: '',
            hasDs:true,
            noteDs:0,
            coef: 0,
            coefDs: 0,
            coefPartiel : 0,
            notePartiel : 0,
        }


        console.log('elt' + matiere.nomFiliere);


        if (this.state.id === ':id') {
            if (matiere.nom === '' || matiere.idProf === '' || matiere.idFiliere === '' || matiere.nomFiliere === '' || matiere.coefDS === '' || matiere.coefPartiel === ''|| matiere.coefModule === '') {
                this.setState({ visible: true });
            }else{
            adminService.addMatiere(matiere).then(response => {
                MatiereService.getEtudiantsByidFiliere(matiere.idFiliere).then(
                    etuds =>{
                        etuds.forEach(element => {
                        noteData.idEtudaint = element.id;
                        noteData.idMatiere = response.data.id;
                        noteData.idProf = matiere.idProf;
                        noteData.hasDs = matiere.hasDS;
                        noteData.coefPartiel = matiere.coefPartiel;
                        noteData.coef = matiere.coefModule;
                        noteData.coefDs = matiere.coefDS;
                        MatiereService.addNoteEtudiant(noteData);
                        });
                    }
                )
                this.props.history.push('/administrateur/allMatiere');
            })
        }
        } else {
            console.log("dans save ine prof = " + this.state.ineProf);
            adminService.updateMatiere(this.state.id, matiere).then(response => {
                this.props.history.push('/administrateur/allMatiere');
            })
        }
    }



    cancel() {
        return this.props.history.push('/administrateur/allMatiere')
    }

    getTitle() {
        if (this.state.id === ':id') {
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
                                            <h6 className="heading-small text-muted mb-4">
                                                informations sur le nouveau Module
                                           </h6>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-Prenom"
                                                        >
                                                            Intitulé de nouveau module
                                                   </label>{this.state.nom ? '' : <span style={{ color: "red" }}>*</span>}
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
                                                    </label>{this.state.idFiliere ? '' : <span style={{ color: "red" }}>*</span>}
                                                        <Input type="select" onChange={this.changerIdFiliereHandler} value={this.state.idFiliere}>
                                                            {this.state.filiere.map((f) =>
                                                                <option key={f.id} value={f.id}> {f.nom + " " + f.anneeScolaire} </option>

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
                                                    </label>{this.state.idProf ? '' : <span style={{ color: "red" }}>*</span>}
                                                <Input type="select" onChange={this.changerIdProfeHandler} value={this.state.idProf}>
                                                    {this.state.profs.map((prof) =>
                                                        <option key={prof.id} value={prof.id}> {prof.nom + " "+prof.prenom} </option>

                                                    )};
                                                    </Input>
                                            </div>
                                            <br />
                                            <hr className="my-4" />

                                            <h6 className="heading-small text-muted mb-4">
                                                Coefficients
                                           </h6>
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-city"
                                                        >
                                                            Coefficient de contrôle
                                                              </label>
                                                        <Input
                                                            readOnly={!this.state.hasDS}
                                                            className="form-control-alternative"
                                                            placeholder="Coef DS"
                                                            type="number"
                                                            value={this.state.coefDS} onChange={this.changerCoefDSHandler}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Coefficient de Partiel
                                                          </label>{this.state.coefPartiel ? '' : <span style={{ color: "red" }}>*</span>}
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Coef Partiel"
                                                            type="number"
                                                            value={this.state.coefPartiel} onChange={this.changerCoefPartielSHandler}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Coefficient de module
                                                           </label>{this.state.coefModule ? '' : <span style={{ color: "red" }}>*</span>}
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Coef Module"
                                                            type="number"
                                                            value={this.state.coefModule} onChange={this.changerCoefModuleSHandler}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>

                                                        <Input
                                                            className="form-control-alternative"
                                                            type="checkbox"
                                                            defaultChecked
                                                            checked={this.state.hasDS} onChange={this.changerHASDSHandler}

                                                        />
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor=" hasDS"
                                                        >
                                                            <span className="text-muted">En cochant cette case vous précisez que ce module a bien un <strong>Devoir surveillé (DS)</strong> </span>
                                                        </label>
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