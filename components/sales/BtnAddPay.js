import React from 'react';
import { Button, Text } from "native-base";
import { btnAddPay as dic } from "../../data/languague";

const BtnAddPay = ({ color, iLang }) => {
    return (
        <>
            <Button style={{ backgroundColor: color.grad[7], }} onPress={() => console.log('Presionado')} block rounded >
                <Text>{dic.addPayment[iLang]}</Text>
            </Button>
        </>
    );
}

export default BtnAddPay;