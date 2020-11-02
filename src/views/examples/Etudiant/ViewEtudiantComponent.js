import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button
} from "reactstrap";

class ViewEtudiantComponent extends Component {
    constructor(propos) {
        super(propos)
        this.state = {
            id: this.props.match.params.id,
            etudiant: {}
        }
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        AdminService.getEtudiantById(this.state.id).then((response) => {
            this.setState({ etudiant: response.data });
        });
    }

    cancel() {
        this.props.history.push('/administrateur/allEtudiant');
    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                <Row>
                        <div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                 <h3 className="mb-0 text-center"> Informations </h3>
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
                                                            value={this.state.etudiant.prenom}
                                                            placeholder="Pernom"
                                                            type="text"
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
                                                            value={this.state.etudiant.nom}
                                                            placeholder="Nom"
                                                            type="text"
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
                                                            value={this.state.etudiant.ine}
                                                            placeholder="INE"
                                                            type="text"
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
                                                            Numéro de Télephone
                                                    </label>
                                                        <Input
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.etudiant.num}
                                                            id="input-first-name"
                                                            placeholder="Tél"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >
                                                            Date de Naissance
                                                    </label>
                                                        <Input
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.etudiant.dateNaissance}
                                                            id="input-last-name"
                                                            placeholder="Date de Naissance"
                                                            type="text"
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
                                                            Adresse eMail
                                                    </label>
                                                        <Input 
                                                            readOnly
                                                            className="form-control-alternative"
                                                            value={this.state.etudiant.num}
                                                            id="input-first-name"
                                                            placeholder="email"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note-par"
                                                        >
                                                            Filière
                                                    </label>
                                                        <Input
                                                            readOnly
                                                            className="form-control-alternative"
                                                            id="input-last-name"
                                                            placeholder="Filière"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="text-center">
                                            <Button className="my-4" color="danger" type="button"
                                                onClick={this.cancel.bind(this)}
                                            >
                                                Liste des étudiants
                                               </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                        
                    </Row>

                </Container>
                
            </>
        );

    }
}

export default ViewEtudiantComponent 