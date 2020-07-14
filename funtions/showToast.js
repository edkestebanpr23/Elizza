import React from 'react';
import { Toast } from 'native-base';

const showToast = (message) => {
    try {
        Toast.show({
            text: message,
            buttonText: 'Ok',
            duration: 4000,
            position: 'top'
        });
    } catch (error) {
        console.log(error)
    }
};

export default showToast;