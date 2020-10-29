import axios from "axios";
import { COMPTES_API } from "../config";

function findAll() {
	return axios
		.get(COMPTES_API)
		.then((response) => response.data["hydra:member"]);
}

function deleteComptes() {
	return axios.delete(COMPTES_API + "/" + id);
}

function find(id) {
	return axios.get(COMPTES_API + "/" + id).then((response) => response.data);
}

function update(id, compte) {
	return axios.put(COMPTES_API + "/" + id, compte);
}

function create(compte) {
	return axios.post(COMPTES_API, compte);
}

export default {
	findAll,
	delete: deleteComptes,
	find,
	update,
	create,
};
