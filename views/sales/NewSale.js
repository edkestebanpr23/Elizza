import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Text, Toast, Icon, Fab, ActionSheet } from "native-base";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { newSale as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import SaleContext from "../../context/sale/saleContext";
import { useNavigation } from "@react-navigation/native";
import ListProducts from "../../components/ListProducts";

// Apollo
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/petitions";

import ModalCategory from "../../components/ModalCategory";


const NewSale = ({ route }) => {
    const { iLang, user } = useContext(GlobalContext);
    const { products, emptyCart } = useContext(SaleContext);

    // React Navigation
    const navigation = useNavigation();

    const options = () => {

    }

    return (
        <Container style={[gS.container]}>
            <ScrollView>
                <ListProducts edit total />
            </ScrollView>
            <View style={{ flex: 1 }}>
                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: color.grad[8] }}
                    position="bottomRight"
                    onPress={() => navigation.navigate('FormProduct')}>
                    <Icon name="plus" type="AntDesign" />
                </Fab>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    
});

export default NewSale;