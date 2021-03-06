
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import adminService from "../../_services/AdminService"
import CoursService from "../../_services/cours.service"
import StorageService from "../../_services/StorageService"


import { Card, CardBody, CardTitle, Container, Row, Col, Modal, ModalHeader, ModalBody, Form, ModalFooter, Button, Table, Input, FormGroup, Alert, CardHeader, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

import Header from "components/Headers/Header.js";

class MatiereEnseignant extends React.Component {


    constructor(props) {
        super(props);
        this.CompListEtudiantNote = this.CompListEtudiantNote.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeAnnee = this.onChangeAnnee.bind(this);
        this.researchFluidMatiere = this.researchFluidMatiere.bind(this);


        this.state = {
            listeMatiere: [],
            pos: undefined,
            modal: false,
            tmpNomMatiere: '',
            tmpListCours: [],
            selectedFile: null,

            CoursIdMatiere: '',
            CoursNom: '',
            CoursNomFileStorage: '',
            //vibile model
            visible: false,

            anneeScolaire: ['--'],
            anneeScolaireSelected: '',

            tmpListeMatiere: []

        };
        this.currentuser = AuthService.getCurrentUser();
        if (this.currentuser == "") {
            this.props.history.push('/auth');
        }



    }

    componentDidMount() {
        this.setState({
            listeMatiere: [],
            tmpListCours: [],
            anneeScolaireSelected: '',
            pos: undefined,
            tmpListeMatiere: []
        });
        this.RecupMatieres();

    }



    RecupMatieres() {
        MatiereService.getMatiereProf(this.currentuser.id)
            .then(response => {
                response.forEach(element => {
                    adminService.getFiliereById(element.idFiliere).then(re => {
                        element.anneSco = re.data.anneeScolaire;
                        //remplir la liste des anneeU
                        this.setState(state => {
                            if (!state.anneeScolaire.includes(re.data.anneeScolaire)) {
                                const anneeScolaire = [...state.anneeScolaire, re.data.anneeScolaire];

                                return {
                                    anneeScolaire,
                                };
                            }
                        });
                        CoursService.geCoursByidMatiere(element.id).then(coursRes => {
                            element.listeCours = coursRes;
                            //rajouter la liste des cours
                            this.setState(state => {
                                const listeMatiere = [...state.listeMatiere, element];
                                const tmpListeMatiere = [...state.tmpListeMatiere, element];
                                //console.log("here"+ JSON.stringify(tmpListeMatiere));

                                return {
                                    listeMatiere,
                                    tmpListeMatiere
                                }
                            });
                        });

                    });
                });


            });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        //window.location.reload(false);
    }

    fileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    onChangeNom(e) {
        this.setState({
            CoursNom: e.target.value
        });
    }

    onChangeAnnee(e) {
        this.setState({
            anneeScolaireSelected: e.target.value
        });
        this.researchFluidMatiere();

    }

    researchFluidMatiere() {
        this.setState(state => {
            const listeMatiere = [];
            state.tmpListeMatiere.map(matiere => {
                if (matiere.anneSco === state.anneeScolaireSelected) {
                    listeMatiere.push(matiere);
                } else if (state.anneeScolaireSelected === '--') {
                    listeMatiere.push(matiere);
                }
            });
            //console.log("selected "+ JSON.stringify(state.anneeScolaireSelected));
            //console.log("matiere "+ JSON.stringify(listeMatiere));

            return {
                listeMatiere
            }
        })

    }

    Telechargement(fileName) {
        StorageService.download(fileName);
    }

    SuppCours(fileName) {
        StorageService.deleteCours(fileName);
        this.toggle();
        this.componentDidMount();




    }
    uploadHandler = () => {
        let cours = {
            idMatiere: this.state.listeMatiere[this.state.pos].id,
            nom: this.state.CoursNom,
            nomFileStorage: ''
        }
        if (this.state.CoursNom === '' || this.state.selectedFile === null) {
            this.setState({ visible: true });
        } else {
            const formData = new FormData();
            formData.append(
                'file',
                this.state.selectedFile
            )
            StorageService.uploadFile(formData).then(res => {
                cours.nomFileStorage = res;

                //console.log("mon cours "+JSON.stringify(cours));
                CoursService.addCours(cours).then(resCours => {
                    //console.log("mon cours enr "+JSON.stringify(resCours));
                    this.componentDidMount();
                });

            });
            this.toggle();

        }
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
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <Card className="shadow " border="success" style={{ width: '50rem' }}>
                            <CardHeader className="border-0">
                                <Row>
                                    <Col lg="6">
                                        <h3 className="mb-0">Chercher par année universitaire</h3>
                                    </Col>
                                    <Col lg="6">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-search" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" placeholder="Search" onChange={this.onChangeAnnee} value={this.state.anneeScolaireSelected}>
                                            {this.state.anneeScolaire.map((annee, index) =>
                                                <option key={index} value={annee}> {annee} </option>

                                            )};
                                            </Input>
                                        </InputGroup>
                                       



                                    </Col>

                                </Row>
                            </CardHeader>
                        </Card>
                    </div>
                    <br />
                    <Row >

                        {/* Table */}
                        {
                            this.state.listeMatiere.map(
                                (matiere, index) =>
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
                                                        <br /><br />
                                                        <span className="h4 text-sm mb-0">
                                                            Année universitaire : {" "} {matiere.anneSco}
                                                        </span>

                                                        <button
                                                            className=" btn btn-info"

                                                            onClick={() => this.CompListEtudiantNote(matiere.id)}
                                                        >

                                                            Liste des étudiants
                                                        </button>

                                                        <button
                                                            className=" btn btn-light"

                                                            onClick={() => this.setState({
                                                                modal: !this.state.modal,
                                                                pos: index,
                                                                tmpNomMatiere: matiere.nom,
                                                                tmpListCours: matiere.listeCours
                                                            })}
                                                        >
                                                            Liste des cours
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

                    <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{ maxWidth: '1600px', width: '60%', margin: '310px auto' }}>
                        <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}> <h1> Liste des Cours de la matière <strong>
                            {this.state.tmpNomMatiere} </strong> </h1>

                        </ModalHeader>

                        <ModalBody>
                            <h4>Ajouter un nouveau cours :</h4>
                            <hr className="my-4" />
                            <Form role="form"  >

                                <div className="pl-lg-2 ">
                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-fichier"
                                                >    Le fichier de cours
                                                        </label>
                                                {this.state.selectedFile ? null : <span style={{ color: "red" }}>*</span>}

                                                <Input type="file" color='info' className="form-control" onChange={this.fileChangedHandler} />

                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-nom"
                                                >
                                                    Titre du cours
                                                    </label>
                                                {this.state.CoursNom ? '' : <span style={{ color: "red" }}>*</span>}
                                                <Input
                                                    className="form-control-alternative"
                                                    value={this.state.CoursNom}
                                                    placeholder="Nom"
                                                    type="text"
                                                    onChange={this.onChangeNom}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <div className="text-center">

                                                <Button color='success' className="my-4" onClick={this.uploadHandler}>Enregistrer le cours</Button>

                                            </div>
                                        </Col>
                                    </Row>

                                </div>

                                <div className="text-center">
                                    <Alert color="danger" isOpen={this.state.visible}>
                                        Merci de renseigner les champs obligatoires
                                            </Alert>
                                </div>

                            </Form>
                            <Table className="align-items-center table-flush" responsive >
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
                                            (cours, index) =>
                                                <tr key={cours.id}>
                                                    <td scope="col">{index}</td>
                                                    <td scope="col">{cours.nom}</td>
                                                    <td scope="col">{
                                                        new Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(Date.parse(cours.dateCreation))

                                                    }</td>
                                                    <td scope="col">
                                                        <Button color='info' onClick={() => this.Telechargement(cours.nomFileStorage)}><i className=" ni ni-cloud-download-95" /></Button>
                                                        <Button color='danger' onClick={() => this.SuppCours(cours.nomFileStorage)}>X</Button>
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
