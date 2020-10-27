import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import EntreprisesAPI from '../services/entreprisesAPI';


const EntreprisesListePage = (props) => {

    const [entreprises, setEntreprises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchEntreprises = async () => {
        try {
            const data = await EntreprisesAPI.findAll();
            setEntreprises(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchEntreprises()
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalEntreprises = [...entreprises];
        //On efface de la liste l'objet à effacer
        setEntreprises(entreprises.filter(entreprise => entreprise.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await EntreprisesAPI.delete(id)
        }catch(error) {
            setEntreprises(originalEntreprises);
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
    const filteredEntreprises = entreprises.filter( 
        e => 
            e.nom.toLowerCase().includes(search.toLowerCase()) ||
            e.rue.toLowerCase().includes(search.toLowerCase()) ||
            e.lieu.toLowerCase().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedEntreprises = Pagination.getData(
        filteredEntreprises,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h2>Liste des entreprises</h2>
            <Link to="/entreprises/new" className="btn btn-primary" >Ajouter une nouvelle entreprise</Link>
        </div>

        <div className=" mb-4 form-group">
            <input 
                type="text"
                placeholder="Rechercher par Nom, Rue ou Lieu..."
                className="form-control"
                onChange={handleSearch}
                value={search}
            />
        </div>
        <Table className="table-hover">
            <thead>
                <tr>
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
                {paginatedEntreprises.map(entreprise =>
                <tr key={entreprise.id}>
                    <td>{entreprise.nom}</td>
                    <td>{entreprise.rue}</td>
                    <td className="text-center">{entreprise.npa}</td>
                    <td>{entreprise.lieu}</td>
                    <td>{entreprise.telephone}</td>
                    <td>{entreprise.fax}</td>
                    <td>{entreprise.mail}</td>
                    <td>
                        <Button className="mr-2" variant="primary" size="sm">Voir</Button>
                        <Link className="btn btn-success btn-sm mr-2"to={"/entreprises/" + entreprise.id} >Modifier</Link>
                        <Button onClick={() => handleDelete(entreprise.id)} disabled={entreprise.bons.length > 0} variant="danger" size="sm">Supprimer</Button>
                    </td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredEntreprises.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredEntreprises.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default EntreprisesListePage;