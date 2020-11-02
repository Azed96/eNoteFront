import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button
} from "reactstrap";

class ViewProfComponent extends Component{
    constructor(propos){
        super(propos)
        this.state={
            id:this.props.match.params.id,
            prof:{}
        }
        this.cancel=this.cancel.bind(this);
    }

    componentDidMount(){
        AdminService.getProfById(this.state.id).then((response)=>{
            this.setState({prof:response.data});
        });
    }

    cancel(){
        this.props.history.push('/administrateur/allProf');
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
                                 <h3 className="mb-0 text-center"> Informations d'un enseignant </h3>
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
                                                            readOnly
                                                            className="form-control-alternative"
                                                            placeholder="Pernom"
                                                            type="text"
                                                            value={this.state.prof.nom} onChange={this.changerLastNameHandler}
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
                                                            placeholder="Nom"
                                                            type="text"
                                                            value={this.state.prof.prenom} onChange={this.changerFirstNameHandler}                                                        />
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
                                                            placeholder="INE"
                                                            type="text"
                                                            value={this.state.prof.ine} onChange={this.changerIneHandler}
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
                                                            id="input-first-name"
                                                            placeholder="Tél"
                                                            type="text"
                                                            value={this.state.prof.num} onChange={this.changerNumHandler}
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
                                                            id="input-last-name"
                                                            placeholder="Date de Naissance"
                                                            type="text"
                                                            value={this.state.prof.dateNaissance} onChange={this.changerDateNaissanceHandler}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <div className="text-center">
                                                
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
                                                            id="input-first-name"
                                                            placeholder="email"
                                                            type="text"
                                                            value={this.state.prof.mail} onChange={this.changerMailHandler}
                                                        />
                                                    </FormGroup>
                                                
                                                    </div>
                                            
                                        </div>
                                        <div className="text-center">
                                               <Button className="my-4" color="danger" type="button"
                                                onClick={this.cancel.bind(this)}
                                            >
                                                Liste des Enseignants
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

export default ViewProfComponent