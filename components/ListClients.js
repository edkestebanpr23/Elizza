import React from 'react';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Text } from "native-base";
import { gql, useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/petitions";
import { useNavigation } from "@react-navigation/native";


const ListClients = ({ iLang }) => {
    const navigation = useNavigation();
    // Apollo
    /**
     * Esta destructuracion me dice:
     * data: Ahi se cargan los datos una vez se realice la consulta en el servidor
     * loading: Este al ejecutarse es true, pero cambia a falso cuando retorne un resultado
     * error: Si ocurrio un error...
     */
    const { data, loading, error } = useQuery(GET_CUSTOMERS);
    console.log('datos:', data);
    console.log('loading:', loading);
    console.log('error:', error);

    return ( 
        <View>
            <List>
                <ListItem itemDivider>
                <Text>Clientes</Text>
                </ListItem>  
                {
                    !loading && data.getClients.map(customer => (
                        <ListItem key={customer.telephone} onPress={() => navigation.navigate('Customer', { customer, iLang })}>
                            <Text>{customer.name} </Text>
                        </ListItem>
                    ))
                }
            </List>
        </View>
     );
}
 
export default ListClients;