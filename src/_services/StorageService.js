import axios from 'axios'




const apiStorage = "http://localhost:7400/file/";




class StorageService {


  //----------File --------------//
  download(nom) {
    console.log(nom);
    return axios.get(apiStorage + 'download/' + nom, { responseType: 'blob' }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nom); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  uploadFile(file) {
    return axios
      .post(apiStorage + 'upload', file)
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

  deleteCours(file) {
    return axios.delete(apiStorage + "delete/" + file);
  }
}

export default new StorageService();
