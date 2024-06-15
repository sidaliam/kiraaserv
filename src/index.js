import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextProvider } from "./Context/Searchcontext";
import { AuthContextProvider } from "./Context/Authcontext";
import {
  GlobalProvider,
  ReservationProvider,
} from "./Context/ReservationContext";
import { HelmetProvider } from "react-helmet-async";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ReactGA from "react-ga4";

ReactGA.initialize("G-613E0RD30P");

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

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

serviceWorkerRegistration.register();
