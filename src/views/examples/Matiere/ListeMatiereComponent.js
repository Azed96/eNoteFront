import React ,{Component} from 'react';
import AdminService from '../../../_services/AdminService';

class ListeMatiereComponent extends Component{
    constructor(props){
        super(props);
        this.state={ 
            matieres:[]
        }
       this.addMatiere=this.addMatiere.bind(this);
        this.editMatiere=this.editMatiere.bind(this);
         this.deleteMatiere=this.deleteMatiere.bind(this);
    }

    componentDidMount(){
        AdminService.getAllMatiere().then((response)=>{
            response.data.forEach(element => {
               AdminService.getProfById(element.idProf).then(a =>{
                   element.nomProf = a.data.nom;
                   element.ineProf = a.data.ine;
                   this.setState(state => {
                    const matieres = [...state.matieres, element];

                    return {
                        matieres,
                    };
                });
               })
            });
            this.setState({matieres: response.data});
        });

      
    }

    addMatiere(){
        this.props.history.push(`/administrateur/add-update-matiere/-addMatiere`);
    }
    editMatiere(id){
        this.props.history.push(`/administrateur/add-update-matiere/${id}`);
    }
    viewMatiere(id){
        this.props.history.push(`/administrateur/ViewMatiereComponent/${id}`);
    }

    deleteMatiere(id){
        AdminService.deleteMatiere(id).then(reponse=>{
            this.setState({matieres: this.state.matieres.filter(matiere=>matiere.id!=id)});
        })
    }
 
    render(){
        return( 
        <div>
            <h1 className= "text-center" > Liste matiere</h1>
            <div className="row">
                <button className="btn btn-primary" onClick={this.addMatiere}>Add Matiere</button>
            </div>
            <table className= " table table-striped" >
                <thead>
                    <tr>
                        <th>nom</th>
                        <th>ineProf</th>
                        <th>nomProf</th>
                        <th>idFiliere</th>
                        <th>nomFiliere</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.matieres.map(
                            matiere=>
                            <tr >
                                <td>{matiere.nom}</td>
                                <td>{matiere.ineProf}</td>
                                <td>{matiere.nomProf}</td>
                                <td>{matiere.idFiliere}</td>
                                 <td>{matiere.nomFiliere}</td>
                                <button onClick ={()=> this.editMatiere(matiere.id)} className="btn btn-info">Update</button>
                                <button style={{marginLeft:"10px"}} onClick ={()=> this.deleteMatiere(matiere.id)} className="btn btn-danger">Delete</button>
                                <button style={{marginLeft:"10px"}} onClick ={()=> this.viewMatiere(matiere.id)} className="btn btn-info">View</button>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        )
    }
}
export default ListeMatiereComponent