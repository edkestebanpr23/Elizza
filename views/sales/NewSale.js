import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Text, Toast, Icon, Fab, ActionSheet, Button } from "native-base";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { newSale as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import SaleContext from "../../context/sale/saleContext";
import { useNavigation } from "@react-navigation/native";
import ListProducts from "../../components/ListProducts";
/**
 * Vista de lista de productos, aqui se agregan, se ve el total y se confirman los productos
 */
const NewSale = ({ route }) => {
    const { iLang, user } = useContext(GlobalContext);
    const { products, emptyCart, setSale } = useContext(SaleContext);

    // React Navigation
    const navigation = useNavigation();

    const options = () => {

    }

    // Retorna el subtotal de la compra
    const getTotal = () => {
        let total = 0;
        if (products) {
            products.forEach(product => {
                total = total + parseInt(product.price) * parseInt(product.quantity);
            });
        }
        // setTotal(total);
        return total;
    };

    const goTo = () => {
        const sale = {
            total: getTotal()
        }
        setSale(sale);
        navigation.navigate('InfoSale');
    }

    return (
        <Container style={[gS.container]}>
            <ScrollView>
                <ListProducts edit total />
                {
                products.length > 0 ? (
                    <Button rounded block style={{backgroundColor: color.grad[9], marginBottom: 100}}
                        onPress={() => goTo()}
                    >
                        <Text>{dic.next[iLang]} </Text>
                    </Button>
                ) : (<></>)
            }
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