
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service";
import AdminService from "../../_services/AdminService";
import StorageService from "../../_services/StorageService";
import jsPDF from "jspdf";
import "jspdf-autotable";

import {
    Modal, ModalFooter, ModalBody, ModalHeader, Card, Table, Container, Row, CardHeader, Form,
    Button, Col, Input, FormGroup, CardBody
} from "reactstrap";
import coursService from "_services/cours.service";



class EspaceEtudiant extends React.Component {

    constructor(props) {
        super(props);
        //this.currentuser = AuthService.getCurrentUser();
        this.currentuser = JSON.parse(localStorage.getItem('userStudent'));
        this.getNotes = this.getNotes.bind(this);
        this.toggle = this.toggle.bind(this);
        this.recup = this.recup.bind(this);
        this.generateReleveNote = this.generateReleveNote.bind(this);
        if ((this.currentuser == "") || (this.currentuser == null)) {
            this.props.history.push('/auth/login');
        }

        this.state = {
            listeNotes: [],
            infoFiliere: {},
            sommeMoyennes: 0,
            sommeCoefs: 0,
            coursbyidMatiere: '',
            listeCoursTemp: [],
            nomMatiereTemp: '',
            modal: false,
            position: undefined

        };
        this.ds = this.ds.bind(this);
    }

    generateReleveNote() {
        // initialize jsPDF
        const doc = new jsPDF();

        // define the columns we want and their titles
        const tableColumn = ["Matiere", "Note DS", "Note Partiel", "Coef", "Moyenne"];
        // define an empty array of rows
        const tableRows = [];
        this.state.listeNotes.forEach(note =>{
            const NoteToAdd = [
                note.nomMatiere,
                note.noteDs,
                note.notePartiel,
                note.coef,
                note.moyenne.toFixed(2),
            ];
            tableRows.push(NoteToAdd);
        });
        tableRows.push([
            "Moyenne Annuelle",
            "",
            "",
            this.state.sommeCoefs,
            (this.state.sommeMoyennes / this.state.sommeCoefs).toFixed(2)
        ]);
        // startY is basically margin-top
        doc.autoTable(tableColumn, tableRows, { startY: 38 });
        // ticket title. and margin-top + margin-left
        doc.text(["Année Universitaire: "+this.state.infoFiliere.anneeScolaire,
                  "Filière: "+this.state.infoFiliere.nom,
                  "Nom et Prenom: "+this.currentuser.nom+" "+this.currentuser.prenom,
                  "INE: "+this.currentuser.ine], 14, 15);
        //doc.text("Filière: "+this.state.infoFiliere.nom, 14, 15);
        //doc.text("Nom et Prenom: "+this.currentuser.nom+" "+this.currentuser.prenom, 14, 15);
        //doc.text("INE: "+this.currentuser.ine, 14, 15);
        doc.save(`MesNotes${this.currentuser.ine}.pdf`);
    }


