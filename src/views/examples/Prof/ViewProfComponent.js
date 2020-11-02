import React, {Component} from 'react';
import AdminService from '../../../_services/AdminService';

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
            <div>
            <div className="card clo-md-6 Offset-md-3">
                    <h3 className="texte-center">View prof</h3>
                    <div className=" card-body">
                        <div clasName="row">
                            <label>nom: </label>
                            <div>{this.state.prof.nom}</div>
                        </div>
                        <div clasName="row">
                            <label>prenom: </label>
                            <div>{this.state.prof.prenom}</div>
                        </div>
                        <div clasName="row">
                            <label>role: </label>
                            <div>{this.state.prof.role}</div>
                        </div>
                        <div clasName="row">
                            <label>num: </label>
                            <div>{this.state.prof.num}</div>
                        </div>
                        <div clasName="row">
                            <label>ine: </label>
                            <div>{this.state.prof.ine}</div>
                        </div>
                        <div clasName="row">
                            <label>dateNaissance: </label>
                            <div>{this.state.prof.dateNaissance}</div>
                        </div>
                        <div clasName="row">
                            <label>mail: </label>
                            <div>{this.state.prof.mail}</div>
                        </div>
                     </div>
                </div>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>
            </div>
        );
    
    }
}

export default ViewProfComponent