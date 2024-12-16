import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./AuthContext";
// import { store } from "./app/store.js";
createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  <AuthProvider>
    <BrowserRouter>
      <div className="bg-gray-100">
        <App />
      </div>
    </BrowserRouter>
  </AuthProvider>

  /* </Provider> */
);
