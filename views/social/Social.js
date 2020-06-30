import React, { useContext } from 'react';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { socialView as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";
import { main as color } from "../../data/colors";
import ListClients from "../../components/ListClients";


const Social = () => {
    const { iLang, user } = useContext(GlobalContext);
    const navigation = useNavigation();

    return (
        <Container>
        <Content>

            {
                (user.rol === 'admin') && (
                <ListItem icon onPress={() => navigation.navigate('createUser')}>
                    <Left style={{paddingHorizontal: 10}}>
                        <Icon active name="user-tie" type="FontAwesome5" style={{color: color.dark }} />
                    </Left>
                    <Body>
                    <Text>{dic.addWorker[iLang]}</Text>
                    </Body>
                </ListItem>
                )
            }
          

          <ListItem icon onPress={() => navigation.navigate('createCustomer')}>
            <Left style={{ paddingHorizontal: 10 }}>
                <Icon active name="user-plus" type="FontAwesome5" style={{color: color.dark }} />
            </Left>
            <Body>
              <Text>{dic.addCustomer[iLang]}</Text>
            </Body>
          </ListItem>

            <ListClients />


        </Content>
      </Container>
    );
}

export default Social;