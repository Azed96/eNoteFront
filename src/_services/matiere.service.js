import { BehaviorSubject } from 'rxjs';
import axios from "axios";

class MatiereService {

    requestNote = {
        idMatiere : "",
        idProf :""
    }

    getMatiereProf(id){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
     };
     return axios
        .get(`http://localhost:7400/api/matiere/idProf/`+id,requestOptions)
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
           .get(`http://localhost:7400/api/matiere/idMatier/`+id,requestOptions)
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
           .get(`http://localhost:7400/api/note/noteParProf/`+infoMatiere.idMatiere+`/`+infoMatiere.idProf,requestOptions)
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


}
export default new MatiereService();
