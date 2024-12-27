import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { CollectionNames } from "../lib/constant";
import { db } from "./firebase";

/**
 *
 * @param {string} userId
 * @param {(items: Array<unknown>) => void} onArrayChanged
 * @returns {Promise<Array<any>>}
 */
export const GetUserLessons = async (userId, onArrayChanged) => {
  const [allLessonsSnap, userSnap] = await Promise.all([
    getDocs(query(collection(db, CollectionNames.LESSON), orderBy("index"))),
    getDoc(doc(db, CollectionNames.USER, userId)),
  ]);

  const lessonsMap = new Map();
  for (const lessonSnap of allLessonsSnap.docs) {
    lessonsMap.set(lessonSnap.id, lessonSnap.data());
  }

  const userPlain = userSnap.data();

  for (const startedLessonId of userPlain?.started_lesson_ids || []) {
    const foundLesson = lessonsMap.get(startedLessonId);
    foundLesson.status = "IN PROGRESS";
  }

  for (const doneLessonId of userPlain?.done_lesson_ids || []) {
    const foundLesson = lessonsMap.get(doneLessonId);
    foundLesson.status = "COMPLETED";
  }

  const newLessonsState = Array.from(lessonsMap.values());
  onArrayChanged?.(newLessonsState);

  return newLessonsState;
};

/**
 *
 * @param {string} lessonId
 * @param {"vocab" | "image" | "fill-blank"} type
 * @param {(items: Array<unknown>) => void} onArrayChanged
 * @returns {Promise<Array<any>>}
 */
export const GetHomework = async (lessonId, type) => {
  const homework = await getDocs(
    query(
      collection(
        db,
        CollectionNames.LESSON,
        lessonId,
        CollectionNames.HOMEWORK,
      ),
      where("type", "==", type),
    ),
  );
  return homework.docs.map((doc) => doc.data());
};

/**
 *
 * @param {string} userId
 * @param {string} lessonId
 * @returns {Promise<{ vocab_done: boolean; image_done: boolean; fill_blank_done: boolean; }>}
 */
export const GetLessonCompletion = async (userId, lessonId) => {
  const userProgressSnap = await getDoc(
    doc(db, CollectionNames.USER, userId, CollectionNames.PROGRESS, lessonId),
  );

  if (!userProgressSnap.exists()) {
    return {
      vocab_done: false,
      image_done: false,
      fill_blank_done: false,
    };
  }

  const userProgress = userProgressSnap.data();
  /**
   * @type {Array<{completed_time: Date; score: number; type: "vocab" | "image" | "fill-blank"}>}
   */
  const userAttempts = userProgress.passing_attempts || [];

  const vocabDone = userAttempts.some((attempt) => attempt.type === "vocab");
  const imageDone = userAttempts.some((attempt) => attempt.type === "image");
  const fillBlankDone = userAttempts.some(
    (attempt) => attempt.type === "fill-blank",
  );

  return {
    vocab_done: vocabDone,
    image_done: imageDone,
    fill_blank_done: fillBlankDone,
  };
};

/**
 *
 * @param {string} userId
 * @param {string} lessonId
 * @param {{ totalScore: number; score: number; type: import('../lib/constant/vocab.const').VocabEnum }} param2
 */
export const CompleteHomework = async (
  userId,
  lessonId,
  { totalScore, score, type },
) => {
  const userProgressRef = doc(
    db,
    CollectionNames.USER,
    userId,
    CollectionNames.PROGRESS,
    lessonId,
  );
  const progressDoc = await getDoc(userProgressRef);

  const progressData = progressDoc.exists()
    ? progressDoc.data()
    : {
        id: lessonId,
        lesson_id: lessonId,
        user_id: userId,
        passing_attempts: [],
      };

  progressData.passing_attempts.push({
    completed_time: new Date(),
    total_score: totalScore,
    type,
    score,
  });

  await setDoc(userProgressRef, progressData);
};
