
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import {
    Card, Table, Container, Row, CardHeader, Form,
    Button, Col, Input, FormGroup, CardBody, ModalBody, Modal, ModalHeader, ModalFooter
} from "reactstrap";

import Header from "components/Headers/Header.js";
import matiereService from "../../_services/matiere.service";


class ListeEtudiantByIdMatiere extends React.Component {

    constructor(props) {
        super(props);
        this.currentuser = AuthService.getCurrentUser();
        this.getListeEtudiantMat = this.getListeEtudiantMat.bind(this);
        this.onChangePartiel = this.onChangePartiel.bind(this);
        this.onChangeNoteDS = this.onChangeNoteDS.bind(this);
        this.onChangePernom = this.onChangePernom.bind(this);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeINE = this.onChangeINE.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.toggle = this.toggle.bind(this);


        if (this.currentuser == "") {
            this.props.history.push('/auth');
        }
        this.state = {
            listeEtudiantbyMatiereID: [],
            idProf: this.currentuser.id,
            idMatiere: this.props.match.params.id,
            infoMatiere: {},
            listeInfoEtudiant: [],
            tmpNomEtudiant: '',
            tmpPrenomEtudiant: '',
            tmpINE: '',
            tmpIdNote: '',
            tmpNoteDS: '',
            tmpNotePartiel: '',
            pos: undefined,
            modal: false


        };

        this.getInfoMatiere();
        this.getListeEtudiantMat();

    }

    getListeEtudiantMat() {
        let infoMatiere = {
            idMatiere: this.state.idMatiere,
            idProf: this.state.idProf
        };
        MatiereService.getNotesEtudiant(infoMatiere)
            .then(response => {
                response.forEach((a) => {
                    AuthService.getInfoEtudiantById(a.idEtudaint).then(data => {
                        a.ine = data.ine;
                        a.nom = data.nom;
                        a.prenom = data.prenom;
                        a.dateNaissance = data.dateNaissance;
                        this.setState(state => {
                            const listeEtudiantbyMatiereID = [...state.listeEtudiantbyMatiereID, a];

                            return {
                                listeEtudiantbyMatiereID,
                            };
                        });
                    });
                });

            });


    }

    getInfoMatiere() {
        MatiereService.getMatiereByid(this.state.idMatiere)
            .then(res => {
                this.setState({
                    infoMatiere: res
                });
            });
    }

    onChangeNoteDS(e) {
        this.setState({
            tmpNoteDS: e.target.value
        });

    }

    onChangePartiel(e) {
        this.setState({
            tmpNotePartiel: e.target.value
        });

    }

    onChangeNom(e) {
        this.setState({
            tmpNomEtudiant: e.target.value
        });

    }

    onChangePernom(e) {
        this.setState({
            tmpPrenomEtudiant: e.target.value
        });
    }

    onChangeINE(e) {
        this.setState({
            tmpINE: e.target.value
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    ds(e){
        if(e===true){
            return 'Ce Module a un DS';
        }else {
            return 'Pas de DS pour ce Module';
        }
    }


    updateNote() {
        let noteData = {
            id: this.state.listeEtudiantbyMatiereID[this.state.pos].id,
            idEtudaint: this.state.listeEtudiantbyMatiereID[this.state.pos].idEtudaint,
            idMatiere: this.state.listeEtudiantbyMatiereID[this.state.pos].idMatiere,
            idProf: this.state.listeEtudiantbyMatiereID[this.state.pos].idProf,
            hasDs: this.state.listeEtudiantbyMatiereID[this.state.pos].hasDs,
            noteDs: this.state.tmpNoteDS,
            coef: this.state.listeEtudiantbyMatiereID[this.state.pos].coef,
            coefDs: this.state.listeEtudiantbyMatiereID[this.state.pos].coefDs,
            coefPartiel: this.state.listeEtudiantbyMatiereID[this.state.pos].coefPartiel,
            notePartiel: this.state.tmpNotePartiel,
            moyenne: this.state.listeEtudiantbyMatiereID[this.state.pos].moyenne
        }
        let idnote = this.state.listeEtudiantbyMatiereID[this.state.pos].id;


        matiereService.UpdateNoteEtudiant(idnote, noteData)
            .then(res => {
                console.log(res.idMatiere);
                window.location.reload(false);
                // this.history.push(`/admin/etudiant-matiere/${res.idMatiere}`);
            });
    }

    render() {

        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '1600px', width: '60%',margin: '310px auto'}}>
                            <ModalHeader  toggle={this.toggle} cssModule={{'modal-title': 'w-100 text-center'}}> <h3>Mettre à jour une note d'un étudiant pour le  module <strong> {this.state.infoMatiere.nom}</strong></h3></ModalHeader>
                            <ModalBody>
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
                                                            readOnly
                                                            value={this.state.tmpPrenomEtudiant}
                                                            placeholder="Pernom"
                                                            type="text"
                                                            onChange={this.onChangePernom}
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
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.tmpNomEtudiant}
                                                            placeholder="Nom"
                                                            type="text"
                                                            onChange={this.onChangeNom}
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
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.tmpINE}
                                                            placeholder="INE"
                                                            type="text"
                                                            onChange={this.onChangeINE}
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
                                                            Note de Controle (DS)
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={this.state.tmpNoteDS}
                                                            id="input-first-name"
                                                            placeholder="DS"
                                                            type="number"
                                                            onChange={this.onChangeNoteDS}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >
                                                            Note de Partiel
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={this.state.tmpNotePartiel}
                                                            id="input-last-name"
                                                            placeholder="examen"
                                                            type="number"
                                                            onChange={this.onChangePartiel}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                           
                                    </Form>                         
                                     </ModalBody>
                            <ModalFooter>
                                <Button className="my-4 " color="primary" type="button"
                                                onClick={this.updateNote}
                                            >
                                                Enregistrer les modifications
                                </Button>{' '}
                                <Button color='danger' onClick={this.toggle}>Quitter</Button>
                            </ModalFooter>
                        </Modal>
                    
