import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import CategoriesAPI from '../services/categoriesAPI';


const CategoriePage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ categorie, setCategorie ] =  useState({
        nom: "",
    });

    const [errors, setErrors] = useState({
        nom: "",
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchCategorie = async id => {
        try {
            const { nom } = await CategoriesAPI.find(id); 
            setCategorie({ nom });
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/categories');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchCategorie(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCategorie({...categorie, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await CategoriesAPI.update(id, categorie);
                //TODO : Flash notification de succès
            }else{
                await CategoriesAPI.create(categorie);
                //TODO : Flash notification de succès
            }
            history.replace("/categories");
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
        {(!editing && <h2>Ajout d'une nouvelle categorie</h2>) || (<h2>Modification de la categorie</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-3">
                    <Field name="nom" label="Nom de la categorie" value={categorie.nom} onChange={handleChange} error={errors.nom}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/categories" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default CategoriePage;