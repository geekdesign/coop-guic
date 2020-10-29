import axios from "axios";
import { PDVS_API } from "../config";

function findAll() {
	return axios.get(PDVS_API).then((response) => response.data["hydra:member"]);
}

function deletePdvs(id) {
	return axios.delete(PDVS_API + "/" + id);
}

function find(id) {
	return axios.get(PDVS_API + "/" + id).then((response) => response.data);
}

function update(id, pdv) {
	return axios.put(PDVS_API + "/" + id, pdv);
}

function create(pdv) {
	return axios.post(PDVS_API, pdv);
}

export default {
	findAll,
	delete: deletePdvs,
	find,
	update,
	create,
};
