import React from 'react';
import { View, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { Container, Content, Text, Image, Icon, Button } from "native-base";
import { main as color } from "../../data/colors";
import { customerView as dic } from "../../data/languague";


const Customer = ({ route }) => {
    console.log(route.params.customer);
    const { customer, iLang } = route.params;
    const customerIcon = customer.sex === 'male' ? 'user' : 'user-female';

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

    const linkingWhatsApp = phone => {
        console.log('Telefono:', phone);
        Linking.openURL(`whatsapp://send?text=Prueba&phone=${phone}`).then((data) => {
            console.log('WhatsApp Opened', data);
        }).catch(() => {
            alert('Make sure WhatsApp installed on your device');
        });;
    };
    // Dina: 311 737 5679


    return (
        <Container>
            <Content>
                <View>
                    <View style={styles.photoContainer}>
                        <View style={styles.photoView}>
                            <Icon name='photo' type='FontAwesome' style={{ fontSize: 80, color: color.grad[3] }} />
                        </View>
                        <View style={styles.descView}>
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.textInfo}>
                                        <Icon name={customerIcon} type='SimpleLineIcons' style={{ color: color.grad[9] }} />
                                        <Text style={styles.textInfoRes}> {customer.name} </Text>
                                    </Text>
                                </View>
                                {/* <Text style={styles.textInfoRes}>Bogotá, Cundinamarca</Text> */}
                                <Text style={styles.textInfo} onPress={() => linkingTel(customer.telephone)}>{dic.telephone[iLang]}:
                                    <Text style={styles.textInfoRes}> {customer.telephone}</Text>
                                </Text>
                                {
                                    customer.telephone2 !== '' ? (
                                        <Text style={styles.textInfo} onPress={() => linkingTel(customer.telephone2)}>{dic.telephone[iLang]} 2:
                                            <Text style={styles.textInfoRes}> {customer.telephone2}</Text>
                                        </Text>
                                    ) : (<></>)
                                }
                            </View>
                        </View>
                    </View>
                    <Button onPress={() => linkingWhatsApp('57' + customer.telephone)}>
                        <Text>WhatsApp</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    photoContainer: {
        flexDirection: 'row'
    },
    photoView: {
        flexBasis: '40%', // Así toma solo la mitad de la pantalla
        alignItems: 'center',
        justifyContent: 'center'
        // flexWrap: 'wrap'
    },
    descView: {
        flexBasis: '60%'
    },
    photo: {
        width: '100%',
        height: 200
    },
    description: {
        marginHorizontal: 5,
        marginTop: 5,
    },
    textDescription: {
        fontSize: 16
    },
    info: {
        paddingVertical: 5,
        marginHorizontal: 5
    },
    infoItem: {
        marginBottom: 10
    },
    textInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textInfoRes: {
        fontWeight: 'normal',
        marginBottom: 5
    }
});

export default Customer;