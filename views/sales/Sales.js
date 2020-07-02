import React, { useContext, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Header as SearchBar, Item, Input, Fab } from 'native-base';
import { salesView as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../../data/colors";
import ListClients from "../../components/ListClients";


const Sales = () => {
    const [isSearch, SetIsSearch] = useState(false);
    const { iLang, user } = useContext(GlobalContext);
    const navigation = useNavigation();

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <Container>
            <SearchBar searchBar rounded style={{ backgroundColor: color.grad[9], }}>
                <Item style={{ backgroundColor: color.light }} >
                    <Icon name="ios-search" onPress={() => console.log(1)} style={{ color: color.dark }} />
                    <Input placeholder={dic.search[iLang]} />
                    <Icon name="ios-close-circle" onPress={() => dismissKeyboard()} style={{ color: color.dark }} />
                </Item>
            </SearchBar>

            <Content>


            </Content>

            <View style={{ flex: 1 }}>
                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: color.dark }}
                    position="bottomRight"
                    onPress={() => navigation.navigate('NewSale')}>
                    <Icon name="add-shopping-cart" type="MaterialIcons" />
                </Fab>
            </View>

        </Container>
    );
}

export default Sales;