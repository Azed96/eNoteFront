
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
       

        if (this.currentuser == "") {
            this.props.history.push('/auth');
        }

        this.state = {
           listeNotes : [],
           infoFiliere : {}

        };
    }

    componentDidMount() {
        this.getNotes();
        //info Filiere
        AdminService.getFiliereById(this.currentuser.idFiliere).then(resFiliere =>{
            this.setState({
                infoFiliere : resFiliere.data
            })
        });

    }

    
    getNotes(){
        MatiereService.getNotesByIdEtudiant(this.currentuser.id)
        .then(res =>{
            res.forEach(note =>{
                AdminService.getProfById(note.idProf).then(infoProf =>{
                    note.nomProf = infoProf.data.nom;
                    note.prenomProf = infoProf.data.prenom;
                    this.setState(state => {
                        const listeNotes = [...state.listeNotes, note];

                        return {
                            listeNotes,
                        };
                    });
                });

            })
        });
        this.state.listeNotes.forEach(item =>{
            MatiereService.getMatiereByid(item.idMatiere).then(resMatiere =>{
                item.nomMatiere = resMatiere.nom;
                item.coefModule = resMatiere.coefModule;
                this.setState(state => {
                    const listeNotes = [...state.listeNotes, item];

                    return {
                        listeNotes,
                    };
                });
            })
        })
    }


    render() {

        return (
            <>
                
                <Container className="mt--7" fluid>
                   
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 text-center"> Liste des étudiants de module <strong> {this.state.infoMatiere.nom}</strong> de la filiere <strong>{this.state.infoMatiere.nomFiliere}</strong> </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
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
                                                            <Button
                                                                color="info"
                                                                onClick={
                                                                    () => this.setState({
                                                                        tmpINE: note.ine,
                                                                        tmpNomEtudiant: note.nom,
                                                                        tmpPrenomEtudiant: note.prenom,
                                                                        tmpNoteDS :note.noteDs,
                                                                        tmpNotePartiel: note.notePartiel,
                                                                        pos: index
                                                                    })
                                                                }
                                                            >
                                                                Mettre à jour
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
        );
    }
}

export default EspaceEtudiant;
