
import React from "react";
import AuthService from "../../_services/auth.service";
import MatiereService from "../../_services/matiere.service"
import { Card, CardBody, CardTitle, Table, Container, Row, Col, CardHeader } from "reactstrap";

import Header from "components/Headers/Header.js";
import Index from "views/Index";

class ListeEtudiantByIdMatiere extends React.Component {

    constructor(props) {
        super(props);
        this.currentuser = AuthService.getCurrentUser();
        this.getListeEtudiantMat = this.getListeEtudiantMat.bind(this);
        if (this.currentuser == "") {
            this.props.history.push('/auth');
        }
        this.state = {
            listeEtudiantbyMatiereID: [],
            idProf: this.currentuser.id,
            idMatiere: this.props.match.params.id,
            infoMatiere: {},
            listeInfoEtudiant: []
        };

        this.getInfoMatiere();
        this.getListeEtudiantMat();
        console.log("aa"+JSON.stringify(this.state.listeEtudiantbyMatiereID));


    }

    getListeEtudiantMat() {
        let infoMatiere = {
            idMatiere: this.state.idMatiere,
            idProf: this.state.idProf
        };
        MatiereService.getNotesEtudiant(infoMatiere)
            .then(response => {
                response.forEach((a) =>{
                    AuthService.getInfoEtudiantById(a.idEtudaint).then( data => {
                        a.ine = data.ine;
                        a.nom = data.nom;
                        a.pernom = data.pernom;
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



    render() {
        return (
            <>
                <Header />
                {/* Page content */}
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
                                            <th scope="col">Note du Controle</th>
                                            <th scope="col">Coef du Controle</th>
                                            <th scope="col">Note du Partiel</th>
                                            <th scope="col">Coef du Partiel</th>
                                            <th scope="col">Moyenne</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            this.state.listeEtudiantbyMatiereID.map(
                                                note =>
                                                    <tr key={note.id}>
                                                        <td scope="col">{note.ine}</td>
                                                        <td scope="col">{note.nom}</td>
                                                        <td scope="col">{note.prenom}</td>
                                                        <td scope="col">{note.dateNaissance}</td>
                                                        <td scope="col">{note.noteDs}</td>
                                                        <td scope="col">{note.coefDs}</td>
                                                        <td scope="col">{note.notePartiel}</td>
                                                        <td scope="col">{note.coefPartiel}</td>
                                                        <td scope="col">{note.moyenne}</td>

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
