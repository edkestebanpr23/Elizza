import React, { useState, useEffect, useContext } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Container, Content, Form, Item, Input, Label, Icon, Button } from "native-base";
import GlobalContext from "../../context/global/globalContext";
import SaleContext from "../../context/sale/saleContext";
import categories from "../../data/categories";
import { formProductCmp as dic } from "../../data/languague";
import { main as color } from "../../data/colors";
import { useNavigation } from "@react-navigation/native";

const FormProduct = () => {
    const { iLang } = useContext(GlobalContext);
    const { addProduct, parseMoney } = useContext(SaleContext);
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [product, setProduct] = useState('');
    const [cost, setCost] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // addDefault();
    }, []);

    const minus = () => {
        if (parseInt(quantity) > 1) {
            setQuantity(parseInt(quantity) - 1);
        }
    };

    const add = () => {

        const _product = { product, cost, quantity };
        addProduct(_product);
        navigation.goBack();
    };
    

    const addDefault = () => {
        addProduct({ product: 'Chaqueta niña', cost: 30000, quantity: 1, woman: true, category: 'Mujer - Sacos, Blazer' });
        addProduct({ product: 'Falda Jean', cost: 65000, quantity: 2, woman: true, category: 'Mujer - Faldas, Vestidos'  });
        addProduct({ product: 'Pantalón niño', cost: 45000, quantity: 1, woman: false, category: 'Niño - Pantalón, Pantaloneta'  });
        addProduct({ product: 'Medias', cost: 15000, quantity: 3, category: 'Medias' });
    };

    return (
        <Container>
            <Content>
                <Form style={{marginTop: 40}}>

                    <Item floatingLabel>
                        <Label style={styles.label}>{dic.product[iLang]}</Label>
                        <Input value={product} onChangeText={text => setProduct(text)} style={styles.input} />
                    </Item>

                    <Item floatingLabel>
                        <Label style={styles.label}>{dic.cost[iLang]}</Label>
                        <Input value={cost} onChangeText={text => setCost(text)} style={styles.input} keyboardType='numeric' />
                    </Item>

                    <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{flexBasis: '50%', flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, color: color.grad[8]}} >{dic.quantity[iLang]}</Text>
                        </View>
                        <View style={{flexDirection: 'row', flexBasis: '50%'}}>
                            <Icon name='minuscircleo' type='AntDesign' onPress={minus} style={{color: color.dark}} />
                            <Text style={styles.textQuantity}>{"  "} {quantity} {"  "}</Text>
                            <Icon name='pluscircleo' type='AntDesign' onPress={() => setQuantity(parseInt(quantity) + 1)} style={{color: color.dark}} />
                        </View>
                    </View>

                </Form>
                <Button onPress={add}>
                    <Text>{dic.add[iLang]}</Text>
                </Button>
            </Content>
            {/* <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View> */}
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
    label: {
        color: color.grad[8]
    },
    textQuantity: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: color.dark,
    }
});

export default FormProduct;