import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextProvider } from "./Context/Searchcontext";
import { AuthContextProvider } from "./Context/Authcontext";
import {
  GlobalProvider,
  ReservationProvider,
} from "./Context/ReservationContext";
import { Helmet, HelmetProvider } from "react-helmet-async";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalProvider>
        <SearchContextProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </SearchContextProvider>
      </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
