import React from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Table, Container, Row, CardHeader,
    Button
} from "reactstrap";

class ListeEtudiantComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            etudiants: []
        }
        this.addEtudiant = this.addEtudiant.bind(this);
        this.editEtudiant = this.editEtudiant.bind(this);
        this.deleteEtudiant = this.deleteEtudiant.bind(this);
        this.viewEtudiant = this.viewEtudiant.bind(this);
    }

    componentDidMount() {
        console.log("api réussi getALL?");
        AdminService.getAllEtudiant().then((response) => {
            this.setState({ etudiants: response.data });
        });
        // AdminService.getAllEtudiant().then((response)=>{
        //     this.setState({etudiants: response.data})
        // });
        console.log("api réussi getALL Yes")


        // AdminService.getEtudiantById().then((response)=>{
        //     this.setState({etudiants: response.data})
        // });
    }

    addEtudiant() {
        this.props.history.push('/administrateur/add-update-Etudiant/-add');
    }

    editEtudiant(id) {
        this.props.history.push(`/administrateur/add-update-Etudiant/${id}`);
    }
    deleteEtudiant(id) {
        console.log("liste etudiant = " + this.state.etudiants);
        AdminService.deleteEtudiant(id).then(res => {
            this.setState({ etudiants: this.state.etudiants.filter(etudiant => etudiant.id !== id) });
        });
    }

    viewEtudiant(id) {
        this.props.history.push(`/administrateur/ViewEtudiant/${id}`);
    }

    //jsx de js 
    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 text-center"> Liste des étudiants  </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">INE</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Pernom</th>
                                            <th scope="col">Date de Naissace</th>
                                            <th scope="col">Tél</th>
                                            <th scope="col">Adresse eMail</th>
                                            <th scope="col">Filière</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                            this.state.etudiants.map(
                                                etudiant =>
                                                    <tr key={etudiant.id}>
                                                        <td>{etudiant.ine}</td>
                                                        <td>{etudiant.nom}</td>
                                                        <td>{etudiant.prenom}</td>
                                                        <td>{etudiant.dateNaissance}</td>
                                                        <td>{etudiant.num}</td>
                                                        <td>{etudiant.mail}</td>
                                                        <td>NONE</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                onClick={() => this.editEtudiant(etudiant.id)}
                                                            >
                                                                Mettre à jour
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                onClick={() => this.deleteEtudiant(etudiant.id)}        
                                                                >                                                    
                                                                Supprimer
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick={() => this.viewEtudiant(etudiant.id)}                                                                >                                                    
                                                                Consulter
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
        )
    }
}

export default ListeEtudiantComponent