import React, { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import { Container, Form, Input, Button, Item, Label, Text, H1, Toast, ListItem, Left, Icon as IconNB, Body, Right, Switch, Textarea } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";
import gS from "../../styles/globalStyles";
import { main as color } from "../../data/colors";
import { createClientView as dic } from "../../data/languague";
import GlobalContext from "../../context/global/globalContext";
import { useNavigation } from "@react-navigation/native";


// Apollo
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/petitions";

// import UploadImage from "../../components/UploadImage";


const createCustomer = () => {
    const { iLang, user } = useContext(GlobalContext);
    console.log(user);

    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [telephone2, setTelephone2] = useState('');
    const [woman, setWoman] = useState(false);
    const [description, setDescription] = useState('');
    const [_message, setMessage] = useState(null);
    const [urlImage, setUrlImage] = useState(null);

    // React Navigation
    const navigation = useNavigation();
    // Firebase Context
    // const { firebase } = useContext(FirebaseContext);

    // Apollo Mutation
    const [createClient] = useMutation(CREATE_CUSTOMER);

    // const { iLang } = route.params;

    /**
     * Functions
     */

    //  Cerrar teclado al oprimir la pantalla cuando el teclado esté abierto
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const showAlert = () => {
        console.log("Mensaje Toast:", _message);
        try {
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
        console.log('Registrando');
        // console.log(name + " ___ " + document + " ___ " + password + " ___ " + passwordRe + " ___ " + selectedCountry)
        // Validar datos del formulario
        if (name === '' || telephone === '' || telephone === '' || telephone === '') {
            console.log("Todos los datos son obligatorios");
            return;
        }

        // Almacenar en servidor
        try {
            const { data } = await createClient({
                variables: {
                    input: {
                        name: name,
                        telephone: telephone,
                        telephone2: telephone2,
                        sex: woman ? 'female' : 'male',
                        description: description,
                        // worker: '5ef26266ed48391faaa959e1'
                    }
                }
            });

            // Mostrar mensaje de éxito
            if (data.createClient) {
                setMessage(dic.createCustomer[iLang]);
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
            <Container style={[gS.container]}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginTop: 40, marginBottom: 100 }}>
                        <H1 style={[gS.title, { color: color.grad[8] }]}>{dic.title[iLang]} </H1>

                        <Form>
                            {/* Nombre */}
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.name[iLang]}</Label>
                                <Input
                                    placeholder={dic.name[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={[styles.input, { textTransform: 'capitalize' }]}
                                    onChangeText={text => setName(text.replace(/(^\w|\s\w)/g, m => m.toUpperCase()))}
                                    value={name}
                                />
                            </Item>

                            {/* Telefono */}
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

                            {/* Telefono 2 */}
                            <Item floatingLabel underline={false} style={styles.itemForm} >
                                <Label style={styles.label}>{dic.telephone[iLang]}{" 2 "}
                                    <Text style={{ color: color.grad[3] }}>{dic.optional[iLang]}</Text>
                                </Label>
                                <Input
                                    placeholder={dic.telephone[iLang]}
                                    placeholderTextColor={color.grad[4]}
                                    style={styles.input}
                                    keyboardType='numeric'
                                    secureTextEntry={false}
                                    onChangeText={text => setTelephone2(text.toLocaleLowerCase())}
                                    value={telephone2}
                                />
                            </Item>

                            {/* Es mujer? */}
                            <ListItem icon style={{marginVertical: 20}}>
                                <Left>
                                    <Button style={{ backgroundColor: color.grad[8] }}>
                                        <IconNB active name="ios-woman" type="Ionicons" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>{dic.woman[iLang]}</Text>
                                </Body>
                                <Right>
                                    <Switch value={woman} onValueChange={() => setWoman(!woman)} />
                                </Right>
                            </ListItem>

                            {/* Descripción */}
                            <View style={{marginVertical: 20}}>
                                <Label style={[styles.label, { marginBottom: 10}]}>{dic.description[iLang]}{" "}
                                    <Text style={{ color: color.grad[3] }}>{dic.optional[iLang]}</Text>
                                </Label>
                                <Textarea rowSpan={5} bordered placeholder={dic.descriptionPlace[iLang]}
                                    onChangeText={text => setDescription(text)}
                                />
                            </View>





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

export default createCustomer;