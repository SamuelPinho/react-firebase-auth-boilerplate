import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.firestore = app.firestore();
    this.usersCollection = this.firestore.collection('users');

    this.auth = app.auth();
  }
  // *** AUTH API ***

  doCreateUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doLogin = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doLogout = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** HELPER FUNCTION ***

  doRegister = (email, username, password) => {
    return new Promise((resolve, reject) => {
      this.doCreateUser(email, password)
        .then(authUser => {
          this.usersCollection
            .doc(authUser.user.uid)
            .set({
              email,
              username
            })
            .then(() => {
              let id = authUser.user.uid;
              resolve({ email, id, username });
            })
            .catch(error => {
              console.log(error.message);
              reject(error);
            });
        })
        .catch(error => {
          console.log(error.message);
          reject(error);
        });
    });
  };

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
