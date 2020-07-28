import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, View, ScrollView } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Header as SearchBar, Item, Input, Fab } from 'native-base';
import { salesView as dic } from "../../data/languague";
import SaleContext from "../../context/sale/saleContext";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../../data/colors";
import ListSales from "../../components/ListSales";


const Sales = ({ route }) => {
    const { restart } = route.params || false;
    const { iLang } = useContext(GlobalContext);
    const { setSale, emptyCart, payCounter } = useContext(SaleContext);

    const navigation = useNavigation();

    useEffect(() => {
        // Si se redirecciona desde confirmar una venta, entonces se deben reiniciar las varibales globales
        console.log('Restart: ', restart);
        if (restart) {
            console.log('Entro a restart');
            setSale({});
            emptyCart();
        }
    }, [payCounter]);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={{ flex: 1 }}>

            <ListSales iLang={iLang} />


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