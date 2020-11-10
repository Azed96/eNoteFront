//import { BehaviorSubject } from 'rxjs';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import React from "react";



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
          localStorage.setItem("userStudent", JSON.stringify(response.data));
        

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
       let currentuser = JSON.parse(localStorage.getItem('user'));
       if ((currentuser == "") || (currentuser == null)){
        return <Redirect to="/auth" />
        }else{
        return JSON.parse(localStorage.getItem('user'));
        }
       
      }

 getInfoEtudiantById(id){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    return axios
    .get(`http://localhost:7400/api/etudiant/idEtudiant/`+id,requestOptions)
    .then( res => {
        return res.data;
    });
   
 } 

}

export default new AuthService();





