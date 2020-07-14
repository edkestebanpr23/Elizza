import React, { useContext, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Fab } from 'native-base';
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
  const [activeFab, setActiveFab] = useState(false);


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const selectCustomer = (text) => {
    console.log('Social', text);

    // setCustomer(JSON.parse(text));
    navigation.navigate('Customer', { customer: JSON.parse(text), iLang });
  };

  return (
    <Container style={{ flex: 1 }}>
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

      {/* <Content style={{ flex: 1 }}> */}

      <ListClients iLang={iLang} redirect={false} searchbar onSelectCustomer={selectCustomer} />


      {/* </Content> */}

      <View style={{ flex: 1 }}>
        <Fab
          active={activeFab}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: color.dark }}
          position="bottomRight"
          onPress={() => setActiveFab(!activeFab)}>
          <Icon name="plus" type='AntDesign' />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={() => navigation.navigate('createCustomer')} >
            <Icon name="user-plus" type="FontAwesome5" />
          </Button>
          {
            (user.rol === 'admin') && (
              <Button style={{ backgroundColor: '#3B5998' }} onPress={() => navigation.navigate('createUser')} >
                <Icon name="crown" type="FontAwesome5" />
              </Button>
            )
          }
        </Fab>
      </View>

    </Container>
  );
}

export default Social;