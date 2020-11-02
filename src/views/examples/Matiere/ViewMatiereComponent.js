import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';

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
            <div>
            <div className="card clo-md-6 Offset-md-3">
                    <h3 className="texte-center">View matiere</h3>
                    <div className=" card-body">
                        <div clasName="row">
                            <label>nom: </label>
                            <div>{this.state.matiere.nom}</div>
                        </div>
                        <div clasName="row"> 
                            <label>idProf: </label>
                            <div>{this.state.matiere.idProf}</div>
                        </div>
                        <div clasName="row">
                            <label>ineProf: </label>
                            <div>{this.state.matiere.ineProf}</div>
                        </div>
                        <div clasName="row">
                            <label>idFiliere: </label>
                            <div>{this.state.matiere.idFiliere}</div>
                        </div>
                        <div clasName="row">
                            <label>nomFiliere: </label>
                            <div>{this.state.matiere.nomFiliere}</div>
                        </div>
                        </div>
             </div>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>
            </div>
        );
    
    }
}

export default ViewMatiereComponent