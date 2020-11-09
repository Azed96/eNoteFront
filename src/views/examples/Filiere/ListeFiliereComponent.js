import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Table, Container, Row, CardHeader,ModalBody, Modal, ModalHeader,
    Button
} from "reactstrap";

class ListeFiliereComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filieres: [],
            modal: false,
            pos: undefined
        }
        this.addFiliere = this.addFiliere.bind(this);
        this.editFiliere = this.editFiliere.bind(this);
        this.deleteFiliere = this.deleteFiliere.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        AdminService.getAllFiliere().then((response) => {
            this.setState({ filieres: response });
        });
    }

    addFiliere() {
        this.props.history.push('/administrateur/add-update-filiere/:id');
    }
    editFiliere(id) {
        this.props.history.push(`/administrateur/add-update-filiere/${id}`);
    }
    viewFiliere(id) {
        this.props.history.push(`/administrateur/ViewFiliereComponent/${id}`);
    }

    deleteFiliere(id) {
        AdminService.deleteFiliere(id).then(reponse => {
            this.setState({
                filieres: this.state.filieres.filter(filiere => filiere.id != id),
                pos: undefined,
                modal: !this.state.modal
            });
        })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}> <h3>Êtes vous sûr de supprimer cette filière ?</h3></ModalHeader>
                        <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                            <Button className="my-4 " color="danger" type="button"
                                onClick={() => this.deleteFiliere(this.state.filieres[this.state.pos].id)}
                            >
                                Oui
                               </Button>
                            <Button color='info' onClick={this.toggle}>Non</Button>
                        </ModalBody>

                    </Modal>
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
                                                (filiere, index) =>
                                                    <tr key={filiere.id}>
                                                        <td>{filiere.nom}</td>
                                                        <td>{filiere.anneeScolaire}</td>
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
                                                                onClick={() => this.setState({
                                                                    pos: index,
                                                                    modal: !this.state.modal
                                                                })}
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