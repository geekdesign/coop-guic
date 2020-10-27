import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import PdvsAPI from '../services/pdvsAPI';
import TechniciensAPI from '../services/techniciensAPI';
import EntrepriseAPI from '../services/entreprisesAPI';
import KwfsAPI from '../services/kwfsAPI';
import ComptesAPI from '../services/comptesAPI';
import TypesAPI from '../services/typesAPI';
import CategoriesAPI from '../services/categoriesAPI';
import axios from 'axios';


const BonPage = ({ history }) => {

    const [ pdvs, setPdvs ] = useState([]);
    const [ techniciens, setTechniciens ] = useState([]);
    const [ entreprises, setEntreprises ] = useState([]);
    const [ kwfs, setKwfs ] = useState([]);
    const [ comptes, setComptes ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    const [ bon, setBon ] = useState({
        technicien: "",
        entreprise: "",
        pdv: "",
        numCompte: "/api/comptes/887",
        numCredit: "",
        categorie: "/api/categories/306",
        type: "/api/types/306",
        kwf: "",
        sujet: "",
        description: "",
        remarque: "",
        garantie: ""
    });

    const [ errors, setErrors ] = useState({
        etat: "",
        technicien: "",
        entreprise:"",
        pdv: "",
        numCompte: "",
        numCredit: "",
        categorie: "",
        type: "",
        kwf: "",
        sujet: "",
        description: "",
        remarque: "",
        garantie: "",
        departement: ""
    })

    useEffect(() => {
        fetchPdvs();
    }, [])
    
    const fetchPdvs = async () => {
        try {
            const data = await PdvsAPI.findAll();
            setPdvs(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchTechnicien();
    }, [])

    const fetchTechnicien = async () => {
        try {
            const data = await TechniciensAPI.findAll();
            setTechniciens(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetcKwfs();
    }, [])

    const fetcKwfs = async () => {
        try {
            const data = await KwfsAPI.findAll();
            setKwfs(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchEntreprise();
    }, [])

    const fetchEntreprise = async () => {
        try {
            const data = await EntrepriseAPI.findAll();
            setEntreprises(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchCompte();
    }, [])

    const fetchCompte = async () => {
        try {
            const data = await ComptesAPI.findAll();
            setComptes(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchType();
    }, [])

    const fetchType = async () => {
        try {
            const data = await TypesAPI.findAll();
            setTypes(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchCategorie();
    }, [])

    const fetchCategorie = async () => {
        try {
            const data = await CategoriesAPI.findAll();
            setCategories(data);
        } catch (error) {
            console.log(error.response);
        }
    }


    // Gestion des changement des input dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setBon({...bon, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const newBon = {...bon, 
            pdv:`/api/pdvs/${bon.pdv}`, 
            technicien:`/api/techniciens/${bon.technicien}`,
            entreprise:`/api/entreprises/${bon.entreprise}`,
            kwf:`/api/kwfs/${bon.kwf}`,
            numCompte:`/api/comptes/${bon.numCompte}`,
            categorie:`/api/categories/${bon.categorie}`,
            type:`/api/types/${bon.type}`
        };

        try {
            //On passe les donnée à l'api en réécrivant l'IRI de pdv
            console.log(newBon);
            
            const response = await axios.post(
                "http://127.0.0.1:8000/api/bons", newBon
            );
            //TODO : Flash notification de success
            console.log(response);
            history.replace("/bons")
        } catch ({response}) {
            console.log(response);
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
                            <Select name="pdv" label="Point de vente" placeholder="Selectionner un PdV" value={bon.pdv} onChange={handleChange} error={errors.pdv} >
                                {pdvs.map(pdv => (
                                    <option key={pdv.id} value={pdv.id}>
                                        {pdv.sap} - {pdv.nom}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <Select name="entreprise" label="Entreprise" placeholder="Selectionner une entreprise" value={bon.entreprise} onChange={handleChange} error={errors.entreprise} >
                                {entreprises.map(entreprise => (
                                    <option key={entreprise.id} value={entreprise.id}>
                                        {entreprise.nom}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Select name="technicien" label="Technicien" placeholder="Selectionner un technicien" value={bon.technicien} onChange={handleChange} error={errors.technicien} >
                                {techniciens.map(technicien => (
                                    <option key={technicien.id} value={technicien.id}>
                                        {technicien.nom} {technicien.prenom}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <Select name="kwf" label="KWF" placeholder="Selectionner un KWF" value={bon.kwf} error={errors.kwf} onChange={handleChange} >
                                {kwfs.map(kwf => (
                                    <option key={kwf.id} value={kwf.id}>
                                        {kwf.nom} {kwf.prenom}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Select name="numCompte" label="Numéro de compte" placeholder="Selectionner un compte" value={bon.numCompt} error={errors.numCompte} onChange={handleChange} >
                                {comptes.map(compte => (
                                    <option key={compte.id} value={compte.id}>
                                        {compte.num} - {compte.nom}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <Field name="numCredit" label="Numéro de crédit" onChange={handleChange} value={bon.numCredit} error={errors.numCredit}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Select name="categorie" label="Catégorie" placeholder="Selectionner une catégorie" value={bon.categorie} error={errors.categorie} onChange={handleChange} >
                                    {categories.map(categorie => (
                                        <option key={categorie.id} value={categorie.id}>
                                            {categorie.nom}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <Select name="type" label="Type" placeholder="Selectionner un type" value={bon.type} error={errors.type} onChange={handleChange} >
                                        {types.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.nom}
                                            </option>
                                        ))}
                            </Select>
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
                <textarea className="form-control" name="remarque" placeholder={bon.remarque} rows="5" onChange={handleChange} value={bon.remarque} error={errors.remarque}></textarea>
                <br/>
                <button type="submit" className="mr-2 btn btn-primary">Enregistrer</button>
                <Link to="/bons" className="btn  btn-light">Retour à la liste</Link>
            </div>
        </form>
     </> );
}
 
export default BonPage;