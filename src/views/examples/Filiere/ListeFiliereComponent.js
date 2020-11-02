import React ,{Component} from 'react';
import AdminService from '../../../_services/AdminService';

class ListeFiliereComponent extends Component{
    constructor(props){
        super(props);
        this.state={ 
            filieres:[]
        }
       this.addFiliere=this.addFiliere.bind(this);
        this.editFiliere=this.editFiliere.bind(this);
         this.deleteFiliere=this.deleteFiliere.bind(this);
    }

    componentDidMount(){
        AdminService.getAllFiliere().then((response)=>{
            this.setState({filieres: response});
        });
        console.log("filieres ="+ this.state.filieres);
    }

    addFiliere(){
        this.props.history.push(`/administrateur/add-update-filiere/-addFiliere`);
    }
    editFiliere(id){
        this.props.history.push(`/administrateur/add-update-filiere/${id}`);
    }
    viewFiliere(id){
        this.props.history.push(`/administrateur/ViewFiliereComponent/${id}`);
    }

    deleteFiliere(id){
        AdminService.deleteFiliere(id).then(reponse=>{
            this.setState({filieres: this.state.filieres.filter(filiere=>filiere.id!=id)});
        })
    }
 
    render(){
        return( 
        <div>
            <h1 className= "text-center" > Liste filiere</h1>
            <div className="row">
                <button className="btn btn-primary" onClick={this.addFiliere}>Add Filiere</button>
            </div>
            <table className= " table table-striped" >
                <thead>
                    <tr>
                        <th>nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.filieres.map(
                            filiere=>
                            <tr key ={filiere.id}>
                                <td>{filiere.nom}</td>
                                <button onClick ={()=> this.editFiliere(filiere.id)} className="btn btn-info">Update</button>
                                <button style={{marginLeft:"10px"}} onClick ={()=> this.deleteFiliere(filiere.id)} className="btn btn-danger">Delete</button>
                                <button style={{marginLeft:"10px"}} onClick ={()=> this.viewFiliere(filiere.id)} className="btn btn-info">View</button>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        )
    }
}
export default ListeFiliereComponent