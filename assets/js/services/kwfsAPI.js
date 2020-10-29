import axios from "axios";
import { KWFS_API } from "../config";

function findAll() {
	return axios.get(KWFS_API).then((response) => response.data["hydra:member"]);
}

function deleteKwfs(id) {
	return axios.delete(KWFS_API + "/" + id);
}

function find(id) {
	return axios.get(KWFS_API + "/" + id).then((response) => response.data);
}

function update(id, kwf) {
	return axios.put(KWFS_API + "/" + id, kwf);
}

function create(kwf) {
	return axios.post(KWFS_API, kwf);
}

export default {
	findAll,
	delete: deleteKwfs,
	find,
	update,
	create,
};
