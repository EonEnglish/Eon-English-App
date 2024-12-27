import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../components/Container";
import { auth } from "../services/firebase";
import { GetLessonCompletion } from "../services/lesson.service";

export const Lessons = ({ navigation, route }) => {
  const { lesson_id } = route.params;
  const [conditions, setConditions] = useState({
    vocabMatch: null,
    vocabMatchPhoto: null,
    fillInTheBlank: null,
  });

  const isFocused = useIsFocused(); // Hook to check if the screen is focused

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }

      const progress = await GetLessonCompletion(user.uid, lesson_id);
      setConditions({
        vocabMatch: progress.vocab_done,
        vocabMatchPhoto: progress.image_done,
        fillInTheBlank: progress.fill_blank_done,
      });
    };

    if (isFocused) {
      fetchData(); // Fetch data when the screen is focused
    }
  }, [isFocused, navigation, lesson_id]);

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
        onPress={() => navigation.navigate("VocabMatchStack", { lesson_id })}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Match the Vocab</Text>
          {renderIcon(conditions.vocabMatch)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("VocabMatchPhotoStack", { lesson_id })
        }
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Match the Photo</Text>
          {renderIcon(conditions.vocabMatchPhoto)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BlankMatchStack", { lesson_id })}
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
