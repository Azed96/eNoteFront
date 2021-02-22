import axios from 'axios'




const apiImport = `https://e-notes-evry.herokuapp.com/api/import/`;

const localimport= 'http://localhost:7400/api/import/';


class ImportService {


  //----------File --------------//

  uploadFiliere(file) {
    
    return axios
      .post(apiImport + 'filiere', file)
      .then(response => {
        return response.data;
      },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("erreur" + resMessage);

        })
  }

  uploadEtudiant(file) {
    
    return axios
      .post(apiImport+'etudiant', file)
      .then(response => {
        return response.data;
      },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("erreur" + resMessage);

        })
  }
  uploadMatiere(file) {
    
    return axios
      .post(apiImport+'matiere', file)
      .then(response => {
        return response.data;
      },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("erreur" + resMessage);

        })
  }

  uploadprof(file) {
    
    return axios
      .post(apiImport+'prof', file)
      .then(response => {
        return response.data;
      },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("erreur" + resMessage);

        })
  }

}

export default new ImportService();
