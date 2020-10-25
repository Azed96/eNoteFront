//import { BehaviorSubject } from 'rxjs';
import axios from "axios";

//const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));



class AuthService {

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

    loginProf(ine, date) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return axios
          .post(`http://localhost:7400/api/prof/signin/`+ine+`/`+date,requestOptions)
          .then(response => {
             console.log(response.data);
              localStorage.setItem("user", JSON.stringify(response.data));
            
    
            return response.data;
          });
        }

    loginAdmin(ine, date) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return axios
          .post(`http://localhost:7400/api/admin/signin/`+ine+`/`+date,requestOptions)
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
        return JSON.parse(localStorage.getItem('user'));
      }

}

export default new AuthService();





