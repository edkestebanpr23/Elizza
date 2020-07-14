import React from 'react';
import { View, Text } from 'react-native';

const Line = ({ border, color, mv, mh }) => {
    return (
        <View style={{
            borderWidth: border ? border : 1,
            borderColor: color ? color : 'black',
            marginVertical: mv ? mv : 10,
            marginHorizontal: mh ? mh : '5%'
        }} />
    );
}

export default Line;