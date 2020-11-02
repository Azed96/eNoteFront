import React from'react';
import AdminService from '../../../_services/AdminService';

class ListeProfComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            profs:[]
        }
        this.addProf=this.addProf.bind(this);
        this.editProf=this.editProf.bind(this);
        this.deletProf=this.deleteProf.bind(this);
        this.viewProf=this.viewProf.bind(this);


    }

    componentDidMount(){
        AdminService.getAllProf().then((respone)=>{
            this.setState({profs: respone.data})
        });
    }
    addProf(){
        this.props.history.push(`/administrateur/add-update-prof/-addProf`)
    }
    editProf(id){
        this.props.history.push(`/administrateur/add-update-prof/${id}`);
    }
    deleteProf(id){
        AdminService.deleteProf(id).then((respone)=>{
            this.setState({profs: this.state.profs.filter(prof=>prof.id!=id)})
        })
    }

    viewProf(id){
        this.props.history.push(`/administrateur/viewProf/${id}`);
    }

     //jsx de js 
     render(){
        return(
            <div>
                <h1 className= "text-center" > prof list</h1>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addProf}>Add Prof</button>
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
                            this.state.profs.map(
                                prof=>
                                <tr key ={prof.id}>
                                    <td>{prof.nom}</td>
                                    <td>{prof.role}</td>
                                    <td>{prof.prenom}</td>
                                    <td>{prof.num}</td>
                                    <td>{prof.ine}</td>
                                    <td>{prof.dateNaissance}</td>
                                    <td>{prof.mail}</td>
                                    <td>
                                    <button onClick ={()=> this.editProf(prof.id)} className="btn btn-info">Update</button>
                                    <button style={{marginLeft:"10px"}} onClick ={()=> this.deleteProf(prof.id)} className="btn btn-danger">Delete</button>
                                    <button style={{marginLeft:"10px"}} onClick ={()=> this.viewProf(prof.id)} className="btn btn-info">view</button>
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

export default ListeProfComponent