                    <Row>
                        <div className="col">
                          {/*  <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <h3 className="mb-0 text-center"> Mettre à jour une note d'un étudiant pour le  module <strong> {this.state.infoMatiere.nom}</strong> </h3>
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
                                                            readOnly
                                                            value={this.state.tmpPrenomEtudiant}
                                                            placeholder="Pernom"
                                                            type="text"
                                                            onChange={this.onChangePernom}
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
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.tmpNomEtudiant}
                                                            placeholder="Nom"
                                                            type="text"
                                                            onChange={this.onChangeNom}
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
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.tmpINE}
                                                            placeholder="INE"
                                                            type="text"
                                                            onChange={this.onChangeINE}
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
                                                            Note de Controle (DS)
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={this.state.tmpNoteDS}
                                                            id="input-first-name"
                                                            placeholder="DS"
                                                            type="number"
                                                            onChange={this.onChangeNoteDS}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >
                                                            Note de Partiel
                                                    </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={this.state.tmpNotePartiel}
                                                            id="input-last-name"
                                                            placeholder="examen"
                                                            type="number"
                                                            onChange={this.onChangePartiel}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="button"
                                                onClick={this.updateNote}
                                            >
                                                Enregistrer les modifications
                                               </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card> */}
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 text-center"> Liste des étudiants de module <strong> {this.state.infoMatiere.nom}</strong> de la filiere <strong>{this.state.infoMatiere.nomFiliere}</strong> </h3>
                                    <h3 className="mb-0 text-center"> { this.ds(this.state.infoMatiere.hasDS)} </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">INE</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Pernom</th>
                                            <th scope="col">Date de Naissace</th>
                                            <th scope="col">Note de Controle</th>
                                            <th scope="col">Coef de Controle</th>
                                            <th scope="col">Note de Partiel</th>
                                            <th scope="col">Coef de Partiel</th>
                                            <th scope="col">Moyenne</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            this.state.listeEtudiantbyMatiereID.map(
                                                (note, index) =>
                                                    <tr key={note.id}>
                                                        <td scope="col">{note.ine}</td>
                                                        <td scope="col">{note.nom}</td>
                                                        <td scope="col">{note.prenom}</td>
                                                        <td scope="col">{note.dateNaissance}</td>
                                                        <td scope="col">{note.noteDs} </td>
                                                        <td scope="col">{note.coefDs}</td>
                                                        <td scope="col">{note.notePartiel} </td>
                                                        <td scope="col">{note.coefPartiel}</td>
                                                        <td scope="col">{note.moyenne.toFixed(2)}</td>
                                                        <td className="text-right">
                                                          
                                                            <Button color='info' 
                                                                    onClick={
                                                                        () => this.setState({
                                                                        tmpINE: note.ine,
                                                                        tmpNomEtudiant: note.nom,
                                                                        tmpPrenomEtudiant: note.prenom,
                                                                        tmpNoteDS: note.noteDs,
                                                                        tmpNotePartiel: note.notePartiel,
                                                                        pos: index,
                                                                        modal: !this.state.modal
                                                                    })
                                                                    
                                                                    
                                                                }
                                                            >
                                                                Mettre à jour</Button>

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
        );
    }
}

export default ListeEtudiantByIdMatiere;
