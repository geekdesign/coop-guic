import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import EntreprisesAPI from '../services/entreprisesAPI';


const EntreprisePage = ({ history, match }) => {

    const {id = "new" } = match.params;

    if(id !== 'new'){
        console.log(id);
    }

    const [ entreprise, setEntreprise ] =  useState({
        nom: "",
        rue: "",
        npa: "",
        lieu: "",
        telephone: "",
        fax: "",
        mail: ""
    });

    const [errors, setErrors] = useState({
        sap: "",
        nom: "",
        rue: "",
        npa: "",
        lieu: "",
        telephone: "",
        fax: "",
        mail: ""
    })

    const [ editing, setEditing ] = useState(false);

    // Récupération du PdV en fonction de l'ID
    const fetchEntreprise = async id => {
        try {
            const { nom, rue, npa, lieu, telephone, fax, mail} = await EntreprisesAPI.find(id); 
            setEntreprise({ nom, rue, npa, lieu, telephone, fax, mail});
        } catch (error) {
            //TODO : Flash notification d'erreurs
            history.replace('/entreprises');
        }
    }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== 'new') {
            setEditing(true);
            fetchEntreprise(id);
            }
    }, [id]);

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setEntreprise({...entreprise, [name]: value});
    }

    // Gestion de la summission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing){
                await EntreprisesAPI.update(id, entreprise);
                //TODO : Flash notification de succès
            }else{
                await EntreprisesAPI.create(entreprise);
                //TODO : Flash notification de succès
            }
            history.replace("/entreprises");
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
        {(!editing && <h2>Création d'une entreprise</h2>) || (<h2>Modification de l'entreprise</h2>)}
        <br/>
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="form-group col-md-5">
                    <Field name="nom" label="Nom" value={entreprise.nom} onChange={handleChange} error={errors.nom}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-5">
                    <h6>Adresse</h6>
                    <hr />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-5">
                    <Field name="rue" placeholder="Rue" value={entreprise.rue} onChange={handleChange} error={errors.rue}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-2">
                    <Field name="npa" placeholder="NPA" type="number" value={entreprise.npa} onChange={handleChange} error={errors.npa}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="lieu" placeholder="Lieu" value={entreprise.lieu} onChange={handleChange} error={errors.lieu}/> 
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
                    <Field name="telephone" label="Téléphone" value={entreprise.telephone} onChange={handleChange} error={errors.telephone}/>
                </div>
                <div className="form-group col-md-3">
                    <Field name="fax" label="Fax" value={entreprise.fax} onChange={handleChange} error={errors.fax}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-5">
                    <Field name="mail" label="Email de l'entreprise" value={entreprise.mail} onChange={handleChange} error={errors.mail}/>
                </div>
            </div>
            <div className="form-group col-md-5">
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/entreprises" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default EntreprisePage;