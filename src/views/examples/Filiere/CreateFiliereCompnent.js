import React ,{Component} from 'react';
import adminService from '../../../_services/AdminService';

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
            
            <div className="container">
            <div className="row"> 
                <div className="card clo-md-6 Offset-md-3 pffset-md-3">
                   {this.getTitle()}

                    <div className=" card-body">
                        <from>
                             <div clasName="from-group">
                                <div> 
                                    <label>Nom Filiere</label>
                                    <input placeholder="nom" name="nom" className="form-control"
                                     value={this.state.nom} onChange={this.changerNomFiliereHandler}/>
                                </div>
                                </div>
                             <button className="btn btn-success" onClick={this.saveAndUpdateProf}>Save</button>
                             <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button> 
                        </from>
                    </div>

                </div>
            </div>
        </div>                        

    )
}
}
export default CreateFiliereComponent