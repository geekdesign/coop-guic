import axios from 'axios';

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/users")
        .then(response => response.data["hydra:member"]);
}

function deleteUsers(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/users/" + id);
}

function find(id) {
    return axios
        .get("http://127.0.0.1:8000/api/users/" + id)
        .then(response => response.data);
}

function update(id, user) {
    return axios
        .put("http://127.0.0.1:8000/api/users/" + id, user);
}

function create(user){
    return axios
    .post("http://127.0.0.1:8000/api/users", user);
}

export default{
    findAll,
    delete: deleteUsers,
    find,
    update,
    create
};