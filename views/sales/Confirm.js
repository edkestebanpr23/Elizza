import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Text, Toast, Icon, Fab, ActionSheet, Button } from "native-base";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { confirm as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import SaleContext from "../../context/sale/saleContext";
import { useNavigation } from "@react-navigation/native";
import ListProducts from "../../components/ListProducts";

import { useMutation } from "@apollo/client";
import { CREATE_SALE } from "../../graphql/petitions";

/**
 * Vista de lista de productos, aqui se agregan, se ve el total y se confirman los productos
 */

const DataSale = ({ title, value }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexBasis: '40%' }}>
                <Text style={styles.textDic}>{title}</Text>
            </View>
            <View style={{ flexBasis: '60%' }}>
                <Text style={styles.textRes}>{value}</Text>
            </View>
        </View>
    )
}

const DataSaleTotal = ({ title, value }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexBasis: '40%' }}>
                <Text style={[styles.textDic, { fontSize: 20, fontWeight: 'bold' }]}>{title}</Text>
            </View>
            <View style={{ flexBasis: '60%' }}>
                <Text style={[styles.textRes, { fontSize: 20, fontWeight: 'bold' }]}>{value}</Text>
            </View>
        </View>
    )
}

const Confirm = () => {
    const { iLang, user } = useContext(GlobalContext);
    const { products, sale, parseMoney } = useContext(SaleContext);
    const [date, setDate] = useState(new Date());
    console.log('Confirm View');
    // console.log(user);
    // React Navigation
    const navigation = useNavigation();
    // Apollo petition
    const [createSale] = useMutation(CREATE_SALE);


    useEffect(() => {
        setDate(new Date(sale.register));
    }, []);

    // Retorna el subtotal de la compra
    const getTotal = () => {
        let total = 0;
        if (products) {
            products.forEach(product => {
                total = total + parseInt(product.price) * parseInt(product.quantity);
            });
        }
        // updateSale({ total });
        return total;
    };

    // Retorna el total a pagar, teniendo en cuenta si hay abonos
    const getTotalFinal = () => {
        if (sale.credit) {
            return getTotal() - parseInt(sale.payment[0]['payment']);
        } else {
            return getTotal();
        }
    };

    const finalizePurchase = async () => {
        try {
            const paymentVars = sale.credit ? [
                {
                    quantity: sale.payment[0]['payment'],
                    date: new Date()
                }
            ] : [];
            const serverVars = {
                "input": {
                    "client": sale.customer,
                    "total": getTotalFinal(),
                    "register": sale.register,
                    "credit": sale.credit,
                    "finalized": sale.credit ? false : true,
                    "cellar": sale.cellar || null,
                    "description": sale.description
                },
                "products": products,
                "payments": paymentVars
            };
            console.log(serverVars);
            const { data } = await createSale({
                variables: {
                    ...serverVars
                }
            });

            // Mostrar mensaje de éxito sebas bebesssss
            if (data.createSale) {
                // Redireccionar y reiniciar variables globales (En la pagina redireccionada)
                navigation.navigate('Sales', { restart: true });
            }

            // Redireccionar a inicio de Sesion
            // navigation.goBack();

        } catch (error) {
            // alert(null);
            console.log('Error::', error);

        }
    };

    return (
        <Container style={[gS.container]}>
            <ScrollView>
                <View style={{ marginTop: 20, marginHorizontal: 10 }}>

                    <Text style={styles.textLabel}>Detalles de pedido:</Text>

                    <DataSale title={dic.customer[iLang]} value={sale.temp.name} />
                    <DataSale title={dic.date[iLang]} value={`${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`} />
                    <DataSale title={dic.credit[iLang]} value={sale.credit ? dic.yes[iLang] : dic.no[iLang]} />


                </View>

                <Text style={styles.subTitle}>Productos:</Text>
                <ListProducts edit />

                {
                    sale.credit ? (
                        <View style={{ marginTop: 30 }}>
                            <DataSale title={dic.total[iLang]} value={'$ ' + parseMoney(getTotal())} />
                            <DataSale title={dic.creditInit[iLang]} value={'- $ ' + parseMoney(sale.payment[0]['payment'])} />
                            <View style={{ paddingVertical: 1, backgroundColor: color.main, marginLeft: 60, marginVertical: 5 }} />
                            <DataSaleTotal title={dic.saldo[iLang]} value={'$ ' + parseMoney(getTotalFinal()) } />
                        </View>
                    ) : (
                            <View style={{ marginTop: 30 }}>
                                <DataSale title={dic.total[iLang]} value={'$ ' + parseMoney(getTotal())} />
                                <DataSale title={dic.payment[iLang]} value={'- $ ' + parseMoney(getTotal())} />
                                <View style={{ paddingVertical: 1, backgroundColor: color.main, marginLeft: 60, marginVertical: 5 }} />
                                <DataSaleTotal title={dic.saldo[iLang]} value={'$ ' + '0'} />
                            </View>
                        )
                }


                <View style={{ marginHorizontal: 30, marginTop: 20, marginBottom: 100 }}>
                    <Button style={{ marginTop: 30, backgroundColor: color.dark, justifyContent: 'center' }} rounded onPress={finalizePurchase}>
                        <Text style={{ color: color.light, fontWeight: 'bold' }}>{dic.finalize[iLang]}</Text>
                    </Button>
                </View>

            </ScrollView>

        </Container>
    );
};

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 20,
        marginBottom: 15
    },
    subTitle: {
        fontSize: 20,
        marginTop: 20
    },
    textDic: {
        alignSelf: 'flex-end',
        color: color.main,
        fontSize: 18
    },
    textRes: {
        alignSelf: 'flex-end',
        color: color.dark,
        fontSize: 18,
        marginRight: 10
    }
});

export default Confirm;