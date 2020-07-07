import React, { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Container, Form, Input, Button, Item, Label, Text, H1, Toast, ListItem, Left, Icon, Body, Right, Switch } from "native-base";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { singupView as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";

 
// Apollo
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/petitions";

// import UploadImage from "../../components/UploadImage";


const createWorker = ({ route }) => {
    const { iLang, user } = useContext(GlobalContext);

    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [telephone, setTelephone] = useState('');
    const [rol, setRol] = useState(false);
    const [_message, setMessage] = useState(null);
    const [urlImage, setUrlImage] = useState(null);

    // React Navigation
    const navigation = useNavigation();
    // Firebase Context
    // const { firebase } = useContext(FirebaseContext);

    // Apollo Mutation
    const [createWorker] = useMutation(CREATE_USER);

    // const { iLang } = route.params;

    /**
     * Functions
     */

    //  Cerrar teclado al oprimir la pantalla cuando el teclado esté abierto
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showAlert = () => {
        try {
            console.log("Mensaje Toast:", _message);
            Toast.show({
                text: _message,
                buttonText: 'Ok',
                duration: 4000,
                position: 'top'
            });
            setTimeout(() => {
                setMessage(null);
            }, 4000);
        } catch (error) {
            console.log(error)
        }
    };

    // Función para registrar un usuario
    const singUp = async () => {
        // console.log(name + " ___ " + document + " ___ " + password + " ___ " + passwordRe + " ___ " + selectedCountry)
        // Validar datos del formulario
        if (name === '' || document === '' || password === '' || passwordRe === '' || telephone === '') {
            console.log("Todos los datos son obligatorios");
            return;
        }

        if (passwordRe !== password) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        // Almacenar en servidor
        try {
            const { data } = await createWorker({
                variables: {
                    input: {
                        name: name,
                        document: document,
                        password: password,
                        telephone: telephone,
                        rol: rol ? 'admin' : 'worker'
                    }
                }
            });

            // Mostrar mensaje de éxito sebas bebesssss
            if (data.createWorker) {
                setMessage(dic.createWorker[iLang]);
            }

            // Redireccionar a inicio de Sesion
            navigation.goBack();

        } catch (error) {
            // setMessage(null);
            console.log('Error::', error);
            if (error.message == 'GraphQL error: exist') {
                setMessage(dic.errorExist[iLang]);
            } else {
                setMessage(dic.error[iLang]);
            }
        }


    };


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1 }}>
            <Container style={[gS.container, { marginBottom: 50}]}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginTop: 40 }}>
                        <H1 style={[gS.title, { color: color.grad[8] }]}>{dic.title[iLang]} </H1>

                        <Form>
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.name[iLang]}</Label>
                                <Input
                                    placeholder={dic.document[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={[styles.input, { textTransform: 'capitalize' }]}
                                    onChangeText={text => setName(text.replace(/(^\w|\s\w)/g, m => m.toUpperCase()))}
                                    value={name}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.document[iLang]}</Label>
                                <Input
                                    placeholder={dic.document[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    keyboardType='numeric'
                                    onChangeText={text => setDocument(text.toLocaleLowerCase())}
                                    value={document}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.telephone[iLang]}</Label>
                                <Input
                                    placeholder={dic.telephone[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    keyboardType='numeric'
                                    secureTextEntry={false}
                                    onChangeText={text => setTelephone(text.toLocaleLowerCase())}
                                    value={telephone}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm}>
                                <Label style={styles.label}>{dic.password[iLang]}</Label>
                                <Input
                                    placeholder={dic.password[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={text => setPassword(text)}
                                    value={password}
                                />
                            </Item>
                            <Item floatingLabel underline={false} style={styles.itemForm}>
                                <Label style={styles.label}>{dic.passwordAgain[iLang]}</Label>
                                <Input
                                    placeholder={dic.password[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={text => setPasswordRe(text)}
                                    value={passwordRe}
                                />
                            </Item>
                            <ListItem icon style={{marginVertical: 20}}>
                                <Left>
                                    <Button style={{ backgroundColor: color.grad[8] }}>
                                        <Icon active name="laptop-code" type="FontAwesome5" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>{dic.admin[iLang]}</Text>
                                </Body>
                                <Right>
                                    <Switch value={rol} onValueChange={() => setRol(!rol)} />
                                </Right>
                            </ListItem>






                        </Form>

                        <Button rounded block style={[gS.button, { marginBottom: 60 }]} onPress={singUp}>
                            <Text style={gS.textButton}>{dic.createUserBtn[iLang]}</Text>
                        </Button>

                        {
                            _message && showAlert()
                        }
                    </View>
                </ScrollView >
            </Container>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.grad[5],
        flex: 1,
        paddingHorizontal: '2.5%'
    },
    centerVerticalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        // textTransform: 'uppercase',
        fontWeight: 'bold',
        color: color.grad[9],
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    button: {
        backgroundColor: color.grad[9],
        marginTop: 30
    },
    textButton: {
        textAlign: 'center',
        alignSelf: 'center'
    },


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
        color: color.grad[5],
        marginVertical: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        color: color.grad[8]
    },
    text: {
        color: color.grad[9],
        fontSize: 18
    },
    textHere: {
        fontWeight: 'bold',
    },
    textPicker: {
        color: color.grad[0],
        marginTop: 40,
        textAlign: 'center',
        fontSize: 24
    }
});

export default createWorker;