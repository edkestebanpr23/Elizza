import React, { useContext } from 'react';
import { Container, Content, Button, Text, ActionSheet, Left, Right, Body, ListItem, Icon } from "native-base";
import { settingsView as dic } from "../../data/languague";
import { main as color } from "../../data/colors";
import GlobalContext from "../../context/global/globalContext";


console.disableYellowBox = true;
const Settings = () => {
    const { iLang, setILang, killSession } = useContext(GlobalContext);

    // Cambiar de idioma
    const changeLanguage = () => {
        const buttons = [
            { text: 'Español' },
            { text: 'English' },
            { text: dic.cancel[iLang] }
        ];
        const cancelIndex = 2;

        ActionSheet.show(
            {
                options: buttons,
                cancelButtonIndex: cancelIndex,
                title: dic.selectLang[iLang]
            },
            (buttonIndex) => {
                if (buttonIndex == 0 || buttonIndex == 1) {
                    setILang(buttonIndex);
                }
            }

        );
    };
    return (
        <Container>
            <Content>
                <ListItem icon onPress={changeLanguage}>
                    <Left>
                        <Button style={{ backgroundColor: color.dark }}>
                            <Icon active name="md-globe" type='Ionicons' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{dic.language[iLang]}</Text>
                    </Body>
                </ListItem>

                <ListItem icon onPress={killSession}>
                    <Body style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>{dic.closeSession[iLang]}</Text>
                    </Body>
                </ListItem>

            </Content>
        </Container>
    );
}

export default Settings;