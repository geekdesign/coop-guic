import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/kwfs")
        .then(response => response.data["hydra:member"]);
}

function deleteKwfs(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/kwfs/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/kwfs/" + id)
        .then(response => response.data);
}

function update(id, kwf) {
    return axios
        .put("http://127.0.0.1:8000/api/kwfs/" + id, kwf);
}

function create(kwf){
    return axios
    .post("http://127.0.0.1:8000/api/kwfs", kwf);
}

export default{
    findAll,
    delete: deleteKwfs,
    find,
    update,
    create
};