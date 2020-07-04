import React from 'react';
import { View } from 'react-native';
import { Form, Input, Text, Textarea } from "native-base";
import { main as color } from "../data/colors";

const Payment = ({ }) => {
    return (
        <View>
            <Input
                style={{
                    borderColor: color.main,
                    borderWidth: 2,
                    borderRadius: 10,
                    textAlign: 'center'
                }}
            />
        </View>
    );
}

export default Payment;