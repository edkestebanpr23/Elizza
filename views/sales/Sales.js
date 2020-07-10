import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, View, ScrollView } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Header as SearchBar, Item, Input, Fab } from 'native-base';
import { salesView as dic } from "../../data/languague";
import SaleContext from "../../context/sale/saleContext";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../../data/colors";
import ListSales from "../../components/ListSales";


import { useQuery, ApolloConsumer } from "@apollo/client";
import { GET_SALES } from "../../graphql/petitions";

const Sales = ({ route }) => {
    const { restart } = route.params || false;
    const [isSearch, SetIsSearch] = useState(false);
    const { iLang } = useContext(GlobalContext);
    const { setSale, emptyCart } = useContext(SaleContext);
    const navigation = useNavigation();
    const { data, loading, error } = useQuery(GET_SALES);
    console.log(data);
    console.log(loading);
    console.log(error);

    useEffect(() => {
        // Si se redirecciona desde confirmar una venta, entonces se deben reiniciar las varibales globales
        if (restart) {
            setSale({});
            emptyCart();
        }
    }, []);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={{ flex: 1 }}>

            <SearchBar searchBar rounded style={{ backgroundColor: color.grad[9], }}>
                <Item style={{ backgroundColor: color.light }} >
                    <Icon name="ios-search" onPress={() => console.log(1)} style={{ color: color.dark }} />
                    <Input placeholder={dic.search[iLang]} />
                    <Icon name="ios-close-circle" onPress={() => dismissKeyboard()} style={{ color: color.dark }} />
                </Item>
            </SearchBar>

            <ScrollView style={{ flex: 1 }}>
                <View>
                    <ListSales iLang={iLang} />
                    {/* <ApolloConsumer> */}
                    {/* {
                            client => <ListSales />
                        } */}

                    {/* </ApolloConsumer> */}
                </View>
            </ScrollView>

            <View>
                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: color.dark }}
                    position="bottomRight"
                    onPress={() => navigation.navigate('NewSale')}>
                    <Icon name="add-shopping-cart" type="MaterialIcons" />
                </Fab>
            </View>

        </View>
    );
}

export default Sales;