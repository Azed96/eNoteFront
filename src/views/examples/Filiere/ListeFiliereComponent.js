import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Table, Container, Row, CardHeader,
    Button
} from "reactstrap";

class ListeFiliereComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filieres: []
        }
        this.addFiliere = this.addFiliere.bind(this);
        this.editFiliere = this.editFiliere.bind(this);
        this.deleteFiliere = this.deleteFiliere.bind(this);
    }

    componentDidMount() {
        AdminService.getAllFiliere().then((response) => {
            this.setState({ filieres: response });
        });
        console.log("filieres =" + this.state.filieres);
    }

    addFiliere() {
        this.props.history.push(`/administrateur/add-update-filiere/-addFiliere`);
    }
    editFiliere(id) {
        this.props.history.push(`/administrateur/add-update-filiere/${id}`);
    }
    viewFiliere(id) {
        this.props.history.push(`/administrateur/ViewFiliereComponent/${id}`);
    }

    deleteFiliere(id) {
        AdminService.deleteFiliere(id).then(reponse => {
            this.setState({ filieres: this.state.filieres.filter(filiere => filiere.id != id) });
        })
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 text-center"> Liste des Filières  </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Année Universitaire</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />

                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                            this.state.filieres.map(
                                                filiere =>
                                                    <tr key={filiere.id}>
                                                        <td>{filiere.nom}</td>
                                                        <td>2020/2021</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                className="text-center"
                                                                onClick={() => this.editFiliere(filiere.id)}
                                                            >
                                                                Mettre à jour
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                onClick={() => this.deleteFiliere(filiere.id)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick={() => this.viewFiliere(filiere.id)}                                                                >
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
export default ListeFiliereComponent