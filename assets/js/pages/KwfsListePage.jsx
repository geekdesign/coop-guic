import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import KwfsAPI from '../services/kwfsAPI';


const KwfsListePage = (props) => {

    const [kwfs, setKwfs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchKwfs = async () => {
        try {
            const data = await KwfsAPI.findAll();
            setKwfs(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchKwfs()
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalKwfs = [...kwfs];
        //On efface de la liste l'objet à effacer
        setKwfs(kwfs.filter(kwfs => kwfs.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await KwfsAPI.delete(id)
        }catch(error) {
            setKwfs(originalKwfs);
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
    const filteredKwfs = kwfs.filter( 
        k => 
            k.nom.toLowerCase().includes(search.toLowerCase()) ||
            k.prenom.toLowerCase().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedKwfs = Pagination.getData(
        filteredKwfs,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h2>Liste des KWF</h2>
            <Link to="/kwfs/new" className="btn btn-primary" >Ajouter un KWF</Link>
        </div>

        <div className=" mb-4 form-group">
            <input 
                type="text"
                placeholder="Rechercher par Nom ou prénom..."
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
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {paginatedKwfs.map(kwf =>
                <tr key={kwf.id}>
                    <td>{kwf.nom}</td>
                    <td>{kwf.prenom}</td>
                    <td>{kwf.email}</td>
                    <td>
                        <Link className="btn btn-success btn-sm mr-2" to={"/kwfs/" + kwf.id} >Modifier</Link>
                        <Button onClick={() => handleDelete(kwf.id)} disabled={kwf.bons.length > 0} variant="danger" size="sm">Supprimer</Button>
                    </td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredKwfs.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredKwfs.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default KwfsListePage;