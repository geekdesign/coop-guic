import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import BonsAPI from '../services/bonsAPI';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';


const BonsListePage = () => {

    const [bons, setBons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

        // Fonction asynchrone qui récupère la liste des bons
        const fetchBons = async () => {
            try {
                const data = await BonsAPI.findAll();
                setBons(data);
            }catch (error) {
                console.log(error.response);
            }
        }

        //Au chargement je charge la liste des bons
        useEffect(() => {
            fetchBons()
        }, []);

        // Fonction qui permet de supprimer un bons
        const handleDelete = async id => {
            //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
            const originalBons = [...bons];
            //On efface de la liste l'objet à effacer
            setBons(bons.filter(bons => bons.id !== id))
            //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
            try {
                await BonsAPI.delete(id)
            }catch(error) {
                setBons(originalBons);
                console.log(error.response);
            }
        };


            // Gestion du changement de pages
            const handleChangePage = page => setCurrentPage(page);

            // Gestion des la recherche
            const handleSearchBons = ({currentTarget}) => {
                setSearch(currentTarget.value);
                setCurrentPage(1);
            };

            const itemsPerPage = 10;

            
            const ETAT_CLASSES = {
                ENVOYER: "dark",
                FACTURER: "primary",
                PAYER: "success",
                ANNULER: "warning",
                REALISER: "info"
            }
            
            const ETAT_LABEL = {
                ENVOYER: "Envoyé",
                FACTURER: "Facturé",
                PAYER: "Payé",
                ANNULER: "Annulé",
                REALISER: "Réalisé"
            }
            
            //Filtrage des bons en fonction de la recherche
            const filteredBons = bons.filter( 
                b => 
                    b.numBon.toLowerCase().includes(search.toLowerCase()) ||
                    b.pdv.nom.toLowerCase().includes(search.toLowerCase()) ||
                    b.entreprise.nom.toLowerCase().includes(search.toLowerCase()) ||
                    ETAT_LABEL[b.etat].toLowerCase().includes(search.toLowerCase())
            ); 
            
            //Pagination des données
            const paginatedBons = Pagination.getData(
                filteredBons,
                currentPage, 
                itemsPerPage
                );
                
            //Gestion du format de la date
            const formatDate = (str) => dayjs(str).format('DD.MM.YYYY');
                


    return ( 
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h2>Liste des bons</h2>
                <Link to="/bons/new" className="btn btn-primary" >Créer un nouveau bon</Link>
            </div>
            <br/>
            <div className="form-group">
                <input 
                    type="text"
                    placeholder="Rechercher par N°, PdV, Entreprise ou Etat..."
                    className="form-control"
                    onChange={handleSearchBons}
                    value={search}
                />
            </div>
            <br/>
            <Table  className="table-hover">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Date</th>
                        <th className="text-center">Etat</th>
                        <th>Point de vente</th>
                        <th>Entreprise</th>
                        <th>Sujet</th>
                        <th>Type</th>
                        <th>Catégorie</th>
                        <th>Créer par</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBons.map(bon =>
                    <tr key={bon.id}>
                        <td>{bon.numBon}</td>
                        <td>{formatDate(bon.createdAt)}</td>
                        <td className="text-center"><span className={"badge badge-" + ETAT_CLASSES[bon.etat]}>{ETAT_LABEL[bon.etat]}</span></td>
                        <td>{bon.pdv.nom}</td>
                        <td>{bon.entreprise.nom}</td>
                        <td>{bon.sujet}</td>
                        <td>{bon.type.nom}</td>
                        <td>{bon.categorie.nom}</td>
                    <td>{bon.createdBy.prenom}{" "}{bon.createdBy.nom}</td>
                        <td>
                            <Button className="mr-2" variant="primary" size="sm">Voir</Button>
                            <Button className="mr-2" onClick={() => handleDelete(bon.id)} variant="success" size="sm">Modifier</Button>
                            <Button className="mr-2" onClick={() => handleDelete(bon.id)} disabled={bon.etat !== "ANNULER"} variant="danger" size="sm">Supprimer</Button>
                        </td>
                    </tr>
                    )}
                </tbody>

            </Table>
            {itemsPerPage < filteredBons.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredBons.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default BonsListePage;
