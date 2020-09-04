import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./context/firebase";
import { AuthenticationProvider } from "./context/authentication";

type RootProviderProps = {
  children: React.ReactNode;
};

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </FirebaseProvider>
    </BrowserRouter>
  );
};
