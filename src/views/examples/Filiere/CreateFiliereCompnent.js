import React ,{Component} from 'react';
import adminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Form, Col, Input, FormGroup, CardBody,Button
} from "reactstrap";

class CreateFiliereComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            nom: ''
        }
        this.changerNomFiliereHandler=this.changerNomFiliereHandler.bind(this);
    }
    componentDidMount(){          
                if(this.state.id==='-addFiliere'){
                    return 
                }else{
                    adminService.getFiliereById(this.state.id).then((res)=>{
                    let  filiere=res.data;
                    console.log("id  filiere=?"+this.state.id);
                    console.log(JSON.stringify(" filiere=?"+ filiere));
                    this.setState({
                         nom:  filiere.nom,
                     })
                })
                }
    }

    changerNomFiliereHandler(event){
        this.setState({nom: event.target.value});
        console.log("nom filiere="+this.state.nom);
    }
    

    saveAndUpdateProf = (e)=>{
        e.preventDefault();
        let filiere= {nom: this.state.nom}
        if(this.state.id==='-addFiliere'){
            adminService.addFiliere(filiere).then(response=>{
                this.props.history.push('/administrateur/allFiliere');
            })
        }else{
            adminService.updateFiliere(this.state.id,filiere).then(response=>{
                this.props.history.push('/administrateur/allFiliere');
             })
          }
    }
    cancel(){
        return this.props.history.push('/administrateur/allFiliere')
    }
    
getTitle(){
    if(this.state.id===-1){
        return <h3 className="texte-center">Ajouter Filiere</h3>

    }else {
        return <h3 className="texte-center">Update Filiere</h3>
    }
}

    render(){
        return(
            <>
            <Header />

            <Container className="mt--7" fluid>
                <Row>
                        <div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                 <h3 className="mb-0 text-center"> Création d'une Filière </h3>
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
                                                            className="form-control-alternative"
                                                            placeholder="Nom de la filière"
                                                            type="text"
                                                            value={this.state.nom} onChange={this.changerNomFiliereHandler}                                                        />
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
                                            <Button className="my-4" color="success" type="button"
                                                onClick={this.saveAndUpdateProf}
                                            >
                                                Enregistrer
                                               </Button>
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
    )
}
}
export default CreateFiliereComponent