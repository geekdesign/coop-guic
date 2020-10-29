import axios from "axios";
import { BONS_API } from "../config";

function findAll() {
	return axios.get(BONS_API).then((response) => response.data["hydra:member"]);
}

function deleteBons(id) {
	return axios.delete(BONS_API + "/" + id);
}

export default {
	findAll,
	delete: deleteBons,
};
