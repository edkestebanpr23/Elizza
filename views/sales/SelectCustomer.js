import React from 'react';
import ListClients from "../../components/ListClients";

const SelectCustomer = () => {
    return ( 
        <ListClients iLang searchbar redirect onSelectCustomer />
     );
}
 
export default SelectCustomer;