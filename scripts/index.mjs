import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";

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



export const GetFirebaseConfig = () => {
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
};

console.log("starting initialising");

// Initialize Firebase
const app = initializeApp(GetFirebaseConfig());
const auth = initializeAuth(app);
const db = getFirestore(app);

const deleteAllDocuments = async () => {
  const docsRef = collection(db, "lessons");
  const snapshot = await getDocs(docsRef);

  for (const snap of snapshot.docs) {
    await deleteDoc(snap.ref);
  }
};

const createDocuments = async () => {
  console.log("createDocuments");
  for (let i = 0; i < defaultLessons.length; i++) {
    const lessonId = `Lesson ${i + 1}`;

    const lessonRef = await addDoc(collection(db, "lesson"), {
      title: defaultLessons[i].title,
      index: i + 1,
    });

    await updateDoc(lessonRef, {
      id: lessonRef.id,
    });
  }
};

const moveHomework = async () => {
  /**
   * @type {'vocab' | 'image' | 'fill-blank'}
   */

  // vocab = Vocab Match
  // image = Image Match
  // fill-blank = Blank Match
  const subcollectiions = {
    vocab: "Vocab Match",
    image: "Image Match",
    "fill-blank": "Blank Match",
  };

  // const index = 1; // used for 'Lesson [index]'
  const type = "fill-blank"; // used to set type for new sentences
  const category = subcollectiions[type]; // determined category in old subcategory

  for (let index = 11; index < 14; index++) {
    const Collection = await getDocs(collection(db, `Lesson ${index}`));
    const plainHomeworks = [];
    for (const doc of Collection.docs) {
      if (doc.id !== category) {
        continue;
      }
      const subCollection = await getDocs(collection(doc.ref, "Collection"));
      const sentence = subCollection.docs.map((doc) => doc.data());

      plainHomeworks.push(...sentence);
    }
    console.log("old questions: ", plainHomeworks);

    // find the new lesson

    const q = query(collection(db, "lesson"), where("index", "==", index));
    const [newLessonSnapshot] = (await getDocs(q)).docs;

    console.log("found a new lesson: ", newLessonSnapshot.data());

    // save new questions to /lesson/{lesson_id}/homework
    for (const homeworkSentence of plainHomeworks) {
      const newPlainData = {
        lesson_id: newLessonSnapshot.id,
        question: homeworkSentence.question || homeworkSentence.translation,
        answer: homeworkSentence.answer || homeworkSentence.word,
        type,
      };

      if (type === "image") {
        newPlainData.image = homeworkSentence.image;
        delete newPlainData.question;
      }

      const sentenceRef = await addDoc(
        collection(db, "lesson", newLessonSnapshot.id, "homework"),
        newPlainData,
      );

      await updateDoc(sentenceRef, {
        id: sentenceRef.id,
      });

      console.info("A new homework sentence inserted: ", {
        ...newPlainData,
        id: sentenceRef.id,
      });
    }
  }
};

// createDocuments().then(() => process.exit(0));
moveHomework().then(() => process.exit(0));
