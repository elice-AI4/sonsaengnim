import "./App.css";
import { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Webcamdisplay from "./components/Webcamdisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/webcam" element={<Webcamdisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
