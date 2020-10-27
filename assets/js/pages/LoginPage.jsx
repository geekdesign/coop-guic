import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';

const LoginPage = ({history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    //Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;

        setCredentials({...credentials, [name]: value});
    }

    //Gestion du submit
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/home" )
        } catch (error) {
            console.log(error);
            setError("Ce nom d'utilisateur est inconnu !");
        }
    }

    return ( 
        <>
            <h2>Page de connexion</h2>
            <br/>
            <Form onSubmit={handleSubmit} >
                <Field 
                    label="Nom d'utilisateur"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Saisissez votre nom d'utilisateur"
                    error={error}
                />

                <Field 
                    label="Mot de passe"
                    name="password"
                    value={credentials.password} 
                    onChange={handleChange}
                    type="password" 
                    placeholder="Saisissez votre mot de passe" 
                    error={error}
                />

                <div className="form-group"><button type="submit" className="btn btn-primary">Se connecter</button></div>
            </Form>

        </>
     );
}
 
export default LoginPage;