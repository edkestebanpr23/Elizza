import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';
import { Text, Icon, Header, Item, Input } from 'native-base';
import { salesView as dic } from "../data/languague";
// import SaleContext from "../context/sale/saleContext";
// import GlobalContext from "../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../data/colors";

import { useQuery } from "@apollo/client";
import { GET_SALES, GET_CUSTOMERS } from "../graphql/petitions";

const ListSales = ({ iLang, searchbar = true }) => {
    const navigation = useNavigation();
    const { data, loading, error } = useQuery(GET_SALES);
    const { data: dataCustomers } = useQuery(GET_CUSTOMERS);
    const [textFilter, setTextFilter] = useState('');

    console.log("ListSales here:", data);
    console.log("Loading sales:", loading);

    // Recibe un id de cliente y retorna un cliente
    const getConstumerById = id => {
        if (dataCustomers) {
            let cli = dataCustomers.getClients.find(client => client.id === id);
            // console.log(cli);
            return cli;
        }
    };

    const filter = text => {
        setTextFilter(text);
    }

    const clearInput = text => {
        setTextFilter('');
        dismissKeyboard();
        filter('');
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <>
            {
                searchbar && (
                    <Header searchBar rounded style={{ backgroundColor: color.grad[9], }}>
                        <Item style={{ backgroundColor: color.light }} >
                            <Icon name="ios-search" onPress={() => console.log(1)} style={{ color: color.dark }} />
                            <Input placeholder={dic.searchBar[iLang]} onChangeText={text => filter(text)} value={textFilter} />
                            <Icon name="ios-close-circle" onPress={() => clearInput()} style={{ color: color.dark }} />
                        </Item>
                    </Header>

                )
            }
            {
                data && (
                    <FlatList
                        data={data.getSales}
                        renderItem={({ item }) => {
                            const customer = getConstumerById(item.client);
                            if (textFilter != '') {
                                // console.log('Nombre:' + customer.name + ' --- Filtro:' + textFilter);
                                if (customer.name.toLowerCase().match(textFilter.toLowerCase())) {
                                    // console.log('Muestra a ' + customer.name, customer.name.toLowerCase().match(textFilter));
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('Customer', { iLang, customer, sale: item })} activeOpacity={0.8}>
                                            <SaleCpm sale={item} cli={customer} key={item.id} />
                                        </TouchableOpacity>
                                    )
                                } else {
                                    // console.log('No retorna a ' + customer.name, customer.name.toLowerCase().match(textFilter));
                                    return <></>;
                                }
                            }

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
        </>
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