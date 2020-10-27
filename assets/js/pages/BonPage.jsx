import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import PdvsAPI from '../services/pdvsAPI';
import axios from 'axios';


const BonPage = ({ history }) => {

    const [ pdvs, setPdvs ] = useState([]);

    const [ bon, setBon ] = useState({
        numBon: "",
        createdBy: "",
        createdAt: "",
        etat: "ENVOYER",
        technicien: "",
        pdv: "",
        numCompte: "",
        numCredit: "",
        categorie: "",
        type: "",
        kwf: "",
        sujet: "",
        description: "",
        remarque: "",
        garantie: ""
    });

    const [ errors, setErrors ] = useState({
        numBon: "",
        createdBy: "",
        createdAt: "",
        etat: "",
        technicien: "",
        pdv: "",
        numCompte: "",
        numCredit: "",
        categorie: "",
        type: "",
        kwf: "",
        sujet: "",
        description: "",
        remarque: "",
        garantie: ""
    })

    
    const fetchPdvs = async () => {
        try {
            const data = await PdvsAPI.findAll();
            setPdvs(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchPdvs();
    }, [])

    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setBon({...bon, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            //On passe les donnée à l'api en réécrivant l'IRI de pdv
            console.log(bon);
            const response = await axios.post("http://127.0.0.1:8000/api/bons", {...bon, pdv:`/api/pdvs/${bon.pdv}`});
            //TODO : Flash notification de success
            console.log(response);
            history.replace("/pdv")
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

    }


    return ( <> 
        <h2>Création d'un bon GUIC</h2>
        <br/>
        <form onSubmit={handleSubmit} className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <Field name="numBon" label="Numéros du Bon"/>
                            <Field name="createdBy" label="Créateur du bon" placeholder="Nom et prénom du créateur du bon" onChange={handleChange} value={bon.createdBy} error={errors.createdBy}/>
                        </div>
                        <div className="col-md-6">
                            <Field name="etat" label="Etat" onChange={handleChange} value={bon.etat} error={errors.etat}/>

                            <Select name="technicien" label="Technicien" placeholder="Selectionner un technicien" value={bon.technicien} onChange={handleChange} error={errors.technicien} >
                                <option value="1">flkjahsdfh</option>
                                <option value="2">asdfasdfsafa</option>
                                <option value="3">asdfasdfasdf</option>
                            </Select>
                        </div>
                    </div>
                    <Select name="pdv" label="Point de vente" placeholder="Selectionner un PdV" value={bon.pdv} onChange={handleChange} error={errors.pdv} >
                        {pdvs.map(pdv => (
                            <option key={pdv.id} value={pdv.id}>
                                {pdv.sap} - {pdv.nom}
                            </option>
                        ))}
                    </Select>
                    <div className="row">
                        <div className="col-md-6">
                            <Field name="numCompte" label="Numéro de compte" onChange={handleChange} value={bon.numCompt} error={errors.numCompte}/>
                        </div>
                        <div className="col-md-6">
                            <Field name="numCredit" label="Numéro de crédit" onChange={handleChange} value={bon.numCredit} error={errors.numCredit}/>
                        </div>
                    </div>
                <Field name="kwf" label="KWF" onChange={handleChange} value={bon.kwf} error={errors.kwf}/>
                    <div className="row">
                        <div className="col-md-6">
                            <Field name="categorie" label="Catégories" onChange={handleChange} value={bon.categorie} error={errors.categorie}/>
                        </div>
                        <div className="col-md-6">
                            <Field name="type" label="Type" onChange={handleChange} value={bon.type} error={errors.type}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <br/>
                            <input className="form-check-input" type="checkbox" name="garantie" onChange={handleChange} value={bon.garantie} error={errors.garantie}/>
                            <label className="form-check-label" >
                                Travaux de garantie
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <Field name="sujet" label="Sujet" placeholder="Sujet du bon" onChange={handleChange} value={bon.sujet} error={errors.sujet}/>
                <label>Description</label>
                <textarea className="form-control" name="description" rows="9" onChange={handleChange} value={bon.description} error={errors.description}></textarea>
                <br/>
                <label>Remarque</label>
                <textarea className="form-control" name="remarque" rows="5" onChange={handleChange} value={bon.remarque} error={errors.remarque}></textarea>
                <br/>
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/pdv" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
     </> );
}
 
export default BonPage;