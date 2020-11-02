import React ,{Component} from 'react';
import AdminService from '../../../_services/AdminService';
import Header from "../../../components/Headers/Header";
import {
    Card, Container, Row, CardHeader, Table, Col, Input, FormGroup, CardBody,Button
} from "reactstrap";

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
            <>
            <Header />
            <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0 text-center"> Liste des Modules  </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Intitulé</th>
                                            <th scope="col">INE de Professeur Responsable</th>
                                            <th scope="col">Nom de Professeur Responsable</th>
                                            <th scope="col">Filière</th>
                                            <th scope="col">Action</th>
                                            <th scope="col" />
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {
                                           this.state.matieres.map(
                                            (matiere,index)=>
                                            <tr key={index}>
                                                <td>{matiere.nom}</td>
                                                <td>{matiere.ineProf}</td>
                                                <td>{matiere.nomProf}</td>
                                                 <td>{matiere.nomFiliere}</td>
                                                        <td>
                                                            <Button
                                                                color="info"
                                                                onClick ={()=> this.editMatiere(matiere.id)}
                                                            >
                                                                Mettre à jour
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                onClick ={()=> this.deleteMatiere(matiere.id)}        
                                                                >                                                    
                                                                Supprimer
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                onClick ={()=> this.viewMatiere(matiere.id)}                                                               >                                                    
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
export default ListeMatiereComponent