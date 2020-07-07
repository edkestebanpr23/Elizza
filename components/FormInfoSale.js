import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Container, Content, Form, Item, Input, Label, Icon, Button, Textarea, CheckBox, ListItem, Body } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import { main as color } from "../data/colors";
import { formInfoSaleCmp as dic } from "../data/languague";
import GlobalContext from "../context/global/globalContext";
import SaleContext from "../context/sale/saleContext";

import DatePicker from "./DatePicker";
import ModalCategory from "../components/ModalCategory";
import Payment from "./Payment";
import ListClients from "../components/ListClients";
/**
 * Formulario que se muestra luego de elegir los productos a comprar
 * 
 */

const FormInfoSale = ({ route }) => {
    const { iLang } = useContext(GlobalContext);
    const { updateSale } = useContext(SaleContext);
    const navigation = useNavigation();
    // Se reutiliza el formulario de registro de producto para editar
    const [customer, setCustomer] = useState('');
    const [today, setToday] = useState(true);
    const [date, setDate] = useState(new Date());
    const [credit, setCredit] = useState(false);
    const [payment, setPayment] = useState(0);
    const [cellar, setCellar] = useState(0);
    const [description, setDescription] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectCustomer = (text) => {
        console.log('xxx', JSON.parse(text));
        setCustomer(JSON.parse(text));
        setModalVisible(!isModalVisible);
    };

    const onSelectDateParent = (dateText) => {
        console.log('Parent', dateText);
        setDate(dateText);
    }

    const onPayment = pay => {
        console.log('Padre:', pay);
        setPayment(parseInt(pay));
    };

    const finalizePurchase = () => {
        console.log('Finalizando compra...');
        // Comprobar todos los datos obligatorios
        if (!customer.id || customer === '') {
            alert('Debes seleccionar un cliente');
            return;
        }

        const sale = {
            customer: customer.id,
            temp: customer,
            register: date.toString()
        };

        // Plan separe
        if (credit) {
            console.log('Credito')
            if (payment < 10000 ) {
                alert('El abono inicial debe ser mayor a $ 10.000');
                return;
            } else if (parseInt(cellar) === 0) {
                alert('Debes seleecionar una bodega de almacenamiento');
                return;
            }
            sale.payment = [
                {
                    payment,
                    quantity: payment,
                    date: date.toString()
                }
            ];
            sale.cellar = cellar.toString();
        }

        // Guardar localmente

        sale.description = description;
        sale.credit = credit;
        sale.finalize = false;
        
        console.log('Actualizando sale...');
        updateSale(sale);
        console.log('Sale Actualizado...');

        // Redireccionar a la vista de resumen de venta
        navigation.navigate('Confirm');
    };

    return (
        <Container>
            <Content style={{ paddingHorizontal: 15 }}>
                <Form style={{ marginTop: 40 }}>

                    {/* Seleccional Cliente */}
                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <View style={{ marginVertical: 10, marginHorizontal: 0, backgroundColor: color.grad[0] }}>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                                <View style={{ flexBasis: '30%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>{dic.customer[iLang]} {" "}</Text>
                                </View>
                                <View style={{ flexBasis: '70%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{customer.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Modal para seleccionar cliente */}
                    <View style={{ flex: 1, borderRadius: 50 }}>
                        <Modal isVisible={isModalVisible}>
                            <View style={{ flex: 1 }}>
                                <ListClients iLang={iLang} searchbar redirect={false} onSelectCustomer={selectCustomer} />
                                <Button style={{ backgroundColor: color.dark, margin: 10 }} block onPress={toggleModal}>
                                    <Text style={{ color: color.light, fontWeight: 'bold', fontSize: 18 }}>{dic.cancel[iLang]}</Text>
                                </Button>
                            </View>
                        </Modal>
                    </View>

                    {/* Es fecha de hoy? */}
                    <ListItem>
                        <Body>
                            <Text style={{ fontSize: 20 }}>{dic.today[iLang]} {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} </Text>
                        </Body>
                        <CheckBox checked={today} onPress={() => setToday(!today)} color={color.dark} />
                    </ListItem>

                    {/* Seleccionar fecha */}
                    {
                        !today && (
                            <DatePicker onSelectDate={onSelectDateParent} iLang={iLang} />
                        )
                    }

                    {/* Plan separe */}
                    <ListItem>
                        <Body>
                            <Text style={{ fontSize: 20 }}>{dic.credit[iLang]}: {credit ? dic.yes[iLang] : dic.no[iLang]} </Text>
                        </Body>
                        <CheckBox checked={credit} onPress={() => setCredit(!credit)} color={color.dark} />
                    </ListItem>

                    {/* Botón de crédito y texto de abono */}
                    {
                        credit && (
                            <View>
                                <Text style={styles.payText}>{dic.initialPay[iLang]}:
                                    <Text style={styles.pay}>$ {payment}</Text>
                                </Text>
                                <Payment iLang={iLang} onPaymentAdd={onPayment} />
                                {/* Numero de bodega de almacenamiento */}
                                <Item inlineLabel>
                                    <Label>{dic.cellar[iLang]}</Label>
                                    <Input
                                        value={cellar}
                                        onChangeText={text => setCellar(text.toString())}
                                        keyboardType='numeric'
                                        style={styles.input}
                                    />
                                </Item>
                            </View>
                        )
                    }

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.text}>Comentarios sobre la compra</Text>
                        <Textarea rowSpan={5} bordered placeholder={dic.description[iLang]} style={styles.textArea} onChangeText={text => setDescription(text)} />
                    </View>
                    



                </Form>
                <View style={{ marginHorizontal: 30, marginTop: 20, marginBottom: 100 }}>
                    <Button style={{ marginTop: 30, backgroundColor: color.dark, justifyContent: 'center' }} rounded onPress={finalizePurchase}>
                        <Text style={{ color: color.light, fontWeight: 'bold' }}>{dic.finalize[iLang]}</Text>
                    </Button>
                </View>

            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    input: {
        color: color.grad[5],
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputDate: {
        borderColor: color.light,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center'
    },
    label: {
        color: color.grad[8]
    },
    textQuantity: {
        fontSize: 24,
        fontWeight: 'bold',
        color: color.dark,
    },
    titleInfo: {
        color: color.grad[5],
        alignSelf: 'center'
    },
    productInfo: {
        color: color.grad[9],
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    payText: {
        alignSelf: 'flex-end',
        margin: 20,
        fontSize: 20,
        color: color.main
    },
    pay: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        color: color.dark
    },
    textArea: {
        fontSize: 20,
        color: color.dark,
        borderRadius: 10,
        paddingTop: 10
    }
});

export default FormInfoSale;