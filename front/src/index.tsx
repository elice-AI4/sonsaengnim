import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./styles/global-styles";
import { theme } from "./styles/theme";
import { Provider, atom, useAtom } from "jotai";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
