import { BehaviorSubject } from 'rxjs';
import axios from "axios";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));



class AuthService {




/*function loginEtudiant(codeEtudiant,date) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:7400/api/etudiant/signin`+codeEtudiant+`/`+date, requestOptions)
        .then(handleResponse)
        .then(data => {

            
        console.log(data);
            //localStorage.setItem('etudiant', JSON.stringify(codeEtudiant));

            //currentUserSubject.next(codeEtudiant);
            return data;
        })
        .catch(error => {return error})
        ;

        const EtudiantInfo =  {
    id : '',
    nom : '',
    prenom: '',
    num: '',
    ine: '',
    dateNaissance: '',
    gmail: ''

}
} */

 loginEtudiant(codeEtudiant, date) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return axios
      .post(`http://localhost:7400/api/etudiant/signin/`+codeEtudiant+`/`+date,requestOptions)
      .then(response => {
         console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        

        return response.data;
      });
    }

 logout() {
        localStorage.removeItem("user");
    }

 getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }

}

export default new AuthService();





