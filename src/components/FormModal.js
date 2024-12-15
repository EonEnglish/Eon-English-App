import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import ProfileButton from "./profileButton";

const FormModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        // console.log("EEEE");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your message has been sent!</Text>
          <ProfileButton
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
            text={"Close"}
          ></ProfileButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#0782F9",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 32,
  },
});

export default FormModal;
