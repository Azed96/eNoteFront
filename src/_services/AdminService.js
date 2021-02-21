import axios from 'axios'



const apiEtudiant= `https://e-notes-evry.herokuapp.com/api/etudiant/`;
const apiProf= `https://e-notes-evry.herokuapp.com/api/prof/`;
const apiMatiere= `https://e-notes-evry.herokuapp.com/api/matiere/`;
const apiFiliere= `https://e-notes-evry.herokuapp.com/api/filiere/`;


class AdminService {


//----------ETUDIANT--------------//
    addEtudiant(etudiant){
        return axios.post(apiEtudiant+"addEtudiant", etudiant);
    }

    getAllEtudiant(){
       return axios.get(apiEtudiant +"allEtudiant");
    }

    getCountEtudiant(){
        return axios.get(apiEtudiant +"CountallEtudiant");
    }

    getEtudiantById(etudiantId){
        return axios.get(apiEtudiant +"idEtudiant"+ '/' +etudiantId);
    }

    updateEtudiant(etudiantId,etudiant){
         return axios.put(apiEtudiant +"idEtudiant/"+etudiantId,etudiant);

    }
    deleteEtudiant(etudiantId){
        return axios.delete(apiEtudiant+"idEtudiant/"+etudiantId);
    }

//----------PROF--------------//
getAllProf(){
    return axios.get(apiProf+"allProf");
}
getCountAllProf(){
    return axios.get(apiProf+"CountallProf");
}

addProf(prof){
    return axios.post(apiProf+"addProf", prof);
}

updateProf(profId,prof){
    return axios.put(apiProf+"idProf/"+profId,prof);
}
getProfById(profId){
    return axios.get(apiProf+"idProf"+'/'+profId);

}
deleteProf(profId){
    return axios.delete(apiProf+"idProf/"+profId);

}

//----------Matiere--------------//
getAllMatiere(){
    return axios.get(apiMatiere+"allMatiere");
}
getCountAllMatiere(){
    return axios.get(apiMatiere+"Countallmatiere");
}
addMatiere(matiere){
    return axios.post(apiMatiere+"addMatiere", matiere);
}

updateMatiere(matiereId,matiere){
    return axios.put(apiMatiere+"idMatiere/"+matiereId,matiere);
}
// getMatiereById(matiereId){
//     return axios.get(apiMatiere+"idMatiere/"+matiereId);
// }

getMatiereById(matiereId){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }    
    };
    return axios
           .get(apiMatiere+"idMatiere/"+matiereId,requestOptions)
           .then(response =>{
               //console.log("resNote"+JSON.stringify(response.data));
               return response.data;
           },
           error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              console.log("erreur"+resMessage);

          })
   }
deleteMatiere(matiereId){
    return axios.delete(apiMatiere+"idMatiere/"+matiereId);
}

////////////////Filiere/////////////////////

getAllFiliere(){
    return axios.get(apiFiliere+"allFiliere")
    .then(res => {
        //console.log("mesFilieres"+res.data);
        return res.data
    });
}

getCountAllFiliere(){
    return axios.get(apiFiliere+"Countallfiliere");
}

getFiliereById(idFiliere){
    return axios.get(apiFiliere+"idFiliere/"+idFiliere);
}

getNomFiliereById(idFiliere){
    return axios.get(apiFiliere+"nameFiliere/"+idFiliere);
}
addFiliere(filiere){
    return axios.post(apiFiliere+"addFiliere",filiere);
}
updateFiliere(FiliereId,filiere){
    return axios.put(apiFiliere+"idFiliere/"+FiliereId,filiere);
}
deleteFiliere(filiereId){
    return axios.delete(apiFiliere+"deleteFiliereByid/"+filiereId);
}
  
}

export default new AdminService();