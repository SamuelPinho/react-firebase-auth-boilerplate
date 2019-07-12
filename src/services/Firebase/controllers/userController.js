export const createUser = (firebase, email, username, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        firebase.usersCollection
          .doc(authUser.user.uid)
          .set({
            email,
            username
          })
          .then(() => {
            resolve();
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
