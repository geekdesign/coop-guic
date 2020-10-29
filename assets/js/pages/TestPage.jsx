import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import { Link } from "react-router-dom";
import PdvsAPI from "../services/pdvsAPI";

const TestPage = (props) => {
	const [modalInfo, setModalInfo] = useState([]);
	const [pdvs, setPdvs] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Récupération du PdV en fonction de l'ID
	const fetchPdvs = async () => {
		try {
			const data = await axios
				.get("http://127.0.0.1:8000/api/pdvs")
				.then((response) => response.data["hydra:member"]);
			setPdvs(data);
		} catch (error) {
			//TODO : Flash notification d'erreurs
			console.log(error);
		}
	};

	function headerFormatter(column, colIndex, { sortElement, filterElement }) {
		return (
			<div style={{ display: "flex", flexDirection: "column", width: "auto" }}>
				<div>
					{column.text}
					{sortElement}
				</div>
				{filterElement}
			</div>
		);
	}

	// Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
	useEffect(() => {
		fetchPdvs();
	}, []);

	const columns = [
		{
			dataField: "sap",
			text: "SAP",
			sort: true,
			filter: textFilter(),
			headerFormatter: headerFormatter,
		},
		{
			dataField: "nom",
			text: "Nom",
			sort: true,
			filter: textFilter(),
			headerFormatter: headerFormatter,
		},
		{
			dataField: "telephone",
			text: "Téléphone",
			sort: true,
			filter: textFilter({
				placeholder: "Entrer un numéros de téléphone...",
			}),
			headerFormatter: headerFormatter,
		},
		{
			dataField: "email",
			text: "Email",
			sort: true,
			filter: textFilter({
				placeholder: "Entrer un email...",
			}),
			headerFormatter: headerFormatter,
		},
	];

	const defaultSort = [
		{
			dataField: "sap",
			order: "asc",
		},
	];

	const rowEvents = {
		onClick: (e, row) => {
			setModalInfo(row);
			toggleTrueFalse();
		},
	};

	const toggleTrueFalse = () => {
		setShowModal(handleShow);
	};

	// Fonction qui permet de supprimer un pdv
	const handleDelete = async (id) => {
		//On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
		const originalPdvs = [...pdvs];
		//On efface de la liste l'objet à effacer
		setPdvs(pdvs.filter((modalInfo) => modalInfo.id !== id));
		//On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
		try {
			await PdvsAPI.delete(id);
			handleClose();
			console.log("La suppressiona fonctionnée");
		} catch (error) {
			setPdvs(originalPdvs);
			handleClose();
			console.log("MERDE");
			console.log(error.response);
		}
	};

	const ModalContent = () => {
		return (
			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>
						{modalInfo.sap} - {modalInfo.nom}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div classNmae="row">
						<div classNmae="col-md-6">
							<div>
								<strong>Gérant/e: </strong>
								<br />
								<p>Bla Bla</p>
								<strong>Adresse: </strong>
								<br />
								{modalInfo.rue} <br />
								{modalInfo.npa} {modalInfo.lieu}
								<br />
								<br />
								<strong>Téléphone: </strong>{" "}
								<a href={"tel:" + modalInfo.telephone}>{modalInfo.telephone}</a>
								<br />
								<strong>Fax: </strong> {modalInfo.fax}
							</div>
							<br />
							<div>
								<strong>Email: </strong>
								<a href={"mailto:" + modalInfo.email}> {modalInfo.email}</a>
							</div>
							<div>
								<br />
								<strong>Information du PdV: </strong> <br />
								<p>
									Format:
									{"  "}
									<span className="text-uppercase">
										{modalInfo.format}
									</span>{" "}
								</p>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between">
					<div>
						<Link
							className="btn btn-success btn-sm mr-2"
							to={"/pdv/" + modalInfo.id}
						>
							Modifier
						</Link>
						<Button
							onClick={() => handleDelete(modalInfo.id)}
							disabled={modalInfo.bons.length > 0}
							variant="danger"
							size="sm"
						>
							Supprimer
						</Button>
					</div>
					<Button variant="primary" size="sm" onClick={handleClose}>
						Fermer
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	return (
		<>
			<div className="mb-3 d-flex justify-content-between align-items-center">
				<h2>Liste des points de vente</h2>
				<Link to="/pdv/new" className="btn btn-primary">
					Créer un nouveau point de vente
				</Link>
			</div>
			<BootstrapTable
				bootstrap4
				hover
				data={pdvs}
				columns={columns}
				keyField="id"
				pagination={paginationFactory()}
				bordered={false}
				filter={filterFactory()}
				defaultSorted={defaultSort}
				rowEvents={rowEvents}
			/>
			{show ? <ModalContent /> : null}
		</>
	);
};

export default TestPage;
