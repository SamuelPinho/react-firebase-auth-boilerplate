# React - Firebase Auth Template

This is a newer version of old **react firebase authentication boilerplate**.

This newer version uses the not so new **Context API** from react to handle user data and **firebase**
We're also using **Typerscript**!!

> To execute this template with firebase features you need to have an web app registered inside Google Firebase.

## Getting Started

1. To start this app, first thing you need to clone it to your work place.
2. Now you should run the command `npm install` or `yarn` to install all the packages listed on `package.json`.
3. You should get your firebase configuration keys in order to connect to your firebase console and **we recommend** to add them to an `.env` file with this structure:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```

4. After that, all you need to do is to run the project with `yarn start`

## Folder Structure and Project Configurations

### `/pages`

This folder contains the pages of the project

- Home
- Login
- Regsiter

### `/context`

Where we define the **contexts APIs** responsible for handling **login**, **register** and **logout** functions. We also handle the authentication helpers like:

- getting the user from firebase
- seeing if the user is logged
- if it's authenticating (fetching firebase for the user)

We also defined an context for firebase, since we find that it helps to separate the logic between firebase configuration and the businness itself.

> to access the contexts you can use `useFirebase` and `useAuthentication` we saw that on [Kent C. Dodds blog](https://kentcdodds.com/blog/how-to-use-react-context-effectively) and found it very clever. Thanks Kent ;)

### `rootProviders`

Inside this file is where we pass the "global" providers of our App. Since authentication, firebase and routing(BrowserRouter) can be used in the entire application, we thought would be better to define them in a separated file.

## Main Features

- Firebase Authentication
- React Router to handle routing

### Packages Utilized

- firebase
- react-router-dom

## License

MIT © [Samuel Monteiro](https://samuelmonteiro.netlify.com/)
