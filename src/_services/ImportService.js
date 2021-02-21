import axios from 'axios'




const apiImport = `https://e-notes-evry.herokuapp.com/api/import/`;




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

}

export default new ImportService();
