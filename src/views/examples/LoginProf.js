/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import AuthService from "../../_services/auth.service"


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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
  };

class LoginProf extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeIne = this.onChangeIne.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    
        this.state = {
            ine: "",
            date: "",
            message: ""
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
          AuthService.loginProf(this.state.ine,this.state.date).then(
              (response) => {
                  if (response !== ""){
                    console.log("isConnected");
                    this.props.history.push("/admin/index");
                    window.location.reload();
                  }else{
                      
                    this.setState({
                        message: 'Vueillez réessayer SVP'
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
                  message: resMessage
                });
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
               Veuillez saisir vos identifiants<strong> d'Enseignant</strong>
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
                     validations={[required]}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Date de naissance (jjmmaaaa)"
                     onChange={this.onChangeDate}
                     type="text"
                     autoComplete="new-password"
                     value={this.state.date}
                     validations={[required]}/>
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

getInfoProf(){
    //API PROF 
}

}

export default LoginProf;
