import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Counting from "./components/Counting";
import FCTest from "./components/FCTest";
import Hello from "./components/Hello";
import NotFound from "./components/NotFound";
import { ROUTE } from "./components/route/route";
import TextLength from "./components/TextLength";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello test={"Hello"} />} />
        <Route path={`/${ROUTE.COUNT.link}`} element={<Counting />} />
        <Route path={`/${ROUTE.TEXT.link}`} element={<TextLength />} />
        <Route path={`/${ROUTE.FC.link}`} element={<FCTest />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
