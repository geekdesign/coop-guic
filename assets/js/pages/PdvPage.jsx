import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import PdvsAPI from "../services/pdvsAPI";

const PdvPage = ({ history, match }) => {
	const { id = "new" } = match.params;

	if (id !== "new") {
		console.log(id);
	}

	const [pdv, setPdv] = useState({
		sap: "",
		nom: "",
		rue: "",
		npa: "",
		lieu: "",
		telephone: "",
		fax: "",
		email: "",
		format: "",
		gerant: "",
	});

	const [errors, setErrors] = useState({
		sap: "",
		nom: "",
		rue: "",
		npa: "",
		lieu: "",
		telephone: "",
		fax: "",
		email: "",
		format: "",
		gerant: "",
	});

	const [editing, setEditing] = useState(false);

	// Récupération du PdV en fonction de l'ID
	const fetchPdv = async (id) => {
		try {
			const {
				sap,
				nom,
				rue,
				npa,
				lieu,
				telephone,
				fax,
				email,
				format,
				gerant,
			} = await PdvsAPI.find(id);
			setPdv({
				sap,
				nom,
				rue,
				npa,
				lieu,
				telephone,
				fax,
				email,
				format,
				gerant,
			});
		} catch (error) {
			//TODO : Flash notification d'erreurs
			history.replace("/pdv");
		}
	};

	// Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
	useEffect(() => {
		if (id !== "new") {
			setEditing(true);
			fetchPdv(id);
		}
	}, [id]);

	// Gestion des changement des input dans le formulaire
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setPdv({ ...pdv, [name]: value });
	};

	// Gestion de la summission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (editing) {
				await PdvsAPI.update(id, pdv);
				//TODO : Flash notification de succès
			} else {
				await PdvsAPI.create(pdv);
				//TODO : Flash notification de succès
			}
			history.replace("/pdv");
			setErrors({});
		} catch ({ response }) {
			const { violations } = response.data;
			if (violations) {
				const apiError = {};
				violations.forEach(({ propertyPath, message }) => {
					apiError[propertyPath] = message;
				});
				setErrors(apiError);
				//TODO : Flash notification d'erreurs
			}
		}
	};

	return (
		<>
			{(!editing && <h2>Création d'un point de vente</h2>) || (
				<h2>Modification du point de vente</h2>
			)}
			<br />
			<form onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-2">
						<Field
							name="sap"
							label="SAP du magasin"
							type="number"
							value={pdv.sap}
							onChange={handleChange}
							error={errors.sap}
						/>
					</div>
					<div className="form-group col-md-3">
						<Field
							name="nom"
							label="Nom du magasin"
							value={pdv.nom}
							onChange={handleChange}
							error={errors.nom}
						/>
					</div>
					<div className="form-group col-md-2">
						<Field
							name="format"
							label="Format du magasin"
							value={pdv.format}
							onChange={handleChange}
							error={errors.format}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-7">
						<h6>Adresse</h6>
						<hr />
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-7">
						<Field
							name="rue"
							placeholder="Rue"
							value={pdv.rue}
							onChange={handleChange}
							error={errors.rue}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-2">
						<Field
							name="npa"
							placeholder="NPA"
							type="number"
							value={pdv.npa}
							onChange={handleChange}
							error={errors.npa}
						/>
					</div>
					<div className="form-group col-md-5">
						<Field
							name="lieu"
							placeholder="Lieu"
							value={pdv.lieu}
							onChange={handleChange}
							error={errors.lieu}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-7">
						<h6>Contact</h6>
						<hr />
						<Field
							name="gerant"
							label="Nom et prénom du gérant/e"
							value={pdv.gerant}
							onChange={handleChange}
							error={errors.gerant}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-2">
						<Field
							name="telephone"
							label="Téléphone"
							value={pdv.telephone}
							onChange={handleChange}
							error={errors.telephone}
						/>
					</div>
					<div className="form-group col-md-2">
						<Field
							name="fax"
							label="Fax"
							value={pdv.fax}
							onChange={handleChange}
							error={errors.fax}
						/>
					</div>
					<div className="form-group col-md-3">
						<Field
							name="email"
							label="Adresse email du gérant"
							value={pdv.email}
							onChange={handleChange}
							error={errors.email}
						/>
					</div>
				</div>
				<div className="form-group col-md-5">
					<button type="submit" className="mr-2 btn btn-primary">
						Enregistrer
					</button>
					<Link to="/pdv" className="btn  btn-light">
						Retour à la liste
					</Link>
				</div>
			</form>
		</>
	);
};

export default PdvPage;
