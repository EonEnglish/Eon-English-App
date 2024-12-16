import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../services/firebase";
import Container from "../components/Container";
import PropTypes from "prop-types";

export const Lessons = ({ navigation, route }) => {
  const { data } = route.params;
  const [conditions, setConditions] = useState({
    vocabMatch: null,
    vocabMatchPhoto: null,
    fillInTheBlank: null,
  });

  const isFocused = useIsFocused(); // Hook to check if the screen is focused

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }

      const Vocab_Match = doc(
        db,
        "Users",
        user.uid,
        "Homework",
        data,
        "1",
        "Vocab Match",
      );
      const Vocab_Match_Photo = doc(
        db,
        "Users",
        user.uid,
        "Homework",
        data,
        "2",
        "Vocab Match Photo",
      );
      const Fill_In_The_blank = doc(
        db,
        "Users",
        user.uid,
        "Homework",
        data,
        "3",
        "Fill In The blank",
      );

      try {
        const vocabMatchDoc = await getDoc(Vocab_Match);
        const vocabMatchPhotoDoc = await getDoc(Vocab_Match_Photo);
        const fillInTheBlankDoc = await getDoc(Fill_In_The_blank);

        setConditions({
          vocabMatch: vocabMatchDoc.exists(),
          vocabMatchPhoto: vocabMatchPhotoDoc.exists(),
          fillInTheBlank: fillInTheBlankDoc.exists(),
        });
      } catch (error) {
        console.error("Error fetching homework data:", error);
      }
    };

    if (isFocused) {
      fetchData(); // Fetch data when the screen is focused
    }
  }, [isFocused, navigation, data]);

  const renderIcon = (condition) => {
    if (condition === null) return null; // Loading state
    return condition ? (
      <Ionicons name="checkmark-circle" size={24} color="green" />
    ) : (
      <Ionicons name="close-circle" size={24} color="red" />
    );
  };

  return (
    <Container style={styles.centerContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VocabMatchStack", { data })}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Match the Vocab</Text>
          {renderIcon(conditions.vocabMatch)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VocabMatchPhotoStack", { data })}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Match the Photo</Text>
          {renderIcon(conditions.vocabMatchPhoto)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BlankMatchStack", { data })}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Fill in the Blank</Text>
          {renderIcon(conditions.fillInTheBlank)}
        </View>
      </TouchableOpacity>
    </Container>
  );
};

Lessons.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
};

export default Lessons;

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 3,
    borderColor: "#CCCCCC",
    width: "90%",
    padding: 15,
    borderRadius: 7,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
