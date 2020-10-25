import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/bons")
        .then(response => response.data["hydra:member"]);
}

function deleteBons(id) {
    return axios
        .delete("http://12.0.0.1:8000/api/bons/" + id);
}

export default{
    findAll,
    delete: deleteBons
};