import { BehaviorSubject } from 'rxjs';
import axios from "axios";

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
        .post(`http://localhost:7400/api/mail/sendMailByIdEtudiant/`+idEtudiant)
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
}
export default new EmailSender();
