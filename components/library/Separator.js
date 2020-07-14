import React from 'react';
import { View, Text } from 'react-native';

const Separator = ({ text, color }) => {
    return (
        <View style={{ backgroundColor: color.grad[0], paddingBottom: 10, justifyContent: 'center', marginTop: 10, marginBottom: 5 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 12 }}>{text}</Text>
        </View>
    );
};

export default Separator;