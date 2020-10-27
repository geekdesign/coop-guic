import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/types")
        .then(response => response.data["hydra:member"]);
}

function deleteTypes(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/types/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/types/" + id)
        .then(response => response.data);
}

function update(id, type) {
    return axios
        .put("http://127.0.0.1:8000/api/types/" + id, type);
}

function create(type){
    return axios
    .post("http://127.0.0.1:8000/api/types", type);
}

export default{
    findAll,
    delete: deleteTypes,
    find,
    update,
    create
};