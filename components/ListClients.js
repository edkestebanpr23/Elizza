import React, { useState, useEffect } from 'react';
import { Keyboard, View, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, Item, Text, Icon, Input, Header } from "native-base";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/petitions";
import { useNavigation } from "@react-navigation/native";
import { ListCustomersCmp as dic } from "../data/languague";
import { main as color } from "../data/colors";


const ListClients = ({ iLang, searchbar = true, redirect = true, onSelectCustomer }) => {
    const navigation = useNavigation();
    // Apollo
    /**
     * Esta destructuracion me dice:
     * data: Ahi se cargan los datos una vez se realice la consulta en el servidor
     * loading: Este al ejecutarse es true, pero cambia a falso cuando retorne un resultado
     * error: Si ocurrio un error...
     */
    const { data, loading, error } = useQuery(GET_CUSTOMERS);
    // console.log('Lista de clientes:', data.getClients);
    console.log('Loading...', loading);

    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const [customers, setCustomers] = useState(<></>);

    const onSelect = (cli) => {
        // console.log(cli);
        onSelectCustomer(JSON.stringify(cli));
    }

    useEffect(() => {
        if (data) {
            console.log('Actualizando lista de clientes desde el useEffect');
            const list = data.getClients.map(customer => (
                <ListItem key={customer.telephone} onPress={(e) => onSelect(customer)}>
                    <Text>{customer.name} </Text>
                </ListItem>
            ));
            setCustomers(list);
        }
    }, [data, count]);


    const filter = text => {
        setName(text);
        let textIn = text.toLowerCase();
        if (data.getClients.length > 0) {
            if (textIn !== '') {
                let fullList = data.getClients;
                let filterList = fullList.filter(item => {
                    if (item.name.toLowerCase().match(textIn)) {
                        return item;
                    }
                });
                const list = filterList.map(customer => (
                    <ListItem key={customer.telephone} onPress={() => onSelect(customer)}>
                        <Text>{customer.name} </Text>
                    </ListItem>
                ));
                setCustomers(list);
            } else {
                if (data) {
                    const list = data.getClients.map(customer => (
                        <ListItem key={customer.telephone} onPress={(e) => onSelect(customer)}>
                            <Text>{customer.name} </Text>
                        </ListItem>
                    ));
                    setCustomers(list);
                }
            }
        }
    };

    const clearInput = text => {
        setName('');
        dismissKeyboard();
        filter('');
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <>
            {
                searchbar && (
                    <Header searchBar rounded style={{ backgroundColor: color.grad[9], }}>
                        <Item style={{ backgroundColor: color.light }} >
                            <Icon name="ios-search" onPress={() => console.log(1)} style={{ color: color.dark }} />
                            <Input placeholder={dic.searchBar[iLang]} onChangeText={text => filter(text)} value={name} />
                            <Icon name="ios-close-circle" onPress={() => clearInput()} style={{ color: color.dark }} />
                        </Item>
                    </Header>

                )
            }
            <ScrollView>
                <List>
                    {
                        !loading && customers
                    }
                </List>
            </ScrollView>
        </>
    );
}

export default ListClients;