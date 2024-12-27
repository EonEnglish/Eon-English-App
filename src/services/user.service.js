import { doc, setDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CollectionNames } from "../lib/constant";
import { auth, db } from "../services/firebase";

export const RegisterUser = async ({ email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password);
  auth.currentUser.uid;
  const userRef = doc(db, CollectionNames.USER, auth.currentUser.uid);
  await setDoc(userRef, { done_lesson_ids: [], started_lesson_ids: [] });
};
