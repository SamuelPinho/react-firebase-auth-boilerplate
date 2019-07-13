# React - Firebase Auth Boilerplate

This is a React boilerplate project with firebase authentication and firestore implemented to provide basic authentication features such as login and creation of new users.
Redux is used to handle user session.

## Getting Started

1. To start this app, first thing you need to clone it to your place of work.
2. Now you should run the command `npm install` to install all the packages listed on `package.json`.
3. Inside the file `./src/services/Firebase/firebase.js` you're going to add your firebase configuration inside the variable `config`.
   - This variable is passed to the function `initializeApp` so the firebase could connect to your app.

> To execute this code with firebase features you need to have an web app registered inside Google Firebase.

## Folder Architecture and Project Information

### `/services`

This folder contains the code responsible for providing ways to connect our app to firebase. Also contains our HOC implementations because we only have one HOC but if your app it's becoming too big, you could put your HOC's in a separate folder outside of `/services`.

#### Inside the folder:

- **`/firebase`** we have our class Firebase implemented which is responsible for connecting our app with firebase and also for having declared methods that login and creates users.

- **`/session`** we have an HOC called `withAuthorization` that if it's used by a component makes that component (by default) only accessible if there's an user logged.

### `/redux`

This folder is responsible for holding all the Redux implementation. Creating the store, declaring the actions, reducers and constants.

The actions `login` and `register` have action types:

- **REQUEST**: that is called when we make a request to the firebase api, turning a property called `isFetching` to true.
- **SUCCESS**: when there's no error on a api call to firebase, turning the property `isFetching` to false.
- **FAILURE**: when there's a error on a api call to firebase, turning the property `isFetching` to false.

#### Inside the folder:

- **`/actions`** we have our actions implemented that are:

  - `register`: calls the register method inside firebase
  - `logout`: calls the logout method inside firebase
  - `login`: call the login method inside firebase
  - `setUser`: used by the index page to set the user inside the session

- **`/reducers`** that holds the state defined on each one of them, that basically holds two properties that is **isFetching** that can be used to show a loading indicator in your app and one called **authUser** that holds the authenticated user returned by the firebase api.

- **`/store`** defines the store

- **`constants`** defines the constants used inside actions and reducers.

### `/pages`

Here we have an basic implementations of a folder structure to our components.

## Main Features

- Firebase Authentication
- Firestore to handle user data
- Redux taking care of user session
- React Router to handle routing

### Packages Utilized

- firebase
- react-redux
- react-router-dom
- recompose
- redux
- redux-thunk
- styled-components

## License

MIT © [Samuel Monteiro](https://samuelmonteiro.netlify.com/)
