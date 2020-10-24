import { BehaviorSubject } from 'rxjs';
import axios from "axios";

class MatiereService {

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
            //console.log(response.data);
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
               return response.data;
           })

   }


}
export default new MatiereService();
