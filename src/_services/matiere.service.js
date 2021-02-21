import { BehaviorSubject } from 'rxjs';
import axios from "axios";

const apiEmail= "https://e-notes-evry.herokuapp.com/api/mail/";
const apiDeploy= `https://e-notes-evry.herokuapp.com/`;


class MatiereService {

    requestNote = {
        idMatiere : "",
        idProf :""
    }

    getMatiereProf(id){
        console.log('id prof = ?'+id);
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
     };
     return axios
        .get(`https://e-notes-evry.herokuapp.com/api/matiere/idProf/`+id,requestOptions)
        .then(response =>{
           // console.log("resMprof"+response.data[0].id);
            return response.data;
        });
   }

   getMatiereByid(id){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return axios
           .get(`https://e-notes-evry.herokuapp.com/api/matiere/idMatiere/`+id,requestOptions)
           .then(response =>{
               //console.log(response.data);
               return response.data;
           });

   }

   getNotesEtudiant(infoMatiere){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }    
    };
    return axios
           .get(apiDeploy+`api/note/noteParProf/`+infoMatiere.idMatiere+`/`+infoMatiere.idProf,requestOptions)
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

   UpdateNoteEtudiant(idNote,noteData){
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify(noteData)
    };
    //console.log("envoieNote"+JSON.stringify(noteData));

   
    return axios
           .put(apiDeploy+`api/note/updateNote/`+idNote,noteData)
           .then(response =>{
              // console.log("resNote"+JSON.stringify(response.data));
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
   getMatieresByidFiliere(id){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return axios
           .get(apiDeploy+`api/matiere/idFiliere/`+id,requestOptions)
           .then(response =>{
               //console.log(response.data);
               return response.data;
           });

   }

   addNoteEtudiant(noteData){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify(noteData)
    };
    //console.log("envoieNote"+JSON.stringify(noteData));

   
    return axios
           .post(apiDeploy+`api/note/addNote`, noteData)
           .then(response =>{
              console.log("responseNote"+JSON.stringify(response.data));
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

   getNotesByIdEtudiant(id){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }    
    };
    return axios
           .get(apiDeploy+`api/note/idEtudiant/`+id,requestOptions)
           .then(response =>{
               console.log("resNote"+JSON.stringify(response.data));
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

   getEtudiantsByidFiliere(id){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return axios
           .get(apiDeploy+`api/etudiant/idFiliere/`+id,requestOptions)
           .then(response =>{
             //  console.log("les etudiant" +JSON.stringify(response.data));
               return response.data;
           });

   }

   deleteNoteId(id){
   
    return axios
           .delete(apiDeploy+`api/note/deleteNote/`+id)
           .then(response =>{
             // console.log("les etudiant" +JSON.stringify(response.data));
               return response.data;
           });

   }

   getNotesByIdMatiere(id){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }    
    };
    return axios
           .get(apiDeploy+`api/note/matiereId/`+id,requestOptions)
           .then(response =>{
               console.log("resNote"+JSON.stringify(response.data));
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


}
export default new MatiereService();
