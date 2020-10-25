import axios from 'axios';
import jwtDecode from 'jwt-decode';

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function logout() { 
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
 }

function authenticate(credentials) {
    return axios
        .post('http://127.0.0.1:8000/api/login_check', credentials)
        .then(response => response.data.token)
        .then(token => {
            //Je stock le token dans le local storage
            window.localStorage.setItem("authToken", token);
            //On previent AXIOS qu'on a maintenant un header par défaut sur toutes nos futrues requetes
            setAxiosToken(token);
        });
}


function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
        }
    };
}

function isAuthenticated() { 
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            return true;
        }
        return false;
    };
    return false;
 }

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}