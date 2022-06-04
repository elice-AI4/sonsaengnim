import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Counting from "./components/Counting";
import Hello from "./components/Hello";
import NotFound from "./components/NotFound";
import TextLength from "./components/TextLength";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello test={"Hello"} />} />
        <Route path="/count" element={<Counting />} />
        <Route path="/text" element={<TextLength />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
