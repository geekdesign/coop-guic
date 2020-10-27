import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import TypesAPI from '../services/typesAPI';


const TypePage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ type, setType ] =  useState({
        nom: "",
    });

    const [errors, setErrors] = useState({
        nom: "",
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchType = async id => {
        try {
            const { nom } = await TypesAPI.find(id); 
            setType({ nom });
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/types');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchType(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setType({...type, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await TypesAPI.update(id, type);
                //TODO : Flash notification de succès
            }else{
                await TypesAPI.create(type);
                //TODO : Flash notification de succès
            }
            history.replace("/types");
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
        {(!editing && <h2>Ajout d'un nouveau type</h2>) || (<h2>Modification du type</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-3">
                    <Field name="nom" label="Nom du type" value={type.nom} onChange={handleChange} error={errors.nom}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/types" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default TypePage;