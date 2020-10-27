import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import KwfsAPI from '../services/kwfsAPI';


const KwfPage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ kwf, setKwf ] =  useState({
        nom: "",
        prenom: "",
        email: ""
    });

    const [errors, setErrors] = useState({
        nom: "",
        prenom: "",
        email: ""
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchKwf = async id => {
        try {
            const { nom, prenom, email } = await KwfsAPI.find(id); 
            setKwf({ nom, prenom, email });
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/kwfs');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchKwf(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setKwf({...kwf, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await KwfsAPI.update(id, kwf);
                //TODO : Flash notification de succès
            }else{
                await KwfsAPI.create(kwf);
                //TODO : Flash notification de succès
            }
            history.replace("/kwfs");
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
        {(!editing && <h2>Ajout d'un nouveau KWF</h2>) || (<h2>Modification du KWF</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-3">
                    <Field name="nom" label="Nom" value={kwf.nom} onChange={handleChange} error={errors.nom}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="prenom" label="Prénom" value={kwf.prenom} onChange={handleChange} error={errors.prenom}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-7">
                    <h6>Contact</h6>
                    <hr />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <Field name="email" label="Adresse email" value={kwf.email} onChange={handleChange} error={errors.email}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/kwfs" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default KwfPage;