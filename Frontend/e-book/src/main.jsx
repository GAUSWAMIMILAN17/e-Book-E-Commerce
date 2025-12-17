import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./Components/ui/sonner.js";
import { Provider } from "react-redux";
import store, { persistor } from "./Components/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
