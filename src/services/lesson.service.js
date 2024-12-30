import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { CollectionNames, VocabEnum } from "../lib/constant";
import { auth, db } from "./firebase";

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

  const vocabDone = userAttempts.some(
    (attempt) => attempt.type === VocabEnum.VOCAB,
  );
  const imageDone = userAttempts.some(
    (attempt) => attempt.type === VocabEnum.IMAGE,
  );
  const fillBlankDone = userAttempts.some(
    (attempt) => attempt.type === VocabEnum.FILL_BLANK,
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

  if (!progressDoc.exists()) {
    progressData.passing_attempts.push({
      completed_time: new Date(),
      total_score: totalScore,
      type,
      score,
    });

    await setDoc(userProgressRef, progressData);

    // add the lesson to started if the progress didn't exist
    await AddLessonToStarted(auth.currentUser.uid, lessonId);
    return;
  }

  let attempt = {
    completed_time: new Date(),
    total_score: totalScore,
    type,
    score,
  };

  const attemptIndex = progressData.passing_attempts.findIndex(
    (item) => item.type === type,
  );
  if (attemptIndex > -1) {
    attempt = progressData.passing_attempts[attemptIndex];
    // delete item by index
    progressData.passing_attempts.splice(attemptIndex, 1);
  }

  if (score > attempt.score) {
    attempt.score = score;
    attempt.total_score = totalScore;
    attempt.completed_time = new Date();
  }

  progressData.passing_attempts.push(attempt);

  await setDoc(userProgressRef, progressData);

  // TODO: consider to make it as background job
  const statusOfLesson = await GetLessonCompletion(
    auth.currentUser.uid,
    lessonId,
  );

  // Add the lesson to done if the user has completed all categories
  if (
    statusOfLesson.fill_blank_done &&
    statusOfLesson.image_done &&
    statusOfLesson.vocab_done
  ) {
    await AddLessonToDone(auth.currentUser.uid, lessonId);
  }
};

/**
 *
 * @param {string} userId
 * @param {string} lessonId
 */
const AddLessonToStarted = async (userId, lessonId) => {
  const userRef = doc(db, CollectionNames.USER, userId);
  const userData = await getDoc(userRef);
  const userPlain = userData.exists()
    ? userData.data()
    : { done_lesson_ids: [], started_lesson_ids: [] };

  const setLessonIds = new Set(Array.from(userPlain.started_lesson_ids));
  setLessonIds.add(lessonId);

  userPlain.started_lesson_ids = Array.from(setLessonIds);
  await updateDoc(userRef, userPlain);
};

/**
 *
 * @param {string} userId
 * @param {string} lessonId
 */
const AddLessonToDone = async (userId, lessonId) => {
  const userRef = doc(db, CollectionNames.USER, userId);
  const userData = await getDoc(userRef);
  const userPlain = userData.exists()
    ? userData.data()
    : { done_lesson_ids: [], started_lesson_ids: [] };

  const setLessonIds = new Set(Array.from(userPlain.done_lesson_ids));
  setLessonIds.add(lessonId);

  userPlain.done_lesson_ids = Array.from(setLessonIds);
  await updateDoc(userRef, userPlain);
};
