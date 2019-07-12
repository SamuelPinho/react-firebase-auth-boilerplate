import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Firebase, { FirebaseContext } from "./services/Firebase";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";

console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </FirebaseContext.Provider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
