import React, { useState, useContext } from 'react';
import { Nav, Image, Navbar, NavDropdown, Button} from 'react-bootstrap';
import { FaBeer, FaPlus, FaListUl } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AuthApi from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';

const MainNavbar = ({history}) => {

    const [showBons, setShowBons] = useState(false);
    const [showPdv, setShowPdv] = useState(false);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

        // Lors du hover sur le menu le dropdown sort automatiquement  
        const showDropdownBons = (e)=>{
            setShowBons(!showBons);
        }
        const hideDropdownBons = e => {
            setShowBons(false);
        }
        // Lors du hover sur le menu PDV le dropdown descend automatiquement
        const showDropdownPdv = (e)=>{
            setShowPdv(!showPdv);
        }
        const hideDropdownPdv = e => {
            setShowPdv(false);
        }

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
                        <NavDropdown 
                            title="Bons"
                            id="basic-nav-dropdown"        
                            show={showBons}
                            onMouseEnter={showDropdownBons} 
                            onMouseLeave={hideDropdownBons}
                        >
                            <NavDropdown.Item href="#action/3.4"><FaPlus className="mr-2" />Nouveau bon</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/bons"><FaListUl className="mr-2" />Liste des bons</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown 
                            title="PDV"
                            id="basic-nav-dropdown"        
                            show={showPdv}
                            onMouseEnter={showDropdownPdv} 
                            onMouseLeave={hideDropdownPdv}
                        >
                            <NavDropdown.Item href="#action/3.2"><FaPlus className="mr-2" />Ajouter un PDV</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#/pdv"><FaListUl className="mr-2" />Liste des PDV</NavDropdown.Item>
                        </NavDropdown>
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