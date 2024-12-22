import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { doc, getDoc } from "@firebase/firestore";
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
import { db } from "../services/firebase";

export const Homework = ({ navigation }) => {
  const [lessonsState, setLessonsState] = useState([]);
  const isFocused = useIsFocused(); // Hook to check if the screen is focused
  const lessons = [
    {
      id: "1",
      title: "Where are you going?",
      status: "NOT STARTED",
      color: "#F9C407",
    },
    {
      id: "2",
      title: "Time for School",
      status: "NOT STARTED",
      color: "#F9C407",
    },
    { id: "3", title: "Sports", status: "NOT STARTED", color: "#F9C407" },
    {
      id: "4",
      title: "Music and Art",
      status: "NOT STARTED",
      color: "#F9C407",
    },
    { id: "5", title: "Home", status: "NOT STARTED", color: "#F9C407" },
    { id: "6", title: "Meals", status: "NOT STARTED", color: "#F9C407" },
    { id: "7", title: "Fast Food", status: "NOT STARTED", color: "#F9C407" },
    { id: "8", title: "Review", status: "NOT STARTED", color: "#F9C407" },
    { id: "9", title: "Nature", status: "NOT STARTED", color: "#F9C407" },
    { id: "10", title: "Animals", status: "NOT STARTED", color: "#F9C407" },
    { id: "11", title: "Shopping", status: "NOT STARTED", color: "#F9C407" },
    { id: "12", title: "Birthdays", status: "NOT STARTED", color: "#F9C407" },
    { id: "13", title: "Holidays", status: "NOT STARTED", color: "#F9C407" },
    { id: "14", title: "Review", status: "NOT STARTED", color: "#F9C407" },
    // Add more lessons as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return console.error("No authenticated user found.");

      const newLessonsState = [...lessons];

      for (let i = 0; i < lessons.length; i++) {
        let lessonId = `Lesson ${i + 1}`;
        let Vocab_Match = doc(
          db,
          "Users",
          user.uid,
          "Homework",
          lessonId,
          "1",
          "Vocab Match",
        );
        let Vocab_Match_Photo = doc(
          db,
          "Users",
          user.uid,
          "Homework",
          lessonId,
          "2",
          "Vocab Match Photo",
        );
        let Fill_In_The_blank = doc(
          db,
          "Users",
          user.uid,
          "Homework",
          lessonId,
          "3",
          "Fill In The blank",
        );

        try {
          let vocabMatchDoc = await getDoc(Vocab_Match);
          let vocabMatchPhotoDoc = await getDoc(Vocab_Match_Photo);
          let fillInTheBlankDoc = await getDoc(Fill_In_The_blank);

          let vocabMatchExists = vocabMatchDoc.exists();
          let vocabMatchPhotoExists = vocabMatchPhotoDoc.exists();
          let fillInTheBlankExists = fillInTheBlankDoc.exists();

          if (
            vocabMatchExists &&
            vocabMatchPhotoExists &&
            fillInTheBlankExists
          ) {
            newLessonsState[i].status = "COMPLETED";
            newLessonsState[i].color = "#0782F9";
          } else if (
            vocabMatchExists ||
            vocabMatchPhotoExists ||
            fillInTheBlankExists
          ) {
            newLessonsState[i].status = "IN PROGRESS";
            newLessonsState[i].color = "#8D56FF";
          }

          setLessonsState([...newLessonsState]); // continues to updates after loading :)
        } catch (error) {
          console.error("Error fetching homework data:", error);
        }
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate("LessonsStack", { data: `Lesson ${item.id}` })
      }
    >
      <View style={styles.buttonTextContainer}>
        <Text style={styles.lessonNumber}>Lesson {item.id}</Text>
        <Text style={styles.buttonText}>{item.title}</Text>
        <View style={[styles.chip, styles[`${item.status}`]]}>
          {item.status === "COMPLETED" && (
            <AntDesign name="checkcircleo" size={15} color="#23DB88" />
          )}
          {item.status === "IN PROGRESS" && (
            <MaterialIcons name="av-timer" size={15} color="#C2A800" />
          )}
          {item.status === "NOT STARTED" && (
            <MaterialCommunityIcons name="restart" size={15} color="#848484" />
          )}
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (lessonsState.length < lessons.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container style={styles.container}>
      <FlatList
        data={lessonsState.length ? lessonsState : lessons}
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
