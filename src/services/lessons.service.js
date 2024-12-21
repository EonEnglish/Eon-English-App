import { doc, getDoc } from "@firebase/firestore";
import { db } from "../services/firebase";

export const defaultLessons = [
  {
    id: "1",
    title: "Where are you going?",
    status: "NOT STARTED",
  },
  {
    id: "2",
    title: "Time for School",
    status: "NOT STARTED",
  },
  { id: "3", title: "Sports", status: "NOT STARTED" },
  {
    id: "4",
    title: "Music and Art",
    status: "NOT STARTED",
  },
  { id: "5", title: "Home", status: "NOT STARTED" },
  { id: "6", title: "Meals", status: "NOT STARTED" },
  { id: "7", title: "Fast Food", status: "NOT STARTED" },
  { id: "8", title: "Review", status: "NOT STARTED" },
  { id: "9", title: "Nature", status: "NOT STARTED" },
  { id: "10", title: "Animals", status: "NOT STARTED" },
  { id: "11", title: "Shopping", status: "NOT STARTED" },
  { id: "12", title: "Birthdays", status: "NOT STARTED" },
  { id: "13", title: "Holidays", status: "NOT STARTED" },
];

/**
 *
 * @param {string} userId
 * @param {(items: Array<unknown>) => void} onArrayChanged
 * @returns {Promise<Array<any>>}
 */
export const GetUserLessons = async (userId, onArrayChanged) => {
  const newLessonsState = [...defaultLessons];

  for (let i = 0; i < defaultLessons.length; i++) {
    let lessonId = `Lesson ${i + 1}`;
    let Vocab_Match = doc(
      db,
      "Users",
      userId,
      "Homework",
      lessonId,
      "1",
      "Vocab Match",
    );
    let Vocab_Match_Photo = doc(
      db,
      "Users",
      userId,
      "Homework",
      lessonId,
      "2",
      "Vocab Match Photo",
    );
    let Fill_In_The_blank = doc(
      db,
      "Users",
      userId,
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

      if (vocabMatchExists && vocabMatchPhotoExists && fillInTheBlankExists) {
        newLessonsState[i].status = "COMPLETED";
      } else if (
        vocabMatchExists ||
        vocabMatchPhotoExists ||
        fillInTheBlankExists
      ) {
        newLessonsState[i].status = "IN PROGRESS";
      }

      onArrayChanged?.(newLessonsState);
    } catch (error) {
      console.error("Error fetching homework data:", error);
    }
  }
  return newLessonsState;
};
