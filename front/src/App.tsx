import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hello from "./components/page/main/Hello";
import NotFound from "./components/NotFound";
import { ROUTE } from "./components/route/route";
import Main from "./components/main/Main";

const GlobalStyle = createGlobalStyle`
  html {
    padding:0;
    margin:0;
  }
  body{
    padding: 0;
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Hello test={"Hello"} />} />
          <Route path="/main" element={<Main />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
