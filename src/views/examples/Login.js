
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
  Row,
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
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeIne = this.onChangeIne.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.state = {
        ine: "",
        date: "",
        message: "",
        loading: false
    };
}

 onChangeIne(e) {
    this.setState({
      ine: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onSubmit(){
      AuthService.loginAdmin(this.state.ine,this.state.date).then(
        (response) => {
          if (response !== ""){
            console.log("isConnected");
            this.props.history.push("/administrateur/allEtudiant");
            window.location.reload();
          }else{
              
            this.setState({
                message: 'Identifiant ou Mot de passe erroné'
              });
          }
      },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              message: 'Identifiant ou Mot de passe erroné'
            });
          }
      )
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                Veuillez saisir vos identifiants <strong>d'administateur</strong> 
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Identifiant"
                    onChange={this.onChangeIne}
                     type="text" 
                     autoComplete="new-email"
                     value={this.state.ine}
                     validations={[required]}
                     />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Mot de passe"
                     onChange={this.onChangeDate}
                     type="password"
                     autoComplete="new-password"
                     value={this.state.date}
                     validations={[required]}
                     />
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
                  <Button className="my-4" color="primary" type="button" 
                  onClick={this.onSubmit}
                  >
                    Se connecter
                  </Button>
                </div>
                {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
              </Form>
            </CardBody>
          </Card>
          
          </Col>
      </>
    );
  }
}

export default Login;
