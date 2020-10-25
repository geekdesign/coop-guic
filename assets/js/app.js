import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';


import '../css/app.css';
import MainNavbar from './components/MainNavbar';
import HomePage from './pages/HomePage';
import PdvListePage from './pages/PdvListePage';
import BonsListePage from './pages/BonsListePage';


const App = () => {
    return (
    <HashRouter>
        <MainNavbar />
        <Container fluid>
            <Row >
                <Col xs={12} md={12} p={5} className="p-4" >
                    <Switch>
                        <Route path="/bons" component={BonsListePage}/>
                        <Route path="/pdv" component={PdvListePage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
    </HashRouter>
    );
};


const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);