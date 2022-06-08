import "./App.css";
import { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Webcamdisplay from "./components/Webcamdisplay";
import KnnTest from "./components/KnnTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/webcam" element={<Webcamdisplay />} />
        <Route path="/test" element={<KnnTest />} />
      </Routes>
    </Router>
  );
}

export default App;
