import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/pdvs")
        .then(response => response.data["hydra:member"]);
}

function deletePdvs(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/pdvs/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/pdvs/" + id)
        .then(response => response.data);
}

function update(id, pdv) {
    return axios
        .put("http://127.0.0.1:8000/api/pdvs/" + id, pdv);
}

function create(pdv){
    return axios
    .post("http://127.0.0.1:8000/api/pdvs", pdv);
}

export default{
    findAll,
    delete: deletePdvs,
    find,
    update,
    create
};