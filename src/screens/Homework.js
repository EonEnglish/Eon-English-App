import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../components/Container";
import { GetUserLessons } from "../services/lesson.service";

export const Homework = ({ navigation }) => {
  const [lessonsState, setLessonsState] = useState([]);
  const isFocused = useIsFocused(); // Hook to check if the screen is focused
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (
      vocabMatchExists &&
      vocabMatchPhotoExists &&
      fillInTheBlankExists
    ) {
      newLessonsState[i].status = "COMPLETED";
      newLessonsState[i].color = "#2D93F5";
    } else if (
      vocabMatchExists ||
      vocabMatchPhotoExists ||
      fillInTheBlankExists
    ) {
      newLessonsState[i].status = "IN PROGRESS";
      newLessonsState[i].color = "#8D56FF";
    }

    if (!user) return console.error("No authenticated user found.");

    GetUserLessons(user.uid, (lessons) => setLessonsState([...lessons]))
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [isFocused]);

  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate("LessonsStack", { lesson_id: item.id })
      }
    >
      <View style={styles.buttonTextContainer}>
        <Text style={styles.lessonNumber}>Lesson {item.index}</Text>
        <Text style={styles.buttonText}>{item.title}</Text>
        <View style={[styles.chip, styles[`${item.status || "NOT STARTED"}`]]}>
          {item.status === "COMPLETED" && (
            <AntDesign name="checkcircleo" size={15} color="#23DB88" />
          )}
          {item.status === "IN PROGRESS" && (
            <MaterialIcons name="av-timer" size={15} color="#C2A800" />
          )}
          {item.status === undefined && (
            <MaterialCommunityIcons name="restart" size={15} color="#848484" />
          )}
          <Text style={styles.statusText}>{item.status || "NOT STARTED"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container style={styles.container}>
      <FlatList
        data={lessonsState.length ? lessonsState : []}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.flatListContent}
      />
    </Container>
  );
};

Homework.propTypes = {
  navigation: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  flatListContent: {
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: 10,
    paddingBottom: 40,
  },
  column: {
    justifyContent: "space-between",
  },
  button: {
    marginVertical: 10,
    marginHorizontal: -10,
    borderRadius: 7,
    width: "50%",
    aspectRatio: 1.1,
    paddingVertical: 7,
    paddingHorizontal: 9,
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 5px 0px",
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lessonNumber: {
    fontSize: 14,
    color: "#404040",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  buttonText: {
    color: "#676767",
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  statusText: {
    color: "#3D3D3D",
    fontWeight: "500",
    fontSize: 11,
  },
  chip: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 8,
    gap: 4,
  },
  COMPLETED: {
    backgroundColor: "#CFFFE9",
  },
  "NOT STARTED": {
    backgroundColor: "#EDEEEE",
  },
  "IN PROGRESS": {
    backgroundColor: "#FFF7CB",
  },
});

export default Homework;
