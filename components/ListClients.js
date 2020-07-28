import React, { useState, useEffect } from 'react';
import { Keyboard, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Item, Text, Icon, Input, Header } from "native-base";
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
    console.log('Loading customers... ', loading);

    try {
        console.log('Lista de clientes in:', data.getClients);
    } catch (error) {
        console.log('>>> Clientes no han cargado');
    }

    const [name, setName] = useState('');

    const onSelect = (cli) => {
        onSelectCustomer(JSON.stringify(cli));
    }

    const filter = text => {
        setName(text);
    }

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

            {
                data && (
                    <FlatList
                        data={data.getClients}
                        renderItem={({ item }) => {
                            const customer = item;
                            if (name != '') {
                                if (customer.name.toLowerCase().match(name.toLowerCase())) {
                                    return (
                                        <TouchableOpacity onPress={() => onSelect(customer)} activeOpacity={0.8} style={S.item}>
                                            <Text style={S.itemText}>{customer.name} </Text>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    return <></>;
                                }
                            }

                            return (
                                <TouchableOpacity onPress={() => onSelect(customer)} activeOpacity={0.8} style={S.item}>
                                    <Text style={S.itemText}>{customer.name} </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                )
            }


        </>
    );
};

const S = StyleSheet.create({
    item: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: color.grad[1],
        borderTopWidth: 1,
        marginHorizontal: 5
    },
    itemText: {
        fontSize: 17,

    }
});

export default ListClients;