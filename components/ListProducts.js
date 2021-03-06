import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Container, Text, Toast, Icon, ActionSheet, Button } from "native-base";
import { main as color } from "../data/colors";
import { newSale as dic } from "../data/languague";
import GlobalContext from "../context/global/globalContext";
import SaleContext from "../context/sale/saleContext";
import { useNavigation } from "@react-navigation/native";

/**
 * Las props que recibe son... 
 * edit: Permite editar los productos
 * total: Muestra el total de los productos
 * products: Si recibe un array de productos, ignora los productos del context, y muestra los recibidos
 */
const ListProducts = (props) => {
    const { iLang } = useContext(GlobalContext);
    const { products, parseMoney, deleteProduct, setSale } = useContext(SaleContext);
    const { edit, total, products: propProducts, getTotal: getTotalSale } = props || false;
    const [_message, setMessage] = useState(null);
    const [_total, setTotal] = useState(0);

    const [dataProducts, setDataProducts] = useState([]);
    // React Navigation
    const navigation = useNavigation();

    useEffect(() => {
        if (propProducts) {
            setDataProducts(propProducts);
        } else {
            setDataProducts(products);
        }
    }, [propProducts, products]);

    /**
     * Functions
     */

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

    // Muestra las acciones disponibles de un producto en carrito de compras
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
                    navigation.navigate('FormProduct', { editing: true, lastProduct: product, index })
                } else if (buttonIndex == 1) {
                    deleteProduct(product, index);
                }
            }

        );
    };

    // Retorna el subtotal de la compra
    const getTotal = () => {
        let total = 0;
        if (dataProducts) {
            dataProducts.forEach(product => {
                total = total + parseInt(product.price) * parseInt(product.quantity);
            });
        }
        // setTotal(total);
        if (getTotalSale) {
            getTotalSale(total)
        }
        return total;
    };



    return (
        <View style={{ marginTop: 0 }}>
            {
                dataProducts && dataProducts.length === 0 ? (
                    <View style={{ backgroundColor: color.main, marginTop: 30 }}>
                        <Text style={{ color: color.grad[0], paddingVertical: 10, alignSelf: 'center' }}>{dic.noProducts[iLang]} </Text>
                    </View>
                ) : (
                        <></>
                    )
            }

            {
                dataProducts && (
                    dataProducts.map((product, i) => (
                        <View key={product.product} style={styles.productContainer}>
                            <View style={styles.product}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flexBasis: '80%' }}>
                                        <Text style={styles.productName}>{product.product}</Text>
                                    </View>
                                    {
                                        edit && (
                                            <View style={{ flexBasis: '20%', alignItems: 'flex-end' }}>
                                                <Icon name='options-vertical' type='SimpleLineIcons'
                                                    onPress={() => productOption(product, i)}
                                                    style={{ fontSize: 18, marginTop: 5 }}
                                                />
                                            </View>
                                        )
                                    }
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
                                        <Text style={styles.productInfo}>{parseMoney(product.price)}</Text>
                                    </View>
                                    <View style={{ flexBasis: '33%' }}>
                                        <Text style={styles.productInfo}>{product.quantity}</Text>
                                    </View>
                                    <View style={{ flexBasis: '33%' }}>
                                        <Text style={styles.productInfo}>${parseMoney(product.price * product.quantity)}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    ))
                )
            }

            {
                total && (
                    <View style={{ marginTop: 30, marginBottom: 50, alignItems: 'flex-end', marginRight: 20 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: color.dark }}>Total: $ {parseMoney(getTotal())} </Text>
                    </View>
                )
            }



            {
                _message && showAlert()
            }
        </View>
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

export default ListProducts;