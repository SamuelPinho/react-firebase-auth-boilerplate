import React, { createContext, useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

type TrackingProviderProps = {
  children: React.ReactNode;
};

type CollectionType = firebase.firestore.CollectionReference<
  firebase.firestore.DocumentData
>;

type createUserOnFirebaseType = (
  email: string,
  password: string
) => Promise<void>;
type doUserLoginOnFirebaseType = (
  email: string,
  password: string
) => Promise<void>;
type logoutUserFromFirebaseType = () => Promise<void>;

type FirebaseState = {
  user: firebase.User | null;
  isFetchingUser: boolean;

  createUserOnFirebase: createUserOnFirebaseType;
  doUserLoginOnFirebase: doUserLoginOnFirebaseType;
  logoutUserFromFirebase: logoutUserFromFirebaseType;
};

const FirebaseContext = createContext<FirebaseState | undefined>(undefined);

function FirebaseProvider({ children }: TrackingProviderProps) {
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  // AUTHENTICATION
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }

    setIsFetchingUser(false);
  });

  const createUserOnFirebase: createUserOnFirebaseType = (email, password) =>
    new Promise(async (resolve, reject) => {
      try {
        const firebaseUser = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        if (!firebaseUser.user) {
          reject();
          return;
        }

        await usersCollection.doc(firebaseUser.user.uid).set({
          email: firebaseUser.user.email,
        });

        resolve();
      } catch (e) {
        reject(e);
      }
    });

  const doUserLoginOnFirebase: doUserLoginOnFirebaseType = (email, password) =>
    new Promise(async (resolve, reject) => {
      try {
        await auth.signInWithEmailAndPassword(email, password);

        resolve();
      } catch (e) {
        reject(e);
      }
    });

  const logoutUserFromFirebase = async () => await auth.signOut();

  // FIRESTORE
  const usersCollection = firestore.collection("users");

  return (
    <FirebaseContext.Provider
      value={{
        createUserOnFirebase,
        doUserLoginOnFirebase,
        logoutUserFromFirebase,
        user,
        isFetchingUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

function useFirebase() {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }

  return context;
}

export { FirebaseProvider, useFirebase };
