import React, { Component, useState } from "react";
import { Alert, Modal, StyleSheet, TouchableHighlight, View } from "react-native";
import { List, ListItem, Text, Left, Right, Icon } from "native-base";
import categories from "../data/categories";

const ModalCategory = ({ modalVisible, setModalVisible, onSelectCategory, color }) => {
  const [mainCategory, setMainCategory] = useState(false);
  const selectedCategory = (type, sub) => {
    onSelectCategory(type, sub);
  };

  return (
    <View style={styles.centeredView}>
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
            {
              !mainCategory && categories.map((category, i) => (
                <View key={category.name} style={styles.item}>
                  <Text onPress={() => setMainCategory(i)} >{category.name}</Text>
                </View>
              ))
            }
            {
              mainCategory && (
                <View style={styles.item}>
                  <Text style={{ fontWeight: 'bold' }} onPress={() => setMainCategory(false)}>{"< "}{categories[mainCategory].name}</Text>
                </View>
              )
            }
            {
              mainCategory && categories[mainCategory]['sub'].map((category, i) => (
                <View key={category.name} style={styles.item}>
                  <Text onPress={() => selectedCategory(categories[mainCategory]['name'], category.name)} >{category.name}</Text>
                </View>
              ))
            }

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: color.dark, marginTop: 20 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name='circledowno' type='AntDesign' style={styles.textStyle} />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  item: {
    marginVertical: 10
  }
});

export default ModalCategory;