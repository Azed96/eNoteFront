import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody, Button
} from "reactstrap";

class ViewMatiereComponent extends Component{
    constructor(propos){
        super(propos)
        this.state={
            id:this.props.match.params.id,
            matiere:{}
        }
        this.cancel=this.cancel.bind(this);
    }

    componentDidMount(){
        AdminService.getMatiereById(this.state.id).then((response)=>{
            this.setState({matiere:response});
        });
    }

    cancel(){
        this.props.history.push('/administrateur/allMatiere');
    }

    render(){
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <h3 className="mb-0 text-center"> Informations d'une matiére </h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form">
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-Prenom"
                                                        >
                                                            Intitulé de nouveau module
                                                   </label>
                                                        <Input
                                                        readOnly
                                                            className="form-control-alternative"
                                                            placeholder="Intitulé"
                                                            type="text"
                                                            value={this.state.matiere.nom}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-nom"
                                                        >
                                                            Filière d'appartenance
                                                    </label>
                                                    <Input
                                                        readOnly
                                                            className="form-control-alternative"
                                                            placeholder="Filiere"
                                                            type="text"
                                                            value={this.state.matiere.nomFiliere}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            
                                            <div className="text-center">
                                                
                                                    
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-note DS"
                                                        >
                                                            INE de Professeur Responsable
                                                    </label>
                                                    <Input
                                                        readOnly
                                                            className="form-control-alternative"
                                                            placeholder="Intitulé"
                                                            type="text"
                                                            value={this.state.matiere.ineProf}
                                                        />
                                                    
                                                   
                                                
                                                </div>
                                            
                                           
                                        </div>
                                        <div className="text-center">
                                            
                                            <Button className="my-4" color="danger" type="button"
                                                onClick={this.cancel.bind(this)}
                                            >
                                                Liste des Modules
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

export default ViewMatiereComponent