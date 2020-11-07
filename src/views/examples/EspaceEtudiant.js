
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
            infoFiliere: {},
            sommeMoyennes:0,
            sommeCoefs:0

        };
        this.ds=this.ds.bind(this);
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

    ds(e){
        if(e===true){
            return 'Oui';
        }else {
            return 'Non';
        }
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
                                const sommeCoefs = state.sommeCoefs + note.coef;
                                const sommeMoyennes = state.sommeMoyennes + (note.moyenne * note.coef);

                                return {
                                    listeNotes,sommeCoefs,sommeMoyennes
                                };
                            });
                         //   console.log("note" + JSON.stringify(note));

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
                        <div >
                            <Card className="shadow" style={{right :"330px"}}>
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 "> <u>Année Universitaire:</u> <strong>{this.state.infoFiliere.anneeScolaire}</strong>  </h3>
                                    <h3 className="mb-0 "> <u>Filière:</u> <strong>{this.state.infoFiliere.nom}</strong>  </h3>
                                    <h3 className="mb-0 "> <u>INE étudiant:</u> <strong>{this.currentuser.ine}</strong>  </h3>

                                </CardHeader>
                                <Table className="align-items-center table-flush " responsive>
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
                                                        <td>{ this.ds(note.hasDs)} 
                                                       </td>
                                                        <td>{note.noteDs}</td>
                                                        <td>{note.coefDs}</td>
                                                        <td>{note.notePartiel}</td>
                                                        <td>{note.coefPartiel}</td>
                                                        <td>{note.moyenne.toFixed(2)}</td>
                                                        <td>{note.coef}</td>
                                                        <td>{(note.moyenne * note.coef).toFixed(2) }</td>


                                                    </tr>
                                            )
                                        }
                                                    <tr>
                                                        <td className="table-info" ><strong>Moyenne Annuelle</strong></td>
                                                        <td className="table-info" colspan="8"></td> 
                                                        <td className="table-info">{(this.state.sommeMoyennes / this.state.sommeCoefs).toFixed(2) }</td>
                                                        <td className="table-info"/>
                                                    </tr>
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
