import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import UsersAPI from '../services/usersAPI';


const UserPage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ user, setUser ] =  useState({
        nom: "",
        prenom: "",
        username:"",
        mail: "",
        roles:"",
    });

    const [errors, setErrors] = useState({
        nom: "",
        prenom: "",
        username:"",
        mail: "",
        roles:"",
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchUser = async id => {
        try {
            const { nom, prenom, username, mail, roles } = await UsersAPI.find(id); 
            setUser({ nom, prenom, username, mail, roles });
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/user');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchUser(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await UsersAPI.update(id, user);
                //TODO : Flash notification de succès
            }else{
                await UsersAPI.create(user);
                //TODO : Flash notification de succès
            }
            history.replace("/user");
            setErrors({});
        } catch ({response}) {
            const { violations } = response.data;
            if(violations){
                const apiError = {};
                violations.forEach(({propertyPath, message}) => {
                    apiError[propertyPath] = message;
                });
                setErrors(apiError);
                //TODO : Flash notification d'erreurs
            }
        }
    };

    return ( <>
        {(!editing && <h2>Création d'un point de vente</h2>) || (<h2>Modification du point de vente</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-2">
                    <Field name="nom" label="Nom" value={user.nom} onChange={handleChange} error={errors.nom}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="prenom" label="Prénom" value={user.prenom} onChange={handleChange} error={errors.prenom}/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-2">
                    <Field name="username" label="Username" value={user.username} onChange={handleChange} error={errors.username}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="mail" label="Adresse email" value={user.mail} onChange={handleChange} error={errors.mail}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/users" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default UserPage;