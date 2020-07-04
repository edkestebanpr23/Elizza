import React, { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Container, Form, Input, Button, Item, Label, Text, H1, Toast, ActionSheet, Right, Grid } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { loginView as dic } from "../../data/languague";
import { useNavigation } from "@react-navigation/native";
import Storage from "../../database/storage";
import GlobalContext from "../../context/global/globalContext";
// import * as firebase from 'firebase';


// Apollo
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/petitions";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_message, setMessage] = useState(null);
    const [clickedLang, setClickedLang] = useState({});

    // Global Context
    const { startSession, iLang, setILang } = useContext(GlobalContext);

    // React Navigation
    const navigation = useNavigation();

    // Apollo Mutation
    const [loginWorker] = useMutation(LOGIN);

    /**
     * Functions
     */

    //  Cerrar teclado al oprimir la pantalla cuando el teclado esté abierto
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showAlert = () => {
        Toast.show({
            text: _message,
            buttonText: 'Ok',
            duration: 4000,
            position: 'top'
        });
        setTimeout(() => {
            setMessage(null);
        }, 4000);
    };

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

    // Iniciar Sesión
    const logInSesion = async () => {
        if (email == '' || password == '') {
            setMessage('Todos los valores son obligatorios');
            return;
        }

        try {
            const { data } = await loginWorker({
                variables: {
                    input: {
                        document: email,
                        password: password
                    }
                }
            });

            await Storage.setToken(data.loginWorker.token);
            const token = await Storage.getToken();
            console.log(data);
            // const { token, ...data } = 
            // setUser(data.loginWorker);
            startSession(data.loginWorker);
        } catch (error) {
            // setMessage(null);
            console.log(error.message);
            if (error.message == 'GraphQL error: wrongData') {
                setMessage(dic.wrongData[iLang]);
            } else {
                setMessage(dic.error[iLang]);
            }
        }

    }

    // const logInSesionFirebase = () => {
    //     firebase.auth().signInWithEmailAndPassword(email, password).then(algo => console.log(algo)).catch(error => console.log(error.message));
    // };

    return (
        <ScrollView style={{ backgroundColor: color.grad[5] }}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <Container style={gS.containerColor}>
                    <View style={gS.centerVerticalView}>
                        <View>
                            <Grid>
                                <Right>
                                    <Button iconRight transparent onPress={changeLanguage} style={{ marginRight: 10 }} >
                                        <Icon name='language' type='entypo' size={30} color={color.grad[1]} />
                                    </Button>
                                </Right>
                            </Grid>
                        </View>
                        <View style={styles.formView}>
                            <View style={{}}>
                                <H1 style={[gS.title, { color: '#FFDC73', fontSize: 40, marginBottom: 0, textTransform: 'uppercase', paddingTop: 30 }]}>Elizza</H1>
                                <H1 style={[gS.title, { color: '#FFDC73', fontSize: 18, marginBottom: 0, marginTop: 0, textTransform: 'uppercase' }]}>Boutique</H1>
                            </View>

                            <Form>
                                <Item floatingLabel bordered underline={false} style={styles.itemForm} >
                                    <Label style={styles.label}>{dic.document[iLang]}</Label>
                                    <Input
                                        style={styles.input}
                                        keyboardType='numeric'
                                        onChangeText={text => setEmail(text.toLocaleLowerCase())}
                                        value={email}
                                    />
                                </Item>
                                <Item floatingLabel style={styles.itemForm}>
                                    <Label style={styles.label}>{dic.password[iLang]}</Label>
                                    <Input
                                        style={styles.input}
                                        secureTextEntry={true}
                                        onChangeText={text => setPassword(text)}
                                    />
                                </Item>
                            </Form>

                            <Button rounded block style={gS.button} onPress={() => logInSesion()}>
                                <Text style={gS.textButton}>{dic.login[iLang]}</Text>
                            </Button>

                            {/* <View style={{ marginTop: 40, alignItems: "center" }}>
                                <Text style={styles.text}> {dic.registerText[iLang]}</Text>
                                <Text onPress={() => navigation.navigate('SingUp', { iLang })} style={[styles.text, styles.textHere]}> {dic.here[iLang]} </Text>
                            </View> */}
                        </View>
                        {
                            _message && showAlert()
                        }
                    </View>
                </Container>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formView: {
        // backgroundColor: color.grad[4],
        paddingVertical: 30,
        borderRadius: 10
    },
    itemForm: {
        // paddingHorizontal: '1%',
        textAlign: 'center',
        alignSelf: 'center',
        borderColor: color.grad[0],
    },
    input: {
        color: color.grad[2],
        marginVertical: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        color: color.grad[0]
    },
    text: {
        color: color.grad[1],
        fontSize: 18
    },
    textHere: {
        fontWeight: 'bold',
    }
});

export default Login;