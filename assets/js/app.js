import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter} from 'react-router-dom';
import '../css/app.css';
import MainNavbar from './components/MainNavbar';
import HomePage from './pages/HomePage';
import PdvListePage from './pages/PdvListePage';
import BonsListePage from './pages/BonsListePage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PdvPage from './pages/PdvPage';
import BonPage from './pages/BonPage';
import TechniciensListePage from './pages/TechniciensListePage';
import TechnicienPage from './pages/TechnicienPage';
import EntreprisesListePage from './pages/EntreprisesListePage';
import EntreprisePage from './pages/EntreprisePage';
import KwfPage from './pages/KwfPage';
import KwfsListePage from './pages/KwfsListePage';
import TypePage from './pages/TypePage';
import TypesListePage from './pages/TypesListePage';
import CategoriePage from './pages/CategoriePage';
import CategoriesListePage from './pages/CategoriesListePage';
import ComptePage from './pages/ComptePage';
import ComptesListePage from './pages/ComptesListePage';

AuthAPI.setup();

const App = () => {
    //TODO: Il faudrait par defaut qu'on demande à notre authApi si on est connecté ou pas
    const [ isAuthenticated, setIsAuthenticated ] = useState(AuthAPI.isAuthenticated());

    const NavbarWithRouter = withRouter(MainNavbar);
    
    return (
    <AuthContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated
    }}>
        <HashRouter>
            <NavbarWithRouter />
            <Container fluid>
                <Row >
                    <Col xs={12} md={12} p={5} className="p-4" >
                        <Switch>
                            <PrivateRoute path="/comptes/:id" component={ComptePage} />
                            <PrivateRoute path="/comptes" component={ComptesListePage} />
                            <PrivateRoute path="/categories/:id" component={CategoriePage} />
                            <PrivateRoute path="/categories" component={CategoriesListePage} />
                            <PrivateRoute path="/types/:id" component={TypePage} />
                            <PrivateRoute path="/types" component={TypesListePage} />
                            <PrivateRoute path="/kwfs/:id" component={KwfPage} />
                            <PrivateRoute path="/kwfs" component={KwfsListePage} />
                            <PrivateRoute path="/entreprises/:id" component={EntreprisePage} />
                            <PrivateRoute path="/entreprises" component={EntreprisesListePage} />
                            <PrivateRoute path="/techniciens/:id" component={TechnicienPage} />
                            <PrivateRoute path="/techniciens" component={TechniciensListePage} />
                            <PrivateRoute path="/bons/:id" component={BonPage} />
                            <PrivateRoute path="/bons" component={BonsListePage} />
                            <PrivateRoute path="/pdv/:id" component={PdvPage} />
                            <PrivateRoute path="/pdv" component={PdvListePage} />
                            <PrivateRoute path="/home" component={HomePage} />
                            <Route path="/" render={(props) => <LoginPage {...props} />} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    </AuthContext.Provider>
    );
};


const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);