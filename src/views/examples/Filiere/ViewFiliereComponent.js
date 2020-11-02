import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button
} from "reactstrap";

class ViewFiliereComponent extends Component{
    constructor(propos){
        super(propos)
        this.state={
            id:this.props.match.params.id,
            filiere:{}
        }
        this.cancel=this.cancel.bind(this);
    }

    componentDidMount(){
        AdminService.getFiliereById(this.state.id).then((response)=>{
            this.setState({filiere:response.data});
        });
    }

    cancel(){
        this.props.history.push('/administrateur/allFiliere');
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
                                 <h3 className="mb-0 text-center"> Consulter une Filière </h3>
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
                                                            Nom de la Filiere
                                                   </label>
                                                        <Input
                                                            readOnly
                                                            className="form-control-alternative"
                                                            placeholder="Nom de la filière"
                                                            type="text"
                                                            value={this.state.filiere.nom}                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-nom"
                                                        >
                                                            Année Universitaire
                                                    </label>
                                                        <Input
                                                            readOnly
                                                            className="form-control-alternative"
                                                            placeholder="2020/2021"
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
                                                Liste des filières
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

export default ViewFiliereComponent