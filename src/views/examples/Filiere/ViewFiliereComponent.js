import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';

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
            <div>
                <div className="card clo-md-6 Offset-md-3">
                        <h3 className="texte-center">View Filiere</h3>
                        <div className=" card-body">
                            <div clasName="row">
                                <label>nom: </label>
                                <div>{this.state.filiere.nom}</div>
                            </div>
                        </div>
                </div>
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>
            </div>
        );
    
    }
}

export default ViewFiliereComponent