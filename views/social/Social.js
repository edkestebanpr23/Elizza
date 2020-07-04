import React, { useContext, useState } from 'react';
import { Keyboard } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Header as SearchBar, Item, Input, Textarea } from 'native-base';
import { socialView as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../../data/colors";
import ListClients from "../../components/ListClients";


const Social = () => {
  const [isSearch, SetIsSearch] = useState(false);
  const { iLang, user } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [customer, setCustomer] = useState(null);


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSelectCustomer = (text) => {
    setCustomer(JSON.parse(text));
  };

  return (
    <Container>
      {/* <SearchBar searchBar rounded style={{ backgroundColor: color.grad[9], }}>
        <Item style={{ backgroundColor: color.light }} >
          <Icon name="ios-search" onPress={() => console.log(1)} style={{ color: color.dark }} />
          <Input placeholder={dic.searchCli[iLang]} />
          <Icon name="ios-close-circle" onPress={() => dismissKeyboard()} style={{ color: color.dark }} />
        </Item>
      </SearchBar> */}
        {/* <Button transparent>
          <Text style={{color: color.light}}>Search</Text>
        </Button> */}

      <Content>
        <ListItem itemDivider>
          <Text>{dic.functions[iLang]}</Text>
        </ListItem>

        {
          (user.rol === 'admin') && (
            <ListItem icon onPress={() => navigation.navigate('createUser')}>
              <Left style={{ paddingHorizontal: 10 }}>
                <Icon active name="user-tie" type="FontAwesome5" style={{ color: color.dark }} />
              </Left>
              <Body>
                <Text>{dic.addWorker[iLang]}</Text>
              </Body>
            </ListItem>
          )
        }


        <ListItem icon onPress={() => navigation.navigate('createCustomer')}>
          <Left style={{ paddingHorizontal: 10 }}>
            <Icon active name="user-plus" type="FontAwesome5" style={{ color: color.dark }} />
          </Left>
          <Body>
            <Text>{dic.addCustomer[iLang]}</Text>
          </Body>
        </ListItem>

        <ListClients iLang={iLang} searchbar redirect />


      </Content>
    </Container>
  );
}

export default Social;