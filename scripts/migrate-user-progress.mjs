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

/**
 * @typedef {{
 * userId: string;
 * lessonIndex: number;
 * categories: Array<{completed_time: Date; score: number;}>;
 * }} Progress
 */

const migrateUserProgress = async () => {
  /**
   * @type {Array<Progress>}
   */
  const newProgresses = [];

  const usersSnapshot = {
    docs: [
      {
        id: "H7X4pe7a6ue5MNkUT4MahbcEfiB2",
        homeworksRefs: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"],
      },
      { id: "QLDtGnlkr5NQCl0Ys8myAvl190V2", homeworksRefs: ["Lesson 1"] },
      { id: "QxIgABDOmdZzpX893zV5YAG2V693", homeworksRefs: ["Lesson 5"] },
      { id: "bQJxS6RroZh13K1xZGhUKhRq3CE2", homeworksRefs: ["Lesson 1"] },
      { id: "byWcYAiR6QgThP7uCEVSMzA6da43", homeworksRefs: ["Lesson 1"] },
      {
        id: "cAkmvyjqWCXX2Mkyikxh7Ad2Q1g2",
        homeworksRefs: ["Lesson 1", "Lesson 2"],
      },
      {
        id: "jpL12PM3B9O2a0wVQr4nLsBLmsq2",
        homeworksRefs: ["Lesson 1", "Lesson 2", "Lesson 3"],
      },
    ],
  };

  for (const userDoc of usersSnapshot.docs) {
    // const homeworkSnap = await getDocs(
    //   collection(db, "Users", userDoc.id, "Homework"),
    // );
    // console.log("Fetched homeworks, size: ", homeworkSnap.size);

    /**
     * @type {Progress}
     */
    const newProgress = {
      userId: userDoc.id,
      categories: [],
    };
    for (const homeworkDoc of userDoc.homeworksRefs) {
      // 'vocab' | 'image' | 'fill-blank'
      // 1 - Vocab Match - vocab
      // 2 - Vocab Match Photo - image
      // 3 - Fill In The blank - fill-blank
      // index/type
      const [, lessonIndex] = homeworkDoc.split(" ");
      newProgress.lessonIndex = Number.parseInt(lessonIndex);

      const vocabProgressDoc = await getDoc(
        doc(
          db,
          "Users",
          userDoc.id,
          "Homework",
          homeworkDoc,
          "1",
          "Vocab Match",
        ),
      );
      if (vocabProgressDoc.exists()) {
        newProgress.categories.push({
          type: "vocab",
          completed_time: vocabProgressDoc.data().completed_time,
          score: vocabProgressDoc.data().score,
        });
      }

      const imageProgressDoc = await getDoc(
        doc(
          db,
          "Users",
          userDoc.id,
          "Homework",
          homeworkDoc,
          "2",
          "Vocab Match Photo",
        ),
      );
      if (imageProgressDoc.exists()) {
        newProgress.categories.push({
          type: "image",
          completed_time: imageProgressDoc.data().completed_time,
          score: imageProgressDoc.data().score,
        });
      }

      const fillBlankProgressDoc = await getDoc(
        doc(
          db,
          "Users",
          userDoc.id,
          "Homework",
          homeworkDoc,
          "3",
          "Fill In The blank",
        ),
      );
      if (fillBlankProgressDoc.exists()) {
        newProgress.categories.push({
          type: "fill-blank",
          completed_time: fillBlankProgressDoc.data().completed_time,
          score: fillBlankProgressDoc.data().score,
        });
      }
    }
    newProgresses.push(newProgress);
  }

  console.dir(newProgresses, { depth: null });

  /**
   * @type {Map<number, import("firebase/firestore").QueryDocumentSnapshot<DocumentData, DocumentData>>}
   */
  const lessonsMap = new Map();
  for (const progressData of newProgresses) {
    const q = query(
      collection(db, "lesson"),
      where("index", "==", progressData.lessonIndex),
    );
    const [foundLessonSnap] = (await getDocs(q)).docs;
    lessonsMap.set(progressData.lessonIndex, foundLessonSnap);
  }

  // Another Stage: inserting new data
  for (const progressData of newProgresses) {
    const foundLesson = lessonsMap.get(progressData.lessonIndex);

    const progressRef = doc(
      db,
      "user",
      progressData.userId,
      "progress",
      foundLesson.id,
    );

    await setDoc(progressRef, {
      id: foundLesson.id,
      lesson_id: foundLesson.id,
      user_id: progressData.userId,
      passing_attempts: progressData.categories,
    });
  }
};

migrateUserProgress()
  .then(() => process.exit(0))
  .catch((err) => console.log(err));
