import React, { useContext } from 'react';
import { View, Alert } from 'react-native';
import { Text, Icon } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { main as color } from "../../data/colors";
import { salesStack as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import SaleContext from "../../context/sale/saleContext";

import Sales from "./Sales";
import NewSale from "./NewSale";
import FormProduct from "./FormProduct";

const Stack = createStackNavigator();

const SalesStack = () => {

    // Global Context
    const { iLang, user } = useContext(GlobalContext);
    const { products, emptyCart } = useContext(SaleContext);

    const emptyCartConfirm = () => {
        Alert.alert(
            dic.emptyCart[iLang],
            dic.message[iLang],
            [
                {
                    text: dic.cancel[iLang],
                    onPress: () => console.log('Vaciado cancelado'),
                    style: 'cancel'
                },
                {
                    text: dic.ok[iLang],
                    onPress: () => emptyCart()
                }
            ]
        )
    }

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Sales"
                component={Sales}
                options={{
                    headerShown: true,
                    title: dic.sales[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    }
                }}
            >
            </Stack.Screen>

            <Stack.Screen
                name="NewSale"
                component={NewSale}
                options={{
                    headerShown: true,
                    title: dic.newSale[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    },
                    headerBackTitle: dic.back[iLang],
                    headerRight: () => {
                        if (products.length > 0) {
                            return <Icon name='cart-remove' type='MaterialCommunityIcons' style={{ color: color.light, marginRight: 10 }} onPress={emptyCartConfirm} />;
                        } else {
                            return;
                        }
                    }
                }}
            >
            </Stack.Screen>

            <Stack.Screen
                name="FormProduct"
                component={FormProduct}
                options={{
                    headerShown: true,
                    title: dic.newProduct[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    },
                    headerBackTitle: dic.back[iLang],
                }}
            >
            </Stack.Screen>

        </Stack.Navigator>
    );
}

export default SalesStack;