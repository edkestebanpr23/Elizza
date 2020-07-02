import React, { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableHighlight, Modal } from 'react-native';
import { Container, Text, Toast, Icon, Fab, ActionSheet } from "native-base";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { newSale as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";


// Apollo
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/petitions";

import ModalCategory from "../../components/ModalCategory";


const NewSale = ({ route }) => {
    const { iLang, user, products } = useContext(GlobalContext);

    const [_message, setMessage] = useState(null);

    // React Navigation
    const navigation = useNavigation();

    console.log('Productos:', products);

    /**
     * Functions
     */

    //  Cerrar teclado al oprimir la pantalla cuando el teclado esté abierto
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showAlert = () => {
        try {
            console.log("Mensaje Toast:", _message);
            Toast.show({
                text: _message,
                buttonText: 'Ok',
                duration: 4000,
                position: 'top'
            });
            setTimeout(() => {
                setMessage(null);
            }, 4000);
        } catch (error) {
            console.log(error)
        }
    };

    const productOption = (product, index) => {
        const buttons = [
            { text: dic.edit[iLang] },
            { text: dic.delete[iLang] },
            { text: dic.cancel[iLang] }
        ];
        const cancelIndex = 2;

        ActionSheet.show(
            {
                options: buttons,
                cancelButtonIndex: cancelIndex,
                title: dic.selectOpt[iLang] + ': ' + product.product
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    console.log('Editando...');
                } else if (buttonIndex == 1) {
                    console.log('Borrenda')
                }
            }

        );
    };

    return (
        <Container style={[gS.container]}>
            <ScrollView>

                <View style={{ marginTop: 0 }}>
                    {
                        products && products.length === 0 ? (
                            <View style={{ backgroundColor: color.main, marginTop: 30 }}>
                                <Text style={{ color: color.grad[0], paddingVertical: 10, alignSelf: 'center' }}>{dic.noProducts[iLang]} </Text>
                            </View>
                        ) : (
                                <></>
                            )
                    }

                    {
                        products && (
                            products.map((product, i) => (
                                <View key={product.product} style={styles.productContainer}>
                                    <View style={styles.product}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flexBasis: '80%' }}>
                                                <Text style={styles.productName}>{product.product}</Text>
                                            </View>
                                            <View style={{ flexBasis: '20%', alignItems: 'flex-end' }}>
                                                <Icon name='options-vertical' type='SimpleLineIcons'
                                                    onPress={() => productOption(product, i)}
                                                    style={{ fontSize: 18, marginTop: 5 }}
                                                />
                                            </View>
                                        </View>

                                        <Text style={styles.productCategory}>{product.category}</Text>

                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flexBasis: '33%' }}>
                                                <Text style={styles.titleInfo}>{dic.cost[iLang]}</Text>
                                            </View>
                                            <View style={{ flexBasis: '33%' }}>
                                                <Text style={styles.titleInfo}>{dic.quantity[iLang]}</Text>
                                            </View>
                                            <View style={{ flexBasis: '33%' }}>
                                                <Text style={styles.titleInfo}>{dic.total[iLang]}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flexBasis: '33%' }}>
                                                <Text style={styles.productInfo}>{product.cost}</Text>
                                            </View>
                                            <View style={{ flexBasis: '33%' }}>
                                                <Text style={styles.productInfo}>{product.quantity}</Text>
                                            </View>
                                            <View style={{ flexBasis: '33%' }}>
                                                <Text style={styles.productInfo}>${product.cost * product.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            ))
                        )
                    }

                    {
                        _message && showAlert()
                    }
                </View>
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
    productContainer: {
        marginHorizontal: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: color.grad[1]
    },
    product: {
        paddingHorizontal: 10
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productCategory: {
        color: color.grad[3]
    },
    titleInfo: {
        color: color.grad[5],
        alignSelf: 'center'
    },
    productInfo: {
        color: color.grad[9],
        alignSelf: 'center'
    }
});

export default NewSale;