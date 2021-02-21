import { BehaviorSubject } from 'rxjs';
import axios from "axios";

const apicours= `https://e-notes-evry.herokuapp.com/api/cours/`;

class CoursService{

    addCours(cours){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        };
    
       
        return axios
               .post(apicours+"nouveaucours", cours)
               .then(response =>{
                 // console.log("responseNote"+JSON.stringify(response.data));
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


       geCoursByidMatiere(id){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return axios
               .get(apicours+"listcoursofmatiere/"+id,requestOptions)
               .then(response =>{
                   //console.log(response.data);
                   return response.data;
               });
    
       }

       geCoursByNom(nom){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return axios
               .get(apicours+"Nomcours/"+nom,requestOptions)
               .then(response =>{
                   //console.log(response.data);
                   return response.data;
               });
    
       }

       geCoursByNomFileStorage(nomFile){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return axios
               .get(apicours+"NomFileStorage/"+nomFile,requestOptions)
               .then(response =>{
                   //console.log(response.data);
                   return response.data;
               });
    
       }

       geCoursByID(id){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return axios
               .get(apicours+"idcours/"+id,requestOptions)
               .then(response =>{
                   //console.log(response.data);
                   return response.data;
               });
    
       }


   
}
export default new CoursService();
