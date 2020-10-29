import axios from "axios";
import { CATEGORIES_API } from "../config";

function findAll() {
	return axios
		.get(CATEGORIES_API)
		.then((response) => response.data["hydra:member"]);
}

function deleteCategories(id) {
	return axios.delete(CATEGORIES_API + "/" + id);
}

function find(id) {
	return axios.get(CATEGORIES_API + "/" + id).then((response) => response.data);
}

function update(id, categorie) {
	return axios.put(CATEGORIES_API + "/" + id, categorie);
}

function create(categorie) {
	return axios.post(CATEGORIES_API, categorie);
}

export default {
	findAll,
	delete: deleteCategories,
	find,
	update,
	create,
};
