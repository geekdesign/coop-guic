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
                            <PrivateRoute path="/bons/:id" component={BonPage} />
                            <PrivateRoute path="/techniciens" component={TechniciensListePage} />
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