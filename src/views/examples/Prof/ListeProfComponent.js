import React from'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Table, Container, Row, CardHeader,
    Button
} from "reactstrap"; 

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
        this.props.history.push(`/administrateur/add-update-prof/:id`)
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
        this.props.history.push(`/setting/ViewProf/${id}`);
    }

     //jsx de js 
     render(){
        return(
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 text-center"> Liste des Enseignants  </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">INE</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Pernom</th>
                                            <th scope="col">Date de Naissace</th>
                                            <th scope="col">Tél</th>
                                            <th scope="col">Adresse eMail</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                           this.state.profs.map(
                                            prof=>
                                                    <tr key={prof.id}>
                                                        <td>{prof.ine}</td>
                                                        <td>{prof.nom}</td>
                                                        <td>{prof.prenom}</td>
                                                        <td>{prof.dateNaissance}</td>
                                                        <td>{prof.num}</td>
                                                        <td>{prof.mail}</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                onClick ={()=> this.editProf(prof.id)}
                                                            >
                                                                Mettre à jour
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                onClick ={()=> this.deleteProf(prof.id)}        
                                                                >                                                    
                                                                Supprimer
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick ={()=> this.viewProf(prof.id)}                                                               >                                                    
                                                                Consulter
                                                            </Button>
                                                        </td>


                                                    </tr>
                                            )
                                        }

                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </Row>
                   

                </Container>
          
            </>
        )
    }
}

export default ListeProfComponent