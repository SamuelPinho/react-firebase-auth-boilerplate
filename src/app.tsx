import React, { useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAuthentication } from "./context/authentication";

export const App = () => {
  const { isFetchingUser, isLogged } = useAuthentication();

  if (!isLogged && isFetchingUser) return <h1>Loading user...</h1>;

  return isLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

const AuthenticatedApp = () => {
  const { isLogged } = useAuthentication();

  if (!isLogged) return <Redirect to="/login" />;

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="*">Error 404 - Page not found!</Route>
    </Switch>
  );
};

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={["/", "/login"]}>
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Switch>
  );
};
