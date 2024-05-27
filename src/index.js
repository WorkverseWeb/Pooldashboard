import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("app");
const root = createRoot(container);

// redux
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import rootred from "./redux/reducers/main";
const store = createStore(rootred);

root.render(
  <Auth0Provider
    domain="dev-hzug8opma4uobruz.us.auth0.com"
    clientId="2YH8ltiy5HSa7HQ5InqenreLDTbHhbSz"
    authorizationParams={{
      redirect_uri: window.location.origin + "/dashboard/",
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);
