import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import PdvsAPI from '../services/pdvsAPI';


const PdvListePage = (props) => {

    const [pdvs, setPdvs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchPdvs = async () => {
        try {
            const data = await PdvsAPI.findAll();
            setPdvs(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchPdvs()
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalPdvs = [...pdvs];
        //On efface de la liste l'objet à effacer
        setPdvs(pdvs.filter(pdv => pdv.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await PdvsAPI.delete(id)
        }catch(error) {
            setPdvs(originalPdvs);
            console.log(error.response);
        }
    };

    // Gestion du changement de pages
    const handleChangePage = page => setCurrentPage(page);

    // Gestion des la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    //Filtrage des magasin en fonction de la recherche
    const filteredPdvs = pdvs.filter( 
        p => 
            p.nom.toLowerCase().includes(search.toLowerCase()) ||
            p.rue.toLowerCase().includes(search.toLowerCase()) ||
            p.lieu.toLowerCase().includes(search.toLowerCase()) ||
            p.sap.toString().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedPdvs = Pagination.getData(
        filteredPdvs,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <h2>Liste des points de vente</h2>
        <br/>
        <div className="form-group">
            <input 
                type="text"
                placeholder="Rechercher par SAP, Nom, Rue ou Lieu..."
                className="form-control"
                onChange={handleSearch}
                value={search}
            />
        </div>
        <br/>
        <Table className="table-hover">
            <thead>
                <tr>
                    <th className="text-center">SAP</th>
                    <th>Nom</th>
                    <th>Rue</th>
                    <th className="text-center">NPA</th>
                    <th>Lieu</th>
                    <th>Téléphone</th>
                    <th>Fax</th>
                    <th>Email</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {paginatedPdvs.map(pdv =>
                <tr key={pdv.id}>
                    <td className="text-center">{pdv.sap}</td>
                    <td>{pdv.nom}</td>
                    <td>{pdv.rue}</td>
                    <td className="text-center">{pdv.npa}</td>
                    <td>{pdv.lieu}</td>
                    <td>{pdv.telephone}</td>
                    <td>{pdv.fax}</td>
                    <td>{pdv.email}</td>
                    <td><Button onClick={() => handleDelete(pdv.id)} disabled={pdv.bons.length > 0} variant="danger" size="sm">Supprimer</Button></td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredPdvs.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredPdvs.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default PdvListePage;