import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';


const TestPage = (props) => {

    const [listePdvs, setListePdvs] = useState([]);

    // Récupération du PdV en fonction de l'ID
    const fetchPdvs = async ()  => {
        try {
            const data = await axios.get("http://127.0.0.1:8000/api/pdvs")
            .then(response => response.data["hydra:member"]);
            setListePdvs(data);
        } catch (error) {
            //TODO : Flash notification d'erreurs
            console.log(error);
        }
    }

    function headerFormatter(column, colIndex, { sortElement, filterElement }) {
        return (
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            <div>
            { column.text }{ sortElement }
            </div>
            { filterElement }
          </div>
        );
      }

    // Chargement du PDV si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        fetchPdvs();
    }, []);

    const columns = [
        {
        dataField: 'sap',
        text: 'SAP',
        sort: true,
        filter: textFilter(),
        headerFormatter: headerFormatter
        }, {
        dataField: 'nom',
        text: 'Nom',
        sort: true,
        filter: textFilter(),
        headerFormatter: headerFormatter
        }, {
        dataField: 'rue',
        text: 'Rue',
        sort: true,
        filter: textFilter(),
        headerFormatter: headerFormatter
        }, {
        dataField: 'npa',
        text: 'NPA',
        sort: true,
        filter: textFilter(),
        headerFormatter: headerFormatter
        }, {
        dataField: 'lieu',
        text: 'Lieu',
        sort: true,
        filter: textFilter({
            placeholder: 'Entrer un lieu...',
          }),
        headerFormatter: headerFormatter
        },{
        dataField: 'telephone',
        text: 'Téléphone',
        sort: true,
        filter: textFilter({
            placeholder: 'Entrer un numéros de téléphone...',
            }),
        headerFormatter: headerFormatter
        },{
        dataField: 'email',
        text: 'Email',
        sort: true,
        filter: textFilter({
            placeholder: 'Entrer un email...',
            }),
        headerFormatter: headerFormatter
        }, {
        dataField: 'format',
        text: 'Format',
        sort: true,
        filter: textFilter({
            placeholder: 'Entrer un format...',
        }),
        headerFormatter: headerFormatter
        }, {
        dataField: '',
        text: 'Actions'
    }
    ];

    

    const defaultSorted = [{
        dataField: 'sap',
        order: 'desc'
    }];


    return ( <>
        
        <h2>Page de TEST</h2>
        <br/>
        <BootstrapTable bootstrap4 condensed hover keyField='id' cellEdit={ cellEditFactory({ mode: 'dbclick' }) } data={ listePdvs } columns={ columns } defaultSorted={ defaultSorted } pagination={ paginationFactory() } bordered={ false } filter={ filterFactory() } rowClasses="custom-row-class" />  
    </> );
}
 
export default TestPage;