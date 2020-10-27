import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

const Dropdown = ({ titre, children }) => {

    const [show, setShow] = useState(false);

    return ( 
        <>

    <NavDropdown
        title={titre}
        show={show}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
    >
        {children}
    </NavDropdown>

    </>
     );
}
 
export default Dropdown;