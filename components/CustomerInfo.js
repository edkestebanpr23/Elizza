import React from 'react';
import { View, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { Container, Content, Text, Icon, Button, Left, ListItem, Body, ActionSheet } from "native-base";
import { main as color } from "../data/colors";
import { customerView as dic } from "../data/languague";


const CustomerInfo = ({ customer, iLang }) => {

    // Realizar una llamada a un teléfono colombiano
    const linkingTel = phone => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    // Abre WhatsApp en el número de teléfono registrado, este debe tener el indicativo del país
    const linkingWhatsApp = phone => {
        console.log('Telefono:', phone);
        let mobile = Platform.OS == 'ios' ? phone : '+' + phone;
        Linking.openURL(`whatsapp://send?phone=${mobile}`).then((data) => {
            console.log('WhatsApp Opened', data);
        }).catch(() => {
            alert('Make sure WhatsApp installed on your device');
        });;
    };
    // Dina: 311 737 5679

    // Si la persona tiene 2 números de teléfono, muestra un ActionSheet para seleccionar número
    const prepareCall = () => {
        if (customer.telephone2 !== '') {
            defineNumberToCall(customer.telephone, customer.telephone2);
        } else {
            linkingTel(customer.telephone);
        }
    }

    // ActionSheet con números de telefono, aquí se selecciona el número a llamar
    const defineNumberToCall = (tel1, tel2) => {
        const buttons = [
            { text: tel1 },
            { text: tel2 },
            { text: dic.cancel[iLang] }
        ];
        const cancelIndex = 2;

        ActionSheet.show(
            {
                options: buttons,
                cancelButtonIndex: cancelIndex,
                title: dic.selectNumber[iLang]
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    console.log('Llamar ' + tel1);
                } else if (buttonIndex == 1) {
                    console.log('Llamar ' + tel2);
                } else {
                    console.log('Cancelado');
                }
            }

        );
    };

    return (
        <View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ fontSize: 24, color: color.dark }}>
                    {
                        customer.sex === 'male' ? (
                            <Icon name='ios-man' />
                        ) : (
                                <Icon name='ios-woman' />
                            )
                    }
                    {' '} {customer.name}
                </Text>
                <Text style={{ color: color.main, paddingLeft: '10%' }}>{customer.description}</Text>
            </View>

            <ListItem icon onPress={() => prepareCall()}>
                <Left>
                    <Button style={{ backgroundColor: "#4CAF50" }}>
                        <Icon active name="ios-call" type='Ionicons' />
                    </Button>
                </Left>
                <Body>
                    <Text>{dic.call[iLang]}</Text>
                </Body>
            </ListItem>

            {
                customer.whatsapp !== 'none' ? (
                    <ListItem icon onPress={() => linkingWhatsApp('57' + customer.telephone)}>
                        <Left>
                            <Button style={{ backgroundColor: "#49c65c" }}>
                                <Icon active name="whatsapp" type='FontAwesome5' />
                            </Button>
                        </Left>
                        <Body>
                            <Text>{dic.sendMessage[iLang]}</Text>
                        </Body>
                    </ListItem>
                ) : (<></>)
            }
        </View>
    );
}

const styles = StyleSheet.create({

});

export default CustomerInfo;