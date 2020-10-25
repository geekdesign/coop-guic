import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const HomePage = (props) => {
    return ( 
        <>
            <Jumbotron>
                <h1>Bienvenue sur GUIC</h1>
                <p>
                La plateforme de création de bons de COOP
                </p>
                <p>
                    <Button variant="primary">Se connecter</Button>
                </p>
            </Jumbotron>
        </>
     );
}
 
export default HomePage;