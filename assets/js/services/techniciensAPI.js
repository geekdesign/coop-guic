import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/techniciens")
        .then(response => response.data["hydra:member"]);
}

function deleteTechniciens(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/techniciens/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/techniciens/" + id)
        .then(response => response.data);
}

function update(id, technicien) {
    return axios
        .put("http://127.0.0.1:8000/api/techniciens/" + id, technicien);
}

function create(technicien){
    return axios
    .post("http://127.0.0.1:8000/api/techniciens", technicien);
}

export default{
    findAll,
    delete: deleteTechniciens,
    find,
    update,
    create
};