    Telechargement(fileName) {
        StorageService.download(fileName);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    recup(index) {


    }




    componentDidMount() {
        this.getNotes();

        //info Filiere
        AdminService.getFiliereById(this.currentuser.idFiliere).then(resFiliere => {
            this.setState({
                infoFiliere: resFiliere.data
            })
        });

    }

    ds(e) {
        if (e === true) {
            return 'Oui';
        } else {
            return 'Non';
        }
    }

    getNotes() {

        MatiereService.getNotesByIdEtudiant(this.currentuser.id)
            .then(res => {
                res.forEach(note => {
                    AdminService.getProfById(note.idProf).then(infoProf => {
                        note.nomProf = infoProf.data.nom;
                        note.prenomProf = infoProf.data.prenom;

                        MatiereService.getMatiereByid(note.idMatiere).then(resMatiere => {

                            coursService.geCoursByidMatiere(note.idMatiere).then(responseCours => {
                                note.listeCours = responseCours;
                                note.nomMatiere = resMatiere.nom;
                                note.coef = resMatiere.coefModule;
                                this.setState(state => {
                                    const listeNotes = [...state.listeNotes, note];
                                    const sommeCoefs = state.sommeCoefs + note.coef;
                                    const sommeMoyennes = state.sommeMoyennes + (note.moyenne * note.coef);


                                    return {
                                        listeNotes, sommeCoefs, sommeMoyennes
                                    };
                                });

                            });


                            //   console.log("note" + JSON.stringify(note));

                        });



                    });

                });

            });

    }

    render() {


        return (

            <>
                <Modal isOpen={this.state.modal} size="lg" style={{ maxWidth: '1600px', width: '60%', margin: '310px auto' }}>
                    <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}> <h1> Liste des Cours <strong>
                        {this.state.nomMatiereTemp} </strong> </h1></ModalHeader>
                    <ModalBody>
                        <Form role="form"  >

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
                                    this.state.listeCoursTemp.map(
                                        (cours, index) =>
                                            <tr key={cours.id}>
                                                <td scope="col">{index + 1}</td>
                                                <td scope="col">{cours.nom}</td>
                                                <td scope="col">{
                                                    new Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(Date.parse(cours.dateCreation))

                                                }</td>
                                                <td scope="col">
                                                    <Button color='info' onClick={() => this.Telechargement(cours.nomFileStorage)}><i className=" ni ni-cloud-download-95" /></Button>

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
                <Container >

                    <Row>
                            <Card className="shadow"  >
                                <CardHeader className="border-0">
                                    <Row>
                                        <Col lg="9">
                                            <h3 className="mb-0 "> <u>Année Universitaire:</u> <strong>{this.state.infoFiliere.anneeScolaire}</strong>  </h3>
                                            <h3 className="mb-0 "> <u>Filière:</u> <strong>{this.state.infoFiliere.nom}</strong>  </h3>
                                            <h3 className="mb-0 "> <u>INE étudiant:</u> <strong>{this.currentuser.ine}</strong>  </h3>
                                        </Col>
                                        <Col lg="2">
                                            <Button color="info" onClick={this.generateReleveNote}>Imprimer mes notes </Button>
                                        </Col>
                                    </Row>
                                </CardHeader >
                                <Table className="align-items-center table-flush " responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Module</th>
                                            <th scope="col">Cours</th>
                                            <th scope="col">Nom et Prénom de l'enseignant</th>
                                            <th scope="col">DS Obligatoire</th>
                                            <th scope="col">Note de Controle</th>
                                            <th scope="col">Coef de Controle</th>
                                            <th scope="col">Note de Partiel</th>
                                            <th scope="col">Coef de Partiel</th>
                                            <th scope="col">Moyenne de Module</th>
                                            <th scope="col">Coef de Module</th>
                                            <th scope="col">Total</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            this.state.listeNotes.map(
                                                (note, index) =>
                                                    <tr key={note.id}>
                                                        <td>{note.nomMatiere}</td>
                                                        <td >
                                                            <Button className="button is-white fa fa-eye" onClick={() => {
                                                                this.setState({

                                                                    modal: true,
                                                                    listeCoursTemp: note.listeCours,
                                                                    nomMatiereTemp: note.nomMatiere,
                                                                    position: index

                                                                });
                                                            }}>
                                                            </Button>
                                                        </td>

                                                        <td>{note.nomProf}{" "}{note.prenomProf}</td>
                                                        <td>{this.ds(note.hasDs)}
                                                        </td>
                                                        <td>{note.noteDs}</td>
                                                        <td>{note.coefDs}</td>
                                                        <td>{note.notePartiel}</td>
                                                        <td>{note.coefPartiel}</td>
                                                        <td>{note.moyenne.toFixed(2)}</td>
                                                        <td>{note.coef}</td>
                                                        <td>{(note.moyenne * note.coef).toFixed(2)}</td>


                                                    </tr>
                                            )
                                        }
                                        <tr>
                                            <td className="table-info" ><strong>Moyenne Annuelle</strong></td>
                                            <td className="table-info" colspan="9"></td>
                                            <td className="table-info">{(this.state.sommeMoyennes / this.state.sommeCoefs).toFixed(2)}</td>
                                            <td className="table-info" />
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                    </Row>
                </Container>
            </>
        );
    }
}

export default EspaceEtudiant;
