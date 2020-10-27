import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import ComptesAPI from '../services/comptesAPI';


const ComptesListePage = (props) => {
 
    const [comptes, setComptes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchComptes = async () => {
        try {
            const data = await ComptesAPI.findAll();
            setComptes(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchComptes()
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalComptes = [...comptes];
        //On efface de la liste l'objet à effacer
        setComptes(comptes.filter(comptes => comptes.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await ComptesAPI.delete(id)
        }catch(error) {
            setComptes(originalComptes);
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
    const filteredComptes = comptes.filter( 
        c => 
            c.nom.toLowerCase().includes(search.toLowerCase()) ||
            c.num.toString().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedComptes = Pagination.getData(
        filteredComptes,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h2>Liste des comptes</h2>
            <Link to="/comptes/new" className="btn btn-primary" >Ajouter un nouveau compte</Link>
        </div>

        <div className=" mb-4 form-group">
            <input 
                type="text"
                placeholder="Rechercher par Nom ou numéros ..."
                className="form-control"
                onChange={handleSearch}
                value={search}
            />
        </div>
        <Table className="table-hover">
            <thead>
                <tr>
                    <th>N° de compte</th>
                    <th>Nom</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {paginatedComptes.map(compte =>
                <tr key={compte.id}>
                    <td>{compte.num}</td>
                    <td>{compte.nom}</td>
                    <td>
                        <Link className="btn btn-success btn-sm mr-2" to={"/comptes/" + compte.id} >Modifier</Link>
                        <Button onClick={() => handleDelete(compte.id)} disabled={compte.bons.length > 0} variant="danger" size="sm">Supprimer</Button>
                    </td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredComptes.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredComptes.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default ComptesListePage;