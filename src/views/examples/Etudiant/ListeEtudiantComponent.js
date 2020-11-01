import React from 'react';
import AdminService from '../../../_services/AdminService';


class ListeEtudiantComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            etudiants:[]
        }
        this.addEtudiant= this.addEtudiant.bind(this);
        this.editEtudiant=this.editEtudiant.bind(this);
        this.deleteEtudiant=this.deleteEtudiant.bind(this);
        this.viewEtudiant=this.viewEtudiant.bind(this);
    }

    componentDidMount(){
        console.log("api réussi getALL?");
        AdminService.getAllEtudiant().then((response)=>{
            this.setState({etudiants: response.data});
        });
        // AdminService.getAllEtudiant().then((response)=>{
        //     this.setState({etudiants: response.data})
        // });
        console.log("api réussi getALL Yes")


        // AdminService.getEtudiantById().then((response)=>{
        //     this.setState({etudiants: response.data})
        // });
    }

    addEtudiant(){
            this.props.history.push('/administrateur/add-update-Etudiant/-add');
    }

    editEtudiant(id){
        this.props.history.push(`/administrateur/add-update-Etudiant/${id}`);
    }
    deleteEtudiant(id){
        console.log("liste etudiant = "+  this.state.etudiants);
        AdminService.deleteEtudiant(id).then( res=>{
            this.setState({etudiants: this.state.etudiants.filter(etudiant=>etudiant.id!==id)});
        });
    }

    viewEtudiant(id){
        this.props.history.push(`/administrateur/ViewEtudiant/${id}`);
    }
    
    //jsx de js 
    render(){
        return(
            <div>
                <h1 className= "text-center" > Etudiants list</h1>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEtudiant}>Add Etudiant</button>
                </div>
                <table className= " table table-striped" >
                    <thead>
                        <tr>
                            <th>nom</th>
                            <th>role</th>
                            <th>prenom</th>
                            <th>num</th>
                            <th>ine</th>
                            <th>date de naissance</th>
                            <th>Mail </th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.etudiants.map(
                                etudiant=>
                                <tr key ={etudiant.id}>
                                    <td>{etudiant.nom}</td>
                                    <td>{etudiant.role}</td>
                                    <td>{etudiant.prenom}</td>
                                    <td>{etudiant.num}</td>
                                    <td>{etudiant.ine}</td>
                                    <td>{etudiant.dateNaissance}</td>
                                    <td>{etudiant.mail}</td>
                                    <td>
                                    <button onClick ={()=> this.editEtudiant(etudiant.id)} className="btn btn-info">Update</button>
                                    <button style={{marginLeft:"10px"}} onClick ={()=> this.deleteEtudiant(etudiant.id)} className="btn btn-danger">Delete</button>
                                    <button style={{marginLeft:"10px"}} onClick ={()=> this.viewEtudiant(etudiant.id)} className="btn btn-info">View</button>
                                    </td>
                                    

                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListeEtudiantComponent