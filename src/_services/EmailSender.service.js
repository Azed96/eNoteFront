import { BehaviorSubject } from 'rxjs';
import axios from "axios";

const apiEmail= `https://e-notes-evry.herokuapp.com/api/mail/`;

class EmailSender{

    notifWhenAddingOrUpdatingNote(idEtudiant){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log("erreur"+idEtudiant);
        return axios
        .post(`https://e-notes-evry.herokuapp.com/api/mail/sendMailByIdEtudiant/`+idEtudiant)
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

    notifCreationProf(prof){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log("erreur"+prof);
        return axios
        .post(apiEmail+"sendMailInscriptionProf",prof)
        .then(response =>{
           console.log("prof"+JSON.stringify(response.data));
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

    notifCreationEtudiant(etudiant){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log("erreur"+etudiant);
return axios
        .post(apiEmail+"sendMailInscriptionProfEtudiant",etudiant)
        .then(response =>{
           console.log("etudiant"+JSON.stringify(response.data));
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

    notifCreationProf(prof){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log("erreur"+JSON.stringify(prof.data));
return axios
        .post(apiEmail+"sendMailInscriptionProf",prof.data)
        .then(response =>{
          
            return response.data;
        },
        error => {
         const resMessage =
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString();
           console.log("erreur"+ resMessage);

       })
    }
}
export default new EmailSender();
