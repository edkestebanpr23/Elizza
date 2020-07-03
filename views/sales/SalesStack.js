import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { main as color } from "../../data/colors";
import { salesStack as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";

import Sales from "./Sales";
import NewSale from "./NewSale";
import FormProduct from "./FormProduct";

const Stack = createStackNavigator();

const SalesStack = () => {

    // Global Context
    const { iLang, user } = useContext(GlobalContext);

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
                    },
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