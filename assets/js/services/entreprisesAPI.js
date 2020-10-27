import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/entreprises")
        .then(response => response.data["hydra:member"]);
}

function deleteEntrprise(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/entreprises/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/entreprises/" + id)
        .then(response => response.data);
}

function update(id, entreprise) {
    return axios
        .put("http://127.0.0.1:8000/api/entreprises/" + id, entreprise);
}

function create(entreprise){
    return axios
    .post("http://127.0.0.1:8000/api/entreprises", entreprise);
}

export default{
    findAll,
    delete: deleteEntrprise,
    find,
    update,
    create
};