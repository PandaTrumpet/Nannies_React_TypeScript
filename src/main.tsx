import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./Context/AuthContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// const CLIENT_ID =
// "48666451549-fq9a0rbpdvnoqnqu79f6fbj8ds21f4vn.apps.googleusercontent.com";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId={CLIENT_ID}> */}
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
);
