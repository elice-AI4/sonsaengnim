import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hello from "./components/page/main/Hello";
import NotFound from "./components/NotFound";
import { ROUTE } from "./components/route/route";
import Learning from "./components/page/learning/Learning";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello test={"Hello"} />} />
        <Route path={`/${ROUTE.LEARNING.link}`} element={<Learning />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
