import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import { salesView as dic } from "../data/languague";
// import SaleContext from "../context/sale/saleContext";
// import GlobalContext from "../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../data/colors";

import { useQuery, gql } from "@apollo/client";
import { GET_SALES, GET_CUSTOMERS } from "../graphql/petitions";

const ListSales = ({ iLang }) => {
    const navigation = useNavigation();
    const { data, loading, error } = useQuery(GET_SALES);
    const { data: dataCustomers } = useQuery(GET_CUSTOMERS);


    // Recibe un id de cliente y retorna un cliente
    const getConstumerById = id => {
        if (dataCustomers) {
            let cli = dataCustomers.getClients.find(client => client.id === id);
            // console.log(cli);
            return cli;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: 100 }}>
            {
                data && (
                    <FlatList
                        data={data.getSales}
                        renderItem={({ item }) => {
                            const customer = getConstumerById(item.client);
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Customer', { iLang, customer, sale: item })} activeOpacity={0.8}>
                                    <SaleCpm sale={item} cli={customer} key={item.id} />
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                )
            }
        </SafeAreaView>
    );
};

const today = new Date();

const getIconState = (state) => {
    return (
        <Icon name='checkcircle' type='AntDesign' style={styles[state]} />
    );
};

const getTotal = (payments, products) => {
    let payment = 0;
    let total = 0;

    payments.forEach(e => {
        payment += e.quantity;
    });

    products.forEach(e => {
        total += e.price * e.quantity;
    });
    return total - payment;
};

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

const SaleCpm = ({ sale, cli }) => {
    let onTime = true;
    let state = '';
    let expiredDays = 0;

    const date = new Date(parseInt(sale.register));
    const _date = new Date(parseInt(sale.register));
    const endDate = new Date(_date.setMonth(_date.getMonth() + 1));
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    if (today > endDate && !sale.finalized) {
        // Factura vencida
        state = 'stateExpired';
        onTime = false;
        // Calcular días de diferencia
        let aux = today.getTime() - endDate.getTime();
        expiredDays = Math.round(aux / (1000 * 60 * 60 * 24));
    } else if (sale.credit == true) {
        state = 'stateOnTime';
        let aux = endDate.getTime() - today.getTime();
        expiredDays = Math.round(aux / (1000 * 60 * 60 * 24));
    } else {
        state = 'stateFinalized';
    }

    return (
        <View style={styles.saleContainer} key={sale.id}>
            <Text>
                {
                    getIconState(state)
                }
                <Text style={styles.client}>{'   ' + cli.name} </Text>
            </Text>

            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexBasis: '33%' }}>
                        <Text style={styles.titleInfo}>Fecha de compra</Text>
                    </View>
                    {
                        !sale.finalized && (
                            <>
                                <View style={{ flexBasis: '33%' }}>
                                    <Text style={styles.titleInfo}>Vence</Text>
                                </View>
                                <View style={{ flexBasis: '33%' }}>
                                    <Text style={[styles.titleInfo, styles.textColor(state)]}>{state === 'stateOnTime' ? 'Días' : 'Días vencidos'}</Text>
                                </View>
                            </>
                        )
                    }
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexBasis: '33%' }}>
                        <Text style={styles.saleInfo}>{date.getDate() + ' / ' + months[date.getMonth()] + ' / ' + date.getFullYear()}</Text>
                    </View>
                    {
                        !sale.finalized && (
                            <>
                                <View style={{ flexBasis: '33%' }}>
                                    <Text style={styles.saleInfo}>{endDate.getDate() + ' / ' + months[endDate.getMonth()] + ' / ' + endDate.getFullYear()}</Text>
                                </View>
                                <View style={{ flexBasis: '33%' }}>
                                    <Text style={[styles.saleInfo, styles.textColor(state)]}>{expiredDays}</Text>
                                </View>
                            </>
                        )
                    }
                </View>
            </View>

            <View>
                {
                    !sale.finalized && (
                        <>
                            {/* <Text style={{ }}>Saldo: { getTotal(sale.payments, sale.products) } </Text> */}
                            <DataSale title='Saldo' value={'$ ' + getTotal(sale.payments, sale.products)} />
                        </>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    saleContainer: {
        marginHorizontal: 10,
        marginTop: 20,
        borderWidth: 2,
        borderColor: color.grad[1],
        paddingVertical: 5
    },
    sale: {
        paddingHorizontal: 10
    },
    saleName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    saleCategory: {
        color: color.grad[3]
    },
    titleInfo: {
        color: color.grad[5],
        alignSelf: 'center',
        fontSize: 14
    },
    textColor: (state) => ({
        color: state === 'stateOnTime' ? '#CA6F1E' : '#A93226'
    }),
    saleInfo: {
        color: color.grad[9],
        alignSelf: 'center'
    },
    stateFinalized: {
        color: '#229954',
        fontSize: 18
    },
    stateOnTime: {
        color: '#CA6F1E',
        fontSize: 18
    },
    stateExpired: {
        color: '#A93226',
        fontSize: 18
    },
    client: {
        fontSize: 18,

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

export default ListSales;