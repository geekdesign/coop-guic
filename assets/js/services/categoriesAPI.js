import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/categories")
        .then(response => response.data["hydra:member"]);
}

function deleteCategories(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/categories/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/categories/" + id)
        .then(response => response.data);
}

function update(id, categorie) {
    return axios
        .put("http://127.0.0.1:8000/api/categories/" + id, categorie);
}

function create(categorie){
    return axios
    .post("http://127.0.0.1:8000/api/categories", categorie);
}

export default{
    findAll,
    delete: deleteCategories,
    find,
    update,
    create
};