import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/pdvs")
        .then(response => response.data["hydra:member"]);
}

function deletePdvs(id) {
    return axios
        .delete("http://12.0.0.1:8000/api/pdvs/" + id);
}

export default{
    findAll,
    delete: deletePdvs
};