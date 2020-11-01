import React, { Component } from 'react';
import AdminService from '../../../_services/AdminService';

class CreateEtudiantComponent extends Component{
    constructor(props){
        super(props)
        this.state= {
            id:this.props.match.params.id,
            nom: '',
            prenom: '',
            role:'',
            num: '',
            ine:'',
            dateNaissance:'',
            mail:''
        }
        this.changerFirstNameHandler= this.changerFirstNameHandler.bind(this);
        this.changerLastNameHandler= this.changerLastNameHandler.bind(this);
        this.changerRoleHandler= this.changerRoleHandler.bind(this);
        this.changerNumHandler= this.changerNumHandler.bind(this);
        this.changerIneHandler= this.changerIneHandler.bind(this);
        this.changerDateNaissanceHandler= this.changerDateNaissanceHandler.bind(this);
        this.changerMailHandler= this.changerMailHandler.bind(this);

        this.saveAndUpdateEtudiant = this.saveAndUpdateEtudiant.bind(this);
    }

    componentDidMount(){
        if(this.state.id==-1){
            return
        }else {
            AdminService.getEtudiantById(this.state.id).then((res)=>{
                let etudiant= res.data;
                console.log("getEtudiantById"+ etudiant);
                this.setState({
                    nom:etudiant.nom,
                    prenom: etudiant.prenom,
                    role: etudiant.role, 
                    num: etudiant.num,
                    ine: etudiant.ine,
                    dateNaissance: etudiant.dateNaissance,
                    mail: etudiant.mail
                });
            });
        }
    }

    saveAndUpdateEtudiant = (e) =>{
        e.preventDefault();

        let etudiant = { nom:this.state.nom,prenom: this.state.prenom, role: this.state.role, num: this.state.num, ine: this.state.ine, dateNaissance: this.state.dateNaissance, mail: this.state.mail};
        console.log('etudiant =>'+ JSON.stringify(etudiant));

        //création étudiant
        if(this.state.id==='-add'){
            AdminService.addEtudiant(etudiant).then(res =>{
                this.props.history.push('/administrateur/allEtudiant');
            });
        }else{ //update étudiant
            AdminService.updateEtudiant(this.state.id,etudiant).then(res =>{
                this.props.history.push('/administrateur/allEtudiant');
            });
        }
       
    }

    cancel(){
        this.props.history.push('/administrateur/allEtudiant');
    }


    changerFirstNameHandler(event){
        this.setState({prenom: event.target.value});
    }
    changerLastNameHandler(event){
        this.setState({nom: event.target.value});
    }
    changerRoleHandler(event){
        this.setState({role: event.target.value});
    }
    changerNumHandler(event){
        this.setState({num: event.target.value});
    }
    changerIneHandler(event){
        this.setState({ine: event.target.value});
    }
    changerDateNaissanceHandler(event){
        this.setState({dateNaissance: event.target.value});
    }
    changerMailHandler(event){
        this.setState({mail: event.target.value});
    }
    getTitle(){
        if(this.state.id==='-add'){
            return <h3 className="texte-center">Ajouter étudiant</h3>
        }else{
            return <h3 className="texte-center">Mise à jour Etudiant</h3>
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
                                     <label>First Name:</label>
                                     <input placeholder="First Name" name="prenom" className="form-control"
                                        value={this.state.prenom} onChange={this.changerFirstNameHandler}/>
                                 </div>
                                 <div clasName="from-group">
                                     <label>Last Name:</label>
                                     <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={this.state.nom} onChange={this.changerLastNameHandler}/>
                                 </div>
                                 <div clasName="from-group">
                                     <label>Num:</label>
                                     <input placeholder="Num" name="num" className="form-control"
                                        value={this.state.num} onChange={this.changerNumHandler}/>
                                 </div>
                                 <div clasName="from-group">
                                     <label>role:</label>
                                     <input placeholder="Role" name="role" className="form-control"
                                        value={this.state.role} onChange={this.changerRoleHandler}/>
                                 </div>
                                 <div clasName="from-group">
                                     <label>ine:</label>
                                     <input placeholder="Ine" name="ine" className="form-control"
                                        value={this.state.ine} onChange={this.changerIneHandler}/>
                                 </div>
                                 <div clasName="from-group">
                                     <label>mail:</label>
                                     <input placeholder="Mail" name="mail" className="form-control"
                                        value={this.state.mail} onChange={this.changerMailHandler}/>
                                 </div>
                                 <div clasName="from-group">
                                     <label>Date de naissance:</label>
                                     <input placeholder="date de Naissance" name="dateNaissance" className="form-control"
                                        value={this.state.dateNaissance} onChange={this.changerDateNaissanceHandler}/>
                                 </div>

                                 <button className="btn btn-success" onClick={this.saveAndUpdateEtudiant}>Save</button>
                                 <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>

                                
                             </from>
                         </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEtudiantComponent 