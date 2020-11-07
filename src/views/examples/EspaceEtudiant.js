
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import AdminService from "../../_services/AdminService"

import {
    Card, Table, Container, Row, CardHeader, Form,
    Button, Col, Input, FormGroup, CardBody
} from "reactstrap";



class EspaceEtudiant extends React.Component {

    constructor(props) {
        super(props);
        this.currentuser = AuthService.getCurrentUser();
        this.getNotes = this.getNotes.bind(this);

        if (this.currentuser == "") {
            this.props.history.push('/auth');
        }

        this.state = {
            listeNotes: [],
            infoFiliere: {}

        };
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


    getNotes() {
        /* let noteData ={
             idEtudaint: '',
             idMatiere:'',
             idProf: '',
             hasDs:true,
             noteDs:0,
             coef: 0,
             coefDs: 0,
             coefPartiel : 0,
             notePartiel : 0,
             nomProf : '',
             prenomProf : '',
             nomMatiere :'',
         };*/

        //let notes = [];

        MatiereService.getNotesByIdEtudiant(this.currentuser.id)
            .then(res => {
                res.forEach(note => {
                    AdminService.getProfById(note.idProf).then(infoProf => {
                        note.nomProf = infoProf.data.nom;
                        note.prenomProf = infoProf.data.prenom;
                        MatiereService.getMatiereByid(note.idMatiere).then(resMatiere => {
                            note.nomMatiere = resMatiere.nom;
                            note.coef = resMatiere.coefModule;
                            this.setState(state => {
                                const listeNotes = [...state.listeNotes, note];

                                return {
                                    listeNotes,
                                };
                            });
                            console.log("note" + JSON.stringify(note));

                        })


                    });

                });

            });

    }


    render() {

        return (
            <>

                <Container className="mt--7" fluid>

                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 "> Année Universitaire: <strong>{this.state.infoFiliere.anneeScolaire}</strong>  </h3>
                                    <h3 className="mb-0 "> Filière: <strong>{this.state.infoFiliere.nom}</strong>  </h3>
                                    <h3 className="mb-0 "> INE étudiant: <strong>{this.currentuser.ine}</strong>  </h3>

                                </CardHeader>
                                <Table className="align-items-center " responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Module</th>
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
                                                note =>
                                                    <tr key={note.id}>
                                                        <td>{note.nomMatiere}</td>
                                                        <td>{note.nomProf}{" "}{note.prenomProf}</td>
                                                        <td><Input
                                                            readOnly
                                                            className="form-control-alternative"
                                                            type="checkbox"
                                                            checked={note.hasDs} 
                                                        /></td>
                                                        <td>{note.noteDs}</td>
                                                        <td>{note.coefDs}</td>
                                                        <td>{note.notePartiel}</td>
                                                        <td>{note.coefPartiel}</td>
                                                        <td>{note.moyenne.toFixed(2)}</td>
                                                        <td>{note.coef}</td>
                                                        <td>{note.moyenne.toFixed(2) * note.coef.toFixed(2) }</td>


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

export default EspaceEtudiant;
