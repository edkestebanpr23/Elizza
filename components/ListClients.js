import React from 'react';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Text } from "native-base";
import { gql, useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/petitions";


const ListClients = () => {

    // Apollo
    /**
     * Esta destructuracion me dice:
     * data: Ahi se cargan los datos una vez se realice la consulta en el servidor
     * loading: Este al ejecutarse es true, pero cambia a falso cuando retorne un resultado
     * error: Si ocurrio un error...
     */
    const { data, loading, error } = useQuery(GET_CUSTOMERS);
    console.log(data);
    console.log(loading);
    console.log(error);

    return ( 
        <View>
            <List>
                {
                    data.getClients.map(customer => (
                        <ListItem>
                            <Text>{customer.name} </Text>
                        </ListItem>
                    ))
                }
            </List>
        </View>
     );
}
 
export default ListClients;