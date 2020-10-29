import axios from "axios";
import { TYPES_API } from "../config";

function findAll() {
	return axios.get(TYPES_API).then((response) => response.data["hydra:member"]);
}

function deleteTypes(id) {
	return axios.delete(TYPES_API + "/" + id);
}

function find(id) {
	return axios.get(TYPES_API + "/" + id).then((response) => response.data);
}

function update(id, type) {
	return axios.put(TYPES_API + "/" + id, type);
}

function create(type) {
	return axios.post(TYPES_API, type);
}

export default {
	findAll,
	delete: deleteTypes,
	find,
	update,
	create,
};
