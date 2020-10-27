import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import TechniciensAPI from '../services/techniciensAPI';

const TechnicienPage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ technicien, setTechnicien ] =  useState({
        nom: "",
        prenom: "",
        telephone: "",
        mail: ""
    });

    const [errors, setErrors] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        mail: ""
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchTechnicien = async id => {
        try {
            const { nom, prenom, telephone, mail } = await TechniciensAPI.find(id); 
            setTechnicien({ nom, prenom, telephone, mail });
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/technicien');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchTechnicien(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setTechnicien({...technicien, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await TechniciensAPI.update(id, technicien);
                //TODO : Flash notification de succès
            }else{
                await TechniciensAPI.create(technicien);
                //TODO : Flash notification de succès
            }
            history.replace("/techniciens");
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
        {(!editing && <h2>Ajout d'un technicien</h2>) || (<h2>Modification du technicien</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-3">
                    <Field name="nom" label="Nom" value={technicien.nom} onChange={handleChange} error={errors.nom}/>
                </div>
                <div className="form-group col-md-2">
                    <Field name="prenom" label="Prénom" value={technicien.prenom} onChange={handleChange} error={errors.prenom}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-5">
                    <h6>Contact</h6>
                    <hr />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-2">
                    <Field name="telephone" label="Téléphone" value={technicien.telephone} onChange={handleChange} error={errors.telephone}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="mail" label="Email" value={technicien.mail} onChange={handleChange} error={errors.mail}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/techniciens" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
export default TechnicienPage;