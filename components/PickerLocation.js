import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from "@react-native-community/picker";
import countries from "../data/countries";
import colors from "../data/colors";
import { color } from 'react-native-reanimated';

const PickerLocation = ({ region, setRegion, states }) => {

    /**
     * Cosas que faltan:
     * Debe ser mas fácil la selección del país, por ejemplo:
     * Crear una lista de paises donde está la iglesia que serán unos 50,
     * Facilmente se podrá ponerles idioma... Quizás separarlos por continentes...
     */
    // const defineCountry = (_country, i) => {
    //     setCountry(_country);
    //     console.log('Valor de i:', i);
    // };

    if (states) {
        if (countries[region.iContry].states.length > 0) {
            console.log(region.country + " tiene " + countries[region.iContry].states.length + ' estados');
            return (
                <View style={{ paddingHorizontal: '10%' }}>
                    <Picker
                        onValueChange={(_state, i) => setRegion({ ...region, state: _state, iState: i })}
                        selectedValue={region.state}
                        itemStyle={styles.item}
                    >
                        {
                            countries[region.iContry].states.map(_state => (
                                <Picker.Item key={_state.name} label={_state.name} value={_state.name} />
                            ))
                        }
                    </Picker>
                </View>
            );
        } else {
            console.log(region.country + ' No tiene estados');
            setRegion({ ...region, hasStates: false, state: 'NaN', });
        }

    }

    return (
        <View style={{ paddingHorizontal: '10%' }}>
            <Picker
                onValueChange={(_country, i) => setRegion({ ...region, country: _country, iContry: i })}
                selectedValue={region.country}
                itemStyle={styles.item}
            >
                {
                    countries.map(_country => (
                        <Picker.Item key={_country.code3} label={_country.name} value={_country.name} />
                    ))
                }
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        color: colors.main.grad[0],
        textTransform: 'uppercase'
    }
});

export default PickerLocation;