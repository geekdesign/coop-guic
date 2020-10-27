import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import ComptesAPI from '../services/comptesAPI';


const ComptePage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ compte, setCompte ] =  useState({
        nom: "",
        num: ""
    });

    const [errors, setErrors] = useState({
        nom: "",
        num: ""
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchCompte = async id => {
        try {
            const { nom , num } = await ComptesAPI.find(id); 
            setCompte({ nom, num });
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/categories');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchCompte(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCompte({...compte, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await ComptesAPI.update(id, compte);
                //TODO : Flash notification de succès
            }else{
                await ComptesAPI.create(compte);
                //TODO : Flash notification de succès
            }
            history.replace("/comptes");
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
        {(!editing && <h2>Ajout d'un nouveu compte</h2>) || (<h2>Modification du compte</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-3">
                    <Field name="num" label="Numéros de compte" type="number" value={compte.num} onChange={handleChange} error={errors.num}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="nom" label="Nom du compte" value={compte.nom} onChange={handleChange} error={errors.nom}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/categories" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default ComptePage;