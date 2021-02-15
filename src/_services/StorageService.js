import axios from 'axios'



const apiEtudiant= "http://localhost:7400/api/etudiant/";
const apiProf= "http://localhost:7400/api/prof/";
const apiMatiere= "http://localhost:7400/api/matiere/";
const apiFiliere= "http://localhost:7400/api/filiere/";
const apiStorage= "http://localhost:7400/file/";




class StorageService {


//----------File --------------//

    uploadFile(file){
    return axios
    .post(apiStorage+'upload',file)
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
       console.log("erreur"+resMessage);

   })
}

}
export default new StorageService();
