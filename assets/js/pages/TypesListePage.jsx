import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import TypesAPI from '../services/typesAPI';


const TypesListePage = (props) => {

    const [types, setTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchTypes = async () => {
        try {
            const data = await TypesAPI.findAll();
            setTypes(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchTypes()
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalTypes = [...types];
        //On efface de la liste l'objet à effacer
        setTypes(types.filter(types => types.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await TypesAPI.delete(id)
        }catch(error) {
            setTypes(originalTypes);
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
    const filteredTypes = types.filter( 
        t => 
            t.nom.toLowerCase().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedTypes = Pagination.getData(
        filteredTypes,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h2>Liste des points de vente</h2>
            <Link to="/types/new" className="btn btn-primary" >Créer un nouveau point de vente</Link>
        </div>

        <div className=" mb-4 form-group">
            <input 
                type="text"
                placeholder="Rechercher par Nom ..."
                className="form-control"
                onChange={handleSearch}
                value={search}
            />
        </div>
        <Table className="table-hover">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {paginatedTypes.map(type =>
                <tr key={type.id}>
                    <td>{type.nom}</td>
                    <td>
                        <Link className="btn btn-success btn-sm mr-2"to={"/types/" + type.id} >Modifier</Link>
                        <Button onClick={() => handleDelete(type.id)} disabled={type.bons.length > 0} variant="danger" size="sm">Supprimer</Button>
                    </td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredTypes.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredTypes.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default TypesListePage;