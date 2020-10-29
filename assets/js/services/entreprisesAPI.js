import axios from "axios";
import { ENTREPRISES_API } from "../config";

function findAll() {
	return axios
		.get(ENTREPRISES_API)
		.then((response) => response.data["hydra:member"]);
}

function deleteEntrprise(id) {
	return axios.delete(ENTREPRISES_API + "/" + id);
}

function find(id) {
	return axios
		.get(ENTREPRISES_API + "/" + id)
		.then((response) => response.data);
}

function update(id, entreprise) {
	return axios.put(ENTREPRISES_API + "/" + id, entreprise);
}

function create(entreprise) {
	return axios.post(ENTREPRISES_API, entreprise);
}

export default {
	findAll,
	delete: deleteEntrprise,
	find,
	update,
	create,
};
