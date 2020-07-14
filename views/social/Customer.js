import React from 'react';
import { View, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { Container, Content, Text, Image, Icon, Button, Left, ListItem, Body, ActionSheet } from "native-base";
import { main as color } from "../../data/colors";
import { customerView as dic } from "../../data/languague";
import CustomerInfo from "../../components/CustomerInfo";
import SaleCustomer from "../../components/SaleCustomer";


const Customer = ({ route }) => {
    console.log(route.params.customer);
    const { customer, iLang } = route.params;
    const { sale } = route.params || false;
    console.log('Sale', sale);

    return (
        <Container>
            <Content>

                <CustomerInfo style={{ flex: 1 }} customer={customer} iLang={iLang} />

                {sale && (<SaleCustomer sale={sale} iLang={iLang} />)}

            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({

});

export default Customer;