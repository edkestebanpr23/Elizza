import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Container, Content, Form, Item, Input, Label, Icon, Button, Textarea, CheckBox, ListItem, Body } from "native-base";
import Modal from 'react-native-modal';
import GlobalContext from "../context/global/globalContext";
import SaleContext from "../context/sale/saleContext";
import { formInfoSaleCmp as dic } from "../data/languague";
import { main as color } from "../data/colors";
import { useNavigation } from "@react-navigation/native";
import ModalCategory from "../components/ModalCategory";
import Payment from "./Payment";
import ListClients from "../components/ListClients";
/**
 * Formulario que se muestra luego de elegir los productos a comprar
 * 
 */

const FormInfoSale = ({ route }) => {
    const { iLang } = useContext(GlobalContext);
    const { addProduct, editProduct, products } = useContext(SaleContext);
    const navigation = useNavigation();
    // Se reutiliza el formulario de registro de producto para editar
    const _date = new Date();
    const [customer, setCustomer] = useState('');
    const [today, setToday] = useState(true);
    const [date, setDate] = useState({ day: _date.getDate(), month: (_date.getMonth() + 1), year: _date.getFullYear() });
    const [credit, setCredit] = useState(false);
    const [payment, setPayment] = useState(0);
    const [paymentDate, setPaymentDate] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectCustomer = (text) => {
        console.log('xxx', JSON.parse(text));
        setCustomer(JSON.parse(text));
        setModalVisible(!isModalVisible);
    };

    return (
        <Container>
            <Content>
                <Form style={{ marginTop: 40 }}>

                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <View style={{ marginVertical: 10, marginHorizontal: 15, backgroundColor: color.grad[0] }}>
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

                    <View style={{ flex: 1, borderRadius: 50 }}>
                        <Modal isVisible={isModalVisible}>
                            <View style={{ flex: 1 }}>
                                <ListClients iLang={iLang} searchbar redirect={false} onSelectCustomer={selectCustomer} />
                                <Button style={{backgroundColor: color.dark, margin: 10}} block onPress={toggleModal}>
                                    <Text style={{color: color.light, fontWeight: 'bold', fontSize: 18}}>{dic.cancel[iLang]}</Text>
                                </Button>
                            </View>
                        </Modal>
                    </View>

                    <ListItem>
                        <Body>
                            <Text style={{ fontSize: 20 }}>{dic.today[iLang]} {date.day}/{date.month}/{date.year} </Text>
                        </Body>
                        <CheckBox checked={today} onPress={() => setToday(!today)} color={color.dark} />
                    </ListItem>

                    {
                        !today && (
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flexBasis: '33%' }}>
                                        <Text style={styles.titleInfo}>{dic.day[iLang]}</Text>
                                    </View>
                                    <View style={{ flexBasis: '33%' }}>
                                        <Text style={styles.titleInfo}>{dic.month[iLang]}</Text>
                                    </View>
                                    <View style={{ flexBasis: '33%' }}>
                                        <Text style={styles.titleInfo}>{dic.year[iLang]}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flexBasis: '33%', paddingHorizontal: 10, paddingTop: 10 }}>
                                        <Input style={styles.inputDate} placeholder='DD' value={date.day} keyboardType='numeric' />
                                    </View>
                                    <View style={{ flexBasis: '33%', paddingHorizontal: 10, paddingTop: 10 }}>
                                        <Input style={styles.inputDate} placeholder='MM' value={date.month} keyboardType='numeric' />
                                    </View>
                                    <View style={{ flexBasis: '33%', paddingHorizontal: 10, paddingTop: 10 }}>
                                        <Input style={styles.inputDate} placeholder='AAAA' value={date.year} keyboardType='numeric' />
                                    </View>
                                </View>
                            </View>
                        )
                    }

                    {/* Plan separe */}
                    <ListItem>
                        <Body>
                            <Text style={{ fontSize: 20 }}>{dic.credit[iLang]}: {credit ? dic.yes[iLang] : dic.no[iLang]} </Text>
                        </Body>
                        <CheckBox checked={credit} onPress={() => setCredit(!credit)} color={color.dark} />
                    </ListItem>

                    {
                        credit && (
                            <Payment />
                        )
                    }

                    {/* Abono Form */}
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input />
                    </Item>

                    <View style={{ marginTop: 15 }}>
                        <Textarea rowSpan={5} bordered placeholder={dic.description[iLang]} />
                    </View>

                    {/* <Item floatingLabel>
                        <Label style={styles.label}>{dic.product[iLang]}</Label>
                        <Input value={} onChangeText={text => setProduct(text)} style={styles.input} />
                    </Item>

                    <Item floatingLabel>
                        <Label style={styles.label}>{dic.cost[iLang]}</Label>
                        <Input value={cost} onChangeText={text => setCost(text)} style={styles.input} keyboardType='numeric' />
                    </Item> */}



                </Form>
                {/* <View style={{ marginHorizontal: 30 }}>
                    <Button style={{ marginTop: 30, backgroundColor: color.dark, justifyContent: 'center' }} rounded onPress={SaveSale}>
                        <Text style={{ color: color.light, fontWeight: 'bold' }}>Finalizar</Text>
                    </Button>
                </View> */}

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
    }
});

export default FormInfoSale;