import React ,{Component} from 'react';
import adminService from '../../../_services/AdminService';

class CreateMatiereComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            filiere :[{
                id:'--',
                nom:'--'
            }],
            profs:[{
                nom: '--',
                role:'--',

            }],
            nom: '',
            idProf:'',
            ineProf:'',
            nomProf:'',
            idFiliere:'',
            nomFiliere:''
        }
        this.changerNomFiliereHandler=this.changerNomFiliereHandler.bind(this);
        this.changerNomMatiereHandler=this.changerNomMatiereHandler.bind(this);
        this.changerNomProfeHandler=  this.changerNomProfeHandler.bind(this);
    }
    componentDidMount(){
        adminService.getAllFiliere().then(res=>{
            res.map(item=>{
                this.setState(state => {
                    const filiere = [...state.filiere,item];
    
                    return {
                        filiere,
                    };
    
                })
            })
        });


        adminService.getAllProf().then(res=>{

            res.data.map(item=>{
                this.setState(state => {
                    const profs = [...state.profs,item];
                    return {
                        profs,
                    };
    
                })
            })
                
        });            
                if(this.state.id==='-addMatiere'){
                    return 
                }else{
                    adminService.getMatiereById(this.state.id).then((res)=>{
                    let matiere=res;
                    this.setState({ nom: matiere.nom,
                    idProf:matiere.idProf,
                    ineProf:matiere.ineProf,
                    nomProf:matiere.nomProf,
                    idFiliere:matiere.idFiliere,
                    nomFiliere:matiere.nomFiliere
                     })

                })
                }
        
    }
    changerNomFiliereHandler(event){
        this.setState({nomFiliere: event.target.value});
    }

    changerNomMatiereHandler(event){
        this.setState({nom: event.target.value});

    }

    changerNomProfeHandler(event){
        this.setState({idProf: event.target.value});
    }

    saveAndUpdateProf = (e)=>{
        e.preventDefault();
        let matiere= {nom: this.state.nom, nomFiliere: this.state.nomFiliere,idProf: this.state.idProf}
        if(this.state.id==='-addMatiere'){
            adminService.addMatiere(matiere).then(response=>{
                this.props.history.push('/administrateur/allMatiere');
            })
        }else{
            console.log("dans save ine prof = "+ this.state.ineProf);
            adminService.updateMatiere(this.state.id,matiere).then(response=>{
                this.props.history.push('/administrateur/allMatiere');
             })
          }
    }



    cancel(){
        return this.props.history.push('/allMatiere')
    }
    
getTitle(){
    if(this.state.id===-1){
        return <h3 className="texte-center">Ajouter Matiere</h3>

    }else {
        return <h3 className="texte-center">Update Matiere</h3>
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
                                    <label>Nom Matiere</label>
                                    <input placeholder="nom" name="nom" className="form-control"
                                     value={this.state.nom} onChange={this.changerNomMatiereHandler}/>
                                </div>
                                
                                <div>
                                    <label>Filiere:</label>
                                    <select onChange={this.changerNomFiliereHandler} value={this.state.nomFiliere} >
                                        {this.state.filiere.map((f) => 
                                        <option key={f.id} value={f.nom} >{f.nom}</option>
                                        )}; 
                                    </select >
                                </div> 
                                <div>
                                    <label>prof </label>
                                    <select onChange={this.changerNomProfeHandler} value={this.state.idProf} >
                                        {this.state.profs.map((prof) => 
                                        <option key={prof.id} value={prof.id}> {prof.nom} </option>
                                        )}; 
                                    </select  >
                                    {/* {this.state.profs.map((prof) => {
                                        console.log("nom prof de: "+ prof.nom +"  dont son id PROF dans map =  "+ prof.id)
                                        })} */}
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
export default CreateMatiereComponent