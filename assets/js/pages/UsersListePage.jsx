import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import UsersAPI from '../services/usersAPI';


const UserListePage = (props) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fonction asynchrone qui récupère la liste des magasins 
    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
        }catch (error) {
            console.log(error.response);
        }
    }

    const USER_CLASSES = {
        ROLE_USER: "primary",
        ROLE_ADMIN: "dark"
    }
    
    const USER_LABEL = {
        ROLE_USER: "Utilisateur",
        ROLE_ADMIN: "Administrateur"
    }

    //Au chargement je charge la liste des magasins
    useEffect(() => {
        fetchUsers()
    }, []);

    // Fonction qui permet de supprimer un pdv
    const handleDelete = async id => {
        //On créer une copie de la liste au cas ou la suppression ne focntionnerait pas
        const originalUsers = [...users];
        //On efface de la liste l'objet à effacer
        setUsers(users.filter(user => user.id !== id))
        //On essaye de faire une requête serveur pour la suppression de l'élément dans la liste si sa ne marche pas on renvoi une erreure
        try {
            await UsersAPI.delete(id)
        }catch(error) {
            setUsers(originalUsers);
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
    const filteredUsers = users.filter( 
        u => 
            u.nom.toLowerCase().includes(search.toLowerCase()) ||
            u.prenom.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase())
    ); 

    //Pagination des données
    const paginatedUsers = Pagination.getData(
        filteredUsers,
        currentPage, 
        itemsPerPage
    );

    return ( 
        <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h2>Liste des utilisateurs</h2>
            <Link to="/users/new" className="btn btn-primary" >Créer un nouvel utilisateur</Link>
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
                    <th>Username</th>
                    <th>Email</th>
                    <th className="text-center">Rôles</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {paginatedUsers.map(user =>
                <tr key={user.id}>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.username}</td>
                    <td>{user.mail}</td>
                    <td className="text-center"><span className={"badge badge-" + USER_CLASSES[user.roles]}>{USER_LABEL[user.roles]}</span></td>
                    <td>
                        <Button className="mr-2" variant="primary" size="sm">Voir</Button>
                        <Link className="btn btn-success btn-sm mr-2"to={"/user/" + user.id} >Modifier</Link>
                        <Button onClick={() => handleDelete(user.id)} disabled={user.bons.length > 0} variant="danger" size="sm">Supprimer</Button>
                    </td>
                </tr>
                    )}
                
            </tbody>
        </Table>
            
            {itemsPerPage < filteredUsers.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredUsers.length} 
                    onPageChanged={handleChangePage}
                />
            )}
        </>
     );
}
 
export default UserListePage;