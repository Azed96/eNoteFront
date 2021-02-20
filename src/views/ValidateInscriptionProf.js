
import React from "react";
import ServiceAuth from "../_services/auth.service"

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

class ValidationInscriptionProf extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMDP = this.onChangeMDP.bind(this);
        this.logprof = this.logprof.bind(this);
        this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
    
        this.state = {
            mdp : '',
            idProf : this.props.match.params.id,
            infoProf : {},
            passwordShown:false,
            sub :false,
            ok: false
        };
    }
    componentDidMount() {
        ServiceAuth.getInfoProfById(this.state.idProf)
        .then(res =>{
            this.setState({
                infoProf : res
            })
        });
    }

    
     
      onChangeMDP(e) {
        this.setState({
            mdp: e.target.value
        });
      }

      togglePasswordVisiblity(){
        this.setState({
          passwordShown: !this.state.passwordShown
          });
      };
    
      onSubmit(){
        
        ServiceAuth.updateProf(this.state.idProf,this.state.infoProf,this.state.mdp);
        this.setState({
            sub : true,
            ok : true
        });
        
      }

      logprof(){
        this.props.history.push(`/auth/logprof`);
      }

  render() {
    
      return(
        <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
               Bonjour M/MMe. <strong>{this.state.infoProf.prenom} {""} {this.state.infoProf.nom}</strong>, {"        "} Veuillez Completer votre compte afin de procéder à son activation.
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Saisissez votre nouveau mot de passe"
                     onChange={this.onChangeMDP}
                     type="password"
                     autoComplete="new-password"
                     value={this.state.mdp}
                     type={this.state.passwordShown ? "text" : "password"}
                     required/>
                     <i onClick={this.togglePasswordVisiblity}>{eye}</i>

                  </InputGroup>
                </FormGroup>
                
                <div className="text-center">
                {!this.state.ok  && (
                  <Button className="my-4" color="primary" type="button"
                                    onClick={this.onSubmit}
                                    >
                    Envoyer
                  </Button>
                  )}
                </div>
                {!this.state.mdp && this.state.sub && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  Veuillez saisir votre nouveau mot de passe avant d'enregistrer
                </div>
              </div>
            )}
            {this.state.ok  && (
              <div className="form-group text-center">
                <div className="alert alert-success" role="alert">
                 Merci, désormais vous pouvez vous connecter sur votre compte en cliquant par la
                 <Button className="my-4" color="" type="button"
                                    onClick={this.logprof}
                                    >
                    Me connecter
                  </Button>
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
export default ValidationInscriptionProf;
