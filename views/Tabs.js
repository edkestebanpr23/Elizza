import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Root } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import GlobalContext from "../context/global/globalContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../data/colors";
import { tabs as dic } from "../data/languague";

// Stack Main Views
import Home from "./home/Home";
import HomeStack from "./home/HomeStack";
import SocialStack from "./social/SocialStack";
import ProfileStack from "./profile/ProfileStack";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const { iLang } = useContext(GlobalContext);

    return (
        <Root>
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{
                        activeBackgroundColor: colors.main.grad[9],
                        inactiveBackgroundColor: colors.main.grad[5],
                        activeTintColor: colors.main.grad[0],
                        inactiveTintColor: colors.main.grad[1],
                        style: styles.tabBar,
                        tabStyle: { borderTopStartRadius: 15, borderTopEndRadius: 15, marginHorizontal: 1 },
                        // style={ margin: 3, },

                    }}
                >

                    <Tab.Screen
                        name='Home'
                        component={HomeStack}
                        options={{
                            tabBarIcon: () => <Icon name="shopping-cart" color={colors.main.grad[1]} size={24} />,
                            title: dic.sales[iLang]
                        }}

                    />

                    <Tab.Screen
                        name='Social'
                        component={SocialStack}
                        options={{
                            tabBarIcon: () => <Icon name="users" color={colors.main.grad[1]} size={24} />,
                            title: dic.people[iLang]
                        }}
                    />

                    {/* <Tab.Screen
                        name='Profile'
                        component={ProfileStack}
                        options={{
                            tabBarIcon: () => <Icon name="person" color={colors.main.grad[1]} size={24} />,
                            title: dic.people[iLang]
                        }}
                    /> */}

                    <Tab.Screen
                        name='Settings'
                        component={Settings}
                        options={{
                            tabBarIcon: () => <Icon name="cogs" color={colors.main.grad[1]} size={24} />,
                            title: dic.settings[iLang]
                        }}
                    />

                </Tab.Navigator>
            </NavigationContainer>
        </Root>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        borderRadius: 30,
        marginHorizontal: 4,
        backgroundColor: 'rgba( 255, 255, 255, 0)'
    }
});

export default Tabs;