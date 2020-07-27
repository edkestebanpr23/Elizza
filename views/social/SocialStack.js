import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { main as color } from "../../data/colors";
import { socialStack as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";

import Social from "./Social";
import CreateUser from "./CreateUser";
import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";

const Stack = createStackNavigator();

const SocialStack = () => {

    // Global Context
    const { iLang, user, killSession } = useContext(GlobalContext);
    console.log('user', user);
    if (!user) {
        console.log('Error en inicio de sesion: user', user);
        killSession();
    }

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Social"
                component={Social}

                options={{
                    headerShown: true,
                    title: (user.rol === 'admin') ? dic.titleAdmin[iLang] : dic.titleWorker[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    },
                    // headerRight: () => <Text style={{ color: color.light, marginRight: 15 }}>Buscar</Text>
                    // headerBackTitle: dic.title[iLang],
                    // headerBackTitleVisible: true,
                    // headerTransparent: false
                }}
            >

            </Stack.Screen>


            <Stack.Screen
                name="createUser"
                component={CreateUser}

                options={{
                    headerShown: true,
                    title: dic.createUser[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    }
                }}
            >

            </Stack.Screen>


            <Stack.Screen
                name="createCustomer"
                component={CreateCustomer}

                options={{
                    headerShown: true,
                    title: dic.createClient[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    }
                }}
            >

            </Stack.Screen>


            <Stack.Screen
                name="Customer"
                component={Customer}

                options={{
                    headerShown: true,
                    headerBackTitle: dic.back[iLang],
                    title: dic.customer[iLang],
                    headerTintColor: color.grad[0],
                    headerStyle: {
                        backgroundColor: color.grad[9],
                    },
                    // headerRight: () => <Text style={{ color: color.light, marginRight: 15 }}>Buscar</Text>
                }}
            >

            </Stack.Screen>

        </Stack.Navigator>
    );
}

export default SocialStack;