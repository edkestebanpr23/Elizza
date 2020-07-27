import React, { useState } from 'react';
import { View, Button as ButtonRN } from 'react-native';
import { Input, Text, Button, Icon, Item, Label } from "native-base";
import { main as color } from "../data/colors";
import Modal from 'react-native-modal';
import { formInfoSaleCmp as dic } from "../data/languague";

const Payment = ({ iLang, onPaymentAdd }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [money, setMoney] = useState('');


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const add = () => {
        onPaymentAdd(parseInt(money));
        toggleModal();
    }

    const changeMoney = (money) => {
        setMoney(money);
    };

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ borderRadius: 50, backgroundColor: 'white' }}>
                <Modal isVisible={isModalVisible}>
                    <View style={{ justifyContent: 'center', backgroundColor: 'white' }}>
                        <View style={{}}>
                            <Item floatingLabel>
                                <Label>{dic.quantity[iLang]}</Label>
                                <Input
                                    keyboardType="numeric"
                                    placeholder={dic.quantity[iLang]}
                                    value={money}
                                    onChangeText={text => changeMoney(text.toString())}
                                    style={{
                                        borderColor: color.main,
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        textAlign: 'center',
                                        paddingVertical: 20,
                                        marginTop: 40,
                                        marginHorizontal: 20,
                                        color: color.dark,
                                        fontSize: 20,
                                        marginBottom: 20
                                    }} />
                            </Item>
                            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                                <Button style={{ backgroundColor: color.dark }} block rounded onPress={add}>
                                    <Text style={{ color: color.light, fontWeight: 'bold', fontSize: 18 }}>{dic.add[iLang]}</Text>
                                </Button>
                                <Button style={{ backgroundColor: 'white', marginTop: 10, justifyContent: 'center', }} onPress={toggleModal}>
                                    <Icon name='circledowno' type='AntDesign' style={{ color: color.dark }} />
                                </Button>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <ButtonRN onPress={toggleModal} title={dic.addCredit[iLang]} />
            </View>

        </View>
    );
}

export default Payment;