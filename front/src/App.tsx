import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hello from "./components/page/main/Hello";
import NotFound from "./components/NotFound";
import { ROUTE } from "./components/route/route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello test={"Hello"} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
