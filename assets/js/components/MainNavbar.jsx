import React from 'react';
import { Nav, Image, Navbar, NavDropdown} from 'react-bootstrap';
import { FaBeer, FaPlus, FaListUl } from 'react-icons/fa';

const MainNavbar = (props) => {

    return (

        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="pl-2 pt-3">
            <img
                src="https://www.coop.ch/_ui/20.4.2.51/desktop/common/img/masthead/logo/img/coop_logo.svg"
                className="d-inline-block align-top"
                alt="Coop GUIC"
            />{' '}
            GUIC
            </Navbar.Brand>
            <Nav className="mr-auto ml-2">
                <Nav.Link href="#home">Tableau de bord</Nav.Link>
                <NavDropdown title="Bons" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.4"><FaPlus className="mr-2" />Nouveau bon</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.1"><FaListUl className="mr-2" />Liste des bons</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="PDV" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.2"><FaPlus className="mr-2" />Ajouter un PDV</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.1"><FaListUl className="mr-2" />Liste des PDV</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link href="#home">Connexion</Nav.Link>
            </Nav>
        </Navbar>
     );
}
 
export default MainNavbar;