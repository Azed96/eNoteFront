import React from "react";
import AuthService from "../../_services/auth.service"

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  

class LoginEtudiant extends React.Component {

   constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    this.state = {
        ine: "",
        date: ""
    };
}

  login(){
      AuthService.loginEtudiant("125","24041998").then(
          () => {
              console.log("c'est fait")
          }
      )
  }

  render() {
    
      return(
        <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Veuillez saisir vos identifiants d'Etudiant</small>
              </div>
              <Form role="form" onSubmit={this.login}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Identifiant" type="text" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Date de naissance (jjmmaaaa)" type="text" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Se souvenir de moi</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onSubmit={this.login}>
                    Se connecter
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          </Col>
        </>
      );

  
}

getInfoProf(){
    //API Etudiant 
}

}

export default LoginEtudiant;
