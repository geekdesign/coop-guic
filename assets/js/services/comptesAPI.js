import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/comptes")
        .then(response => response.data["hydra:member"]);
}

function deleteComptes() {
    return axios
        .delete("http://127.0.0.1:8000/api/comptes/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/comptes/" + id)
        .then(response => response.data);
}

function update(id, compte) {
    return axios
        .put("http://127.0.0.1:8000/api/comptes/" + id, compte);
}

function create(compte){
    return axios
    .post("http://127.0.0.1:8000/api/comptes", compte);
}

export default{
    findAll,
    delete: deleteComptes,
    find,
    update,
    create
};