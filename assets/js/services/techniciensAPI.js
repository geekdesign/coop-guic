import axios from "axios";
import { TECHNICIENS_API } from "../config";

function findAll() {
	return axios
		.get(TECHNICIENS_API)
		.then((response) => response.data["hydra:member"]);
}

function deleteTechniciens(id) {
	return axios.delete(TECHNICIENS_API + "/" + id);
}

function find(id) {
	return axios
		.get(TECHNICIENS_API + "/" + id)
		.then((response) => response.data);
}

function update(id, technicien) {
	return axios.put(TECHNICIENS_API + "/" + id, technicien);
}

function create(technicien) {
	return axios.post(TECHNICIENS_API, technicien);
}

export default {
	findAll,
	delete: deleteTechniciens,
	find,
	update,
	create,
};
