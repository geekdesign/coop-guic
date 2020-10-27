import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import TechniciensAPI from '../services/techniciensAPI';

const TechniciensListePage = (props) => {
    
    const [techniciens, setTechniciens] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchTechniciens = async () => {
        try {
            const data = await TechniciensAPI.findAll();
            setTechniciens(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchTechniciens();
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalTechniciens = [...techniciens];
        //On efface de la liste l'objet à effacer
        setTechniciens(techniciens.filter(technicien => technicien.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await TechniciensAPI.delete(id)
        }catch(error) {
            setTechniciens(originalTechniciens);
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
    const filteredTechniciens = techniciens.filter( 
        t => 
            t.nom.toLowerCase().includes(search.toLowerCase()) ||
            t.prenom.toLowerCase().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedTechniciens = Pagination.getData(
        filteredTechniciens,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h2>Liste des techniciens</h2>
            <Link to="/technicien/new" className="btn btn-primary" >Ajouter un technicien</Link>
        </div>

        <div className=" mb-4 form-group">
            <input 
                type="text"
                placeholder="Rechercher par Nom ou prénom.."
                className="form-control"
                onChange={handleSearch}
                value={search}
            />
        </div>
        <Table className="table-hover">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {paginatedTechniciens.map(technicien =>
                <tr key={technicien.id}>
                    <td>{technicien.nom}</td>
                    <td>{technicien.prenom}</td>
                    <td>{technicien.telephone}</td>
                    <td>{technicien.email}</td>
                    <td>
                        <Button className="mr-2" variant="primary" size="sm">Voir</Button>
                        <Link className="btn btn-success btn-sm mr-2"to={"/technicien/" + technicien.id} >Modifier</Link>
                        <Button onClick={() => handleDelete(technicien.id)} disabled={technicien.bons.length > 0} variant="danger" size="sm">Supprimer</Button>
                    </td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredTechniciens.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredTechniciens.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default TechniciensListePage;