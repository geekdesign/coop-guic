import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';
import { FaPlus, FaListUl } from 'react-icons/fa';
import AuthApi from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Dropdown from '../components/Dropdown';

const MainNavbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    // Fonction de logout avec redirection vers la page de connexion
    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        history.push("/login")
    }

    return (

        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/#/home" className="navbar-brand pl-2 pt-3">
            <img
                src="https://www.coop.ch/_ui/20.4.2.51/desktop/common/img/masthead/logo/img/coop_logo.svg"
                className="d-inline-block align-top"
                alt="Coop GUIC"
            />{' '}
            GUIC
            </Navbar.Brand>
                {(isAuthenticated && (
                <>
                    <Nav className="mr-auto ml-2">
                        <Nav.Link href="#home">Tableau de bord</Nav.Link>
                        <Dropdown titre="Bons" >
                            <NavDropdown.Item href="/#/bons/new"><FaPlus className="mr-2" />Nouveau bon</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/bons"><FaListUl className="mr-2" />Liste des bons</NavDropdown.Item>
                        </Dropdown>
                        <Dropdown titre="PdV" >
                            <NavDropdown.Item href="/#/pdv/new"><FaPlus className="mr-2" />Ajouter un PDV</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/pdv"><FaListUl className="mr-2" />Liste des PDV</NavDropdown.Item>
                        </Dropdown>
                        <Dropdown titre="Entreprises" >
                            <NavDropdown.Item href="/#/entreprises/new"><FaPlus className="mr-2" />Ajouter une entreprise</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/entreprises"><FaListUl className="mr-2" />Liste des entreprises</NavDropdown.Item>
                        </Dropdown>
                        <Dropdown titre="Techniciens" >
                            <NavDropdown.Item href="/#/techniciens/new"><FaPlus className="mr-2" />Ajouter un technicien</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/techniciens"><FaListUl className="mr-2" />Liste des techniciens</NavDropdown.Item>
                        </Dropdown>
                        <Dropdown titre="Paramètres" >
                            <NavDropdown.Item href="/#/comptes">Gestion des comptes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/kwfs">Gestion des KWF</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/users">Gestion des utilisateurs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/categories">Gestion des catégories</NavDropdown.Item>
                            <NavDropdown.Item href="/#/types">Gestion des types</NavDropdown.Item>
                        </Dropdown>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Button className="btn-warning" onClick={handleLogout} >Déconnexion</Button>
                    </Nav>
                </>
                ) || (
                    <>

                    </>
                )
                    )}
        </Navbar>
     );
}
 
export default MainNavbar;