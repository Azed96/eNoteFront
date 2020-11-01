import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';

class ViewEtudiantComponent extends Component{
    constructor(propos){
        super(propos)
        this.state={
            id:this.props.match.params.id,
            etudiant:{}
        }
        this.cancel=this.cancel.bind(this);
    }

    componentDidMount(){
        AdminService.getEtudiantById(this.state.id).then((response)=>{
            this.setState({etudiant:response.data});
        });
    }

    cancel(){
        this.props.history.push('/administrateur/allEtudiant');
    }

    render(){
        return (
            <div>
            <div className="card clo-md-6 Offset-md-3">
                    <h3 className="texte-center">View etudiant</h3>
                    <div className=" card-body">
                        <div clasName="row">
                            <label>nom: </label>
                            <div>{this.state.etudiant.nom}</div>
                        </div>
                        <div clasName="row">
                            <label>prenom: </label>
                            <div>{this.state.etudiant.prenom}</div>
                        </div>
                        <div clasName="row">
                            <label>role: </label>
                            <div>{this.state.etudiant.role}</div>
                        </div>
                        <div clasName="row">
                            <label>num: </label>
                            <div>{this.state.etudiant.num}</div>
                        </div>
                        <div clasName="row">
                            <label>ine: </label>
                            <div>{this.state.etudiant.ine}</div>
                        </div>
                        <div clasName="row">
                            <label>dateNaissance: </label>
                            <div>{this.state.etudiant.dateNaissance}</div>
                        </div>
                        <div clasName="row">
                            <label>mail: </label>
                            <div>{this.state.etudiant.mail}</div>
                        </div>
                     </div>
                </div>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>
            </div>
        );
    
    }
}

export default ViewEtudiantComponent 