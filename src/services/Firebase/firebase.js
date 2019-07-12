import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createUser } from './controllers/userController';

const config = {
  apiKey: 'AIzaSyAXVPo-dweeRPEvzr_TprJojJNqgVmdjmQ',
  authDomain: 'sound-manager-8dca3.firebaseapp.com',
  databaseURL: 'https://sound-manager-8dca3.firebaseio.com',
  projectId: 'sound-manager-8dca3',
  storageBucket: 'sound-manager-8dca3.appspot.com',
  messagingSenderId: '388966258360'
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.firestore = app.firestore();
    this.usersCollection = this.firestore.collection('users');

    this.auth = app.auth();

    // *** CONTROLLER FUNCTIONS ***
    this.createUser = createUser;
  }

  // *** AUTH API ***

  doCreateUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doLogin = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doLogout = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** MERGE AUTH AND FIRESTORE USER API ***

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.usersCollection.doc(authUser.uid).onSnapshot(snapshot => {
          const firestoreUser = snapshot.data();

          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...firestoreUser
          };

          next(authUser);
        });
      } else {
        localStorage.removeItem('authUser');
        fallback();
      }
    });
}

export default Firebase;
